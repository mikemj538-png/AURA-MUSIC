# AuraMusic

An AuraMusic-inspired music player web application built with HTML, CSS, and JavaScript. This project demonstrates a futuristic music player interface with playback controls, playlist management, responsive design, and a personal music library feature - all with a stunning neon purple aesthetic.

## Features

- 🎵 **Music Player**: Play/pause, next/previous track controls
- ⏯️ **Progress Bar**: Click and drag to seek through tracks
- 🔊 **Volume Control**: Adjust volume with mute/unmute functionality
- 📱 **Responsive Design**: Works on mobile and desktop devices
- 🎨 **Futuristic Neon Purple UI**: Striking dark theme with vibrant neon purple accents
- 💫 **Animated Background**: Dynamic gradient background with floating particle effects
- 💾 **Personal Library**: Save favorite tracks to your library (uses localStorage)
- ▶️ **Library Controls**: Play library, clear library, and more
- ⌨️ **Keyboard Controls**: 
  - Space: Play/Pause
  - Left Arrow: Previous track
  - Right Arrow: Next track
  - Up Arrow: Volume up
  - Down Arrow: Volume down
  - M: Mute/Unmute
  - S: Save current track to library
  - P: Play your library
  - L: View your library
- ❤️ **Favorite Tracking**: Heart button to mark/save favorite tracks

## Files

- `index.html` - Main HTML structure
- `style.css` - All styling including responsive design and futuristic effects
- `script.js` - JavaScript functionality for the music player
- `README.md` - This file
- `/audio/` - Directory for your audio files (contains sample tracks)
- `/images/` - Directory for album art images (contains sample art)

## How to Use

1. Open `index.html` in any modern web browser
2. The player comes pre-loaded with sample tracks to demonstrate functionality
3. To add your own music:
   - Place your legally obtained audio files (MP3, WAV, OGG, etc.) in the `audio` folder
   - Place album art images in the `images` folder (optional)
   - Edit the `tracks` array in `script.js` to point to your files (or replace the samples)
4. Use the mini-player at the bottom to control playback
5. Use keyboard shortcuts for quick control (see above)
6. Click the heart icon (♥) or the "Save" button to save the current track to your library
7. Click "Your Library" in the sidebar to view your saved tracks
8. Use the "More Options" button (⋯) for additional library functions

## Library Feature

The library feature allows you to save your favorite tracks for easy access:
- Click the heart icon (♥) or "Save" button to save the currently playing track
- Saved tracks are stored in your browser's localStorage
- Navigate to "Your Library" in the sidebar to view all saved tracks
- Click any track in your library to play it immediately
- Your library persists between browser sessions
- Additional library functions:
  - Press **P** to play your entire library
  - Press **L** to quickly navigate to your library
  - Use the "More Options" button (⋯) to play library or clear library

## Futuristic Design Elements

AuraMusic features a cutting-edge interface with:
- Animated gradient background that shifts colors smoothly
- Floating particle effects for a dynamic, sci-fi feel
- Neon purple accent colors that glow and pulse
- Glassmorphism effects on panels and buttons
- Subtle animations and transitions throughout the interface
- Responsive design that maintains the futuristic aesthetic on all devices

## Adding Your Music Legally

To use this player with your own music collection, you need to obtain music legally. Here are some legitimate sources:

### ✅ Legal Sources for Music:
- **Purchase from stores**: iTunes, Amazon Music, Bandcamp, Beatport
- **Free legal downloads**: 
  - [Free Music Archive](https://freemusicarchive.org/)
  - [Jamendo](https://www.jamendo.com/)
  - [Internet Archive Audio](https://archive.org/details/audio)
  - [Musopen](https://musopen.org/) (classical music)
  - [YouTube Audio Library](https://www.youtube.com/audiolibrary)
- **Creative Commons**: Search for CC-licensed music on sites like [ccmixter](https://ccmixter.org/)
- **Your own recordings**: Music you've created or recorded yourself

### ⚠️ Important Legal Notes:
- **Do not** download music from unauthorized sources
- **Do not** rip music from streaming services without permission
- **Do not** share copyrighted music files with others
- **Always** check the license before using music
- This player is for **personal use only** with music you legally own or have rights to use

## Customizing the Player

### To Add Your Own Tracks:
1. Place your audio files in the `/audio/` folder
2. Place album art images in the `/images/` folder (optional)
3. Edit the `tracks` array in `script.js`:

```javascript
const tracks = [
    {
        id: 1,                                    // Unique number for each track
        title: "Your Song Title",                 // Song name
        artist: "Artist Name",                    // Artist name
        album: "Album Name",                      // Album name (optional)
        duration: "3:45",                         // Length in MM:SS format (optional - auto-detected if not provided)
        popularity: 85,                           // Rating 0-100 (optional)
        audio: "audio/your-song-file.mp3",        // Path to your audio file
        cover: "images/album-art.jpg"             // Path to album art (optional)
    }
    // Add more tracks as needed
];
```

### Supported Audio Formats:
- MP3 (most widely supported)
- WAV
- OGG
- AAC
- M4A

## Technical Details

### How It Works:
- Uses the HTML5 `<audio>` element via JavaScript
- All processing happens client-side (no server required)
- Progress bar updates in real-time during playback
- Volume control uses the HTML5 audio API's volume property
- Keyboard events are captured globally for easy control
- Library data is stored in localStorage for persistence
- Advanced CSS animations create the futuristic visual experience

### Customization Options:
- Modify `style.css` to change colors, fonts, or animation effects
- Adjust the `tracks` array in `script.js` for your music collection
- Change the placeholder images in the HTML/CSS
- Modify keyboard shortcuts in the event listener section

## Browser Support

Works in all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Notes

This is a frontend-only demo designed for educational purposes and personal use with legally obtained music. For a production version, you would need to:

1. Add proper audio file hosting and streaming
2. Implement user accounts and playlists
3. Add licensing and DRM considerations for commercial use
4. Implement server-side components for scalability
5. Add features like search, recommendations, and social sharing

## Legal Disclaimer

This software is provided for educational purposes only. Users are responsible for ensuring they have the legal right to play any audio files through this application. The developers assume no liability for copyright infringement resulting from misuse of this application.

---
Created with ♥️ by Claude