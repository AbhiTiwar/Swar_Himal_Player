const songsList = [
    { title: "Nepali Raag", artist: "Prem Dhoj Joshi", duration: "3:45", genre: "Classical" },
    { title: "Himalayan Echo", artist: "Naresh Acharya", duration: "4:12", genre: "Folk" },
    { title: "Mountain Dreams", artist: "Sweata Bhattarai", duration: "3:30", genre: "Pop" },
    { title: "Kathmandu Nights", artist: "Jal Jalaima Band", duration: "4:05", genre: "Rock" },
    { title: "Annapurna Song", artist: "Shanti Shanti", duration: "3:50", genre: "Devotional" },
    { title: "Valley of Love", artist: "Bipul Chettri", duration: "3:25", genre: "Pop" },
    { title: "Sacred Mountain", artist: "Tandin Norbu", duration: "4:30", genre: "Meditation" },
    { title: "Pokhara Sunset", artist: "Arun Neupane", duration: "3:15", genre: "Folk" }
];

let currentSong = 0;
let isPlaying = false;
let repeatMode = 0;

document.addEventListener('DOMContentLoaded', () => {
    loadPlaylist();
    updateNowPlaying();
});

function loadPlaylist() {
    const playlistContainer = document.getElementById('playlistContainer');
    playlistContainer.innerHTML = '';
    songsList.forEach((song, index) => {
        const songCard = document.createElement('div');
        songCard.className = 'song-card';
        if (index === currentSong) songCard.style.borderColor = 'var(--primary-color)';
        songCard.innerHTML = `<h4>${song.title}</h4><p>${song.artist}</p><p style="font-size: 0.8rem; color: var(--primary-color);">${song.genre}</p><p style="font-size: 0.8rem;">⏱️ ${song.duration}</p>`;
        songCard.onclick = () => playSong(index);
        playlistContainer.appendChild(songCard);
    });
}

function updateNowPlaying() {
    const song = songsList[currentSong];
    document.getElementById('song-title').textContent = song.title;
    document.getElementById('song-artist').textContent = song.artist;
    document.getElementById('duration').textContent = song.duration;
    loadPlaylist();
}

function playSong(index) {
    currentSong = index;
    isPlaying = true;
    updateNowPlaying();
    updatePlayButton();
    showNotification(`Now Playing: ${songsList[index].title}`);
}

function togglePlay() {
    isPlaying = !isPlaying;
    updatePlayButton();
}

function updatePlayButton() {
    const playBtn = document.getElementById('playBtn');
    if (isPlaying) {
        playBtn.textContent = '⏸️';
        playBtn.style.background = 'var(--secondary-color)';
    } else {
        playBtn.textContent = '▶️';
        playBtn.style.background = 'var(--primary-color)';
    }
}

function nextSong() {
    currentSong = (currentSong + 1) % songsList.length;
    isPlaying = true;
    updateNowPlaying();
    updatePlayButton();
}

function previousSong() {
    currentSong = (currentSong - 1 + songsList.length) % songsList.length;
    isPlaying = true;
    updateNowPlaying();
    updatePlayButton();
}

function toggleRepeat() {
    repeatMode = (repeatMode + 1) % 3;
    showNotification(['Repeat Off', 'Repeat One', 'Repeat All'][repeatMode]);
}

function togglePlaylist() {
    const playlistContainer = document.getElementById('playlistContainer');
    const btn = event.target.closest('button');
    if (playlistContainer.style.display === 'none') {
        playlistContainer.style.display = 'grid';
        btn.textContent = '📋 Hide Playlist';
    } else {
        playlistContainer.style.display = 'none';
        btn.textContent = '📋 Show Playlist';
    }
}

function scrollToPlayer() {
    document.getElementById('player').scrollIntoView({ behavior: 'smooth' });
}

function openLogin() { document.getElementById('loginModal').style.display = 'block'; }
function closeLogin() { document.getElementById('loginModal').style.display = 'none'; }
function openSignup() { document.getElementById('signupModal').style.display = 'block'; }
function closeSignup() { document.getElementById('signupModal').style.display = 'none'; }

function handleLogin(event) {
    event.preventDefault();
    showNotification('✅ Login successful!');
    closeLogin();
}

function handleSignup(event) {
    event.preventDefault();
    showNotification('✅ Account created!');
    closeSignup();
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = 'position: fixed; top: 20px; right: 20px; background: var(--primary-color); color: white; padding: 15px 25px; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); z-index: 3000;';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

document.getElementById('progress').addEventListener('input', (e) => {
    const progress = e.target.value;
    const minutes = Math.floor(progress * 3.75 / 100);
    const seconds = Math.floor((progress * 3.75 % 1) * 60);
    document.getElementById('current-time').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

document.getElementById('volume').addEventListener('input', (e) => {
    showNotification(`🔊 Volume: ${e.target.value}%`);
});

window.onclick = function(event) {
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    if (event.target == loginModal) loginModal.style.display = 'none';
    if (event.target == signupModal) signupModal.style.display = 'none';
}