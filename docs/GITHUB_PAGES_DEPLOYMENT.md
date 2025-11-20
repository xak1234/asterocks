# Deploying Asterocks Battle Royale to GitHub Pages

This guide explains how to deploy the Asterocks multiplayer battle royale game with the frontend on GitHub Pages and the backend server on Render (or similar service).

## Architecture

- **Frontend**: Static files hosted on GitHub Pages (free)
- **Backend**: Node.js WebSocket server hosted on Render, Railway, or Heroku

## Step 1: Deploy Backend Server to Render

### Option A: Using Render (Recommended - Free Tier Available)

1. **Create a Render account** at https://render.com

2. **Create a new Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `asterocks` repository

3. **Configure the service**:
   - **Name**: `asterocks-server` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server/server.js`
   - **Instance Type**: Free

4. **Set Environment Variables**:
   ```
   NODE_ENV=production
   PORT=10000
   ALLOWED_ORIGINS=yourusername.github.io
   ```
   Replace `yourusername` with your GitHub username.

5. **Deploy**: Click "Create Web Service"

6. **Note your server URL**: After deployment, you'll get a URL like:
   ```
   https://asterocks-server.onrender.com
   ```
   Save this URL - you'll need it for the frontend configuration.

### Option B: Using Railway (Alternative Free Option)

1. Sign up at https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your asterocks repository
4. Railway auto-detects the Node.js app
5. Add environment variables:
   ```
   NODE_ENV=production
   ALLOWED_ORIGINS=yourusername.github.io
   ```
6. Deploy and note the generated URL

### Option C: Using Heroku

1. Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
2. Login: `heroku login`
3. Create app: `heroku create asterocks-server-YOUR-NAME`
4. Set environment:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set ALLOWED_ORIGINS=yourusername.github.io
   ```
5. Deploy: `git push heroku main`
6. Note your Heroku URL: `https://asterocks-server-YOUR-NAME.herokuapp.com`

## Step 2: Configure Frontend for Deployed Backend

Edit `public/index.html` and find the WebSocket connection code (around line 5755):

```javascript
// OPTION 1: Use environment-based configuration
const BACKEND_SERVER = 'asterocks-server.onrender.com'; // Replace with your server URL
const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const host = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  ? 'localhost:3000' 
  : BACKEND_SERVER;

ws = new WebSocket(`${protocol}//${host}`);
```

Or create a `public/config.js` file:

```javascript
// config.js
window.ASTEROCKS_CONFIG = {
  // Replace with your deployed backend server URL (without protocol)
  BACKEND_SERVER: 'asterocks-server.onrender.com'
};
```

## Step 3: Deploy Frontend to GitHub Pages

### Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - **Source**: GitHub Actions
4. The workflow will automatically deploy when you push to main

### Manual Deployment (Alternative)

If you prefer manual deployment:

1. Go to **Settings** → **Pages**
2. Set **Source** to "Deploy from a branch"
3. Select branch: `main`
4. Folder: `/public`
5. Click Save

## Step 4: Update CORS Settings

After deploying, update your backend server's CORS settings:

On Render (or your hosting service), update the `ALLOWED_ORIGINS` environment variable:

```
ALLOWED_ORIGINS=yourusername.github.io,localhost:3000,127.0.0.1:3000
```

This allows your GitHub Pages site to connect to your backend server.

## Step 5: Test Your Deployment

1. Visit your GitHub Pages URL: `https://yourusername.github.io/asterocks`
2. The game should load and connect to your backend server
3. Open in multiple tabs or share with friends to test multiplayer
4. Check the browser console for any connection errors

## Troubleshooting

### WebSocket Connection Fails

**Problem**: "Connection error - Playing solo" message

**Solutions**:
1. Check that your backend server is running (visit the Render dashboard)
2. Verify CORS settings include your GitHub Pages domain
3. Check browser console for detailed error messages
4. Ensure you're using `wss://` (secure WebSocket) for HTTPS sites

### "Mixed Content" Error

**Problem**: GitHub Pages uses HTTPS, but trying to connect to `ws://`

**Solution**: Ensure your backend URL uses `https://` and WebSocket connection uses `wss://`

### Backend Server "Sleeps" on Render Free Tier

**Problem**: Render free tier services sleep after 15 minutes of inactivity

**Solutions**:
1. Use a service like [UptimeRobot](https://uptimerobot.com/) to ping your server every 5 minutes
2. Upgrade to Render's paid tier ($7/month)
3. Accept the sleep behavior - the server wakes up in ~30 seconds when a user connects

## Configuration Summary

### Backend Server (Render/Railway/Heroku)
- Hosts the WebSocket server
- Handles multiplayer game logic
- Requires Node.js 20.x
- Free tier available on all platforms

### Frontend (GitHub Pages)
- Serves static HTML/CSS/JS files
- Connects to backend WebSocket server
- Completely free
- Automatically deploys on push to main

## Cost Breakdown

- **GitHub Pages**: Free
- **Render Free Tier**: Free (with sleep after inactivity)
- **Railway**: $5 free credit/month
- **Heroku**: Free tier discontinued, starts at $5/month
- **Total**: $0-5/month depending on platform

## Updating Your Deployment

### Backend Updates
1. Push changes to your repository
2. Render/Railway automatically redeploys
3. Or manually deploy from dashboard

### Frontend Updates
1. Push changes to `main` branch
2. GitHub Actions automatically redeploys
3. Or trigger manual deployment from Actions tab

## Custom Domain (Optional)

### For GitHub Pages
1. Go to Settings → Pages
2. Add custom domain
3. Configure DNS with your domain provider
4. Add CNAME record pointing to `yourusername.github.io`

### For Backend Server
1. On Render, go to Settings → Custom Domains
2. Add your domain
3. Configure DNS with CNAME record
4. Update frontend configuration with new domain

## Security Considerations

1. **HTTPS Only**: Both frontend and backend should use HTTPS in production
2. **CORS Configuration**: Restrict allowed origins to your domains only
3. **Rate Limiting**: Already configured in `server/server.js`
4. **Input Validation**: Already implemented with sanitization functions
5. **Environment Variables**: Never commit secrets to repository

## Next Steps

After deployment:
1. Share your game URL with friends
2. Monitor server performance in Render dashboard
3. Check for errors in browser console and server logs
4. Consider adding analytics to track player activity
5. Optionally set up a custom domain for professional branding

## Support

If you encounter issues:
1. Check browser console for errors
2. Check Render/Railway logs for server errors
3. Verify environment variables are set correctly
4. Test local deployment first (`npm start`)
5. Open an issue on GitHub with details

---

Your game should now be live at:
- **Frontend**: `https://yourusername.github.io/asterocks`
- **Backend**: `https://asterocks-server.onrender.com`

Share the frontend URL with friends to play battle royale together!
