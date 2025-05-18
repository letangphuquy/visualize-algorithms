/**
 * animation-methods-fix.js
 * A file to fix the animation methods in PrefixSumVisualization
 */

document.addEventListener('DOMContentLoaded', function() {
    // Wait for page load and then fix the methods
    setTimeout(function() {
        if (PrefixSumVisualization) {
            fixAnimationMethods();
        }
    }, 600);
});

function fixAnimationMethods() {
    // Fix togglePause method
    if (!PrefixSumVisualization.togglePause) {
        PrefixSumVisualization.togglePause = function() {
            try {
                const pauseBtn = document.getElementById("pause-animation");
                
                if (this.isPaused) {
                    // Resume animation if we have more steps
                    if (this.currentStep < this.steps.length - 1) {
                        this.animationInterval = setInterval(() => this.nextStep(), this.animationSpeed);
                    }
                    // Update UI
                    if (pauseBtn) {
                        pauseBtn.textContent = "⏯ Tạm dừng";
                        pauseBtn.classList.remove("paused");
                    }
                } else {
                    // Pause animation
                    clearInterval(this.animationInterval);
                    // Update UI
                    if (pauseBtn) {
                        pauseBtn.textContent = "⏯ Tiếp tục";
                        pauseBtn.classList.add("paused");
                    }
                }
                
                this.isPaused = !this.isPaused;
                
                // Enable navigation buttons when paused, with proper boundary checks
                const prevBtn = document.getElementById("prev-step");
                const nextBtn = document.getElementById("next-step");
                
                if (prevBtn) prevBtn.disabled = !this.isPaused || this.currentStep <= 0;
                if (nextBtn) nextBtn.disabled = !this.isPaused || this.currentStep >= this.steps.length - 1;
            } catch (e) {
                console.error('Error in togglePause:', e);
            }
        };
    }
    
    // Fix goToStart method
    if (!PrefixSumVisualization.goToStart) {
        PrefixSumVisualization.goToStart = function() {
            try {
                clearInterval(this.animationInterval);
                this.currentStep = 0;
                this.displayStep();
                if (typeof this.updateProgressTracker === 'function') {
                    this.updateProgressTracker();
                }
                
                // Update button states
                const prevBtn = document.getElementById("prev-step");
                const nextBtn = document.getElementById("next-step");
                const pauseBtn = document.getElementById("pause-animation");
                
                if (prevBtn) prevBtn.disabled = true;
                if (nextBtn) nextBtn.disabled = false;
                if (pauseBtn) {
                    pauseBtn.textContent = "⏯ Tiếp tục";
                    pauseBtn.classList.add("paused");
                }
                
                this.isPaused = true;
            } catch (e) {
                console.error('Error in goToStart:', e);
            }
        };
    }
    
    // Fix skipToFinish method
    if (!PrefixSumVisualization.skipToFinish) {
        PrefixSumVisualization.skipToFinish = function() {
            try {
                clearInterval(this.animationInterval);
                if (this.steps && this.steps.length > 0) {
                    this.currentStep = this.steps.length - 1;
                    this.displayStep();
                    if (typeof this.updateProgressTracker === 'function') {
                        this.updateProgressTracker();
                    }
                }
                
                // Update button states
                const prevBtn = document.getElementById("prev-step");
                const nextBtn = document.getElementById("next-step");
                const pauseBtn = document.getElementById("pause-animation");
                
                if (prevBtn) prevBtn.disabled = false;
                if (nextBtn) nextBtn.disabled = true;
                if (pauseBtn) {
                    pauseBtn.textContent = "⏯ Tiếp tục";
                    pauseBtn.classList.add("paused");
                }
                
                this.isPaused = true;
            } catch (e) {
                console.error('Error in skipToFinish:', e);
            }
        };
    }
    
    // Fix prevStep method
    if (!PrefixSumVisualization.prevStep) {
        PrefixSumVisualization.prevStep = function() {
            try {
                // Prevent stepping before first step
                if (this.currentStep <= 0) return;
                
                this.currentStep--;
                this.displayStep();
                if (typeof this.updateProgressTracker === 'function') {
                    this.updateProgressTracker();
                }
                
                // Update button states with strict boundary checks
                const prevBtn = document.getElementById("prev-step");
                const nextBtn = document.getElementById("next-step");
                
                if (nextBtn) nextBtn.disabled = false; // Next is always available if we went back
                if (prevBtn) prevBtn.disabled = this.currentStep <= 0;
            } catch (e) {
                console.error('Error in prevStep:', e);
            }
        };
    }
    
    // Fix updateProgressTracker method
    if (!PrefixSumVisualization.updateProgressTracker) {
        PrefixSumVisualization.updateProgressTracker = function() {
            try {
                if (this.elements && this.elements.progressTracker) {
                    this.elements.progressTracker.textContent = `Bước ${this.currentStep + 1} / ${this.steps.length}`;
                }
            } catch (e) {
                console.error('Error in updateProgressTracker:', e);
            }
        };
    }
}
