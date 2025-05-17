/**
 * visualization.js
 * Handles the visualization and UI interaction for the prefix sum algorithm
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the application
    PrefixSumVisualization.init();
});

const PrefixSumVisualization = {
    // Animation speed control (milliseconds)
    animationSpeed: 1000,
    
    // Flag to track if an animation is currently running
    isAnimating: false,
    
    // Animation control variables
    steps: [],
    currentStep: 0,
    animationInterval: null,
    isPaused: false,
    
    // References to key DOM elements
    elements: {
        arrayInput: null,
        generateRandomBtn: null,
        computePrefixSumBtn: null,
        speedControl: null,
        originalArrayContainer: null,
        prefixSumArrayContainer: null,
        computationStepsContainer: null,
        queryLInput: null,
        queryRInput: null,
        executeQueryBtn: null,
        queryFormulaContainer: null,
        queryResultContainer: null,
        highlightedArrayContainer: null,
        progressTracker: null
    },

    /**
     * Initialize the visualization module
     */
    init() {
        // Cache DOM elements
        this.cacheElements();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Generate initial random array
        this.generateRandomArray();
    },/**
     * Cache DOM elements for later use
     */
    cacheElements() {
        this.elements.arrayContainer = document.getElementById('array-container');
        this.elements.generateRandomBtn = document.getElementById('random-btn');
        this.elements.randomSizeInput = document.getElementById('random-size');
        this.elements.sortBtn = document.getElementById('sort-btn');
        this.elements.clearBtn = document.getElementById('clear-btn');
        this.elements.computePrefixSumBtn = document.getElementById('compute-btn');
        this.elements.resetBtn = document.getElementById('reset-btn');
        this.elements.originalArrayContainer = document.getElementById('original-array');
        this.elements.prefixSumArrayContainer = document.getElementById('prefix-sum-array');
        this.elements.computationStepsContainer = document.getElementById('computation-steps');
        this.elements.queryLInput = document.getElementById('query-left');
        this.elements.queryRInput = document.getElementById('query-right');
        this.elements.executeQueryBtn = document.getElementById('query-btn');
        this.elements.rangeSliderLeft = document.getElementById('range-left');
        this.elements.rangeSliderRight = document.getElementById('range-right');
        this.elements.rangeLabels = document.getElementById('range-labels');
        this.elements.formulaSR = document.getElementById('formula-sr');
        this.elements.formulaSL1 = document.getElementById('formula-sl-1');
        this.elements.formulaResult = document.getElementById('formula-result');
        this.elements.queryOriginalArray = document.getElementById('query-original-array');
        this.elements.queryHighlightArray = document.getElementById('query-highlight-array');
        this.elements.segmentLeft = document.getElementById('segment-left');
        this.elements.segmentMiddle = document.getElementById('segment-middle');
        this.elements.segmentRight = document.getElementById('segment-right');
        this.elements.addItemBtn = this.elements.arrayContainer ? this.elements.arrayContainer.querySelector('.add-item-btn') : null;
        
        // Animation controls
        this.elements.speedSlider = document.getElementById('speed');
        this.elements.speedValue = document.getElementById('speed-value');
        this.elements.progressTracker = document.getElementById('progress-tracker');
        this.elements.animationControls = document.getElementById('animation-controls');
    },/**
     * Set up event listeners for user interaction
     */
    setupEventListeners() {
        // Generate random array button
        if (this.elements.generateRandomBtn) {
            this.elements.generateRandomBtn.addEventListener('click', () => {
                const size = this.elements.randomSizeInput ? parseInt(this.elements.randomSizeInput.value) : 8;
                this.generateRandomArray(size);
            });
        }          // Sort array button (now acting as shuffle button)
        if (this.elements.sortBtn) {
            this.elements.sortBtn.addEventListener('click', () => {
                this.shuffleArray();
            });
        }
        
        // Clear array button
        if (this.elements.clearBtn) {
            this.elements.clearBtn.addEventListener('click', () => {
                this.clearArray();
            });
        }
          // Compute prefix sum button
        if (this.elements.computePrefixSumBtn) {
            this.elements.computePrefixSumBtn.addEventListener('click', () => {
                this.computeAndVisualizePrefixSum();
            });
        }
        
        // Reset button
        if (this.elements.resetBtn) {
            this.elements.resetBtn.addEventListener('click', () => {
                this.resetVisualization();
            });
        }
        
        // Animation speed control
        if (this.elements.speedSlider) {
            this.elements.speedSlider.addEventListener('input', () => {
                const speedValue = this.elements.speedSlider.value;
                this.animationSpeed = parseInt(speedValue);
                this.elements.speedValue.textContent = (speedValue / 1000) + 's';
                
                // Update interval if animation is running
                if (this.animationInterval) {
                    clearInterval(this.animationInterval);
                    if (!this.isPaused) {
                        this.animationInterval = setInterval(() => this.nextStep(), this.animationSpeed);
                    }
                }
            });
        }
        
        // Execute query button
        if (this.elements.executeQueryBtn) {
            this.elements.executeQueryBtn.addEventListener('click', () => {
                this.executeAndVisualizeQuery();
            });
        }
        
        // Range sliders for query
        if (this.elements.rangeSliderLeft && this.elements.rangeSliderRight) {
            this.elements.rangeSliderLeft.addEventListener('input', (e) => {
                this.updateQueryFromSliders();
            });
            
            this.elements.rangeSliderRight.addEventListener('input', (e) => {
                this.updateQueryFromSliders();
            });
        }
        
        // Manual query input
        if (this.elements.queryLInput && this.elements.queryRInput) {
            this.elements.queryLInput.addEventListener('change', () => {
                this.updateSlidersFromQuery();
            });
            
            this.elements.queryRInput.addEventListener('change', () => {
                this.updateSlidersFromQuery();
            });
        }
        
        // Add item button
        if (this.elements.addItemBtn) {
            this.elements.addItemBtn.addEventListener('click', () => {
                this.addArrayElement();
            });
        }
        
        // Set up event delegation for array item interactions
        if (this.elements.arrayContainer) {
            this.elements.arrayContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('remove-item-btn')) {
                    const arrayItem = e.target.closest('.array-item');
                    if (arrayItem) {
                        this.removeArrayElement(arrayItem);
                    }
                }
            });
        }
    },    /**
     * Generate a random array and update the UI
     * @param {number} size - Size of the array to generate
     */
    generateRandomArray(size = 8) {
        const randomArray = ArrayUtils.generateRandomArray(size, 1, 10);
        
        // Clear the existing array container
        this.clearArrayContainer();
        
        // Create array items for each element
        randomArray.forEach(value => {
            this.addArrayElement(value);
        });
        
        // Clear previous prefix sum and computation steps
        this.resetVisualization();
        
        // Update query range inputs
        this.updateQueryRangeInputs();
    },
    
    /**
     * Clear the array container
     */
    clearArrayContainer() {
        if (this.elements.arrayContainer) {
            // Keep only the add button
            const addBtn = this.elements.addItemBtn;
            this.elements.arrayContainer.innerHTML = '';
            if (addBtn) {
                this.elements.arrayContainer.appendChild(addBtn);
            } else {
                // If add button was removed, create a new one
                const newAddBtn = document.createElement('div');
                newAddBtn.className = 'add-item-btn';
                newAddBtn.textContent = '+';
                this.elements.arrayContainer.appendChild(newAddBtn);
                this.elements.addItemBtn = newAddBtn;
                
                // Add event listener to the new button
                newAddBtn.addEventListener('click', () => {
                    this.addArrayElement();
                });
            }
        }
    },
    
    /**
     * Clear the array
     */
    clearArray() {
        this.clearArrayContainer();
        this.resetVisualization();
    },
    
    /**
     * Reset the visualization components
     */
    resetVisualization() {
        if (this.elements.prefixSumArrayContainer) {
            this.elements.prefixSumArrayContainer.innerHTML = '';
        }
        
        if (this.elements.computationStepsContainer) {
            this.elements.computationStepsContainer.innerHTML = '<div class="initial-message">Nhấn "Tính mảng cộng dồn" để xem quá trình tính toán</div>';
        }
        
        if (this.elements.formulaSR) this.elements.formulaSR.textContent = '';
        if (this.elements.formulaSL1) this.elements.formulaSL1.textContent = '';
        if (this.elements.formulaResult) this.elements.formulaResult.textContent = '';
        
        if (this.elements.queryOriginalArray) this.elements.queryOriginalArray.innerHTML = '';
        if (this.elements.queryHighlightArray) this.elements.queryHighlightArray.innerHTML = '';
        if (this.elements.segmentLeft) this.elements.segmentLeft.innerHTML = '';
        if (this.elements.segmentMiddle) this.elements.segmentMiddle.innerHTML = '';
        if (this.elements.segmentRight) this.elements.segmentRight.innerHTML = '';
    },
    
    /**
     * Add an array element to the UI
     * @param {number} value - The value to add (optional, default is 0)
     */
    addArrayElement(value = 0) {
        if (!this.elements.arrayContainer) return;
        
        // Create array item
        const arrayItem = document.createElement('div');
        arrayItem.className = 'array-item';
        
        // Create input for the value
        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'array-value';
        input.value = value;
        input.min = 0;
        input.max = 99;
        
        // Create remove button
        const removeBtn = document.createElement('div');
        removeBtn.className = 'remove-item-btn';
        removeBtn.innerHTML = '&times;';
        
        // Append to array item
        arrayItem.appendChild(input);
        arrayItem.appendChild(removeBtn);
        
        // Find add button if it's not cached
        if (!this.elements.addItemBtn) {
            this.elements.addItemBtn = this.elements.arrayContainer.querySelector('.add-item-btn');
        }
        
        // Insert before the add button if found, otherwise append to container
        if (this.elements.addItemBtn) {
            this.elements.arrayContainer.insertBefore(arrayItem, this.elements.addItemBtn);
        } else {
            this.elements.arrayContainer.appendChild(arrayItem);
        }
        
        // Add event listener to remove button
        removeBtn.addEventListener('click', () => {
            this.removeArrayElement(arrayItem);
            
            // Reset visualizations since array changed
            this.elements.prefixSumArrayContainer.innerHTML = '';
            this.elements.computationStepsContainer.innerHTML = '';
            this.elements.computationStepsContainer.innerHTML = '<div class="initial-message">Nhấn "Tính mảng cộng dồn" để xem quá trình tính toán</div>';
            
            // Clear query results
            this.clearQueryResults();
        });
        
        // Update query range inputs
        this.updateQueryRangeInputs();
    },
      /**
     * Remove an array element from the UI
     * @param {HTMLElement} arrayItem - The array item to remove
     */
    removeArrayElement(arrayItem) {
        if (this.elements.arrayContainer && arrayItem) {
            this.elements.arrayContainer.removeChild(arrayItem);
            this.updateQueryRangeInputs();
        }
    },
      /**
     * Reset the visualization components
     */
    updateQueryRangeInputs() {
        const arrayLength = this.getArrayFromUI().length;
        
        // If array is empty, reset query inputs
        if (arrayLength === 0) {
            this.elements.queryLInput.value = 1;
            this.elements.queryLInput.max = 1;
            this.elements.queryRInput.value = 1;
            this.elements.queryRInput.max = 1;
            
            // Update range sliders
            this.elements.rangeSliderLeft.max = 1;
            this.elements.rangeSliderLeft.value = 1;
            this.elements.rangeSliderRight.max = 1;
            this.elements.rangeSliderRight.value = 1;
            
            this.updateRangeLabels(arrayLength);
            return;
        }
        
        // Update min/max attributes and values
        this.elements.queryLInput.max = arrayLength;
        this.elements.queryRInput.max = arrayLength;
        
        // Default to 1 for L and array length for R if they're out of bounds
        if (parseInt(this.elements.queryLInput.value) > arrayLength) {
            this.elements.queryLInput.value = 1;
        }
        
        if (parseInt(this.elements.queryRInput.value) > arrayLength) {
            this.elements.queryRInput.value = arrayLength;
        }
        
        // Update range sliders
        this.elements.rangeSliderLeft.max = arrayLength;
        this.elements.rangeSliderLeft.value = this.elements.queryLInput.value;
        this.elements.rangeSliderRight.max = arrayLength;
        this.elements.rangeSliderRight.value = this.elements.queryRInput.value;
        
        // Update range labels
        this.updateRangeLabels(arrayLength);
    },
    
    /**
     * Update range labels based on array length
     * @param {number} arrayLength - Length of the array
     */
    updateRangeLabels(arrayLength) {
        if (!this.elements.rangeLabels) return;
        
        this.elements.rangeLabels.innerHTML = '';
        
        // Create labels based on array length
        for (let i = 1; i <= arrayLength; i++) {
            const label = document.createElement('span');
            label.className = 'range-label';
            label.textContent = i;
            this.elements.rangeLabels.appendChild(label);
        }
    },
    
    /**
     * Update query inputs based on slider values
     */
    updateQueryFromSliders() {
        const leftValue = parseInt(this.elements.rangeSliderLeft.value);
        const rightValue = parseInt(this.elements.rangeSliderRight.value);
        
        // Ensure right slider is not less than left slider
        if (rightValue < leftValue) {
            this.elements.rangeSliderRight.value = leftValue;
            this.elements.queryRInput.value = leftValue;
        } else {
            this.elements.queryRInput.value = rightValue;
        }
        
        this.elements.queryLInput.value = leftValue;
        
        // If query button exists, automatically execute query
        if (this.elements.executeQueryBtn) {
            this.executeAndVisualizeQuery();
        }
    },
    
    /**
     * Update sliders based on query inputs
     */
    updateSlidersFromQuery() {
        const leftValue = parseInt(this.elements.queryLInput.value);
        const rightValue = parseInt(this.elements.queryRInput.value);
        const maxValue = parseInt(this.elements.queryLInput.max);
        
        // Validate inputs
        let validLeftValue = Math.min(Math.max(1, leftValue), maxValue);
        let validRightValue = Math.min(Math.max(validLeftValue, rightValue), maxValue);
        
        // Update inputs and sliders
        this.elements.queryLInput.value = validLeftValue;
        this.elements.queryRInput.value = validRightValue;
        this.elements.rangeSliderLeft.value = validLeftValue;
        this.elements.rangeSliderRight.value = validRightValue;
    },    /**
     * Get the array from the UI inputs
     * @returns {number[]} - Array of numbers from UI inputs
     */
    getArrayFromUI() {
        if (!this.elements.arrayContainer) return [];
        
        const arrayItems = this.elements.arrayContainer.querySelectorAll('.array-item');
        const array = [];
        
        arrayItems.forEach(item => {
            const input = item.querySelector('.array-value');
            if (input) {
                const value = parseInt(input.value) || 0;
                array.push(value);
            }
        });
        
        return array;
    },    /**
     * Parse the array input and compute its prefix sum with visualization
     */    computeAndVisualizePrefixSum() {
        // Check if already animating
        if (this.isAnimating) return;
        
        const array = this.getArrayFromUI();
        if (array.length === 0) {
            alert('Vui lòng nhập ít nhất một phần tử cho mảng!');
            return;
        }
        
        // Reset visualization
        this.resetVisualization();
        
        // Visualize the original array
        this.visualizeOriginalArray(array);
        
        // Initialize the prefix sum calculator
        PrefixSum.initialize(array);
        
        // Show animation controls
        if (this.elements.animationControls) {
            this.elements.animationControls.classList.add("visible");
        }
        
        // Create step controls if they don't exist yet
        if (typeof this.createStepControls === 'function' && !document.querySelector('.step-controls')) {
            this.createStepControls();
        }
        
        // Generate steps for visualization
        this.prepareAnimationSteps();
        
        // Start the animation
        this.startAnimation();
    },/**
     * Visualize the original array
     * @param {number[]} array - Array to visualize
     */
    visualizeOriginalArray(array) {
        if (!this.elements.originalArrayContainer) return;
        
        this.elements.originalArrayContainer.innerHTML = '';
        
        // Create and append array elements
        array.forEach((value, index) => {
            const element = document.createElement('div');
            element.className = 'array-element';
            
            // Create value span
            const valueSpan = document.createElement('span');
            valueSpan.className = 'element-value';
            valueSpan.textContent = value;
            element.appendChild(valueSpan);
            
            // Create index span
            const indexSpan = document.createElement('span');
            indexSpan.className = 'element-index';
            indexSpan.textContent = index + 1; // 1-indexed display
            element.appendChild(indexSpan);
            
            this.elements.originalArrayContainer.appendChild(element);
        });
    },    /**
     * Shuffle the current array
     */
    shuffleArray() {
        // Get current array from UI
        const array = this.getArrayFromUI();
        if (array.length === 0) {
            alert('Vui lòng nhập ít nhất một phần tử cho mảng!');
            return;
        }
        
        // Shuffle the array
        const shuffledArray = ArrayUtils.shuffleArray(array);
        
        // Update the UI with shuffled array
        this.updateArrayItemsInUI(shuffledArray);
        
        // Reset visualizations since array changed
        this.elements.prefixSumArrayContainer.innerHTML = '';
        this.elements.computationStepsContainer.innerHTML = '';
        this.elements.computationStepsContainer.innerHTML = '<div class="initial-message">Nhấn "Tính mảng cộng dồn" để xem quá trình tính toán</div>';
        
        // Clear query results
        this.clearQueryResults();
    },
        }
        
        // Reset visualization
        this.resetVisualization();
        
        // Visualize the original array
        this.visualizeOriginalArray(array);
        
        // Initialize the prefix sum calculator
        PrefixSum.initialize(array);
        
        // Show animation controls
        if (this.elements.animationControls) {
            this.elements.animationControls.classList.add("visible");
        }
        
        // Generate steps for visualization
        this.prepareAnimationSteps();
        
        // Start the animation
        this.startAnimation();
    },
    
    /**
     * Create a series of animation steps for the prefix sum computation
     */
    prepareAnimationSteps() {
        const computationSteps = PrefixSum.getComputationSteps();
        const prefixSum = PrefixSum.prefixSumArray;
        const originalArray = PrefixSum.originalArray;
        
        this.steps = [];
        
        // Add initial state step
        this.steps.push({
            prefixSum: [0], // Start with just S[0] = 0
            currentPrefixSumIndex: 0,
            originalArrayIndex: -1, // No element highlighted yet
            explanation: ['Bắt đầu tính toán mảng cộng dồn', 'S[0] = 0 (khởi tạo)']
        });
        
        // Add steps for each computation
        for (let i = 1; i < computationSteps.length; i++) {
            const step = computationSteps[i];
            
            // Create a copy of the prefix sum array up to the current position
            const currentPrefixSum = prefixSum.slice(0, step.position + 1);
            
            this.steps.push({
                prefixSum: currentPrefixSum,
                currentPrefixSumIndex: step.position,
                originalArrayIndex: step.originalPosition,
                explanation: [
                    `S[${step.position}] = S[${step.position-1}] + A[${step.originalPosition + 1}]`,
                    `S[${step.position}] = ${step.previousPrefixSum} + ${step.value} = ${step.currentPrefixSum}`
                ]
            });
        }
        
        this.currentStep = 0;
    },
      /**
     * Start the animation process
     */
    startAnimation() {
        // Clear any existing animation
        clearInterval(this.animationInterval);
        this.isPaused = false;
        
        // Reset UI controls if they exist
        const pauseBtn = document.getElementById("pause-animation");
        const prevBtn = document.getElementById("prev-step");
        const nextBtn = document.getElementById("next-step");
        
        if (pauseBtn) {
            pauseBtn.textContent = "⏯ Tạm dừng";
            pauseBtn.disabled = false;
        }
        
        if (prevBtn) {
            prevBtn.disabled = true;
        }
        
        if (nextBtn) {
            nextBtn.disabled = true;
        }
        
        this.currentStep = 0;
        this.displayStep();
        this.updateProgressTracker();
        
        // Start the animation timer
        this.animationInterval = setInterval(() => this.nextStep(), this.animationSpeed);
        
        // Auto-scroll to the animation section
        setTimeout(() => {
            if (this.elements.computationStepsContainer) {
                this.elements.computationStepsContainer.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start'
                });
            }
        }, 100);
    },
    
    /**
     * Display the current step in the visualization
     */
    displayStep() {
        if (this.steps.length === 0) return;
        
        const step = this.steps[this.currentStep];
        
        // Visualize the current state of the prefix sum array
        this.visualizePrefixSumArray(step.prefixSum);
        
        // Highlight the relevant elements
        if (step.originalArrayIndex >= 0) {
            this.highlightArrayElement('original-array', step.originalArrayIndex);
        }
        
        if (step.currentPrefixSumIndex >= 0) {
            this.highlightArrayElement('prefix-sum-array', step.currentPrefixSumIndex);
        }
        
        // Update the computation steps display
        this.displayComputationStep(step);
    },
    
    /**
     * Display a computation step in the UI
     * @param {Object} step - Step object with explanation
     */
    displayComputationStep(step) {
        if (!this.elements.computationStepsContainer) return;
        
        // Clear previous steps if this is the first step
        if (this.currentStep === 0) {
            this.elements.computationStepsContainer.innerHTML = '';
        }
        
        const stepElement = document.createElement('div');
        stepElement.className = 'computation-step active';
        
        // Add explanation lines
        if (step.explanation && step.explanation.length) {
            const explanationHtml = `
                <div class="step-explanation">
                    <ul>
                        ${step.explanation.map(line => `<li class="explanation-line">${line}</li>`).join('')}
                    </ul>
                </div>
            `;
            stepElement.innerHTML = explanationHtml;
        }
        
        // Add to the computation steps container
        this.elements.computationStepsContainer.appendChild(stepElement);
        
        // Scroll to show the latest step
        this.elements.computationStepsContainer.scrollTop = this.elements.computationStepsContainer.scrollHeight;
        
        // Apply animation to explanation lines with delay
        const explanationLines = stepElement.querySelectorAll('.explanation-line');
        explanationLines.forEach((line, index) => {
            setTimeout(() => {
                line.classList.add('active');
            }, index * 300); // 300ms delay between each line
        });
    },
    
    /**
     * Visualize the prefix sum array
     * @param {number[]} prefixSumArray - Prefix sum array to visualize
     */
    visualizePrefixSumArray(prefixSumArray) {
        if (!this.elements.prefixSumArrayContainer) return;
        
        this.elements.prefixSumArrayContainer.innerHTML = '';
        
        // Create and append array elements
        prefixSumArray.forEach((value, index) => {
            const element = document.createElement('div');
            element.className = 'array-element';
            
            const valueSpan = document.createElement('span');
            valueSpan.className = 'element-value';
            valueSpan.textContent = value;
            
            const indexSpan = document.createElement('span');
            indexSpan.className = 'element-index';
            indexSpan.textContent = index; // 0-indexed for prefix sum
            
            element.appendChild(valueSpan);
            element.appendChild(indexSpan);
            
            this.elements.prefixSumArrayContainer.appendChild(element);
        });
    },    /**
     * Highlight an element in an array visualization
     * @param {string} containerId - ID of the container element
     * @param {number} index - Index of the element to highlight
     */
    highlightArrayElement(containerId, index) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const elements = container.querySelectorAll('.array-element');
        
        // Remove existing highlights
        elements.forEach(el => el.classList.remove('active'));
        
        // Add highlight to the specified element
        if (elements[index]) {
            elements[index].classList.add('active');
        }
    },

    /**
     * Remove all highlights from array elements
     */
    removeAllHighlights() {
        const elements = document.querySelectorAll('.array-element');
        elements.forEach(el => {
            el.classList.remove('active');
            el.classList.remove('highlight');
            el.classList.remove('highlight-subtract');
        });
    },

    /**
     * Display a computation step in the UI
     * @param {Object} step - Computation step object
     * @param {number} index - Step index
     */
    displayComputationStep(step, index) {
        if (!this.elements.computationStepsContainer) return;
        
        const stepElement = document.createElement('div');
        stepElement.className = 'computation-step active';
        
        // Format the computation step message
        let stepMessage = '';
        if (index === 1) {
            stepMessage = `S[${step.position}] = ${step.currentPrefixSum} (Khởi tạo)`;
        } else {
            stepMessage = `S[${step.position}] = S[${step.position-1}] + A[${step.originalPosition}] = ${step.previousPrefixSum} + ${step.value} = ${step.currentPrefixSum}`;
        }
        
        stepElement.textContent = stepMessage;
        
        // Add to the computation steps container
        this.elements.computationStepsContainer.appendChild(stepElement);
        
        // Scroll to show the latest step
        this.elements.computationStepsContainer.scrollTop = this.elements.computationStepsContainer.scrollHeight;
    },

    /**
     * Execute a range sum query and visualize the result
     */
    executeAndVisualizeQuery() {
        const L = parseInt(this.elements.queryLInput.value, 10);
        const R = parseInt(this.elements.queryRInput.value, 10);
        
        // Get the current array and make sure it's initialized
        const array = this.getArrayFromUI();
        if (array.length === 0) {
            alert('Vui lòng nhập mảng và tính mảng cộng dồn trước!');
            return;
        }
        
        // Initialize prefix sum if not done yet
        if (!PrefixSum.prefixSumArray || PrefixSum.prefixSumArray.length === 0) {
            PrefixSum.initialize(array);
        }
        
        // Get the query details
        const queryDetails = PrefixSum.getQueryDetails(L, R);
        
        if (!queryDetails.valid) {
            alert(queryDetails.message || 'Chỉ số truy vấn không hợp lệ!');
            return;
        }
        
        // Display the query formula
        this.displayQueryFormula(queryDetails);
        
        // Visualize the query on arrays
        this.visualizeQuery(queryDetails);
    },
    
    /**
     * Display the query formula with values
     * @param {Object} queryDetails - Query details object
     */
    displayQueryFormula(queryDetails) {
        if (this.elements.formulaSR) {
            this.elements.formulaSR.textContent = queryDetails.rightSum;
        }
        
        if (this.elements.formulaSL1) {
            this.elements.formulaSL1.textContent = queryDetails.leftMinusOneSum;
        }
        
        if (this.elements.formulaResult) {
            this.elements.formulaResult.textContent = queryDetails.rangeSum;
        }
    },

    /**
     * Visualize a range sum query on the arrays
     * @param {Object} queryDetails - Query details object
     */
    visualizeQuery(queryDetails) {
        const array = this.getArrayFromUI();
        
        // Visualize the original array with query range
        this.visualizeQueryOriginalArray(array, queryDetails.left, queryDetails.right);
        
        // Visualize the highlighted array with color coding
        this.visualizeQueryHighlightArray(array, queryDetails.left, queryDetails.right);
        
        // Visualize the segments
        this.visualizeSegments(array, queryDetails);
    },
    
    /**
     * Visualize the original array with query range highlighted
     * @param {number[]} array - Original array
     * @param {number} left - Left index (1-indexed)
     * @param {number} right - Right index (1-indexed)
     */
    visualizeQueryOriginalArray(array, left, right) {
        if (!this.elements.queryOriginalArray) return;
        
        this.elements.queryOriginalArray.innerHTML = '';
        
        // Create and append array elements
        array.forEach((value, index) => {
            const element = document.createElement('div');
            element.className = 'array-element';
            
            // Highlight if in query range
            const oneIndexed = index + 1;
            if (oneIndexed >= left && oneIndexed <= right) {
                element.classList.add('highlight');
            }
            
            const valueSpan = document.createElement('span');
            valueSpan.className = 'element-value';
            valueSpan.textContent = value;
            
            const indexSpan = document.createElement('span');
            indexSpan.className = 'element-index';
            indexSpan.textContent = oneIndexed;
            
            element.appendChild(valueSpan);
            element.appendChild(indexSpan);
            
            this.elements.queryOriginalArray.appendChild(element);
        });
    },
    
    /**
     * Visualize the query highlight array
     * @param {number[]} array - Original array
     * @param {number} left - Left index (1-indexed)
     * @param {number} right - Right index (1-indexed)
     */
    visualizeQueryHighlightArray(array, left, right) {
        if (!this.elements.queryHighlightArray) return;
        
        this.elements.queryHighlightArray.innerHTML = '';
        
        // Create and append array elements with different colors
        array.forEach((value, index) => {
            const element = document.createElement('div');
            element.className = 'array-element';
            
            // Color based on position
            const oneIndexed = index + 1;
            if (oneIndexed < left) {
                element.classList.add('highlight-subtract');
            } else if (oneIndexed >= left && oneIndexed <= right) {
                element.classList.add('highlight');
            } else {
                element.classList.add('inactive');
            }
            
            const indexSpan = document.createElement('span');
            indexSpan.className = 'element-index';
            indexSpan.textContent = oneIndexed;
            
            element.appendChild(indexSpan);
            
            this.elements.queryHighlightArray.appendChild(element);
        });
    },
    
    /**
     * Visualize segments for the query
     * @param {number[]} array - Original array
     * @param {Object} queryDetails - Query details object
     */
    visualizeSegments(array, queryDetails) {
        // Visualize left segment (S[1...L-1])
        if (this.elements.segmentLeft && queryDetails.left > 1) {
            this.elements.segmentLeft.innerHTML = '';
            
            for (let i = 1; i < queryDetails.left; i++) {
                const element = document.createElement('div');
                element.className = 'segment-element highlight-subtract';
                element.textContent = array[i-1]; // 0-indexed array
                this.elements.segmentLeft.appendChild(element);
            }
            
            // Show sum
            const sumElement = document.createElement('div');
            sumElement.className = 'segment-sum';
            sumElement.textContent = `= ${queryDetails.leftMinusOneSum}`;
            this.elements.segmentLeft.appendChild(sumElement);
        } else if (this.elements.segmentLeft) {
            this.elements.segmentLeft.innerHTML = '<div class="empty-segment">Không có phần tử</div>';
        }
        
        // Visualize middle segment (S[L...R])
        if (this.elements.segmentMiddle) {
            this.elements.segmentMiddle.innerHTML = '';
            
            for (let i = queryDetails.left; i <= queryDetails.right; i++) {
                const element = document.createElement('div');
                element.className = 'segment-element highlight';
                element.textContent = array[i-1]; // 0-indexed array
                this.elements.segmentMiddle.appendChild(element);
            }
            
            // Show sum
            const sumElement = document.createElement('div');
            sumElement.className = 'segment-sum';
            sumElement.textContent = `= ${queryDetails.rangeSum}`;
            this.elements.segmentMiddle.appendChild(sumElement);
        }
        
        // Visualize right segment (S[1...R])
        if (this.elements.segmentRight) {
            this.elements.segmentRight.innerHTML = '';
            
            for (let i = 1; i <= queryDetails.right; i++) {
                const element = document.createElement('div');
                element.className = 'segment-element';
                element.textContent = array[i-1]; // 0-indexed array
                
                if (i < queryDetails.left) {
                    element.classList.add('highlight-subtract');
                } else {
                    element.classList.add('highlight');
                }
                
                this.elements.segmentRight.appendChild(element);
            }
            
            // Show sum
            const sumElement = document.createElement('div');
            sumElement.className = 'segment-sum';
            sumElement.textContent = `= ${queryDetails.rightSum}`;
            this.elements.segmentRight.appendChild(sumElement);
        }
    },

    /**
     * Clear query results and reset visualization
     */
    clearQueryResults() {
        // Clear formula displays
        if (this.elements.formulaSR) this.elements.formulaSR.textContent = '';
        if (this.elements.formulaSL1) this.elements.formulaSL1.textContent = '';
        if (this.elements.formulaResult) this.elements.formulaResult.textContent = '';
        
        // Clear query visualizations
        if (this.elements.queryOriginalArray) this.elements.queryOriginalArray.innerHTML = '';
        if (this.elements.queryHighlightArray) this.elements.queryHighlightArray.innerHTML = '';
        
        // Clear segment displays
        if (this.elements.segmentLeft) this.elements.segmentLeft.innerHTML = '';
        if (this.elements.segmentMiddle) this.elements.segmentMiddle.innerHTML = '';
        if (this.elements.segmentRight) this.elements.segmentRight.innerHTML = '';
    },

    /**
     * Update array items in the UI with new values
     * @param {number[]} array - The array of new values
     */    updateArrayItemsInUI(array) {
        if (!this.elements.arrayContainer) return;
        
        // Get all array items (excluding the add button)
        const arrayItems = this.elements.arrayContainer.querySelectorAll('.array-item');
        
        // Remove existing array items
        arrayItems.forEach(item => {
            this.elements.arrayContainer.removeChild(item);
        });
        
        // Add new array items using the addArrayElement method
        array.forEach(value => {
            this.addArrayElement(value);
        });
        
        // Update query range inputs
        this.updateQueryRangeInputs();
    },
    
    /**
     * Create step navigation controls
     */
    createStepControls() {
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
    },
    
    /**
     * Toggle animation pause state
     */
    togglePause() {
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
    },
    
    /**
     * Go to first step function
     */
    goToStart() {
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
    },
    
    /**
     * Skip to finish function
     */
    skipToFinish() {
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
    },
    
    /**
     * Move to the next step in animation
     * @param {boolean} isManual - Whether the navigation was triggered manually
     */
    nextStep(isManual = false) {
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
    },
    
    /**
     * Move to the previous step in animation
     */
    prevStep() {
        // Prevent stepping before first step
        if (this.currentStep <= 0) return;
        
        this.currentStep--;
        this.displayStep();
        this.updateProgressTracker();
        
        // Update button states with strict boundary checks
        document.getElementById("next-step").disabled = false; // Next is always available if we went back
        document.getElementById("prev-step").disabled = this.currentStep <= 0;
    },
    
    /**
     * Update the progress tracker display
     */
    updateProgressTracker() {
        if (this.elements.progressTracker) {
            this.elements.progressTracker.textContent = `Bước ${this.currentStep + 1} / ${this.steps.length}`;
        }
    },
    
    /**
     * Display the current step in the visualization
     */
    displayStep() {
        if (this.steps.length === 0) return;
        
        const step = this.steps[this.currentStep];
        // Visualize based on the current step
        this.visualizeStepState(step);
    },
