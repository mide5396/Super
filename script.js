let progress = 0;
let currentStrength = 0;
let strengthRate = 0;
let drainRate = 1;
let totalDrainRate = 1;
let clickUpgradeCost = 10;

let numberOfClickerUpgrades = 0;
let numberOfProgressUpgrades = 1;

let clickUpgradeRate = 1;
let powerUpgradeRate = 1;

let powerIncrements = 5;

const introProgressBar = document.getElementById("intro-progress-bar");
const progressBar = document.getElementById("progress-bar")
const introPressButton = document.getElementById("intro-press-button");
const pressButton = document.getElementById("press-button");
const strengthDisplay = document.getElementById("strength-value");
const powerDisplay = document.getElementById("power-value");
const audio = document.getElementById("gameAudio");
const invincibleImage = document.getElementById("invincibleImage");

const upgradeButton = document.getElementById('upgrade-click');
const upgradeCostText = document.getElementById('update-cost');


const upgrades = [
    { id: 'upgrade-click', cost: 10, multiplier: 1.5, effect: () => UpdateStrengthRate(1), costDisplayId: 'click-cost' },
    { id: 'upgrade-power', cost: 20, multiplier: 2, effect: () => UpdatePowerRate(5), costDisplayId: 'power-cost' }
];

introPressButton.addEventListener("click", introProgressBarFill);
pressButton.addEventListener("click", progressBarFill)

upgrades.forEach(upgrade => {
    const upgradeButton = document.getElementById(upgrade.id);
    if (upgradeButton) {
        upgradeButton.addEventListener('click', () => handleUpgrade(upgrade));
    }
});

function handleUpgrade(upgrade) {
    if (currentStrength >= upgrade.cost) {
        RemoveStrength(upgrade.cost);   // Deduct strength
        upgrade.effect();               // Apply upgrade effect
        upgrade.cost = Math.round(upgrade.cost * upgrade.multiplier);  // Increase cost
        document.getElementById(upgrade.costDisplayId).textContent = upgrade.cost;  // Update UI
    } else {
        alert("Not enough strength!");
    }
}
// Drain the progress bar over time at a fixed rate
function startDraining() {
    setInterval(() => {
        if (progress > 0) {
            progress -= totalDrainRate;  // Decrease progress by the set rate
        }

        if (progress < 0)
        {
            progress = 0;
        }

        progressBar.style.width = progress + "%";
    }, 100);  // Drains every 1000 ms (1 second)
}

function UpdateProgressDrainRate()
{
    numberOfProgressUpgrades += 1;
    totalDrainRate = numberOfProgressUpgrades * drainRate;
}


function UpdateUpgradeCost(rate)
{
 
    clickUpgradeCost = Math.round(clickUpgradeCost * rate * numberOfClickerUpgrades);     // Increase the cost for next upgrade (optional)
    upgradeCostText.textContent = clickUpgradeCost;
}


function UpdateStrengthRate(updatedRate)
{
    strengthRate += updatedRate;
    if (strengthRate > 0) {
        StartStrengthTraining();
    }
}

function UpdatePowerRate(updatedRate)
{
    powerIncrements += updatedRate;
    powerDisplay.textContent = powerIncrements;
}

function StartStrengthTraining() {
    const UpdateRate = 100;
    const progressInterval = setInterval(function() {
        AddStrength(strengthRate / UpdateRate) // Update the progress by the current strength rate
    }, UpdateRate);
}




function introProgressBarFill(){
    fillProgressIntro(2);
}

function progressBarFill()
{
    fillProgress(powerIncrements);
}

function fillProgressIntro(increment) {
    const invText = document.getElementById("invincible-text");
    progress += increment; // Increase progress by the given increment
    // Text Update Logic
    if (progress >= 5 && progress < 15) {
        invText.textContent = "I need to train...";
    } else if (progress >= 15 && progress < 50) {
        invText.textContent = "I need to become faster...";
    } else if (progress >= 50 && progress < 80) {
        invText.textContent = "I need to become stronger...";
    } else if (progress >= 80 && progress < 100){
        invText.textContent = "I need to become...";
    } else if (progress >= 100) {
        showInvincibleScreen(); // Trigger invincible screen
        progress = 0;
    }

    introProgressBar.style.width = progress + "%";
}

function fillProgress(increment) {
    progress += increment; // Increase progress by the given increment
    if (progress >= 100) {
        progress = 0;
        UpdateProgressDrainRate();
        AddStrength(20);
    }
    progressBar.style.width = progress + "%";
}



function AddStrength(strengthAdd)
{
    currentStrength += strengthAdd;
    strengthDisplay.textContent = parseFloat(currentStrength.toFixed(2));
}

function RemoveStrength(strengthRemove)
{
    currentStrength -= strengthRemove;
    strengthDisplay.textContent = parseFloat(currentStrength.toFixed(2));
}

function showInvincibleScreen(){
    invincibleImage.style.display = "block";
    zoomInImage();
}

function hideInvincibleScreen() {
    invincibleImage.style.display = "none";
}

function zoomInImage() {
    const img = document.getElementById("invincibleImage");
    audio.play();
    
    img.style.display = "block"; // Show the image

    let scale = 1;
    let speed = 0.01; // Fast at first

    function animate() {
        scale += speed;
        if (scale >= 1.2){
            showBloodSplatter();
            return;
        }

        if (speed > 0.0005)
        {
            speed *= 0.95; // Gradually slow down
        }

 
        img.style.transform = `scale(${scale})`;

        requestAnimationFrame(animate);
    }

    animate();
}

function showBloodSplatter() {
    const blood = document.getElementById("bloodSplatter");
    blood.style.display = "block";
    let opacity = 0;
    let splatterScale = 0.5;
    let splatterSpeed = 0.1;

    function animateSplatter() {
        opacity += 0.05;
        splatterScale += splatterSpeed;
        splatterSpeed *= 0.9; // Slow down the expansion

        blood.style.opacity = opacity;
        //blood.style.transform = `scale(${splatterScale}) rotate(10deg)`;

        if (opacity < 1) {
            requestAnimationFrame(animateSplatter);
        }
        else
        {
            setTimeout(startGame, 2000);
        }
    }

    animateSplatter();
}

function initializeUpgradeUI() {
    upgrades.forEach(upgrade => {
        const costElement = document.getElementById(upgrade.costDisplayId);
        if (costElement) {
            costElement.textContent = upgrade.cost; // Set initial cost
        }
    });
}

function startGame(){
    const introScreen = document.getElementById("introScreen");

    document.getElementById("background-video-container").style.display = "block";

    initializeUpgradeUI();

    introScreen.style.display = "none";
    const gameScreen = document.getElementById("gameScreen");
    gameScreen.style.display = "block"; // Show the game screen
    audio.src = "assets/invincSong.mp3";
    audio.play();
    progress = 0;
    startDraining();
    introPressButton.addEventListener("click", introProgressBarFill);
    
}