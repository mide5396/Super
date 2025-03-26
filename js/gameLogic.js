function AddStrength(strengthAdd) {
    currentStrength += strengthAdd;
    strengthDisplay.textContent = parseFloat(currentStrength.toFixed(2));
}

function removeAllEventListeners(button) {
    const newButton = button.cloneNode(true); // Clone the button (without event listeners)
    button.parentNode.replaceChild(newButton, button); // Replace the old button
    return newButton; // Return the new button if needed
}


function HandleTrainingButtonListeners(buttonType) {
    pressButton = removeAllEventListeners(pressButton);
    switch (buttonType) {
        case ButtonPressType.HOLD:
            pressButton.addEventListener("mousedown", BeginFilling);  // Start filling on press
            pressButton.addEventListener("mouseup", StopFilling);     // Stop filling on release
            pressButton.addEventListener("mouseleave", StopFilling);
            break;
        case ButtonPressType.CLICK:
            pressButton.addEventListener("click", progressBarFill)
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


