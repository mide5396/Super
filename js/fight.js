fightButton.addEventListener("click", StartFight);


let isJumping = false;
let score = 0;
let isGameOver = false;
let obstaclePosition = 800;

let currentFightSpeed = 5;

function CheckClick() {
    const dinoRect = dinosaur.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
    const isHorizontallyColliding = dinoRect.right > obstacleRect.left && dinoRect.left < obstacleRect.right;
    if (isHorizontallyColliding) {
        CalculateCurrentFightSpeed();
        FightProgressBarFill();
        obstaclePosition = 800; // Reset the obstacle position after a successful hit        
    } else {
        gameOver();
    }
}

function CalculateTotalFightSpeed(){
    fightSpeed = fightSpeed + fightSpeed * speedUpRate / (currentPower + 1);
}

function CalculateCurrentFightSpeed()
{
    currentFightSpeed = currentFightSpeed + currentFightSpeed*speedUpRate / (currentPower + 1);
}

function FightWon()
{
    CalculateTotalFightSpeed();
    isGameOver = true;
    score = 0;
    fightButton = removeAllEventListeners(fightButton);
    fightButton.addEventListener("click", StartFight);

}

function updateFight() {
    if (isGameOver) return;

    // Move obstacle
    obstaclePosition -= currentFightSpeed;
    obstacle.style.right = `${800 - obstaclePosition}px`;

    // If obstacle goes off screen, reset its position and increase score
    if (obstaclePosition < 0) {
        obstaclePosition = 800;
        gameOver();
    }
    requestAnimationFrame(updateFight);
}

function gameOver() {
    isGameOver = true;
    score = 0;
    fightButton = removeAllEventListeners(fightButton);
    fightButton.addEventListener("click", StartFight);
    FightRemoveProgress();
}

function StartFight()
{
    isGameOver = false;
    currentFightSpeed = fightSpeed;
    updateFight();
    fightButton = removeAllEventListeners(fightButton);
    fightButton.addEventListener("click", CheckClick);
}

