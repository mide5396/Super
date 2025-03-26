let progress = 0;
let fightProgress = 0;

let currentStrength = 0;
let currentPower = 0;

let strengthRate = 0;
let drainRate = 1;
let totalDrainRate = 1;
let clickUpgradeCost = 10;

let numberOfClickerUpgrades = 0;
let numberOfProgressUpgrades = 1;

let clickUpgradeRate = 1;
let powerUpgradeRate = 1;

let fightSpeed = 5;
let speedUpRate = 0.05;

let trainIncrements = 5;

let fightIncrements = 5;

let trainButton = document.getElementById("press-button");
let fightButton = document.getElementById("fight-button");

const introProgressBar = document.getElementById("intro-progress-bar");
const progressBar = document.getElementById("progress-bar");
const fightBar = document.getElementById('fight-bar');

const introPressButton = document.getElementById("intro-press-button");
const strengthDisplay = document.getElementById("strength-value");
const powerDisplay = document.getElementById("power-value");
const audio = document.getElementById("gameAudio");
const invincibleImage = document.getElementById("invincibleImage");

const upgradeButton = document.getElementById('upgrade-click');
const upgradeCostText = document.getElementById('update-cost');

const ButtonPressType = {
    HOLD: "hold",
    CLICK: "click"
};

let fillInterval;

const dinosaur = document.getElementById('dinosaur');
const obstacle = document.getElementById('obstacle');
const scoreElement = document.getElementById('score');