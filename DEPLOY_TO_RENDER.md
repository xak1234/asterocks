# Quick Deploy to Render

## Deploy These Changes Now

```bash
# 1. Commit the fixes
git add .
git commit -m "Fix: Enable multiplayer on Render with WSS protocol and onrender.com origins"

# 2. Push to GitHub
git push origin main
```

## Render Will Auto-Deploy

Render automatically deploys when you push to your main branch. Watch the deployment:

1. Go to: https://dashboard.render.com/
2. Select your service
3. Check **Events** tab to see deployment progress
4. Wait for "Deploy succeeded" message (usually 1-3 minutes)

## Test Your Deployment

1. **Open your Render URL**: `https://asterocks.onrender.com` (or your custom URL)

2. **Open Browser Console** (F12) - you should see:
   ```
   Connection mode: render
   Connecting to WebSocket: wss://asterocks.onrender.com
   WebSocket connected to: wss://asterocks.onrender.com
   Connected to multiplayer server
   ```

3. **Test Multiplayer**:
   - Click **Battle Royale** button
   - Open in another browser/tab
   - Join Battle Royale in the second window
   - Both players should see each other!

## What Was Fixed?

✅ WebSocket now uses **WSS** (secure) protocol for Render
✅ Server now accepts connections from **onrender.com** origins  
✅ Client properly detects Render deployment
✅ Maintains compatibility with GitHub Pages and localhost

## If It Still Doesn't Work

### Check Render Logs:
1. Render Dashboard → Your Service → Logs
2. Look for:
   - "Server running on port 3000 with WebSocket support" ✅
   - Any error messages ❌

### Check Browser Console:
- Any error messages?
- Does it show "Connection timeout"?
- Does it show "403 Forbidden"?

### Quick Fix - Set Environment Variable:
In Render Dashboard → Your Service → Environment, add:
```
ALLOWED_ORIGINS=onrender.com,github.io
```
Then click "Save Changes" (will redeploy automatically)

---

**Ready?** Run the git commands above to deploy! 🚀
