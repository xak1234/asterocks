# Battle Royale Setup Instructions

## What Was Fixed

The game was trying to connect to a remote server (`asterocks.onrender.com`) that wasn't available. This has been fixed:

✅ **Config updated** - Now defaults to localhost:3000 for local development
✅ **Fallback enabled** - Game gracefully falls back to offline mode if server unavailable
✅ **Connection timeout** - Server has 3-second timeout before falling back

## Option 1: Play Battle Royale OFFLINE (Recommended for Testing)

**No server needed!** The game now supports local-only Battle Royale mode.

1. Refresh your browser
2. Click "Battle Royale" button
3. Play against AI asteroids in offline mode

The game will:
- Generate random enemy positions
- Spawn asteroids and powerups
- Work completely offline
- No multiplayer features (just you vs asteroids)

## Option 2: Play Battle Royale with Local Server (Full Multiplayer)

If you want to enable multiplayer Battle Royale:

### Step 1: Install Node.js
- Download from: https://nodejs.org/ (LTS version)
- Install it completely

### Step 2: Install Dependencies
```bash
cd C:\TEMP\asterocks
npm install
```

### Step 3: Start the Server
```bash
npm start
```

You should see:
```
Server running on port 3000 with WebSocket support
```

### Step 4: Open the Game
- Go to http://localhost:3000 in your browser
- Click "Battle Royale"
- Now you can play with multiple players (open in another browser window/tab)

## What Works Now

### Offline Mode (No Server)
✅ Solo mode
✅ Battle Royale (single player)
✅ All asteroids and powerups
✅ All weapons and shields

### Online Mode (With Server)
✅ All offline features PLUS:
✅ Multiplayer Battle Royale
✅ Co-op mode
✅ VS mode (1v1 PvP)
✅ Multi-player scoring

## Configuration File

The configuration has been updated in `public/config.js`:

```javascript
window.ASTEROCKS_CONFIG = {
  BACKEND_SERVER: null,  // null = use localhost:3000
  DEBUG: true            // Shows connection details in console
};
```

- Set `BACKEND_SERVER: null` for local development
- Set `BACKEND_SERVER: 'your-domain.com'` for production deployment
- Set `DEBUG: true` to see connection logs in console (F12)

## Testing

### Verify Setup
1. Open game in browser
2. Open console (F12)
3. Look for: `[FPS: 60.0] Game is running smoothly`
4. For server status, look for WebSocket connection messages

### If Connection Failed
```
"Using local development server: localhost:3000"
"WebSocket connection timeout - falling back to offline mode"
```

This means server isn't running, but game still works in offline mode!

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Battle Royale not starting | Try refresh (Ctrl+R), or check if server is running |
| "Connection error" message | Server not running - play offline mode |
| FPS drops | Close other browser tabs, reduce screen resolution |
| No asteroids visible | Give it 2 seconds to spawn, or press arrow keys |
| Sound not working | Click 🔊 button, or user must interact with page first |

## Quick Test

Try this to verify everything works:

```bash
# Terminal 1: Start the server
cd C:\TEMP\asterocks
npm start

# Terminal 2: Open game (will connect automatically)
Start-Process "http://localhost:3000"

# Click "Battle Royale"
# You should see asteroids and enemies!
```

---

**Version**: Fixed November 21, 2025
**Status**: ✅ Ready to play
