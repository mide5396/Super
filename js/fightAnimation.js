const container = document.querySelector('.gray-box');
const whiteSquare = document.getElementById('white-square');

// Radius of the circle within which the square can move
const radius = 20; // Adjust the radius as needed

// Initial position and velocity for the white square
let velX = 2; // pixels per frame
let velY = 2;

let posX = 0;
let posY = 0;

let centerX = 0;
let centerY = 0;

let moveDirectionChanged = false; // Flag to track if direction has been changed

let lastDirectionChangeTime = 0; // Track the last time direction was changed
const directionChangeInterval = 3000;

// Get the dimensions of the container and square (assumed square)
let containerWidth = 0; // Correctly access container width
let containerHeight = 0;// Correctly access container height
let squareSize = 0; // Correctly access square size

let currentTranslateX = 0; // Track the current horizontal translation of the map
let currentTranslateY = 0; // Track the current vertical translation of the map

function SetHeroPosition()
{
  // Get the dimensions of the container and square (assumed square)
  containerWidth = container.offsetWidth; // Correctly access container width
  containerHeight = container.offsetHeight; // Correctly access container height
  squareSize = whiteSquare.offsetWidth; // Correctly access square size

  // Center of the container
  centerX = containerWidth / 2;
  centerY = containerHeight / 2;

  // Apply the initial centered position
  posX = centerX - squareSize / 2;
  posY = centerY - squareSize / 2;

  // Apply the initial position to the white square
  whiteSquare.style.left = posX + "px";
  whiteSquare.style.top = posY + "px";
}

// Function to check if the square is within the radius
function isWithinRadius(x, y) {
  const dist = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
  return dist <= radius;
}

function changeDirection() {
  const noiseFactor = 0.5; // Adjust the noise level as needed
  const directionChange = Math.random();

  if (directionChange < 0.33) {
    // Reverse both velocities and add noise
    velX = -velX + (Math.random() * noiseFactor - noiseFactor / 2); // Reverse X and add noise
    velY = -velY + (Math.random() * noiseFactor - noiseFactor / 2); // Reverse Y and add noise
  }
  else if (directionChange < 0.66) {
    // Change the X direction completely randomly and adjust Y with noise
    velX = Math.random() * 4 - 2; // Random value between -2 and 2 for X
    velY = -velY + (Math.random() * noiseFactor - noiseFactor / 2); // Reverse Y and add noise
  }
  else {
    // Change the Y direction completely randomly and adjust X with noise
    velX = -velX + (Math.random() * noiseFactor - noiseFactor / 2); // Reverse X and add noise
    velY = Math.random() * 4 - 2; // Random value between -2 and 2 for Y
  }

  moveDirectionChanged = false; // Reset the flag after changing direction
}

function update() {
  // Update the position based on velocity
  if (!moveDirectionChanged)
  {
    posX += velX;
    posY += velY;
  
    // Ensure the square is within the radius (radius constraint)
    if (!isWithinRadius(posX + squareSize / 2, posY + squareSize / 2)) {
      // Stop the square if it exceeds the radius
      moveDirectionChanged = true; // Stop further movement in the current direction
    }
    // Apply the new position to the white square
    whiteSquare.style.left = posX + "px";
    whiteSquare.style.top = posY + "px";


  }
 
  // Adjust the background position of the gray box to make it "move" with the square
  let mapSpeed = 1;
  // Incrementally move the map based on square velocity
  currentTranslateX -= velX * mapSpeed;
  currentTranslateY -= velY * mapSpeed;

  // Apply the background translation using transform
  container.style.backgroundPosition = `${currentTranslateX}px ${currentTranslateY}px`;

  // Check if it's time to change direction (3 seconds)
  let currentTime = Date.now();
  if (moveDirectionChanged && currentTime - lastDirectionChangeTime >= directionChangeInterval) {
    changeDirection(); // Change direction
    lastDirectionChangeTime = currentTime; // Update the last change time
    console.log("Direction Changed");
    moveDirectionChanged = false; // Reset flag for new direction to move in
  }

  // Continue the animation loop
  requestAnimationFrame(update);
}
// Start the animation loop
requestAnimationFrame(update);