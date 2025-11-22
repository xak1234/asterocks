# Asterocks - AI Coding Agent Instructions

## Project Overview
Multiplayer asteroid battle royale game with real-time WebSocket synchronization. Split architecture: static frontend (GitHub Pages) + Node.js WebSocket backend (Render/Railway).

## Architecture

### Frontend (`public/index.html`)
- **Single monolithic file** (~7000 lines) - All game logic, rendering, and multiplayer in one HTML file
- HTML5 Canvas game with vanilla JavaScript (no build system, no modules)
- WebSocket client connects to backend server URL specified in `public/config.js`
- Game modes: Solo (AI only), Co-op (2P), VS (1v1 PvP), Battle Royale (anyplayer - unlimited multiplayer)

### Backend (`server/server.js`)
- Express + WebSocket server managing real-time game state synchronization
- Handles player connections, game state broadcasts, and multiplayer lobbies
- Security: CORS validation, rate limiting (60 req/min), input sanitization, message validation
- Battle Royale: Uses `anyPlayerLobby[]` array + designated host (`anyPlayerHostId`) for game state authority

### Configuration (`public/config.js`)
- **Critical deployment file** - Sets `BACKEND_SERVER` URL for WebSocket connections
- Local dev: `null` or omit (defaults to `localhost:3000`)
- Production: Set to deployed backend domain (e.g., `'asterocks.onrender.com'`)

## Game Modes Implementation

### Battle Royale ("anyplayer" mode)
- Players join `anyPlayerLobby[]` on backend
- First player becomes host (`anyPlayerHostId`) - authoritative for game state (asteroids, UFOs, etc.)
- Host broadcasts `anyplayer_state_update` messages with full game state
- Non-hosts receive state and render locally, send only their ship `state_update`
- Special mechanics: Super Bonuses (15s spawn interval), bombs, heat-seeking missiles
- Player list UI updates dynamically via `anyplayer_players` messages

### Co-op Mode
- 2 players share lives, score, and powerups via WebSocket `powerup_sync` messages
- Powerups transfer between players on death via `powerup_transfer`
- Optional Firebase Firestore sync for resilience (see `.env.example` for config)

### VS Mode (1v1 PvP)
- Direct ship-to-ship combat with `player_hit` messages
- Kill tracking via `vsKills` variable
- Powerups stolen on kill via `powerup_transfer` with `context: 'kill'`

## Development Workflow

### Running Locally
```bash
npm install
npm start          # Starts server on PORT=3000
```
- Server serves `public/` folder as static files
- WebSocket available at `ws://localhost:3000`
- Edit `public/config.js`: Set `BACKEND_SERVER: null` for local dev

### Testing Multiplayer
1. Start server: `npm start`
2. Open multiple browser tabs to `http://localhost:3000`
3. Test mode: Click "Any Player (Battle Royale)" in all tabs to join shared game
4. Check console for WebSocket connection logs: `Player P12345 connected`

### Common Issues
- **Port 3000 in use**: Check for hung processes with `netstat -ano | findstr :3000` (Windows) or `lsof -i :3000` (Unix)
- **WebSocket fails**: Verify `public/config.js` has correct `BACKEND_SERVER` value
- **CORS errors**: Add origin to `ALLOWED_ORIGINS` env var in `.env` (comma-separated)

## Deployment Architecture

### GitHub Pages (Frontend)
- GitHub Actions workflow: `.github/workflows/deploy.yml`
- Auto-deploys `public/` folder on push to `main` branch
- Served at: `https://<username>.github.io/asterocks`
- **Before deploying**: Update `public/config.js` with backend server URL

### Backend Server (Render/Railway/Heroku)
- Deploy `server/server.js` to cloud platform
- Set environment variables:
  - `NODE_ENV=production`
  - `ALLOWED_ORIGINS=<username>.github.io` (match frontend domain)
  - `PORT` (auto-set by most platforms)
- Backend URL format: `wss://<app-name>.onrender.com` (secure WebSocket)

### Deployment Checklist
1. Deploy backend → Get WebSocket URL
2. Edit `public/config.js` → Set `BACKEND_SERVER` to backend domain (no protocol prefix)
3. Push to GitHub → Actions auto-deploys to Pages
4. Visit `https://<username>.github.io/asterocks` to play

## Code Patterns

### Adding New Game Entities
Game entities (asteroids, UFOs, powerups) live in arrays at top of `public/index.html`:
```javascript
const asteroids = [];
const ufos = [];
const bullets = [];
```
Follow existing patterns:
1. Create spawn function (e.g., `spawnUfo()`)
2. Add update loop function (e.g., `updateUfos()`)
3. Add draw function (e.g., `drawUfos()`)
4. Call update/draw in main `gameLoop()`

### WebSocket Message Types
Backend expects messages with `type` field. Common types:
- `state_update` - Player position/velocity (sent every frame in multiplayer)
- `bullet_fired` - Broadcast bullet to other players
- `bomb_dropped` - Broadcast bomb in battle royale
- `anyplayer_state_update` - Host broadcasts full game state
- `powerup_transfer` - Send powerups between players

Add new message types in both:
1. Frontend: WebSocket send in `public/index.html`
2. Backend: Switch case in `server/server.js` `ws.on('message')` handler

### Security Validation
All external inputs must be sanitized in `server/server.js`:
```javascript
const sanitizedState = {
  x: validateNumber(data.state.x, -10000, 10000) || 0,
  y: validateNumber(data.state.y, -10000, 10000) || 0,
  // ...
};
```
Use `sanitizeString()` for text and `validateNumber()` for numeric ranges.

## File Organization

- **Single HTML file**: All frontend code in `public/index.html` (intentional design - no build step)
- **Assets**: Images in `public/assets/` (Atlas.png for sprites, back.png for background)
- **Documentation**: Detailed guides in `docs/` folder
  - `DEPLOYMENT_ARCHITECTURE.md` - System diagrams
  - `GITHUB_PAGES_DEPLOYMENT.md` - Step-by-step deploy guide
  - `SECURITY.md` - Security policies

## Key Variables Reference

### Game State (Frontend)
- `ship` - Player ship object (x, y, angle, velocity, lives, score)
- `gameMode` - Current mode: 'solo', 'coop', 'vs', 'anyplayer'
- `powerups` - Object with active powerup states and timers
- `bullets`, `asteroids`, `ufos`, `bombs` - Entity arrays

### Multiplayer State (Backend)
- `players{}` - Map of connected players by ID
- `anyPlayerLobby[]` - Players in battle royale mode
- `anyPlayerHostId` - Current authoritative host for battle royale
- `anyPlayerGameState` - Cached game state from host

## Mobile Optimization

### Touch Controls
- **Auto-enabled on mobile** - Control panel appears automatically on touch devices or screens ≤820px
- Touch controls include: D-pad (directional buttons), Fire button, Hyperspace button
- Visual feedback: Buttons show `.pressed` class when active
- Draggable panel: Long-press drag handle to reposition controls
- Prevents iOS Safari bounce/scroll when controls are active

### Responsive Breakpoints
- Portrait mobile: `@media (max-width: 720px)` - Larger touch targets (55px buttons)
- Landscape mobile: `@media (max-width: 820px) and (orientation: landscape)` - Compact layout (45px buttons)
- Radar, player list, and key legend scale down on mobile
- All touch targets meet 48x48px minimum (WCAG guidelines)

### Mobile-Specific Features
- Viewport locked: `user-scalable=no` prevents zoom interference
- Touch action: `touch-action: manipulation` for fast tap response
- Context menu disabled on long-press
- Passive event listeners where possible for performance

## Testing

No formal test suite. Manual testing workflow:
1. Run `npm start`
2. Open multiple browser tabs/windows
3. **Desktop**: Test each game mode with keyboard controls (arrow keys + space)
4. **Mobile**: Test with touch controls on phone/tablet (Chrome DevTools device mode)
5. Check browser console for errors
6. Monitor server terminal for WebSocket messages
7. **Mobile testing**: Use Chrome Remote Debugging or Safari Web Inspector for on-device debugging

## Common Tasks

### Change WebSocket Server URL
Edit `public/config.js`:
```javascript
BACKEND_SERVER: 'new-server.onrender.com'
```

### Add New Powerup
1. Add to `powerups` object in `public/index.html`
2. Create spawn logic (e.g., drop from asteroid)
3. Add rendering in `drawPowerups()`
4. Add effect logic in `updateShip()` or `fireBullet()`
5. Add to `powerup_sync` WebSocket message if multi-player

### Modify Rate Limiting
Edit `server/server.js`:
```javascript
const RATE_LIMIT_MAX_REQUESTS = 60; // requests per minute
const wsRateLimit.maxPerSecond = 100; // WebSocket messages per second
```

## Environment Variables

See `.env.example` for full configuration. Key variables:
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - 'development' or 'production'
- `ALLOWED_ORIGINS` - Comma-separated CORS whitelist
- `FIREBASE_*` - Optional Firebase config for co-op sync (rarely used)
