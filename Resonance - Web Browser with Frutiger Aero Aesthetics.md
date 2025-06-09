# Resonance - Web Browser with Frutiger Aero Aesthetics

A beautiful web browser interface featuring Frutiger Aero design aesthetics with deep sky blue and green colors, glossy translucent elements, and an iframe-based browsing experience.

## Features

- **Frutiger Aero Design**: Glossy, translucent interface with vibrant blue and green gradients
- **Categorized Navigation**: Dropdown menus organized by LLMs, Tools, Social, Games, Videos, Quotes, and Search
- **Iframe Browser**: Embedded web browsing experience with navigation controls
- **Responsive Design**: Works on both desktop and mobile devices
- **Smooth Animations**: Hover effects, transitions, and interactive feedback

## File Structure

```
resonance/
├── index.html          # Main HTML structure
├── style.css           # Frutiger Aero styling
├── script.js           # Interactive functionality
└── README.md           # This file
```

## Categories and Links

### LLMs
- ChatGPT
- Gemini
- Claude
- Shapes Inc
- Poe
- HuggingChat

### Tools
- HuggingFace Spaces
- Riffusion
- Bing Image Creator
- Dearest Llama / Free BlueSky Bots

### Social
- BlueSky
- r/Singularity
- Alexandria AI Personas Discord

### Games
- ButtonBass Dubstep Cube
- Odyssey
- WebSim

### Videos
- Neural Viz
- WKUK

### Quotes
- Carl Sagan Quotes

### Search
- DuckDuckGo

## Deployment on Render

### Method 1: Static Site Deployment

1. **Create a GitHub Repository**:
   - Upload all files (index.html, style.css, script.js) to a new GitHub repository
   - Make sure the repository is public

2. **Deploy on Render**:
   - Go to [Render.com](https://render.com)
   - Click "New" → "Static Site"
   - Connect your GitHub repository
   - Set the following:
     - **Build Command**: Leave empty (no build needed)
     - **Publish Directory**: `.` (root directory)
   - Click "Create Static Site"

3. **Custom Domain** (Optional):
   - In your Render dashboard, go to Settings
   - Add your custom domain under "Custom Domains"

### Method 2: Manual Upload

1. **Zip the Files**:
   - Create a zip file containing index.html, style.css, and script.js
   
2. **Upload to Render**:
   - Use Render's manual upload feature for static sites
   - Upload the zip file and deploy

## Local Development

To run locally:

1. Download all files to a folder
2. Open `index.html` in a web browser
3. Or serve with a local server:
   ```bash
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## Notes

- Some websites may not load in the iframe due to X-Frame-Options security policies
- The browser includes navigation controls (back, forward, refresh)
- Keyboard shortcuts are supported (Ctrl+R for refresh, Alt+Arrow keys for navigation)
- The design is optimized for modern browsers with CSS backdrop-filter support

## Customization

To modify the color scheme or add new categories:

1. **Colors**: Edit the CSS variables in `style.css`
2. **Links**: Add new links in the HTML dropdown sections
3. **Categories**: Add new dropdown sections in `index.html` and corresponding JavaScript handlers

## License

This project is open source and available under the MIT License.

