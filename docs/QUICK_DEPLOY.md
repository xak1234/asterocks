# Quick Deployment Checklist

## ✅ Pre-Deployment Checklist

- [ ] Code is committed to GitHub repository
- [ ] `package.json` has all dependencies listed
- [ ] `.env.example` exists with all required variables
- [ ] No sensitive data in repository (secrets in .env only)

## 🚀 Step 1: Deploy Backend Server

### Option A: Render.com (Recommended)

1. Sign up at https://render.com
2. Click "New +" → "Web Service"
3. Connect GitHub repository: `asterocks`
4. Configure:
   ```
   Name: asterocks-server
   Environment: Node
   Build Command: npm install
   Start Command: node server/server.js
   Instance Type: Free
   ```
5. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=10000
   ALLOWED_ORIGINS=yourusername.github.io,localhost:3000
   ```
6. Click "Create Web Service"
7. **Copy your backend URL**: `https://asterocks-server.onrender.com`

### Option B: Railway.app

1. Sign up at https://railway.app
2. "New Project" → "Deploy from GitHub repo"
3. Select `asterocks` repository
4. Add environment variables:
   ```
   NODE_ENV=production
   ALLOWED_ORIGINS=yourusername.github.io
   ```
5. **Copy your backend URL**

## 🎨 Step 2: Configure Frontend

Edit `public/config.js`:

```javascript
window.ASTEROCKS_CONFIG = {
  BACKEND_SERVER: 'asterocks-server.onrender.com', // Replace with YOUR backend URL (no protocol)
  DEBUG: false
};
```

**Important**: 
- Do NOT include `https://` or `wss://` in the URL
- Just the hostname (e.g., `asterocks-server.onrender.com`)

## 🌐 Step 3: Enable GitHub Pages

### Automatic (Recommended)

1. Go to repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: **GitHub Actions**
4. Commit and push your changes
5. GitHub Actions will auto-deploy

### Manual

1. Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: `main`
4. Folder: `/public`
5. Save

## 🧪 Step 4: Test Deployment

1. Wait for deployments to complete (check Render dashboard and GitHub Actions tab)
2. Visit your GitHub Pages URL: `https://yourusername.github.io/asterocks`
3. Check browser console (F12) for connection status
4. Open in multiple tabs or share with friends to test multiplayer

## 🐛 Troubleshooting

### "Connection error - Playing solo"

**Check**:
- [ ] Backend server is running (visit Render dashboard)
- [ ] `config.js` has correct backend URL
- [ ] CORS origins include your GitHub Pages domain
- [ ] Browser console for detailed errors

**Fix**:
```bash
# Update Render environment variable
ALLOWED_ORIGINS=yourusername.github.io,localhost:3000,127.0.0.1:3000
```

### Mixed Content Error

**Problem**: GitHub Pages uses HTTPS, WebSocket must use WSS

**Fix**: The code automatically uses `wss://` for HTTPS sites. Ensure your backend server has HTTPS enabled (Render provides this automatically).

### Render Free Tier "Sleep"

**Problem**: Free tier sleeps after 15 minutes inactivity

**Solutions**:
1. Use [UptimeRobot](https://uptimerobot.com/) to ping server every 5 minutes
2. Accept ~30 second wake-up delay on first connect
3. Upgrade to paid tier ($7/month) for always-on

## 📝 Quick Commands

### Local Testing
```bash
npm install
npm start
# Visit http://localhost:3000
```

### Check Deployment Status
```bash
# Backend logs (if using Railway CLI)
railway logs

# Or visit Render dashboard for logs
```

### Update Deployment
```bash
git add .
git commit -m "Update game"
git push origin main
# Both frontend and backend auto-deploy
```

## 🔗 Your Deployment URLs

Fill in after deployment:

- **Frontend (GitHub Pages)**: `https://____________.github.io/asterocks`
- **Backend (Render/Railway)**: `https://____________.onrender.com`

## 🎮 Share Your Game

Once deployed, share your GitHub Pages URL with friends:

```
Play Asterocks Battle Royale:
https://yourusername.github.io/asterocks

Join me and battle it out in space!
```

## 💰 Cost Summary

- GitHub Pages: **$0/month**
- Render Free Tier: **$0/month** (with sleep)
- Railway: **$5 free credit/month**

**Total: $0-5/month**

## 🆘 Need Help?

1. Check [docs/GITHUB_PAGES_DEPLOYMENT.md](GITHUB_PAGES_DEPLOYMENT.md) for detailed guide
2. Review browser console and server logs for errors
3. Test locally first: `npm start`
4. Open GitHub issue with error details

## ✨ Optional: Custom Domain

### Frontend (GitHub Pages)
1. Settings → Pages → Custom domain
2. Add your domain
3. Configure DNS: CNAME → `yourusername.github.io`

### Backend (Render)
1. Render Dashboard → Settings → Custom Domains
2. Add domain
3. Configure DNS: CNAME → `asterocks-server.onrender.com`
4. Update `config.js` with new domain

---

**Ready to deploy?** Start with Step 1! 🚀
