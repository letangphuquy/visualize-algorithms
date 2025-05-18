/**
 * animation-controls.js
 * Implements animation control functions for the prefix sum visualization
 */

/**
 * Create step navigation controls
 */
PrefixSumVisualization.createStepControls = function() {
    // Check if controls already exist
    if (document.querySelector('.step-controls')) {
        return; // Controls already exist, don't create them again
    }
    
    // Add navigation controls to the UI with distinct buttons to toggle navigation
    const controlsDiv = document.createElement("div");
    controlsDiv.className = "step-controls";
    controlsDiv.innerHTML = `
        <button id="start-btn" title="Đi đến bước đầu tiên"><i>⏮</i> Bắt đầu</button>
        <button id="prev-step" disabled title="Đi đến bước trước đó"><i>◀</i> Lùi</button>
        <button id="pause-animation" title="Tạm dừng/Tiếp tục hoạt hình"><i>⏯</i> Tạm dừng</button>
        <button id="next-step" disabled title="Đi đến bước tiếp theo">Tiếp <i>▶</i></button>
        <button id="finish-btn" title="Bỏ qua đến kết quả cuối cùng"><i>⏭</i> Kết thúc</button>
    `;

    // Insert after the progress tracker
    if (this.elements.progressTracker) {
        this.elements.progressTracker.after(controlsDiv);
    } else if (this.elements.animationControls) {
        this.elements.animationControls.after(controlsDiv);
    }
    
    // Set up button click handlers
    document.getElementById("start-btn").addEventListener("click", () => this.goToStart());
    document.getElementById("prev-step").addEventListener("click", () => this.prevStep());
    document.getElementById("pause-animation").addEventListener("click", () => this.togglePause());
    document.getElementById("next-step").addEventListener("click", () => {
        if (this.currentStep < this.steps.length - 1) {
            this.nextStep(true); // Pass true to indicate manual navigation
        }
    });
    document.getElementById("finish-btn").addEventListener("click", () => this.skipToFinish());
};

/**
 * Toggle animation pause state
 */
PrefixSumVisualization.togglePause = function() {
    const pauseBtn = document.getElementById("pause-animation");
    
    if (this.isPaused) {
        // Resume animation if we have more steps
        if (this.currentStep < this.steps.length - 1) {
            this.animationInterval = setInterval(() => this.nextStep(), this.animationSpeed);
        }
        // Update UI
        pauseBtn.textContent = "⏯ Tạm dừng";
        pauseBtn.classList.remove("paused");
    } else {
        // Pause animation
        clearInterval(this.animationInterval);
        // Update UI
        pauseBtn.textContent = "⏯ Tiếp tục";
        pauseBtn.classList.add("paused");
    }
    
    this.isPaused = !this.isPaused;
    // Enable navigation buttons when paused, with proper boundary checks
    document.getElementById("prev-step").disabled = !this.isPaused || this.currentStep <= 0;
    document.getElementById("next-step").disabled = !this.isPaused || this.currentStep >= this.steps.length - 1;
};

/**
 * Go to first step function
 */
PrefixSumVisualization.goToStart = function() {
    clearInterval(this.animationInterval);
    this.currentStep = 0;
    this.displayStep();
    this.updateProgressTracker();
    
    // Update button states
    document.getElementById("prev-step").disabled = true;
    document.getElementById("next-step").disabled = false;
    document.getElementById("pause-animation").textContent = "⏯ Tiếp tục";
    document.getElementById("pause-animation").classList.add("paused");
    
    this.isPaused = true;
};

/**
 * Skip to finish function
 */
PrefixSumVisualization.skipToFinish = function() {
    clearInterval(this.animationInterval);
    this.currentStep = this.steps.length - 1;
    this.displayStep();
    this.updateProgressTracker();
    
    // Update button states
    document.getElementById("prev-step").disabled = false;
    document.getElementById("next-step").disabled = true;
    document.getElementById("pause-animation").textContent = "⏯ Tiếp tục";
    document.getElementById("pause-animation").classList.add("paused");
    
    this.isPaused = true;
};

/**
 * Move to the next step in animation
 * @param {boolean} isManual - Whether the navigation was triggered manually
 */
PrefixSumVisualization.nextStep = function(isManual = false) {
    // Prevent stepping beyond array bounds
    if (this.currentStep >= this.steps.length - 1) {
        // If at the last step, stop the animation
        clearInterval(this.animationInterval);
        this.updateProgressTracker();
        return;
    }

    this.currentStep++;
    if (this.currentStep < this.steps.length) {
        this.displayStep();
        this.updateProgressTracker();
        
        // If manual navigation, update button states with robust boundary checks
        if (isManual) {
            document.getElementById("prev-step").disabled = this.currentStep <= 0;
            document.getElementById("next-step").disabled = this.currentStep >= this.steps.length - 1;
        }
    }
};

/**
 * Move to the previous step in animation
 */
PrefixSumVisualization.prevStep = function() {
    // Prevent stepping before first step
    if (this.currentStep <= 0) return;
    
    this.currentStep--;
    this.displayStep();
    this.updateProgressTracker();
    
    // Update button states with strict boundary checks
    document.getElementById("next-step").disabled = false; // Next is always available if we went back
    document.getElementById("prev-step").disabled = this.currentStep <= 0;
};

/**
 * Update the progress tracker display
 */
PrefixSumVisualization.updateProgressTracker = function() {
    if (this.elements.progressTracker) {
        this.elements.progressTracker.textContent = `Bước ${this.currentStep + 1} / ${this.steps.length}`;
    }
};
