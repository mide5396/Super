const upgrades = [
    { id: 'upgrade-click', cost: 10, multiplier: 1.5, effect: () => UpdateStrengthRate(1), costDisplayId: 'click-cost' },
    { id: 'upgrade-power', cost: 20, multiplier: 2, effect: () => UpdatePowerRate(5), costDisplayId: 'power-cost' }
];

upgrades.forEach(upgrade => {
    const upgradeButton = document.getElementById(upgrade.id);
    if (upgradeButton) {
        upgradeButton.addEventListener('click', () => handleUpgrade(upgrade));
    }
});

function handleUpgrade(upgrade) {
    if (currentStrength >= upgrade.cost) {
        RemoveStrength(upgrade.cost);
        upgrade.effect();
        upgrade.cost = Math.round(upgrade.cost * upgrade.multiplier);
        document.getElementById(upgrade.costDisplayId).textContent = upgrade.cost;
    } else {
        alert("Not enough strength!");
    }
}

function UpdateProgressDrainRate() {
    numberOfProgressUpgrades += 1;
    totalDrainRate = numberOfProgressUpgrades * drainRate;
}

function UpdateStrengthRate(updatedRate) {
    strengthRate += updatedRate;
    if (strengthRate > 0) {
        StartStrengthTraining();
    }
}

function UpdatePowerRate(updatedRate) {
    powerIncrements += updatedRate;
    powerDisplay.textContent = powerIncrements;
}

function RemoveStrength(strengthRemove) {
    currentStrength -= strengthRemove;
    strengthDisplay.textContent = parseFloat(currentStrength.toFixed(2));
}
