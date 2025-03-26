function startDraining() {
    setInterval(() => {
        if (progress > 0) {
            progress -= totalDrainRate;
        }

        if (progress < 0) {
            progress = 0;
        }

        progressBar.style.width = progress + "%";
    }, 100);
}

function progressBarFill() {
    fillProgress(powerIncrements);
}

function fillProgress(increment) {
    progress += increment;
    if (progress >= 100) {
        progress = 0;
        UpdateProgressDrainRate();
        AddStrength(20);
    }
    progressBar.style.width = progress + "%";
}

function BeginFilling() {
    if (!fillInterval) { // Prevent multiple intervals
        fillInterval = setInterval(progressBarFill, 100);
    }
}

function StopFilling() {
    clearInterval(fillInterval);
    fillInterval = null; // Reset interval ID
}