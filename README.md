# Asterocks - Multiplayer Asteroid Game

A fast-paced multiplayer asteroid game with solo, co-op, versus, and battle royale game modes. Compete against AI and other players in real-time action-packed gameplay.

## 🚀 Quick Start

```bash
npm install
npm start
```

Server runs on `http://localhost:3000`

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

The application is configured for deployment on platforms like Render:

1. Set environment variables in deployment platform
2. Point to `server/server.js` as main entry point
3. Keep `public/` directory for static files
4. WebSocket support enabled automatically

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
