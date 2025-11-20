# Asterocks - Multiplayer Asteroid Game

A fast-paced multiplayer asteroid game with solo, co-op, versus, and **battle royale** game modes. Compete against AI and other players in real-time action-packed gameplay.

> **🎮 Want to play on GitHub Pages?** This game is **ready to deploy** with free hosting!  
> See [Quick Deploy Guide](#-deployment) below or jump to [docs/QUICK_DEPLOY.md](docs/QUICK_DEPLOY.md)

## 🚀 Quick Start (Local)

```bash
npm install
npm start
```

Server runs on `http://localhost:3000`

## 🌐 Play Online (Deploy to GitHub Pages)

**Free hosting in 3 steps:**

1. **Deploy backend** to [Render.com](https://render.com) (free tier)
2. **Edit** `public/config.js` with your backend URL
3. **Enable** GitHub Pages in repo Settings

📖 **Detailed guide**: [docs/QUICK_DEPLOY.md](docs/QUICK_DEPLOY.md)

## 📁 Project Structure

```
asterocks/
├── public/                 # Static assets (HTML, images)
│   ├── index.html         # Main game page
│   └── assets/            # Images (Atlas.png, back.png)
├── server/                # Backend code
│   ├── server.js          # Express + WebSocket server
│   └── server.py          # Alternative Python server
├── src/                   # Frontend components
│   └── Button.tsx         # React button component
├── docs/                  # Documentation
│   ├── README.md          # Original project README
│   ├── MULTIPLAYER_README.md
│   └── SECURITY.md        # Security policy & guidelines
├── config/                # Configuration files
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore rules
├── package.json           # Dependencies & scripts
└── package-lock.json      # Locked dependency versions
```

## 🎮 Features

### Gameplay Modes
- **Solo Mode** - Battle against AI asteroids and UFOs
- **Co-op Mode** - Team up with another player to survive together
- **VS Mode** - 1v1 Player vs Player combat
- **Battle Royale** - Join any player's game dynamically with multiple opponents

## ☁️ Firebase Sync

Co-op and VS games now mirror their critical state through Firebase Firestore in addition to WebSockets. Each two-player match writes to `matches/{mode}_{playerA}_{playerB}` with per-player snapshots so:

- Ship position/velocity, score, lives, kills/deaths, and thrust state stay in sync if a WebSocket hiccups.
- Co-op power-ups merge in the cloud, ensuring both players keep shared upgrades even if one drops temporarily.
- Presence documents are removed when players leave or close the tab to keep sessions tidy.

To enable cloud sync, keep the Firebase keys in `.env` (see `.env.example`) and configure Firestore security rules so your client (ideally via authenticated access) can read/write the `matches` collection from the allowed web origin.

## 🔒 Security

This project includes comprehensive security hardening:

- **CORS validation** - Restricted origin access
- **Input sanitization** - XSS and injection prevention
- **Rate limiting** - API abuse protection
- **Security headers** - Content-Security-Policy, X-Frame-Options, etc.
- **WebSocket validation** - Message type and size limits

See [`docs/SECURITY.md`](docs/SECURITY.md) for detailed security documentation.

## 📖 Documentation

- **[README.md](docs/README.md)** - Full project overview and features
- **[MULTIPLAYER_README.md](docs/MULTIPLAYER_README.md)** - Multiplayer game modes
- **[SECURITY.md](docs/SECURITY.md)** - Security policy and best practices

## 🛠️ Development

### Available Scripts

```bash
npm start      # Start server (Node.js)
npm run dev    # Development mode
npm run build  # Install dependencies
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
PORT=3000
NODE_ENV=development
ALLOWED_ORIGINS=localhost:3000,localhost:5173,127.0.0.1:3000
REFRESH_INTERVAL_HOURS=6
```

## 🚀 Deployment

### GitHub Pages + Free Backend Server

Deploy the battle royale game with frontend on GitHub Pages and backend on a free hosting service:

**Quick Deploy:**
1. **Deploy Backend** to [Render](https://render.com) or [Railway](https://railway.app) (free tier)
   - Create new Web Service from this repository
   - Set environment: `NODE_ENV=production`, `ALLOWED_ORIGINS=yourusername.github.io`
   - Note your backend URL (e.g., `asterocks-server.onrender.com`)

2. **Configure Frontend** - Edit `public/config.js`:
   ```javascript
   BACKEND_SERVER: 'asterocks-server.onrender.com' // Your backend URL
   ```

3. **Enable GitHub Pages** in repository Settings → Pages:
   - Source: GitHub Actions (auto-deploys on push)
   
4. **Play!** Visit `https://yourusername.github.io/asterocks`

📋 **Detailed Guide**: See [docs/GITHUB_PAGES_DEPLOYMENT.md](docs/GITHUB_PAGES_DEPLOYMENT.md)

### Alternative Deployment Options

The application also supports deployment on:
- **Render** - Full-stack deployment
- **Heroku** - Traditional platform
- **Docker** - Containerized deployment
- **VPS** - Self-hosted

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for detailed instructions

## 📊 API Endpoints

- `GET /api/latest` - Latest comet magnitude data
- `GET /api/distance` - Current distance to Earth (km)
- `GET /api/test` - Server health check
- `WS ws://localhost:3000` - WebSocket for multiplayer

## 🎯 Technology Stack

- **Frontend**: Vanilla JavaScript, HTML5 Canvas, WebSocket
- **Backend**: Node.js, Express.js, WebSocket (ws library)
- **Data Sources**: COBS, TheSkyLive API
- **Web Scraping**: Cheerio

## 📜 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please ensure all security guidelines in [`docs/SECURITY.md`](docs/SECURITY.md) are followed.

## 📞 Support

For issues, questions, or security concerns, please open an issue on GitHub.

---

**Last Updated**: November 2025
