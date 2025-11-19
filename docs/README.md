# Asterocks - Multiplayer Asteroid Game

![ASTEROCKS](Atlas.png)

A fun, fast-paced multiplayer asteroid game with multiple game modes and real-time WebSocket gameplay.

## Overview
Interactive multiplayer asteroid shooting game with real-time synchronization. Play solo against AI asteroids, team up with friends in co-op mode, compete in player-vs-player combat, or battle it out in battle royale mode.

## 🎮 Project Features

Our game delivers:

- **Multiple game modes** - Solo, Co-op, VS, Battle Royale
- **Real-time multiplayer** - Play with friends via WebSocket
- **Smooth controls** - Arrow keys to move, space to shoot
- **Sound effects** - Toggle audio feedback
- **Pause functionality** - Pause your game anytime
- **Responsive design** - Playable on desktop browsers

## 🔬 Game Design

### Why This Game?
Asterocks is a classic arcade-style game reimagined with modern web technologies:
- **Nostalgic gameplay** - Inspired by the 1979 arcade classic
- **Modern features** - WebSocket multiplayer and responsive design
- **Educational value** - Great example of real-time game synchronization
- **Fast-paced action** - Quick rounds and engaging mechanics
- **Skill-based combat** - Timing, positioning, and strategy matter

## 🎮 Game Mechanics

The asteroid game features:
- **Player-controlled ship** with smooth movement and rotation
- **Bullet firing system** with multiple shots on screen
- **Asteroids** that spawn periodically and break into smaller pieces
- **AI opponents** (in solo mode) that target and shoot
- **Collision detection** between ship, asteroids, and bullets
- **Score tracking** and game state persistence
- **Multiple game modes** with different mechanics
- **Sound effects and visual feedback** for actions
- **Hyperspace jumps** for emergency evasion
- **Particle effects** for explosions

### Security & Performance
- **Rate limiting** (60 requests/minute per IP)
- **Input validation** for all external data
- **XSS protection** with safe DOM manipulation
- **Security headers** (X-Frame-Options, CSP, etc.)
- **Data sanitization** for scraped content
- **Error handling** with graceful degradation

## 🚀 Technology Stack

### Frontend
- Vanilla JavaScript with Canvas API
- Real-time game rendering
- WebSocket client for multiplayer sync
- Responsive CSS Grid layout
- HTML5 Audio for sound effects

### Backend
- Node.js with Express.js
- WebSocket support via `ws` library
- CORS middleware for cross-origin requests
- In-memory game state management
- Optional Python server alternative

## � Setup & Installation

### Prerequisites
- Node.js 20+ (for native fetch support)
- npm or yarn

### Installation
```bash
npm install
```

### Run Development Server
```bash
npm start
```

Server runs on `http://localhost:3000` (or PORT environment variable)

### Environment Variables
```bash
PORT=3000                                    # Server port
NODE_ENV=development                         # Or 'production'
ALLOWED_ORIGINS=localhost:3000,127.0.0.1   # CORS whitelist
```

## 📡 API Endpoints

### `/` (GET)
Serves the game page (index.html)

### `/api/test` (GET)
Health check endpoint - returns server status

### WebSocket Connection
Connect via `ws://localhost:3000` for real-time multiplayer game state synchronization

## 🎯 Game Mechanics

The background asteroid game features:
- **AI-controlled ship** that tracks and destroys asteroids
- **Autonomous targeting** system with smooth rotation
- **Bullet firing** when locked onto targets
- **Large asteroids** (80-120px) entering periodically
- **UFO encounters** that fire at the ship
- **Hyperspace jumps** activated in dangerous situations (8s cooldown)
- **Collision detection** between ship and large asteroids
- **3-second respawn** after ship destruction
- **Particle effects** for explosions and hyperspace

## 🛡️ Security Features

- Rate limiting (60 req/min per IP)
- Input validation (magnitude: 0-30, distance: < 1 trillion km)
- XSS protection via `textContent` instead of `innerHTML`
- Security headers (X-Frame-Options, X-XSS-Protection, etc.)
- JSON payload size limits (10KB)
- Error boundary handling
- Data type coercion and sanitization

## 📈 Performance

- **WebSocket messaging**: Real-time player position and state updates
- **Game loop**: 60 FPS via requestAnimationFrame
- **Canvas rendering**: Optimized 2D drawing
- **Player synchronization**: Low-latency peer updates
- **Network efficiency**: Minimal payload sizes for fast transmission

## 🌐 Deployment

Designed for cloud deployment with:
- Static file serving from public/ directory
- WebSocket support for multiplayer
- CORS enabled for cross-origin access
- Environment-based configuration
- Automatic HTTPS on production (recommended)

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 📝 License

MIT License - Feel free to use for scientific research and education

## 🤝 Contributing

Contributions welcome for:
- New game modes and features
- Performance improvements
- Bug fixes
- Enhanced graphics and sound
- Multiplayer stability improvements

## 📞 Contact

For feature requests or technical inquiries, please open an issue on GitHub.

---

**Note**: This is a multiplayer arcade-style game built with web technologies. Enjoy!
