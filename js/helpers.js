function removeAllEventListeners(button) {
    const newButton = button.cloneNode(true); // Clone the button (without event listeners)
    button.parentNode.replaceChild(newButton, button); // Replace the old button
    return newButton; // Return the new button if needed
}
