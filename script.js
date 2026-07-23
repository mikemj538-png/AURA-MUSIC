// Music player configuration
const config = {
    // Default fallback audio (placeholder)
    fallbackAudio: "https://www.w3schools.com/html/horse.mp3",
    // Default fallback image
    fallbackImage: "https://via.placeholder.com/50x50/bf00ff/ffffff?text=♪",
    // Default fallback album image
    fallbackAlbumImage: "https://via.placeholder.com/300x300/bf00ff/ffffff?text=Album"
};

// Music tracks - ALL SONGS IN AUDIO FOLDER
// Format:
// {
//   id: unique-number,
//   title: "Song Title",
//   artist: "Artist Name",
//   album: "Album Name",
//   duration: "MM:SS" (optional, will be auto-detected if audio file loads),
//   popularity: number (0-100, optional),
//   audio: "path/to/audio/file.mp3",
//   cover: "path/to/image.jpg" (optional)
// }
const tracks = [
    {
        id: 1,
        title: "Beautiful Things",
        artist: "Benson Boone",
        album: "Single",
        duration: "0:00", // Will be auto-detected
        popularity: 95,
        audio: "audio/Benson Boone - Beautiful Things.mp3",
        cover: "images/Benson Boone - Beautiful Things.png"
    },
    {
        id: 2,
        title: "Everlong",
        artist: "Foo Fighters",
        album: "Single",
        duration: "0:00", // Will be auto-detected
        popularity: 92,
        audio: "audio/Foo Fighters - Everlong.mp3",
        cover: "images/Foo Fighters - Everlong.png"
    },
    {
        id: 3,
        title: "Perdição",
        artist: "L7NNON",
        album: "Single",
        duration: "0:00", // Will be auto-detected
        popularity: 90,
        audio: "audio/L7NNON - Perdição.mp3",
        cover: "images/L7NNON - Perdição.png"
    },
    {
        id: 4,
        title: "Earrings",
        artist: "Malcolm Todd",
        album: "Single",
        duration: "0:00", // Will be auto-detected
        popularity: 88,
        audio: "audio/Malcolm Todd - Earrings.mp3",
        cover: "images/Malcolm Todd - Earrings.png"
    },
    {
        id: 5,
        title: "MONTAGEM ALQUIMIA (SLOWED)",
        artist: "Various Artists",
        album: "Remix",
        duration: "0:00", // Will be auto-detected
        popularity: 85,
        audio: "audio/MONTAGEM ALQUIMIA (SLOWED).mp3",
        cover: "images/MONTAGEM ALQUIMIA (SLOWED).png"
    },
    {
        id: 6,
        title: "misery",
        artist: "pupsies",
        album: "Single",
        duration: "0:00", // Will be auto-detected
        popularity: 82,
        audio: "audio/pupsies - misery.mp3",
        cover: "images/pupsies - misery.png"
    },
    {
        id: 7,
        title: "SENDO SENDO",
        artist: "Vlxdimir",
        album: "Single",
        duration: "0:00", // Will be auto-detected
        popularity: 80,
        audio: "audio/SENDO SENDO - Vlxdimir.mp3",
        cover: "images/SENDO SENDO - Vlxdimir.png"
    }
];

// DOM Elements
const tracksList = document.getElementById('tracksList');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.querySelector('.btn-prev');
const nextBtn = document.querySelector('.btn-next');
const progressFill = document.getElementById('progressFill');
const progressThumb = document.getElementById('progressThumb');
const progressBar = document.querySelector('.progress-bar');
const currentTimeEl = document.querySelector('.current-time');
const totalTimeEl = document.querySelector('.total-time');
const volumeSlider = document.getElementById('volumeSlider');
const volumeBtn = document.querySelector('.btn-volume');
const miniPlayerTrackName = document.querySelector('.track-name');
const miniPlayerArtistName = document.querySelector('.artist-name');
const miniPlayerImg = document.querySelector('.mini-player-left img');
const miniPlayerAlbumImg = document.querySelector('.hero-image img');
const playPauseIcon = document.querySelector('.btn-play-pause');
const likeBtn = document.querySelector('.btn-like');
const saveBtn = document.querySelector('.btn-save');
const moreBtn = document.querySelector('.btn-more');
const downloadBtn = document.querySelector('.btn-download');
const navLinks = document.querySelectorAll('.nav ul li a');
const heroSection = document.querySelector('.hero-section');
const tracksSection = document.querySelector('.tracks-section');
const playlistSection = document.querySelector('.playlist-section');

// Library management
let library = JSON.parse(localStorage.getItem('auraMusicLibrary')) || [];

// Player state
let currentTrackIndex = 0;
let isPlaying = false;
let audio = new Audio();
let progressInterval = null;
let audioLoaded = false;
let currentView = 'home'; // home, search, library, playlists

// Initialize the player
function initPlayer() {
    loadTrack(currentTrackIndex);
    renderTracks();
    setupEventListeners();
    updateLibraryButtonStates();
    checkForAudioFolder();

    // Show home view by default
    showView('home');
}

// Load a track into the audio player
function loadTrack(index) {
    if (index < 0 || index >= tracks.length) {
        console.error("Invalid track index:", index);
        return;
    }

    const track = tracks[index];

    // Update UI immediately
    miniPlayerTrackName.textContent = track.title || 'Unknown Title';
    miniPlayerArtistName.textContent = track.artist || 'Unknown Artist';
    miniPlayerImg.src = track.cover || config.fallbackImage;
    miniPlayerAlbumImg.src = track.cover || config.fallbackAlbumImage;

    // Set up audio element
    audio.src = track.audio || config.fallbackAudio;
    audio.preload = "metadata"; // Preload metadata to get duration

    // Handle audio loading
    audio.onloadedmetadata = () => {
        audioLoaded = true;
        // Update duration if not specified in track data
        if (!track.duration || track.duration === "0:00") {
            totalTimeEl.textContent = formatTime(audio.duration);
            // Update track duration in the array for future reference
            tracks[index].duration = formatTime(audio.duration);
        } else {
            totalTimeEl.textContent = track.duration;
        }

        // Update progress bar to 0
        progressFill.style.width = '0%';
        progressThumb.style.left = '0%';
        currentTimeEl.textContent = '0:00';
    };

    audio.onerror = () => {
        console.error("Error loading audio file:", track.audio);
        audioLoaded = false;
        totalTimeEl.textContent = "Error loading";
        currentTimeEl.textContent = "Error";

        // Try fallback audio
        if (track.audio !== config.fallbackAudio) {
            audio.src = config.fallbackAudio;
            audio.load();
        }
    };

    // Update current time as audio plays
    audio.ontimeupdate = () => {
        if (!audioLoaded) return;

        const progress = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = progress + '%';
        progressThumb.style.left = progress + '%';
        currentTimeEl.textContent = formatTime(audio.currentTime);
    };

    // Handle track end
    audio.onended = () => {
        playNextTrack();
    };

    // Update progress bar when user seeks
    audio.onseeked = () => {
        if (!audioLoaded) return;
        const progress = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = progress + '%';
        progressThumb.style.left = progress + '%';
    };
}

// Format time in MM:SS format
function formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) return "0:00";

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Render tracks in the playlist
function renderTracks() {
    tracksList.innerHTML = '';

    tracks.forEach((track, index) => {
        const trackElement = document.createElement('div');
        trackElement.className = `track-item ${index === currentTrackIndex ? 'active' : ''}`;
        trackElement.innerHTML = `
            <div class="col-check">
                <input type="checkbox" ${index === currentTrackIndex ? 'checked' : ''} disabled>
            </div>
            <div class="col-title">
                <span class="track-number">${index + 1}</span>
                <div class="track-info">
                    <span class="track-name">${track.title || 'Unknown Title'}</span>
                    <span class="artist-name">${track.artist || 'Unknown Artist'}</span>
                </div>
            </div>
            <div class="col-album">${track.album || 'Unknown Album'}</div>
            <div class="col-time">${track.duration || '--:--'}</div>
            <div class="col-popularity">${track.popularity !== undefined ? track.popularity + '%' : '--%'}</div>
        `;

        trackElement.addEventListener('click', () => {
            playTrack(index);
        });

        tracksList.appendChild(trackElement);
    });
}

// Render library tracks
function renderLibrary() {
    tracksList.innerHTML = '';

    if (library.length === 0) {
        tracksList.innerHTML = `
            <div class="loading-message">
                <p>Your library is empty</p>
                <p class="hint">Save tracks to your library using the save button</p>
            </div>
        `;
        return;
    }

    library.forEach((track, index) => {
        const trackElement = document.createElement('div');
        trackElement.className = `track-item`;
        trackElement.innerHTML = `
            <div class="col-check">
                <input type="checkbox">
            </div>
            <div class="col-title">
                <span class="track-number">${index + 1}</span>
                <div class="track-info">
                    <span class="track-name">${track.title || 'Unknown Title'}</span>
                    <span class="artist-name">${track.artist || 'Unknown Artist'}</span>
                </div>
            </div>
            <div class="col-album">${track.album || 'Unknown Album'}</div>
            <div class="col-time">${track.duration || '--:--'}</div>
            <div class="col-popularity">${track.popularity !== undefined ? track.popularity + '%' : '--%'}</div>
        `;

        trackElement.addEventListener('click', () => {
            // Find the track index in the main tracks array
            const trackIndex = tracks.findIndex(t =>
                t.title === track.title &&
                t.artist === track.artist &&
                t.album === track.album
            );

            if (trackIndex !== -1) {
                playTrack(trackIndex);
                // Switch to home view to show the player
                showView('home');
            }
        });

        tracksList.appendChild(trackElement);
    });
}

// Play a specific track
function playTrack(index) {
    if (index < 0 || index >= tracks.length) return;

    currentTrackIndex = index;
    loadTrack(index);
    playAudio();
    renderTracks();
    updateLibraryButtonStates();
}

// Play previous track
function playPreviousTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrack(currentTrackIndex);
}

// Play next track
function playNextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack(currentTrackIndex);
}

// Play/pause toggle
function playAudio() {
    if (!audio.src) return;

    audio.play()
        .then(() => {
            isPlaying = true;
            playPauseIcon.textContent = '❚❚';

            // Start progress update interval if not already running
            if (!progressInterval) {
                progressInterval = setInterval(updateProgress, 500);
            }
        })
        .catch(err => {
            console.error("Error playing audio:", err);
            // Try to recover by reloading
            audio.load();
        });
}

function pauseAudio() {
    audio.pause();
    isPlaying = false;
    playPauseIcon.textContent = '►❚❚';

    // Clear progress update interval
    if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
    }
}

function togglePlayPause() {
    if (isPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
}

// Update progress bar manually (for clicking on progress bar)
function updateProgressFromClick(e) {
    if (!audioLoaded || !audio.duration) return;

    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
}

// Update progress bar manually (for dragging)
function updateProgressFromDrag(e) {
    if (!audioLoaded || !audio.duration) return;

    const rect = progressBar.getBoundingClientRect();
    let percent = (e.clientX - rect.left) / rect.width;
    percent = Math.max(0, Math.min(1, percent)); // Clamp between 0 and 1
    audio.currentTime = percent * audio.duration;
}

// Update progress display
function updateProgress() {
    if (!audioLoaded || !audio.duration) return;

    const progress = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = progress + '%';
    progressThumb.style.left = progress + '%';
    currentTimeEl.textContent = formatTime(audio.currentTime);
}

// Volume control
function setVolume(volume) {
    // Clamp volume between 0 and 1
    volume = Math.max(0, Math.min(1, volume));
    audio.volume = volume;
    volumeSlider.value = volume * 100;

    // Update volume icon based on level
    if (volume === 0) {
        volumeBtn.textContent = '🔇';
    } else if (volume < 0.3) {
        volumeBtn.textContent = '🔈';
    } else if (volume < 0.7) {
        volumeBtn.textContent = '🔉';
    } else {
        volumeBtn.textContent = '🔊';
    }
}

// Mute/unmute toggle
function toggleMute() {
    if (audio.muted) {
        audio.muted = false;
        volumeBtn.textContent = volumeSlider.value > 50 ? '🔊' :
                               volumeSlider.value > 0 ? '🔉' : '🔇';
    } else {
        audio.muted = true;
        volumeBtn.textContent = '🔇';
    }
}

// Save/unsave current track to library
function toggleSaveTrack() {
    const currentTrack = tracks[currentTrackIndex];
    const trackIndexInLibrary = library.findIndex(t =>
        t.title === currentTrack.title &&
        t.artist === currentTrack.artist &&
        t.album === currentTrack.album
    );

    if (trackIndexInLibrary === -1) {
        // Add to library
        library.push({...currentTrack});
        saveBtn.classList.add('active');
        likeBtn.classList.add('active');
        showNotification('Saved to library!');
    } else {
        // Remove from library
        library.splice(trackIndexInLibrary, 1);
        saveBtn.classList.remove('active');
        likeBtn.classList.remove('active');
        showNotification('Removed from library');
    }

    // Save to localStorage
    localStorage.setItem('auraMusicLibrary', JSON.stringify(library));

    // Update button states
    updateLibraryButtonStates();
}

// Update library button states based on current track
function updateLibraryButtonStates() {
    const currentTrack = tracks[currentTrackIndex];
    const isSaved = library.some(t =>
        t.title === currentTrack.title &&
        t.artist === currentTrack.artist &&
        t.album === currentTrack.album
    );

    if (isSaved) {
        saveBtn.classList.add('active');
        likeBtn.classList.add('active');
    } else {
        saveBtn.classList.remove('active');
        likeBtn.classList.remove('active');
    }
}

// Show notification message
function showNotification(message) {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    // Add to document
    document.body.appendChild(notification);

    // Remove after 2 seconds
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Check if audio folder exists and provide guidance
function checkForAudioFolder() {
    // This is just a client-side check - we can't actually check file system from JS
    // But we can check if the default tracks are still pointing to placeholders
    const usingPlaceholders = tracks.some(track =>
        track.audio === "https://www.w3schools.com/html/horse.mp3"
    );

    if (usingPlaceholders) {
        console.info("💡 Tip: Replace the placeholder audio files in script.js with your own legally obtained music files.");
        console.info("📁 Create an 'audio' folder and add your MP3/WAV files, then update the paths in the tracks array.");
    }
}

// Show different views
function showView(view) {
    // Hide all sections
    heroSection.style.display = 'none';
    tracksSection.style.display = 'none';
    playlistSection.style.display = 'none';

    // Remove active class from all nav links
    navLinks.forEach(link => link.classList.remove('active'));

    // Show the selected section
    switch (view) {
        case 'home':
            heroSection.style.display = 'block';
            tracksSection.style.display = 'block';
            // Find the home link (first one)
            navLinks[0].classList.add('active');
            break;
        case 'library':
            // For library view, we'll show tracks in the main area
            heroSection.style.display = 'none';
            tracksSection.style.display = 'block';
            // Find the library link (third one)
            navLinks[2].classList.add('active');
            renderLibrary();
            break;
        case 'search':
            // For now, just show a placeholder
            heroSection.style.display = 'none';
            tracksSection.style.display = 'block';
            // Find the search link (second one)
            navLinks[1].classList.add('active');
            tracksList.innerHTML = `
                <div class="loading-message">
                    <p>Search functionality coming soon</p>
                    <p class="hint">Use the library to save your favorite tracks</p>
                </div>
            `;
            break;
        case 'playlists':
            // For now, just show a placeholder
            heroSection.style.display = 'none';
            tracksSection.style.display = 'block';
            // Find the playlists link (fourth one)
            navLinks[3].classList.add('active');
            tracksList.innerHTML = `
                <div class="loading-message">
                    <p>Playlist functionality coming soon</p>
                    <p class="hint">Create playlists from your library</p>
                </div>
            `;
            break;
    }

    currentView = view;
}

// Play all tracks in library
function playLibrary() {
    if (library.length === 0) {
        showNotification('Your library is empty');
        return;
    }

    // Find the first track in library that exists in our tracks array
    const firstTrack = library[0];
    const trackIndex = tracks.findIndex(t =>
        t.title === firstTrack.title &&
        t.artist === firstTrack.artist &&
        t.album === firstTrack.album
    );

    if (trackIndex !== -1) {
        playTrack(trackIndex);
        showView('home');
        showNotification('Playing your library');
    } else {
        showNotification('Error: Could not find track in library');
    }
}

// Clear library
function clearLibrary() {
    if (library.length === 0) {
        showNotification('Your library is already empty');
        return;
    }

    if (confirm('Are you sure you want to clear your entire library?')) {
        library = [];
        localStorage.setItem('auraMusicLibrary', JSON.stringify(library));
        updateLibraryButtonStates();
        if (currentView === 'library') {
            renderLibrary();
        }
        showNotification('Library cleared');
    }
}

// Event listeners setup
function setupEventListeners() {
    // Play/pause button
    playPauseBtn.addEventListener('click', togglePlayPause);

    // Previous/next buttons
    prevBtn.addEventListener('click', playPreviousTrack);
    nextBtn.addEventListener('click', playNextTrack);

    // Progress bar click
    progressBar.addEventListener('click', updateProgressFromClick);

    // Progress bar drag (for custom scrubbing)
    let isDragging = false;
    progressThumb.addEventListener('mousedown', (e) => {
        isDragging = true;
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            updateProgressFromDrag(e);
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Volume control
    volumeSlider.addEventListener('input', (e) => {
        setVolume(e.target.value / 100);
    });

    volumeBtn.addEventListener('click', toggleMute);

    // Like button (heart) - acts as favorite/save button
    likeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleSaveTrack();
    });

    // Save button
    saveBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleSaveTrack();
    });

    // More options button
    moreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Show a simple context menu for library options
        if (library.length > 0) {
            const choice = prompt('Library options:\n1. Play Library\n2. Clear Library\n\nEnter 1 or 2:');
            if (choice === '1') {
                playLibrary();
            } else if (choice === '2') {
                clearLibrary();
            }
        } else {
            alert('Your library is empty. Save some tracks first!');
        }
    });

    // Download button (placeholder)
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Download functionality coming soon!');
    });

    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const view = link.getAttribute('href').substring(1); // Remove the '#'
            if (view === '') {
                showView('home');
            } else {
                showView(view);
            }
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            // Don't trigger shortcuts when typing in form fields
            return;
        }

        if (e.code === 'Space') {
            e.preventDefault();
            togglePlayPause();
        } else if (e.code === 'ArrowLeft') {
            e.preventDefault();
            playPreviousTrack();
        } else if (e.code === 'ArrowRight') {
            e.preventDefault();
            playNextTrack();
        } else if (e.code === 'ArrowUp') {
            e.preventDefault();
            const newVolume = Math.min(1, audio.volume + 0.1);
            setVolume(newVolume);
        } else if (e.code === 'ArrowDown') {
            e.preventDefault();
            const newVolume = Math.max(0, audio.volume - 0.1);
            setVolume(newVolume);
        } else if (e.code === 'KeyM') {
            e.preventDefault();
            toggleMute();
        } else if (e.code === 'KeyS') {
            e.preventDefault();
            toggleSaveTrack();
        } else if (e.code === 'KeyP') {
            e.preventDefault();
            playLibrary();
        } else if (e.code === 'KeyL') {
            e.preventDefault();
            showView('library');
        }
    });
}

// Initialize the player when the page loads
document.addEventListener('DOMContentLoaded', initPlayer);