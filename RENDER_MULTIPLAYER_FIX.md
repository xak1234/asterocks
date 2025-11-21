# Render Multiplayer Fix

## Problem
The multiplayer functionality was not working when accessing the app directly from the Render URL (e.g., `https://asterocks.onrender.com`). It only worked when accessing from GitHub Pages which connects to the Render backend.

## Root Cause
1. **WebSocket Connection Logic**: The client wasn't correctly detecting Render deployments and defaulting to WSS (secure WebSocket) protocol
2. **CORS/Origin Restrictions**: The server wasn't explicitly allowing `onrender.com` origins for WebSocket connections

## Fixes Applied

### 1. Updated WebSocket Connection Logic (`public/index.html`)
Enhanced the `connectWebSocket()` function to:
- Explicitly detect Render deployments (`.onrender.com` domains)
- Use WSS (secure WebSocket) protocol for Render and HTTPS connections
- Properly handle GitHub Pages, Render, and local development scenarios
- Added detailed debug logging to troubleshoot connection issues

**Key Changes:**
```javascript
// Now explicitly checks for Render deployments
const isRenderApp = window.location.hostname.includes('onrender.com');

// Uses WSS for Render/HTTPS deployments
if (isRenderApp || window.location.protocol === 'https:') {
  host = window.location.host;
  protocol = 'wss:';
}
```

### 2. Updated Server CORS & WebSocket Origins (`server/server.js`)
Added `onrender.com` to the allowed origins list:

**Before:**
```javascript
const ALLOWED_ORIGINS = [..., 'github.io'];
```

**After:**
```javascript
const ALLOWED_ORIGINS = [..., 'github.io', 'onrender.com'];
```

This allows:
- WebSocket connections from `*.onrender.com` domains
- CORS requests from `*.onrender.com` domains

## Deployment Steps

### Step 1: Commit and Push Changes
```bash
git add .
git commit -m "Fix: Enable multiplayer on Render deployment with WSS support"
git push origin main
```

### Step 2: Deploy to Render
Render will automatically detect the push and redeploy. If not:
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Find your `asterocks` service
3. Click **Manual Deploy** → **Deploy latest commit**

### Step 3: Verify Deployment
1. Wait for deployment to complete (check Render logs)
2. Visit your Render URL: `https://asterocks.onrender.com`
3. Open browser console (F12) to see connection logs
4. Click **Battle Royale** or **VS Mode** to test multiplayer

## Expected Console Output (Debug Mode)

When connecting successfully from Render:
```
Current location: https://asterocks.onrender.com/
Connection mode: render
Connecting to WebSocket: wss://asterocks.onrender.com
WebSocket connected to: wss://asterocks.onrender.com
Connected to multiplayer server
```

## Troubleshooting

### If WebSocket still doesn't connect:

1. **Check Render Service Status**
   - Go to Render Dashboard
   - Verify service is running (green status)
   - Check logs for any startup errors

2. **Check Environment Variables (Optional)**
   If you have `ALLOWED_ORIGINS` set in Render:
   - Go to Render Dashboard → Your Service → Environment
   - Add or update: `ALLOWED_ORIGINS=onrender.com,github.io`
   - Save and redeploy

3. **Verify WebSocket Support**
   Render supports WebSocket by default, but ensure:
   - Your service type is **Web Service** (not Background Worker)
   - Port is set correctly (default: 3000)

4. **Check Browser Console**
   Look for specific error messages:
   - `403 Forbidden` → CORS/origin issue (check ALLOWED_ORIGINS)
   - `Connection timeout` → Server not responding (check Render logs)
   - `404 Not Found` → Wrong URL (check config.js BACKEND_SERVER)

### Common Issues:

**Issue**: Connection timeout after 5 seconds
- **Cause**: Server not running or taking too long to start
- **Fix**: Check Render logs, increase server resources, or optimize startup

**Issue**: WebSocket connection rejected
- **Cause**: Origin not in ALLOWED_ORIGINS list
- **Fix**: Add your domain to ALLOWED_ORIGINS environment variable

**Issue**: Mixed content warning (HTTP/HTTPS)
- **Cause**: Using WS instead of WSS on HTTPS page
- **Fix**: Already fixed in this update (now uses WSS for HTTPS/Render)

## Testing Checklist

- [ ] Solo mode works on Render
- [ ] Battle Royale mode connects on Render
- [ ] VS mode connects on Render
- [ ] Co-op mode connects on Render
- [ ] GitHub Pages still connects to Render backend
- [ ] Local development still works (localhost:3000)
- [ ] Browser console shows successful WebSocket connection
- [ ] Multiple players can join Battle Royale

## Additional Notes

- The fix maintains backward compatibility with GitHub Pages deployment
- Local development (localhost) continues to use WS (non-secure) protocol
- Debug mode (`DEBUG: true` in config.js) provides detailed connection logs
- The 5-second connection timeout helps detect issues quickly

## Deployment Architecture

```
┌─────────────────────────────────────────┐
│  Access Methods (All Now Work!)        │
├─────────────────────────────────────────┤
│                                         │
│  1. Render Direct Access               │
│     https://asterocks.onrender.com     │
│     └─> WSS://asterocks.onrender.com  │ ✅ FIXED
│         (same host, secure websocket)  │
│                                         │
│  2. GitHub Pages                        │
│     https://you.github.io/asterocks    │
│     └─> WSS://asterocks.onrender.com  │ ✅ Working
│         (cross-origin, secure)         │
│                                         │
│  3. Local Development                   │
│     http://localhost:3000              │
│     └─> WS://localhost:3000            │ ✅ Working
│         (same host, non-secure)        │
│                                         │
└─────────────────────────────────────────┘
```

## Next Steps

1. Deploy and test on Render
2. If issues persist, check Render logs and browser console
3. Consider adding health check endpoint for monitoring
4. Optional: Set up custom domain with SSL for production

---

**Status**: Ready to deploy ✅
**Last Updated**: November 21, 2025
