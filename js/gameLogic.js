function gameTick() {
    Object.keys(resources).forEach(resource => {
        let res = resources[resource];
        res.amount = Math.min(res.amount + res.speed * res.bars, res.cap);
    });

    updateUI();
    requestAnimationFrame(gameTick);
}

function allocateResource(type, feature) {
    let res = resources[type];
    if (res.amount >= 10) {
        res.amount -= 10;
        let output = 10; // Base output
        if (feature === "advanced") output *= Math.sqrt(res.power); // Advanced uses sqrt(Power)
        if (feature !== "basic" && feature !== "wandoos") output *= res.power; // Others use Power
        
        console.log(`${feature} gained ${output} from ${type}!`);
    } else {
        console.log(`Not enough ${type}!`);
    }
    updateUI();
}

function updateUI() {
    Object.keys(resources).forEach(resource => {
        let res = resources[resource];
        document.getElementById(`${resource}-text`).innerText = Math.floor(res.amount);
        document.getElementById(`${resource}-cap`).innerText = res.cap;
        document.getElementById(`${resource}-bar`).style.width = `${(res.amount / res.cap) * 100}%`;
    });

    updateSkillUI("attack-skills", "attack");
    updateSkillUI("defense-skills", "defense");
}

function trainSkill(type, index) {
    let skill = skills[type][index];
    let energyRes = resources.energy;

    if (energyRes.amount >= 10 && (index === 0 || skills[type][index - 1].levels >= skill.req)) {
        energyRes.amount -= 10;
        skill.levels += 10; // Train at max rate of 50 levels/sec
        skill.cap = Math.max(1, skill.cap * 0.99); // Reduce cap over time
    }
    updateUI();
}


function updateSkillUI(containerId, type) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    skills[type].forEach((skill, index) => {
        let isUnlocked = index === 0 || skills[type][index - 1].levels >= skill.req;
        let skillDiv = document.createElement("div");
        skillDiv.className = `skill ${isUnlocked ? "unlocked" : "locked"}`;
        skillDiv.innerText = `${skill.name}: ${skill.levels} (Cap: ${skill.cap.toFixed(0)})`;
        if (isUnlocked) {
            skillDiv.onclick = () => trainSkill(type, index);
        }
        container.appendChild(skillDiv);
    });
}



requestAnimationFrame(gameTick);

function AddStrength(strengthAdd) {
    currentStrength += strengthAdd;
    strengthDisplay.textContent = parseFloat(currentStrength.toFixed(2));
}

function AddPower(powerAdd)
{
    currentPower += powerAdd;
    powerDisplay.textContent = parseFloat(currentPower.toFixed(2));
}


function HandleTrainingButtonListeners(buttonType) {
    trainButton = removeAllEventListeners(trainButton);
    switch (buttonType) {
        case ButtonPressType.HOLD:
            trainButton.addEventListener("mousedown", TrainBeginFilling);  // Start filling on press
            trainButton.addEventListener("mouseup", TrainStopFilling);     // Stop filling on release
            trainButton.addEventListener("mouseleave", TrainStopFilling);
            break;
        case ButtonPressType.CLICK:
            trainButton.addEventListener("click", TrainProgressBarFill)
            break;
        default:
            console.warn("Unknown button type:", buttonType);
    }
}

function StartStrengthTraining() {
    const UpdateRate = 100;
    const progressInterval = setInterval(function() {
        AddStrength(strengthRate / UpdateRate) // Update the progress by the current strength rate
    }, UpdateRate);
}


