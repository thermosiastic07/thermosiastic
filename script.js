let photos = [];
let currentPhotoIndex = 0;

// Music Control
const backgroundMusic = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');

musicToggle.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicToggle.classList.remove('muted');
    } else {
        backgroundMusic.pause();
        musicToggle.classList.add('muted');
    }
});

// Auto-play music
document.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
    }
});

// Photo Upload Handler
document.getElementById('photoInput').addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
            photos.push(event.target.result);
            updatePhotoCount();
            displayPhoto();
        };
        reader.readAsDataURL(file);
    });
});

// Display Photo
function displayPhoto() {
    const gallery = document.getElementById('galleryContainer');
    if (photos.length > 0) {
        gallery.innerHTML = `<img src="${photos[currentPhotoIndex]}" alt="Memory ${currentPhotoIndex + 1}">`;
        
        // Update button visibility
        document.getElementById('prevBtn').style.display = photos.length > 1 ? 'block' : 'none';
        document.getElementById('nextBtn').style.display = photos.length > 1 ? 'block' : 'none';
    }
}

// Navigate Photos
function nextPhoto() {
    if (photos.length > 0) {
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        displayPhoto();
    }
}

function previousPhoto() {
    if (photos.length > 0) {
        currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
        displayPhoto();
    }
}

// Update Photo Count
function updatePhotoCount() {
    document.getElementById('photoCount').textContent = `${photos.length} photo${photos.length !== 1 ? 's' : ''} uploaded`;
}

// Move No Button
function moveButton() {
    const noBtn = document.getElementById('noBtn');
    const randomX = Math.random() * (window.innerWidth - 100) - window.innerWidth / 2;
    const randomY = Math.random() * (window.innerHeight - 100) - window.innerHeight / 2;
    
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// Handle Yes Click
function handleYes() {
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';
    
    // Create confetti
    createConfetti();
    
    // Play celebration sound (optional)
    playSound();
}

// Create Confetti Animation
function createConfetti() {
    const confettiContainer = document.querySelector('.confetti');
    for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.background = ['#ff6b9d', '#c44569', '#ff69b4', '#ffb6c1', '#ff1493'][Math.floor(Math.random() * 5)];
        piece.style.animationDelay = Math.random() * 0.5 + 's';
        confettiContainer.appendChild(piece);
        
        setTimeout(() => piece.remove(), 3000);
    }
}

// Play Celebration Sound
function playSound() {
    const audio = new Audio('data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==');
    audio.play().catch(() => {
        // Sound may not work in all environments
    });
}

// Initialize
window.addEventListener('load', () => {
    displayPhoto();
});
