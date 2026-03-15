// =============================================
// STEP 1: Set up the image array
// =============================================
// Array of all images to cycle through
// Customize these paths to your own images
const images = [
  './assets/pregassets/sprites/1.png',
  './assets/pregassets/sprites/2.png',
  './assets/pregassets/sprites/3.png',
  './assets/pregassets/sprites/4.png',
  './assets/pregassets/sprites/5.png',
  './assets/pregassets/sprites/6.png'
];

// =============================================
// STEP 2: Reference HTML elements
// =============================================
// Connect to the elements we need to change
const imageContent = document.querySelector('.image-content');  // Image container
const mainButton = document.getElementById('main-button');      // Image switch button
const finalMessage = document.querySelector('.final-message');  // Final message

// =============================================
// STEP 2.1: Set up audio elements
// =============================================
const clickSound = new Audio('./assets/audio/click.mp3');
const finalSong = new Audio('./assets/audio/mario.wav');
finalSong.preload = 'auto';
finalSong.volume = 0.8;

// =============================================
// STEP 3: Track what image we're at
// =============================================
// Start with the first image (index 0)
let currentIndex = 0;

// =============================================
// STEP 4: Update image function
// =============================================
// Function to change images with fade effect
function updateImage() {
  // Fade out current image
  imageContent.style.opacity = 0;

  // Preload next image
  const img = new Image();
  img.src = images[currentIndex];

  // When image is loaded
  img.onload = () => {
    // Change to new image
    imageContent.style.backgroundImage = `url('${images[currentIndex]}')`;

    // Fade in new image
    imageContent.style.opacity = 1;
  };
}

// =============================================
// STEP 5: Initial image display
// =============================================
// Show first image when page loads
updateImage();

// =============================================
// STEP 6: Button click handler
// =============================================
// Change image when button is clicked
mainButton.addEventListener('click', () => {
  // Play click sound
  clickSound.currentTime = 0;
  clickSound.play();

  // Go to next image
  currentIndex++;

  // Update if not at the end
  if (currentIndex < images.length) {
    updateImage();
  }

  // Once at the last image, show the final message, hide the button, and play song
  if (currentIndex === images.length - 1) {
    mainButton.style.display = 'none';
    finalMessage.style.display = 'block';
    createFloatingHearts();
    finalSong.currentTime = 0;
    finalSong.play();
  }
});


// Floating Hearts Animation
const heartSprites = [
  './assets/pregassets/hearts/heart_1.png',
  './assets/pregassets/hearts/heart_2.png',
  './assets/pregassets/hearts/heart_3.png',
  './assets/pregassets/hearts/heart_4.png',
  './assets/pregassets/hearts/heart_5.png'
];

function createFloatingHearts() {
  const body = document.querySelector('body');

  const heartCount = 10;

  for (let i = 0; i < heartCount; i++) {
    setTimeout(() => {
      createHeart(body);
    }, i * 300);
  }

  setInterval(() => {
    createHeart(body);
  }, 800);
}

function createHeart(body) {
  const heart = document.createElement('div');
  heart.className = 'floating-heart';

  const randomSprite = heartSprites[Math.floor(Math.random() * heartSprites.length)];
  heart.style.backgroundImage = `url('${randomSprite}')`;

  const randomX = Math.random() * 70 + 15;
  const drift = (Math.random() - 0.5) * 60;
  const duration = 3 + Math.random() * 2;

  heart.style.left = `${randomX}%`;
  heart.style.top = 'auto';
  heart.style.bottom = '20px';
  heart.style.setProperty('--drift', `${drift}px`);
  heart.style.animation = `float-up ${duration}s ease-in forwards`;

  body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}
