// server.js - Asterocks multiplayer server with WebSocket support
// Requires: express, cors, ws
// Uses native Node.js fetch (available in Node 18+)
const express = require('express');
const cors = require('cors');
const path = require('path');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// ===== SECURITY UTILITIES =====
// Sanitize string inputs to prevent injection attacks
function sanitizeString(str, maxLength = 500) {
  if (typeof str !== 'string') return '';
  return str.substring(0, maxLength).replace(/[<>\"']/g, c => ({
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c] || c));
}

// Validate numeric inputs are within safe ranges
function validateNumber(value, min, max) {
  const num = Number(value);
  return isFinite(num) && num >= min && num <= max ? num : null;
}

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:");
  next();
});

// CORS with origin validation
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['localhost:3000', 'localhost:5173', '127.0.0.1:3000'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.some(allowed => origin.includes(allowed))) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true
}));
app.use(express.json({ limit: '10kb' })); // Limit payload size
app.use(express.static(path.join(__dirname)));

// Simple rate limiting (in-memory)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 60; // 60 requests per minute

function rateLimit(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return next();
  }
  
  const record = rateLimitMap.get(ip);
  
  if (now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return next();
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    // Don't leak internal details in error message
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }
  
  record.count++;
  next();
}

// Clean up rate limit map periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW);

// Simple in-memory cache that is refreshed by a background job
let cache = {
  updated: null,
  latestMag: null,
  observedMag: null,
  predictedMag: null,
  distanceKm: null,
  source: null,
  magStatus: 'normal', // 'normal' or 'abnormal'
  previousMag: null,
  raw: {}
};

// Endpoints
app.get('/api/test', rateLimit, (req,res)=>{
  res.json({ ok:true, server:'Asterocks-Server', timestamp:new Date().toISOString(), note:'Test endpoint' });
});



// ===== MULTIPLAYER WEBSOCKET SYSTEM (CO-OP, VS, ANYPLAYER) =====
let players = {}; // { playerId: { ws, state, playerId, mode } }
let anyPlayerLobby = []; // Players in anyplayer/battle royale mode
let gameState = {
  asteroids: [],
  bullets: [],
  ufos: [],
  ufoBullets: []
};

wss.on('connection', (ws) => {
  const playerId = generatePlayerId();
  console.log(`Player ${playerId} connected`);
  
  // Check if there's already a player
  const existingPlayers = Object.keys(players);
  const isFirstPlayer = existingPlayers.length === 0;
  
  players[playerId] = {
    ws,
    playerId,
    state: {
      x: 0,
      y: 0,
      angle: 0,
      velocity: { x: 0, y: 0 },
      exploded: false,
      score: 0,
      lives: 3
    }
  };
  
  // Send initial connection info
  ws.send(JSON.stringify({
    type: 'connected',
    playerId,
    isFirstPlayer,
    otherPlayers: existingPlayers.filter(id => id !== playerId)
  }));
  
  // If there's another player, notify them
  if (existingPlayers.length > 0) {
    existingPlayers.forEach(id => {
      if (id !== playerId && players[id]) {
        players[id].ws.send(JSON.stringify({
          type: 'player_available',
          playerId: playerId
        }));
      }
    });
  }
  
  ws.on('message', (message) => {
    try {
      // Validate message is string and reasonable size (1MB limit)
      if (typeof message !== 'string' && !Buffer.isBuffer(message)) {
        console.error('Invalid message type received');
        return;
      }
      if (Buffer.isBuffer(message) && message.length > 1048576) {
        console.error('Message too large');
        return;
      }
      
      const data = JSON.parse(message);
      
      // Validate message has a type property
      if (!data.type || typeof data.type !== 'string') {
        console.error('Message missing or invalid type property');
        return;
      }
      
      console.log(`[${playerId}] Received message type: ${data.type}`);
      
      switch(data.type) {
        case 'join_request':
          // Player wants to join another player's game
          handleJoinRequest(playerId, data);
          break;
          
        case 'join_response':
          // Player accepts or declines join request
          handleJoinResponse(playerId, data);
          break;
          
        case 'join_anyplayer':
          // Player wants to join anyplayer/battle royale mode
          handleJoinAnyPlayer(playerId);
          break;
          
        case 'state_update':
          // Update player state
          if (players[playerId]) {
            players[playerId].state = data.state;
            console.log(`state_update from ${playerId}: x=${Math.round(data.state.x)}, y=${Math.round(data.state.y)}`);
            
            // In anyplayer mode, broadcast to all in lobby
            if (players[playerId].mode === 'anyplayer') {
              anyPlayerLobby.forEach(pId => {
                if (pId !== playerId && players[pId]) {
                  players[pId].ws.send(JSON.stringify({
                    type: 'player_state',
                    playerId,
                    state: data.state
                  }));
                }
              });
            } else {
              // Regular 2-player mode
              broadcastToOthers(playerId, {
                type: 'player_state',
                playerId,
                state: data.state
              });
            }
          }
          break;
          
        case 'game_sync':
          // Sync game state (asteroids, bullets, etc.) from host
          gameState = data.gameState;
          broadcastToOthers(playerId, {
            type: 'game_state',
            gameState
          });
          break;
          
        case 'bullet_fired':
          // Broadcast bullet fired
          broadcastToAll({
            type: 'bullet_fired',
            playerId,
            bullet: data.bullet
          });
          break;
          
        case 'powerup_sync':
          // Broadcast powerup state in co-op
          broadcastToOthers(playerId, {
            type: 'powerup_sync',
            playerId,
            powerups: data.powerups
          });
          break;
          
        case 'player_hit':
          // Broadcast player hit in VS mode
          broadcastToAll({
            type: 'player_hit',
            playerId,
            targetId: data.targetId
          });
          break;

        case 'player_killed':
          // Broadcast player kill in VS mode
          broadcastToAll({
            type: 'player_killed',
            playerId
          });
          break;
          
        case 'bomb_dropped':
          // Broadcast bomb drop to all players (anyplayer mode or VS mode)
          const playerMode = players[playerId]?.mode || 'unknown';
          console.log(`💣 Player ${playerId} (mode: ${playerMode}) dropped bomb`);
          
          if (playerMode === 'anyplayer') {
            console.log(`  Broadcasting to ${anyPlayerLobby.length - 1} anyplayer lobby members`);
            anyPlayerLobby.forEach(pid => {
              if (pid !== playerId && players[pid]) {
                players[pid].ws.send(JSON.stringify({
                  type: 'bomb_dropped',
                  bomb: data.bomb
                }));
                console.log(`  → Sent to ${pid}`);
              }
            });
          } else {
            // VS mode, coop, or any other mode - broadcast to all other players
            console.log(`  Broadcasting to all other connected players`);
            let sentCount = 0;
            Object.keys(players).forEach(pid => {
              if (pid !== playerId && players[pid]) {
                players[pid].ws.send(JSON.stringify({
                  type: 'bomb_dropped',
                  bomb: data.bomb
                }));
                console.log(`  → Sent to ${pid}`);
                sentCount++;
              }
            });
            console.log(`  Total sent: ${sentCount}`);
          }
          break;
          
        case 'bomb_destroyed':
          // Broadcast bomb destruction to all players
          if (players[playerId].mode === 'anyplayer') {
            anyPlayerLobby.forEach(pid => {
              if (pid !== playerId && players[pid]) {
                players[pid].ws.send(JSON.stringify({
                  type: 'bomb_destroyed',
                  bombIndex: data.bombIndex
                }));
              }
            });
          } else {
            broadcastToOthers(playerId, {
              type: 'bomb_destroyed',
              bombIndex: data.bombIndex
            });
          }
          break;
          
        case 'bomb_kill':
          // Notify the bomber they got a kill
          if (data.bomber && players[data.bomber]) {
            players[data.bomber].ws.send(JSON.stringify({
              type: 'bomb_kill',
              victim: data.victim,
              bomber: data.bomber
            }));
          }
          break;
          
        default:
          console.log(`Unknown message type: ${data.type}`);
          break;
      }
    } catch (e) {
      console.error('WebSocket message error:', e.message);
    }
  });
  
  ws.on('close', () => {
    console.log(`Player ${playerId} disconnected`);
    
    // Remove from anyplayer lobby if in it
    const lobbyIndex = anyPlayerLobby.indexOf(playerId);
    if (lobbyIndex > -1) {
      anyPlayerLobby.splice(lobbyIndex, 1);
      console.log(`Removed ${playerId} from anyplayer lobby. Remaining: ${anyPlayerLobby.length}`);
    }
    
    delete players[playerId];
    
    // Notify other players
    broadcastToAll({
      type: 'player_disconnected',
      playerId
    });
  });
});

function generatePlayerId() {
  return 'P' + Math.random().toString(36).substr(2, 9);
}

function handleJoinRequest(playerId, data) {
  const targetPlayerId = data.targetPlayerId;
  const mode = data.mode || 'coop';
  if (players[targetPlayerId]) {
    players[targetPlayerId].ws.send(JSON.stringify({
      type: 'join_request',
      playerId: playerId,
      mode: mode
    }));
  }
}

function handleJoinResponse(playerId, data) {
  const requestingPlayerId = data.requestingPlayerId;
  console.log(`handleJoinResponse called: playerId=${playerId}, requestingPlayerId=${requestingPlayerId}, accepted=${data.accepted}, mode=${data.mode}`);
  
  if (players[requestingPlayerId]) {
    const mode = data.mode || 'coop';
    
    // Set mode for both players
    if (data.accepted) {
      players[playerId].mode = mode;
      players[requestingPlayerId].mode = mode;
      console.log(`Players ${playerId} and ${requestingPlayerId} starting ${mode} mode`);
    }
    
    console.log(`Sending join_response to ${requestingPlayerId}: accepted=${data.accepted}, mode=${mode}`);
    players[requestingPlayerId].ws.send(JSON.stringify({
      type: 'join_response',
      accepted: data.accepted,
      playerId: playerId,
      mode: mode
    }));
  } else {
    console.log(`ERROR: Requesting player ${requestingPlayerId} not found!`);
  }
}
}

function handleJoinAnyPlayer(playerId) {
  if (!players[playerId]) return;
  
  // Mark player as in anyplayer mode
  players[playerId].mode = 'anyplayer';
  
  // Add to anyplayer lobby if not already in it
  if (!anyPlayerLobby.includes(playerId)) {
    anyPlayerLobby.push(playerId);
    console.log(`Player ${playerId} joined anyplayer lobby. Total players: ${anyPlayerLobby.length}`);
  }
  
  // Send list of all players in the lobby
  players[playerId].ws.send(JSON.stringify({
    type: 'anyplayer_players',
    players: anyPlayerLobby.filter(id => id !== playerId)
  }));
  
  // Notify all other players in lobby about new player
  anyPlayerLobby.forEach(pId => {
    if (pId !== playerId && players[pId]) {
      players[pId].ws.send(JSON.stringify({
        type: 'anyplayer_players',
        players: anyPlayerLobby.filter(id => id !== pId)
      }));
    }
  });
}

function broadcastToOthers(excludeId, message) {
  Object.keys(players).forEach(id => {
    if (id !== excludeId && players[id]) {
      players[id].ws.send(JSON.stringify(message));
    }
  });
}

function broadcastToAll(message) {
  Object.keys(players).forEach(id => {
    if (players[id]) {
      players[id].ws.send(JSON.stringify(message));
    }
  });
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=>console.log('Server running on port',PORT, 'with WebSocket support'));