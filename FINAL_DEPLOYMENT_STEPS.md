# 🚀 Final Deployment Steps for asterocks

## ✅ Configuration Complete!

Your game is configured to use: **`https://asterocks.onrender.com`**

## 🔧 Update Render Environment Variables

Go to your Render dashboard and update the environment variables:

1. Open https://dashboard.render.com
2. Select your `asterocks` service
3. Go to **Environment** tab
4. Update `ALLOWED_ORIGINS` to:
   ```
   xak1234.github.io,localhost:3000,localhost:5173,127.0.0.1:3000
   ```
5. Click **Save Changes**
6. Render will automatically redeploy (takes ~2 minutes)

## 📤 Deploy to GitHub Pages

Now push your changes:

```bash
git add .
git commit -m "Configure for GitHub Pages with Render backend"
git push origin main
```

## 🎮 Enable GitHub Pages

1. Go to https://github.com/xak1234/asterocks
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: **GitHub Actions**
4. Wait ~30 seconds for deployment

## 🌐 Your Game URLs

**Frontend (Players visit):**
```
https://xak1234.github.io/asterocks
```

**Backend (Server):**
```
https://asterocks.onrender.com
```

## ✅ Test Your Deployment

1. Visit https://xak1234.github.io/asterocks
2. Check browser console (F12) for connection status
3. Should see: "WebSocket connected to: wss://asterocks.onrender.com"
4. Open in multiple tabs to test multiplayer
5. Share link with friends!

## 🎯 Battle Royale Mode

To play battle royale with friends:
1. Click "Join AnyPlayer/Battle Royale" button
2. Share your game URL with friends
3. Friends click the same button
4. You'll all join the same game automatically!

## 🐛 Troubleshooting

**If connection fails:**
1. Check Render dashboard - ensure service is running
2. Verify ALLOWED_ORIGINS includes `xak1234.github.io`
3. Check browser console for error messages
4. Try refreshing the page

**Render free tier notes:**
- Server sleeps after 15 minutes of inactivity
- Takes ~30 seconds to wake up on first connection
- Use UptimeRobot.com (free) to keep it awake

## 🎉 You're Done!

Your game is now live and ready to play online!

Share this URL with friends:
```
https://xak1234.github.io/asterocks
```
