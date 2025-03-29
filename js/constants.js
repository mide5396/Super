const TICK_RATE = 1000 / 50; // 1/50th of a second = 20ms
const skipintro = true;
const MAX_RESOURCES = 100; 

let resources = {
    energy: { amount: 0, cap: 100, speed: 1, power: 1, bars: 1 },
    magic: { amount: 0, cap: 100, speed: 1, power: 1, bars: 1 },
    r3: { amount: 0, cap: 100, speed: 1, power: 1, bars: 1 }
};

const skills = {
    attack: [
        { name: "Idle Attack", base: 150, cap: 2500, levels: 0, req: 0 },
        { name: "Regular Attack", base: 1000, cap: 15000, levels: 0, req: 5000 },
        { name: "Strong Attack", base: 2000, cap: 30000, levels: 0, req: 10000 },
        { name: "Parry", base: 10000, cap: 50000, levels: 0, req: 15000 },
        { name: "Piercing Attack", base: 50000, cap: 70000, levels: 0, req: 20000 },
        { name: "Ultimate Attack", base: 200000, cap: 100000, levels: 0, req: 25000 }
    ],
    defense: [
        { name: "Block", base: 150, cap: 2500, levels: 0, req: 0 },
        { name: "Defensive Buff", base: 1000, cap: 15000, levels: 0, req: 5000 },
        { name: "Heal", base: 2000, cap: 30000, levels: 0, req: 10000 },
        { name: "Offensive Buff", base: 10000, cap: 50000, levels: 0, req: 15000 },
        { name: "Charge", base: 50000, cap: 70000, levels: 0, req: 20000 },
        { name: "Ultimate Buff", base: 200000, cap: 100000, levels: 0, req: 25000 }
    ]
};

let level = 0;
let lastUpdate = Date.now();


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