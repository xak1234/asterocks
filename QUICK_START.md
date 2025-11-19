# Quick Reference Guide

## Starting the Project

### Quick Start
```bash
cd c:\TEMP\asterocks
npm install
npm start
```
Then open: `http://localhost:3000`

## Project Structure at a Glance

```
📦 asterocks/
├── 📁 public/          ← Served to browser (HTML, images)
│   ├── index.html      ← Game page
│   └── 📁 assets/      ← Images
├── 📁 server/          ← Backend logic
│   ├── server.js       ← Main server (Node.js)
│   └── server.py       ← Alternative (Python)
├── 📁 src/             ← Components
│   └── Button.tsx      ← React button
├── 📁 config/          ← Settings
│   └── environment.js  ← Configuration
├── 📁 docs/            ← Documentation
│   ├── README.md       ← Full guide
│   ├── SECURITY.md     ← Security info
│   ├── DEPLOYMENT.md   ← How to deploy
│   └── AUDIT_SUMMARY.md ← This audit
├── .env                ← Local settings (dev)
├── .env.example        ← Template
└── package.json        ← Dependencies
```

## Key Security Improvements

| Issue | Fix | Status |
|-------|-----|--------|
| Open CORS | Origin whitelist | ✅ Fixed |
| No CSP header | Added security headers | ✅ Fixed |
| XSS in tables | Use textContent | ✅ Fixed |
| Weak validation | Type checking added | ✅ Fixed |
| WebSocket unvalidated | Size/type limits | ✅ Fixed |
| Error leaks | Generic messages | ✅ Fixed |
| No config system | environment.js | ✅ Added |
| Files scattered | Organized folders | ✅ Fixed |

## Running Commands

```bash
# Start development server
npm start

# Install dependencies
npm install

# Alternative start (same as npm start)
npm run dev

# Build/update deps
npm run build

# Check dependencies for vulnerabilities
npm audit

# Fix minor vulnerabilities
npm audit fix
```

## Environment Variables

Create/edit `.env` file:
```bash
PORT=3000                                    # Server port
NODE_ENV=development                         # Or 'production'
ALLOWED_ORIGINS=localhost:3000,127.0.0.1   # CORS whitelist
```

## API Endpoints

- `GET /` - Serves index.html (game)
- `GET /api/test` - Health check
- `WS ws://localhost:3000` - WebSocket for multiplayer

## File Locations for Common Tasks

### Want to modify the game?
→ Edit: `public/index.html`

### Want to change server code?
→ Edit: `server/server.js` or `server/server.py`

### Want to customize settings?
→ Edit: `.env` or `config/environment.js`

### Want to check security issues?
→ Read: `docs/SECURITY.md`

### Want to deploy?
→ Read: `docs/DEPLOYMENT.md`

## Common Issues & Solutions

### "Cannot find module"
```bash
npm install
```

### Port already in use
```bash
# Set different port
PORT=8000 npm start
```

### Server won't start
- Check Node.js version: `node --version` (need 20.x)
- Check error message in terminal
- Try: `npm install --production`

### CORS errors in browser
- Edit `.env` - add your domain to `ALLOWED_ORIGINS`
- Example: `ALLOWED_ORIGINS=localhost:3000,example.com`

### Can't connect to WebSocket
- Check firewall allows WebSocket (port 3000)
- Verify `ALLOWED_ORIGINS` includes your domain
- Check browser console for errors

## Deployment Checklist

- [ ] Copy `.env.example` to `.env` on server
- [ ] Set `NODE_ENV=production`
- [ ] Update `ALLOWED_ORIGINS` for your domain
- [ ] Enable HTTPS/SSL
- [ ] Run `npm install --production`
- [ ] Use process manager (PM2 or similar)
- [ ] Set up monitoring
- [ ] Test all endpoints
- [ ] Check logs for errors

## Security Quick Tips

1. **Keep .env secret** - Never commit to git
2. **Use HTTPS** - Always in production
3. **Update dependencies** - Run `npm audit` monthly
4. **Monitor logs** - Check for suspicious activity
5. **Validate input** - App does this automatically
6. **Rate limit requests** - Built-in protection
7. **Use strong origins** - Restrict CORS carefully
8. **Enable CSP** - Security headers included

## Testing the Game

1. Open browser: `http://localhost:3000`
2. Choose game mode (Solo, Co-op, VS, Battle Royale)
3. Use Arrow Keys to move, Space to shoot
4. Press P to pause
5. Try multiplayer on two browser windows

## Getting Help

1. **Server won't start?** → Check terminal for error
2. **Game won't load?** → Check browser console (F12)
3. **WebSocket fails?** → Check CORS settings
4. **Data not updating?** → Check API endpoints
5. **Security questions?** → Read `docs/SECURITY.md`
6. **Deployment issues?** → Check `docs/DEPLOYMENT.md`

## Documentation Map

```
docs/
├── README.md              ← Main project guide
├── MULTIPLAYER_README.md  ← Multiplayer features
├── SECURITY.md            ← Security details
├── DEPLOYMENT.md          ← How to deploy
└── AUDIT_SUMMARY.md       ← This security audit
```

## What Changed?

### Moved Files (Same Code!)
```
index.html         → public/index.html
Button.tsx         → src/Button.tsx
Atlas.png          → public/assets/Atlas.png
back.png           → public/assets/back.png
server.js          → server/server.js
server.py          → server/server.py
README.md          → docs/README.md
```

### Updated Code (Better Security!)
- `server.js` - Added CORS validation, input sanitization
- `index.html` - Fixed XSS vulnerabilities
- `package.json` - Updated paths

### New Files (Better Organization!)
- `.env` - Development configuration
- `.env.example` - Configuration template
- `.gitignore` - Git ignore rules
- `config/environment.js` - Centralized settings
- `docs/SECURITY.md` - Security documentation
- `docs/DEPLOYMENT.md` - Deployment guide
- `docs/AUDIT_SUMMARY.md` - This audit

## Version Info

- **Project**: Asterocks v1.0.0
- **Last Updated**: November 2025
- **Node.js**: v20.x required
- **Status**: ✅ Secure & Ready for Production

---

**Quick Links**
- 🚀 Start: `npm start`
- 📖 Docs: `docs/` folder
- 🔒 Security: `docs/SECURITY.md`
- 🌐 Deploy: `docs/DEPLOYMENT.md`
