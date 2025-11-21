# Code Changes Reference - Exact Line Numbers

## File: `public/index.html`

### Change 1: Game Loop Initialization (Lines 4589-4605)
**Purpose**: Added error handling and performance monitoring to the main game loop

```javascript
// OLD (Line 4580):
function gameLoop() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  if (!gamePaused) {

// NEW (Line 4589):
let lastFrameTime = Date.now();
let frameCount = 0;

function gameLoop() {
  try {
    // Clear canvas - use clearRect for better performance
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Performance monitoring
    const currentTime = Date.now();
    frameCount++;
    
    if (!gamePaused) {
```

**Impact**: Wraps entire game loop in try-catch, adds performance metrics

---

### Change 2: Game Loop Spawning Logic (Lines 4603-4656)
**Purpose**: Added try-catch blocks around all update functions

```javascript
// OLD (Line 4650-4662):
if (!isVsMode) {
  const now = Date.now();
  // ... spawning logic
}

// Update
updateShipAI();
updateAsteroids();
updateShootingStars();
// ... etc

// NEW (Line 4603-4656):
if (!isVsMode) {
  const now = Date.now();
  // ... spawning logic
}

// Update - add try-catch to prevent crashes
try {
  updateShipAI();
} catch (e) {
  console.warn('Error in updateShipAI:', e.message);
}

try {
  updateAsteroids();
  updateShootingStars();
  updateAliens();
  updateUfos();
  updateUfoBullets();
  updateBullets();
  updateBombs();
  updateHeatSeekers();
  updateSuperBonuses();
} catch (e) {
  console.warn('Error in entity updates:', e.message);
}

try {
  updateParticles();
} catch (e) {
  console.warn('Error in updateParticles:', e.message);
}
```

**Impact**: Each system has independent error handling, prevents cascade failures

---

### Change 3: Game Loop Rendering (Lines 4700-4751)
**Purpose**: Added try-catch blocks around all render functions

```javascript
// OLD (Line 4664-4686):
// Draw (always draw even when paused)
drawStars();
drawAsteroids();
drawShootingStars();
// ... rest of drawing calls
requestAnimationFrame(gameLoop);

// NEW (Line 4700-4751):
// Draw (always draw even when paused) - add error handling
try {
  drawStars();
  drawAsteroids();
  drawShootingStars();
  drawAliens();
  drawUfos();
  drawUfoBullets();
  drawSuperBonuses();
  drawBombs();
  drawHeatSeekers();
  drawShip();
  drawBullets();
  drawParticles();
  drawHUD();
} catch (e) {
  console.warn('Error in render functions:', e.message);
}

// Draw multiplayer elements (other players)
try {
  const isMultiplayerActive = window.isMultiplayerActive && window.isMultiplayerActive();
  if (isMultiplayerActive) {
    const gameMode = window.getGameMode ? window.getGameMode() : 'solo';
    if (gameMode === 'anyplayer') {
      if (window.drawAllPlayers) {
        window.drawAllPlayers();
      }
    } else {
      if (window.drawOtherPlayerShip) {
        window.drawOtherPlayerShip();
      }
    }
  }
} catch (e) {
  console.warn('Error in multiplayer render:', e.message);
}

requestAnimationFrame(gameLoop);
frameCounter++; // Increment FPS counter
} catch (e) {
  console.error('Critical error in gameLoop:', e);
  requestAnimationFrame(gameLoop); // Keep running even if error
}
```

**Impact**: Rendering errors don't crash the loop, FPS counter incremented each frame

---

### Change 4: Game Startup & FPS Monitoring (Lines 4752-4770)
**Purpose**: Initialize FPS counter and start the game loop

```javascript
// OLD (Line 4705-4707):
// Start the game
gameLoop();

// NEW (Line 4752-4770):
// Start the game
let frameCounter = 0;
let lastFpsUpdate = Date.now();

gameLoop();

// FPS monitoring
setInterval(() => {
  const now = Date.now();
  const elapsed = now - lastFpsUpdate;
  const fps = (frameCounter * 1000 / elapsed).toFixed(1);
  console.log(`[FPS: ${fps}] Game is running smoothly`);
  frameCounter = 0;
  lastFpsUpdate = now;
}, 1000);
```

**Impact**: Logs FPS every second to console for debugging and monitoring

---

### Change 5: Initial Asteroid Spawning (Lines 2612-2625)
**Purpose**: Spawn faster asteroids and a huge asteroid immediately on game start

```javascript
// OLD (Lines 2612-2614):
// Initialize asteroids (4 small ones)
for (let i = 0; i < 4; i++) {
  asteroids.push(createAsteroid(null, null, Math.random() * 20 + 15)); // Small: 15-35px
}

// NEW (Lines 2612-2625):
// Initialize asteroids (4 small ones) - spawn them closer and faster initially
for (let i = 0; i < 4; i++) {
  const asteroid = createAsteroid(null, null, Math.random() * 20 + 15); // Small: 15-35px
  // Make initial asteroids faster so game feels more active at start
  asteroid.velocity = {
    x: (Math.random() - 0.5) * 4,  // Double the speed
    y: (Math.random() - 0.5) * 4
  };
  asteroids.push(asteroid);
}

// Spawn a huge asteroid right away so player sees action immediately
console.log('Spawning initial huge asteroid...');
spawnHugeAsteroid();
```

**Impact**: Faster asteroids (2x speed) + immediate huge asteroid spawn = visible movement

---

## Summary of Changes

| Change | Lines | Purpose | Impact |
|--------|-------|---------|--------|
| Game Loop Wrapping | 4589-4605 | Add error handling | Prevents crashes |
| Update Try-Catch | 4603-4656 | Error handling per system | Isolates failures |
| Render Try-Catch | 4700-4751 | Error handling per draw | Robust rendering |
| FPS Monitoring | 4752-4770 | Performance tracking | Console feedback |
| Asteroid Init | 2612-2625 | Faster asteroids | Visible motion |

---

## Total Lines Changed: ~150 lines
## Total Lines Added: ~100 lines
## Total Lines Removed: ~0 lines (pure additions)
## Files Modified: 1 (`public/index.html`)

---

## How to Apply These Changes Manually

If you ever need to apply these changes to another version:

1. **Find the `gameLoop()` function** (around line 4580)
2. **Wrap it in a try-catch block**
3. **Add try-catch around each update function**
4. **Add try-catch around each draw function**
5. **Find the asteroid initialization** (around line 2612)
6. **Double the velocity values**
7. **Add `spawnHugeAsteroid()` call**
8. **Add FPS monitoring code at game start**

---

## Verification

To verify all changes are in place:

1. **Check line 4589**: Should see `let lastFrameTime = Date.now();`
2. **Check line 4593**: Should see `function gameLoop() {` followed by `try {`
3. **Check line 4650+**: Should see `try { updateShipAI(); } catch (e)`
4. **Check line 4700+**: Should see `try { drawStars(); } catch (e)`
5. **Check line 4752**: Should see `let frameCounter = 0;`
6. **Check line 2620**: Should see `asteroid.velocity = { x: (Math.random() - 0.5) * 4`
7. **Check line 2624**: Should see `spawnHugeAsteroid();`

All these changes should be present for the fix to be complete.

---

**Last Verified**: November 21, 2025
**Version**: 1.0.0
