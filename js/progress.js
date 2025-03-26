function TrainStartDraining() {
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

function TrainProgressBarFill() {
    TrainFillProgress(trainIncrements);
}

function TrainFillProgress(increment) {
    progress += increment;
    if (progress >= 100) {
        progress = 0;
        UpdateProgressDrainRate();
        AddPower(1);
    }
    progressBar.style.width = progress + "%";
}

function TrainBeginFilling() {
    if (!fillInterval) { // Prevent multiple intervals
        fillInterval = setInterval(TrainProgressBarFill, 100);
    }
}

function TrainStopFilling() {
    clearInterval(fillInterval);
    fillInterval = null; // Reset interval ID
}

function FightProgressBarFill()
{
    FightFillProgress(fightIncrements);
}

function FightFillProgress(increment)
{
    fightProgress += increment;
    if (fightProgress >= 100)
    {
        fightProgress = 0;
        AddPower(20);
        FightWon();
    }
    fightBar.style.width = fightProgress + '%';
}

function FightRemoveProgress()
{
    fightProgress = 0;
    fightBar.style.width = fightProgress + '%';
}