if (skipintro)
{
    startGame();
}


introPressButton.addEventListener("click", introProgressBarFill);


function startGame() {
    const introScreen = document.getElementById("introScreen");

    document.getElementById("background-video-container").style.display = "block";

    initializeUpgradeUI();
    HandleTrainingButtonListeners(ButtonPressType.HOLD);

    introScreen.style.display = "none";
    document.getElementById("gameScreen").style.display = "block";

    audio.src = "assets/invincSong.mp3";
    //audio.play();
    audio.volume = 0.2;
    progress = 0;
    level = 0;
    TrainStartDraining();
    SetHeroPosition();
}

function showInvincibleScreen(){
    invincibleImage.style.display = "block";
    audio.volume = 1;
    audio.play();
    zoomInImage();
}

function hideInvincibleScreen() {
    invincibleImage.style.display = "none";
}

function initializeUpgradeUI() {
    upgrades.forEach(upgrade => {
        const costElement = document.getElementById(upgrade.costDisplayId);
        if (costElement) {
            costElement.textContent = upgrade.cost; // Set initial cost
        }
    });
}

function zoomInImage() {
    const img = document.getElementById("invincibleImage");
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

function fillProgressIntro(increment) {
    const invText = document.getElementById("invincible-text");
    progress += increment;

    if (progress >= 5 && progress < 15) {
        invText.textContent = "I need to train...";
    } else if (progress >= 15 && progress < 50) {
        invText.textContent = "I need to become faster...";
    } else if (progress >= 50 && progress < 80) {
        invText.textContent = "I need to become stronger...";
    } else if (progress >= 80 && progress < 100) {
        invText.textContent = "I need to become...";
    } else if (progress >= 100) {
        showInvincibleScreen();
        progress = 0;
    }

    introProgressBar.style.width = progress + "%";
}

function introProgressBarFill() {
    fillProgressIntro(100);
}
