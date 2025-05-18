/**
 * animation-controls-fix.js
 * A file to fix the animation controls functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Wait for page load and then add animation controls
    setTimeout(function() {
        if (PrefixSumVisualization && !document.querySelector('.step-controls')) {
            addAnimationControls();
            fixVisualizationMethods();
        }
    }, 500);
});

function fixVisualizationMethods() {
    // Fix the displayStep method to handle null elements gracefully
    if (PrefixSumVisualization) {
        const originalDisplayStep = PrefixSumVisualization.displayStep;
        
        PrefixSumVisualization.displayStep = function() {
            try {
                if (this.steps && this.steps.length > 0 && this.currentStep >= 0 && this.currentStep < this.steps.length) {
                    if (typeof originalDisplayStep === 'function') {
                        originalDisplayStep.call(this);
                    } else {
                        // Fallback display implementation
                        const step = this.steps[this.currentStep];
                        
                        // Visualize the current state of the prefix sum array
                        if (typeof this.visualizePrefixSumArray === 'function') {
                            this.visualizePrefixSumArray(step.prefixSum);
                        }
                        
                        // Highlight the relevant elements
                        if (step.originalArrayIndex >= 0 && typeof this.highlightArrayElement === 'function') {
                            this.highlightArrayElement('original-array', step.originalArrayIndex);
                        }
                        
                        if (step.currentPrefixSumIndex >= 0 && typeof this.highlightArrayElement === 'function') {
                            this.highlightArrayElement('prefix-sum-array', step.currentPrefixSumIndex);
                        }
                    }
                }
            } catch (e) {
                console.error('Error in displayStep:', e);
            }
        };
        
        // Fix the nextStep method
        const originalNextStep = PrefixSumVisualization.nextStep;
        
        PrefixSumVisualization.nextStep = function(isManual = false) {
            try {
                if (typeof originalNextStep === 'function') {
                    originalNextStep.call(this, isManual);
                } else {
                    // Fallback implementation
                    if (!this.steps || this.currentStep >= this.steps.length - 1) {
                        clearInterval(this.animationInterval);
                        return;
                    }
                    
                    this.currentStep++;
                    this.displayStep();
                    
                    if (typeof this.updateProgressTracker === 'function') {
                        this.updateProgressTracker();
                    }
                    
                    // Update button states if manual navigation
                    if (isManual) {
                        const prevBtn = document.getElementById("prev-step");
                        const nextBtn = document.getElementById("next-step");
                        
                        if (prevBtn) prevBtn.disabled = this.currentStep <= 0;
                        if (nextBtn) nextBtn.disabled = this.currentStep >= this.steps.length - 1;
                    }
                }
            } catch (e) {
                console.error('Error in nextStep:', e);
            }
        };
    }
}

function addAnimationControls() {
    // Create the step controls
    const controlsDiv = document.createElement("div");
    controlsDiv.className = "step-controls";
    controlsDiv.innerHTML = `
        <button id="start-btn" title="Đi đến bước đầu tiên"><i>⏮</i> Bắt đầu</button>
        <button id="prev-step" disabled title="Đi đến bước trước đó"><i>◀</i> Lùi</button>
        <button id="pause-animation" title="Tạm dừng/Tiếp tục hoạt hình"><i>⏯</i> Tạm dừng</button>
        <button id="next-step" disabled title="Đi đến bước tiếp theo">Tiếp <i>▶</i></button>
        <button id="finish-btn" title="Bỏ qua đến kết quả cuối cùng"><i>⏭</i> Kết thúc</button>
    `;

    // Find where to insert it
    const progressTracker = document.getElementById('progress-tracker');
    const animationControls = document.getElementById('animation-controls');
    
    if (progressTracker) {
        progressTracker.after(controlsDiv);
    } else if (animationControls) {
        animationControls.after(controlsDiv);
    } else {
        // Fallback to appending to visualization section
        const visualizationSection = document.querySelector('.visualization-section');
        if (visualizationSection) {
            visualizationSection.appendChild(controlsDiv);
        }
    }
    
    // Add event listeners to the buttons
    document.getElementById("start-btn").addEventListener("click", function() {
        if (PrefixSumVisualization && PrefixSumVisualization.goToStart) {
            PrefixSumVisualization.goToStart();
        }
    });
    
    document.getElementById("prev-step").addEventListener("click", function() {
        if (PrefixSumVisualization && PrefixSumVisualization.prevStep) {
            PrefixSumVisualization.prevStep();
        }
    });
    
    document.getElementById("pause-animation").addEventListener("click", function() {
        if (PrefixSumVisualization && PrefixSumVisualization.togglePause) {
            PrefixSumVisualization.togglePause();
        }
    });
    
    document.getElementById("next-step").addEventListener("click", function() {
        if (PrefixSumVisualization && PrefixSumVisualization.nextStep) {
            PrefixSumVisualization.nextStep(true); // Pass true to indicate manual navigation
        }
    });
    
    document.getElementById("finish-btn").addEventListener("click", function() {
        if (PrefixSumVisualization && PrefixSumVisualization.skipToFinish) {
            PrefixSumVisualization.skipToFinish();
        }
    });
    
    // Show animation controls
    if (animationControls) {
        animationControls.classList.add("visible");
    }
}

// Fix for speed slider
document.addEventListener('input', function(e) {
    if (e.target && e.target.id === 'speed') {
        const speedValue = e.target.value;
        const speedValueEl = document.getElementById('speed-value');
        
        if (PrefixSumVisualization) {
            PrefixSumVisualization.animationSpeed = parseInt(speedValue);
            
            if (speedValueEl) {
                speedValueEl.textContent = (speedValue / 1000) + 's';
            }
            
            // Update interval if animation is running
            if (PrefixSumVisualization.animationInterval) {
                clearInterval(PrefixSumVisualization.animationInterval);
                if (!PrefixSumVisualization.isPaused) {
                    PrefixSumVisualization.animationInterval = setInterval(
                        function() { PrefixSumVisualization.nextStep(); }, 
                        PrefixSumVisualization.animationSpeed
                    );
                }
            }
        }
    }
});
    setTimeout(function() {
        if (PrefixSumVisualization && !document.querySelector('.step-controls')) {
            addAnimationControls();
        }
    }, 500);
});

function addAnimationControls() {
    // Create the step controls
    const controlsDiv = document.createElement("div");
    controlsDiv.className = "step-controls";
    controlsDiv.innerHTML = `
        <button id="start-btn" title="Đi đến bước đầu tiên"><i>⏮</i> Bắt đầu</button>
        <button id="prev-step" disabled title="Đi đến bước trước đó"><i>◀</i> Lùi</button>
        <button id="pause-animation" title="Tạm dừng/Tiếp tục hoạt hình"><i>⏯</i> Tạm dừng</button>
        <button id="next-step" disabled title="Đi đến bước tiếp theo">Tiếp <i>▶</i></button>
        <button id="finish-btn" title="Bỏ qua đến kết quả cuối cùng"><i>⏭</i> Kết thúc</button>
    `;

    // Find where to insert it
    const progressTracker = document.getElementById('progress-tracker');
    const animationControls = document.getElementById('animation-controls');
    
    if (progressTracker) {
        progressTracker.after(controlsDiv);
    } else if (animationControls) {
        animationControls.after(controlsDiv);
    } else {
        // Fallback to appending to visualization section
        const visualizationSection = document.querySelector('.visualization-section');
        if (visualizationSection) {
            visualizationSection.appendChild(controlsDiv);
        }
    }
    
    // Add event listeners to the buttons
    document.getElementById("start-btn").addEventListener("click", function() {
        if (PrefixSumVisualization && PrefixSumVisualization.goToStart) {
            PrefixSumVisualization.goToStart();
        }
    });
    
    document.getElementById("prev-step").addEventListener("click", function() {
        if (PrefixSumVisualization && PrefixSumVisualization.prevStep) {
            PrefixSumVisualization.prevStep();
        }
    });
    
    document.getElementById("pause-animation").addEventListener("click", function() {
        if (PrefixSumVisualization && PrefixSumVisualization.togglePause) {
            PrefixSumVisualization.togglePause();
        }
    });
    
    document.getElementById("next-step").addEventListener("click", function() {
        if (PrefixSumVisualization && PrefixSumVisualization.nextStep) {
            PrefixSumVisualization.nextStep(true); // Pass true to indicate manual navigation
        }
    });
    
    document.getElementById("finish-btn").addEventListener("click", function() {
        if (PrefixSumVisualization && PrefixSumVisualization.skipToFinish) {
            PrefixSumVisualization.skipToFinish();
        }
    });
    
    // Show animation controls
    if (animationControls) {
        animationControls.classList.add("visible");
    }
}

// Fix for speed slider
document.addEventListener('input', function(e) {
    if (e.target && e.target.id === 'speed') {
        const speedValue = e.target.value;
        const speedValueEl = document.getElementById('speed-value');
        
        if (PrefixSumVisualization) {
            PrefixSumVisualization.animationSpeed = parseInt(speedValue);
            
            if (speedValueEl) {
                speedValueEl.textContent = (speedValue / 1000) + 's';
            }
            
            // Update interval if animation is running
            if (PrefixSumVisualization.animationInterval) {
                clearInterval(PrefixSumVisualization.animationInterval);
                if (!PrefixSumVisualization.isPaused) {
                    PrefixSumVisualization.animationInterval = setInterval(
                        function() { PrefixSumVisualization.nextStep(); }, 
                        PrefixSumVisualization.animationSpeed
                    );
                }
            }
        }
    }
});
