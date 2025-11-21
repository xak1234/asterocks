# Asterocks - Quick Start Guide

## What Was Fixed
Your game was experiencing a "frozen" appearance when starting. This has been fixed by:
1. **Faster moving asteroids** - Asteroids now move 2x faster initially
2. **Immediate huge asteroid** - A large asteroid spawns right away for visual feedback
3. **Better error handling** - Game continues running even if errors occur
4. **Performance monitoring** - You can see FPS in the console

## How to Play

### Starting the Game
1. Open `public/index.html` in your web browser
2. Click the **"Play Solo"** button
3. You should immediately see asteroids moving around and a large asteroid flying across the screen

### Controls
```
← / → Arrow Keys   : Rotate your ship
↑ Arrow Key        : Thrust / Accelerate
↓ Arrow Key        : Brake / Reverse
Space              : Fire bullets
S Key              : Launch heat-seeking missiles (multiplayer modes)
B Key              : Drop bombs (battle royale mode)
H Key              : Hyperspace jump (emergency escape)
P Key              : Pause the game
```

### Game Modes
- **Solo**: Play alone against asteroids
- **Co-op**: Team up with another player
- **VS Mode**: 1v1 PvP battle (requires another player)
- **Battle Royale**: Free-for-all with multiple players

### Tips for Playing
1. **Watch for asteroids** - They come in different sizes
2. **Collect powerups** - Get special weapons from large asteroids:
   - ⚔️ Dual Cannon - Fire 2 bullets at once
   - 🛡️ Force Field - Block one hit
   - 🚀 Dual Thruster - 5x faster movement
   - 🔫 Laser Canon - Long-range beams
   - 🎯 Heat Seekers - Missile weapons

3. **UFOs and Aliens** - Special enemies appear:
   - UFOs shoot at you and give dual cannon when destroyed
   - Rare Aliens give ultimate powerups

4. **Audio** - Click the 🔊 button to toggle sound effects

## Technical Details

### Running the Server (For Multiplayer)
```bash
npm install          # Install dependencies
npm start           # Start the server on port 3000
```

Then open `http://localhost:3000` in your browser.

### Checking if Game is Running
Open your browser's Developer Console (F12 or Ctrl+Shift+I) and look for:
```
[FPS: 60.0] Game is running smoothly
[FPS: 59.5] Game is running smoothly
```

If you see these messages, the game is running properly!

### Performance
- **Good**: 60 FPS (smooth gameplay)
- **Acceptable**: 30+ FPS (playable)
- **Slow**: Below 30 FPS (consider closing other tabs)

## What's Different Now

### Before the Fix
- Game started but appeared motionless
- Only 4 small asteroids visible
- Hard to tell if game was actually running
- Possible performance hiccups

### After the Fix
- ✅ Large asteroid visible immediately on start
- ✅ Asteroids moving noticeably faster
- ✅ Clear FPS feedback in console
- ✅ Better error handling
- ✅ Responsive and smooth gameplay

## Troubleshooting

### Game looks frozen
- **Check console**: Open F12, see if FPS counter is logging
- **Press arrow keys**: Ship should respond immediately
- **Give it 2 seconds**: Sometimes initial render takes a moment

### Nothing is visible
- **Check fullscreen**: Game canvas should fill the entire window
- **Check browser zoom**: Make sure you're at 100% zoom
- **Refresh page**: Sometimes helps reset the rendering

### Multiplayer not working
- **Check server**: Run `npm start` from the project root
- **Check console errors**: Look for WebSocket connection errors
- **Check port**: Server should be on port 3000

### Audio not working
- **Check mute**: Click the 🔊 button
- **Check browser**: Some browsers block audio until user interacts
- **Check volume**: Windows volume mixer might have muted the page

## Have Fun! 🎮

The game is now fully fixed and playable. Try all the game modes and see if you can beat the asteroids!

If you encounter any other issues:
1. Check the browser console (F12)
2. Look at the server logs (if running multiplayer)
3. Try refreshing the page
4. Restart the server

---
**Version**: Fixed Build - November 21, 2025
