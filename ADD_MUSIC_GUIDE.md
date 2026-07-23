# How to Legally Add Music to Your AuraMusic Player

This guide will help you add your legally obtained music to the AuraMusic player and use its features including the library functionality, all set against a stunning futuristic neon purple backdrop.

## 📁 Step 1: Prepare Your Music Files

First, you need to have your music files ready. Make sure you have obtained them legally through one of these methods:

### ✅ Legal Sources:
- **Purchased music**: iTunes, Amazon Music, Bandcamp, Beatport, etc.
- **Free legal downloads**: 
  - [Free Music Archive](https://freemusicarchive.org/)
  - [Jamendo](https://www.jamendo.com/)
  - [Internet Archive Audio](https://archive.org/details/audio)
  - [Musopen](https://musopen.org/) (classical)
  - [YouTube Audio Library](https://www.youtube.com/audiolibrary)
- **Your own creations**: Music you've composed, recorded, or produced
- **Creative Commons**: Search for CC-licensed music (check attribution requirements)

### 📁 File Organization:
1. Create an `audio` folder in your AuraMusic directory:
   ```
   AuraMusic/
   ├── audio/
   │   ├── song1.mp3
   │   ├── song2.mp3
   │   └── ...
   ├── images/
   │   ├── album1.jpg
   │   ├── album2.jpg
   │   └── ...
   ├── index.html
   ├── style.css
   ├── script.js
   └── README.md
   ```

2. (Optional) Create an `images` folder for album artwork:
   ```
   AuraMusic/images/
   ```

## 🎵 Step 2: Add Your Music to the Player

Edit the `script.js` file to add your tracks to the `tracks` array.

### Example Entry:
```javascript
{
    id: 1,                                    // Unique number for each track
    title: "Your Song Title",                 // Song name
    artist: "Artist Name",                    // Artist name
    album: "Album Name",                      // Album name (optional)
    duration: "3:45",                         // Length in MM:SS format (optional - auto-detected if audio file loads)
    popularity: 85,                           // Rating 0-100 (optional)
    audio: "audio/your-song-file.mp3",        // Path to your audio file
    cover: "images/album-art.jpg"             // Path to album art (optional)
}
```

### Supported Audio Formats:
- MP3 (most compatible)
- WAV
- OGG
- AAC
- M4A

## 🔧 Step 3: Edit the Script

1. Open `script.js` in a text editor (Notepad, VS Code, etc.)
2. Find the `tracks` array near the top of the file
3. Replace or add to the example entries with your own music
4. Save the file

### Example with Real Files:
```javascript
const tracks = [
    {
        id: 1,
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        duration: "3:20",
        popularity: 95,
        audio: "audio/blinding-lights.mp3",
        cover: "images/after-hours.jpg"
    },
    {
        id: 2,
        title: "Levitating",
        artist: "Dua Lipa",
        album: "Future Nostalgia",
        duration: "3:23",
        popularity: 92,
        audio: "audio/levitating.mp3",
        cover: "images/future-nostalgia.jpg"
    }
    // Add more tracks as needed
];
```

## ▶️ Step 4: Test Your Player

1. Save your changes to `script.js`
2. Refresh `index.html` in your browser
3. Your music should now appear in the playlist against the stunning futuristic neon purple background
4. Click on any track to play it!

## 💾 Library Feature Guide

AuraMusic includes a powerful library feature to save and organize your favorite tracks, all set against our futuristic interface:

### Saving Tracks:
- While a track is playing, click the ♥ (heart) button or the "Save" button
- The buttons will glow with neon purple to indicate the track is saved
- Use the keyboard shortcut **S** to save/unsave the current track
- A notification will confirm when a track is saved or removed

### Viewing Your Library:
- Click "Your Library" in the sidebar navigation
- See all your saved tracks in a beautiful, organized list with neon purple accents
- Click any track in your library to play it immediately
- The player will automatically switch to the main view when you play a library track

### Library Controls:
- **Play Library**: Press **P** or use the "More Options" (⋯) button to play your entire library
- **View Library**: Press **L** to quickly navigate to your library
- **Clear Library**: Use the "More Options" (⋯) button to clear your entire library
- **Library Persistence**: Your saved tracks are stored in your browser's localStorage and persist between sessions

### Keyboard Shortcuts for Library:
- **S**: Save/Unsave current track
- **P**: Play your library
- **L**: View your library

## 🔍 Troubleshooting

### "Error loading audio" message:
- Check that the file path is correct
- Make sure the file actually exists in the specified location
- Verify the file format is supported (MP3, WAV, etc.)
- Check file permissions (should be readable)

### No sound:
- Ensure your computer's volume is turned up
- Check that you haven't accidentally muted the player (click the volume icon)
- Try a different audio file to see if it's file-specific

### Music plays but no progress:
- Some older or unusual audio files might not report duration correctly
- Try re-encoding the file to a standard MP3 format

## ⚠️ Important Legal Reminders

### DO:
- Only use music you have legally obtained
- Keep music for personal use only
- Respect artists' rights and support creators
- Check licenses for any required attribution
- Use music from legitimate sources

### DON'T:
- Download music from torrent sites or illegal sources
- Rip music from streaming services without permission
- Share copyrighted music files with others
- Use music commercially without proper licensing
- Assume "I found it online" means it's free to use

## 💡 Tips for Best Experience

1. **Consistent Naming**: Name your files clearly (e.g., `artist - song title.mp3`)
2. **Embedded Metadata**: Use tools like MP3Tag to add artist/album info to your files
3. **Quality**: Use good quality files (256kbps+ MP3 or lossless formats)
4. **Album Art**: Add cover art to make your player look spectacular against the futuristic background
5. **Backup**: Keep a backup of your music collection

## 🌐 Finding More Legal Music

### Free & Legal Sources:
- **Free Music Archive**: https://freemusicarchive.org/
- **Jamendo**: https://www.jamendo.com/ (free streaming, affordable downloads)
- **SoundCloud**: Many artists offer free downloads (check permissions)
- **Bandcamp**: Artists often offer free tracks or "name your price"
- **NoiseTrade**: https://www.noisetrade.com/ (free music for email signup)
- **Amazon Free Music**: https://music.amazon.com/free
- **Google Play Free Songs**: Check periodically for free offerings

### Subscription Services (for personal use only):
- Spotify Premium (download for offline listening within app)
- Apple Music (download for offline listening within app)
- Amazon Music Unlimited (download for offline listening within app)
- YouTube Music Premium (download for offline listening within app)

> **Note**: Downloaded music from streaming services is usually DRM-protected and can only be played within their official apps. For use in this player, you need to purchase the music outright or use services that offer DRM-free downloads.

## 📝 Need Help?

If you have questions about legally obtaining music or need help with the technical aspects:
1. Check the documentation in `README.md`
2. Look for online resources about digital music legality
3. Remember: when in doubt, purchase the music to support the artists

Enjoy your personal music player with its stunning futuristic neon purple interface! 🎧✨