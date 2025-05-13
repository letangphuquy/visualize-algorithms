/**
 * UI Controls Module
 * Contains functions for handling user interactions and UI controls
 */

// Initialize the application
function initializeApp() {
  // Initialize interactive inputs
  createInteractiveArrayInputs();
  
  // Initialize speed control listener
  document.getElementById("speed").addEventListener("input", function() {
    const speedValue = this.value;
    document.getElementById("speed-value").textContent = (speedValue / 1000) + 's';
    
    // If animation is running, update the interval
    if (animationInterval) {
      clearInterval(animationInterval);
      animationInterval = setInterval(nextStep, speedValue);
    }
  });
  
  // Create step controls
  createStepControls();
  
  // Reset the visualization to initial state
  resetVisualization();
  
  // Initialize validation state for both arrays
  validateArrayContainer('A');
  validateArrayContainer('B');
  
  // Disable play button initially until input is valid
  updatePlayButtonState();
}

// Create step navigation controls
function createStepControls() {
  // Add navigation controls to the UI with 5 distinct buttons to toggle navigation
  const controlsDiv = document.createElement("div");
  controlsDiv.className = "step-controls";
  controlsDiv.innerHTML = `
    <button id="start-btn" title="Go to first step"><i>⏮</i> Start</button>
    <button id="prev-step" disabled title="Go to previous step"><i>◀</i> Back</button>
    <button id="pause-animation" title="Pause/Resume animation"><i>⏯</i> Pause</button>
    <button id="next-step" disabled title="Go to next step">Next <i>▶</i></button>
    <button id="finish-btn" title="Skip to final result"><i>⏭</i> Finish</button>
  `;

  // Insert after the progress tracker
  const progressTracker = document.getElementById("progress-tracker");
  progressTracker.after(controlsDiv);
  
  // Set up button click handlers
  document.getElementById("start-btn").addEventListener("click", goToStart);
  document.getElementById("prev-step").addEventListener("click", prevStep);
  document.getElementById("pause-animation").addEventListener("click", togglePause);
  document.getElementById("next-step").addEventListener("click", function() {
    if (currentStep < steps.length - 1) {
      nextStep(true); // Pass true to indicate manual navigation
    }
  });
  document.getElementById("finish-btn").addEventListener("click", skipToFinish);
}

// Toggle animation pause state
function togglePause() {
  const pauseBtn = document.getElementById("pause-animation");
  const visualizationEl = document.getElementById("visualization");
  const progressTrackerEl = document.getElementById("progress-tracker");
  
  if (isPaused) {
    // Resume animation if we have more steps
    if (currentStep < steps.length - 1) {
      const speedValue = document.getElementById("speed").value;
      animationInterval = setInterval(() => nextStep(), speedValue);
    }
    
    // Update UI
    pauseBtn.textContent = "Pause";
    pauseBtn.style.backgroundColor = "#4caf50"; // Green
    pauseBtn.classList.remove("paused");
    // Remove paused indicator from containers
    visualizationEl.classList.remove("paused");
    progressTrackerEl.classList.remove("paused");
  } else {
    // Pause animation
    clearInterval(animationInterval);
    // Update UI
    pauseBtn.textContent = "Resume";
    pauseBtn.style.backgroundColor = "#ff9800"; // Orange
    visualizationEl.classList.add("paused");
    progressTrackerEl.classList.add("paused");
  }
  
  isPaused = !isPaused;
  // Enable navigation buttons when paused, with proper boundary checks
  document.getElementById("prev-step").disabled = !isPaused || currentStep <= 0;
  document.getElementById("next-step").disabled = !isPaused || currentStep >= steps.length - 1;
}

// Go to first step function
function goToStart() {
  clearInterval(animationInterval);
  currentStep = 0;
  displayStep();
  updateProgressTracker();
  
  // Update button states
  document.getElementById("prev-step").disabled = true;
  document.getElementById("next-step").disabled = false;
  document.getElementById("pause-animation").textContent = "▶ Play";
  document.getElementById("pause-animation").style.backgroundColor = "#4caf50";
  
  isPaused = true;
}

// Skip to finish function
function skipToFinish() {
  clearInterval(animationInterval);
  currentStep = steps.length - 1;
  displayStep();
  updateProgressTracker();
  
  // Always use array join for display
  const finalResult = steps[steps.length - 1].C.join(', ');
  document.getElementById("result").innerText = `Final Result C: [${finalResult}]`;
  
  // Update button states
  document.getElementById("prev-step").disabled = false;
  document.getElementById("next-step").disabled = true;
  document.getElementById("pause-animation").textContent = "▶ Play";
  document.getElementById("pause-animation").style.backgroundColor = "#4caf50";
  
  isPaused = true;
}
