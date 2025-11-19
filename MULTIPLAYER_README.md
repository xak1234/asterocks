# Atlas 2-Player Co-op System

## Changes Made

### 1. UI Updates
- **Sound and Pause buttons moved**: Now positioned below the lives display (top: 70px instead of 20px)

### 2. Multiplayer Features

#### Lobby System
- Automatic lobby appears on page load
- Shows connection status to multiplayer server
- Options:
  - **Play Solo**: Start single-player game immediately
  - **Join Co-op Game**: Join another player's ongoing game (enabled when another player is online)

#### Join Request System
- When a player wants to join your game, you'll see a popup notification
- You can **Accept** or **Decline** the join request
- No codes required - automatic player detection

#### Game Synchronization
- Both players share the same game world (asteroids, UFOs, bullets)
- Each player controls their own ship independently
- Player 1 (host) appears in green
- Player 2 appears in gold/yellow with "P2" label
- Game state is synchronized 10 times per second

### 3. Technical Implementation

#### Server-Side (server.js)
- Added WebSocket server using `ws` library
- Handles player connections and matchmaking
- Synchronizes game state between players
- No codes required - automatic pairing

#### Client-Side (index.html)
- WebSocket client connects on page load
- Lobby UI with join/decline options
- Second player ship rendering (gold color)
- Real-time state synchronization

### 4. How It Works

1. **Starting the Game**:
   - Open the game in your browser
   - Lobby appears automatically
   - Choose "Play Solo" or wait for another player

2. **Joining Another Player**:
   - If another player is online, "Join Co-op Game" button becomes enabled
   - Click it to send a join request
   - Wait for the other player to accept

3. **Accepting Join Requests**:
   - While playing solo, if another player wants to join, you'll see a popup
   - Click "Accept" to let them join your game
   - Click "Decline" to continue solo

4. **Playing Together**:
   - Both players control their own ships with keyboard
   - Shared asteroids, bullets, and enemies
   - Independent lives and scores (currently)
   - Player 2 appears in gold with "P2" label

### 5. Installation

```bash
npm install
npm start
```

The WebSocket server runs on the same port as the HTTP server (default 3000).

### 6. Controls

- **Arrow Keys**: Movement and rotation
- **Spacebar**: Fire
- **P**: Hyperspace jump / Pause
- **ESC**: Pause

### 7. Notes

- Only 2 players maximum (as requested)
- No codes required - automatic matchmaking
- Players can join ongoing games at any time
- Declining a join request doesn't disconnect the other player - they can start solo
- If a player disconnects, the other player continues solo

### 8. Future Enhancements (Optional)

- Shared score and lives pool
- Chat system
- Power-up sharing
- Team-specific abilities
