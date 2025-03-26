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


