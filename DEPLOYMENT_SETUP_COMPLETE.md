# 🎮 Asterocks Battle Royale - GitHub Pages Setup Complete! 

## ✅ What Was Set Up

Your Asterocks multiplayer battle royale game is now ready to be deployed to GitHub Pages with a free backend server!

### Files Created/Modified

#### 1. **GitHub Actions Workflow** (`.github/workflows/deploy.yml`)
   - Automatically deploys frontend to GitHub Pages when you push to `main`
   - No manual deployment needed!

#### 2. **Configuration File** (`public/config.js`)
   - Easy-to-edit backend server URL
   - Switch between local development and production
   - Debug mode for troubleshooting

#### 3. **Updated Frontend** (`public/index.html`)
   - Smart WebSocket connection that adapts to environment
   - Works locally AND on GitHub Pages
   - Automatic protocol selection (ws:// or wss://)

#### 4. **Updated Backend** (`server/server.js`)
   - CORS configuration includes GitHub Pages domains
   - Ready for deployment to Render, Railway, or Heroku

#### 5. **Documentation**
   - `docs/GITHUB_PAGES_DEPLOYMENT.md` - Comprehensive deployment guide
   - `docs/QUICK_DEPLOY.md` - Quick checklist and troubleshooting
   - `README.md` - Updated with deployment instructions

#### 6. **Environment Configuration** (`.env.example`)
   - Updated with GitHub Pages CORS examples
   - Ready to be copied for production use

## 🚀 Next Steps - How to Deploy

### Quick Start (5 Minutes)

1. **Deploy Backend to Render** (Free)
   - Go to https://render.com
   - Create account
   - New Web Service → Connect your GitHub repo
   - Settings:
     ```
     Build: npm install
     Start: node server/server.js
     Environment Variables:
       NODE_ENV=production
       ALLOWED_ORIGINS=yourusername.github.io
     ```
   - Copy your backend URL: `asterocks-server.onrender.com`

2. **Configure Frontend**
   - Edit `public/config.js`
   - Change `BACKEND_SERVER: null` to:
     ```javascript
     BACKEND_SERVER: 'asterocks-server.onrender.com'
     ```
   - Commit and push changes

3. **Enable GitHub Pages**
   - GitHub repo → Settings → Pages
   - Source: **GitHub Actions**
   - Push to main branch triggers automatic deployment

4. **Play!**
   - Visit: `https://yourusername.github.io/asterocks`
   - Share with friends!

## 📖 Detailed Guides

- **First Time Setup**: Read `docs/QUICK_DEPLOY.md`
- **Full Documentation**: Read `docs/GITHUB_PAGES_DEPLOYMENT.md`
- **Troubleshooting**: Check console logs and review guides

## 🎯 What You Get

### Free Hosting
- ✅ Frontend on GitHub Pages (100% free, fast CDN)
- ✅ Backend on Render/Railway (free tier available)
- ✅ Automatic SSL/HTTPS
- ✅ Automatic deployments on git push

### Battle Royale Features
- ✅ Multiple players can join same game
- ✅ Real-time multiplayer with WebSockets
- ✅ Anyplayer/battle royale mode
- ✅ Co-op and VS modes
- ✅ Solo play with AI

## 🔧 Configuration Options

### Local Development
```javascript
// public/config.js
BACKEND_SERVER: null  // Uses localhost:3000
```

### Production (GitHub Pages)
```javascript
// public/config.js
BACKEND_SERVER: 'asterocks-server.onrender.com'
```

### Debug Mode
```javascript
// public/config.js
DEBUG: true  // Shows connection details in console
```

## 🐛 Common Issues & Fixes

### Issue: "Connection error - Playing solo"
**Cause**: Can't connect to backend server  
**Fix**: 
1. Check backend server is running (Render dashboard)
2. Verify `config.js` has correct URL
3. Check CORS settings include your GitHub Pages domain

### Issue: "Mixed Content" Warning
**Cause**: HTTP backend on HTTPS site  
**Fix**: Render automatically provides HTTPS. Code auto-uses wss://

### Issue: Backend "sleeps" after 15 minutes
**Cause**: Render free tier sleeps when inactive  
**Fix**: 
- Use UptimeRobot.com to ping every 5 min (free)
- Or accept ~30 second wake time on first connection

## 📁 Project Structure

```
asterocks/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← GitHub Actions (auto-deploy)
├── public/
│   ├── index.html             ← Game (updated for deployment)
│   ├── config.js              ← Backend URL configuration
│   ├── .nojekyll              ← GitHub Pages config
│   └── assets/
├── server/
│   └── server.js              ← WebSocket server (deploy to Render)
├── docs/
│   ├── GITHUB_PAGES_DEPLOYMENT.md  ← Full guide
│   ├── QUICK_DEPLOY.md        ← Quick checklist
│   └── ...
├── .env.example               ← Environment config template
├── package.json
└── README.md                  ← Updated with deploy info
```

## 🎮 How Multiplayer Works

1. **Frontend** (GitHub Pages) serves the game HTML/CSS/JS
2. **Backend** (Render) runs Node.js WebSocket server
3. Players connect via WebSocket from browser
4. Server synchronizes game state between all players
5. Battle royale mode supports many players simultaneously

## 💡 Tips

### Testing Locally First
```bash
npm install
npm start
# Visit http://localhost:3000
# Test multiplayer in multiple tabs
```

### Checking Deployment Status
- **Frontend**: GitHub repo → Actions tab
- **Backend**: Render dashboard → Logs

### Updating After Deployment
```bash
# Make changes
git add .
git commit -m "Update game"
git push origin main
# Both deploy automatically!
```

## 🌟 Features You Can Now Use

- **Battle Royale Mode**: Anyone can join, last player standing
- **Multiplayer Sync**: Real-time game state across all players
- **Power-ups**: Shared in co-op, competitive in battle royale
- **Bombs**: Drop bombs to destroy other players
- **Heat-seeking Missiles**: Lock onto enemy ships
- **UFO Enemies**: AI-controlled enemies
- **Shooting Stars**: Rare bonus collectibles

## 📞 Need Help?

1. **Check the guides**:
   - `docs/QUICK_DEPLOY.md` for quick fixes
   - `docs/GITHUB_PAGES_DEPLOYMENT.md` for detailed setup

2. **Console Logs**:
   - Browser: Press F12 → Console tab
   - Backend: Render dashboard → Logs

3. **Test Locally**:
   - Run `npm start` and test at localhost:3000
   - Fix issues before deploying

## 🎉 Ready to Go!

Your game is now configured for deployment. Follow the "Next Steps" above to get it live on the internet!

### Quick Checklist
- [ ] Deploy backend to Render
- [ ] Update `config.js` with backend URL
- [ ] Enable GitHub Pages (Actions)
- [ ] Test the deployment
- [ ] Share with friends!

### After Deployment
- **Your game URL**: `https://yourusername.github.io/asterocks`
- **Backend server**: `https://asterocks-server.onrender.com`

Good luck, and have fun! 🚀👾

---

**Questions?** Check the documentation in the `docs/` folder or review the inline code comments.
