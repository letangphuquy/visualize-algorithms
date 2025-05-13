/**
 * Animation Module
 * Contains functions for handling animations and visualization steps
 */

// Global variables for animation 
let steps = [];
let currentStep = 0;
let animationInterval;
let isPaused = false;

// Start the animation process
function startAnimation() {
  // Clear any existing animation
  clearInterval(animationInterval);
  isPaused = false;
  
  try {
    // Check if both arrays are valid first
    if (!validationState.A.valid || !validationState.B.valid) {
      // Show which list has issues
      let errorMessage = "Please fix validation errors before starting:";
      
      if (!validationState.A.valid) {
        errorMessage += "\n- List A: " + validationState.A.errorMessages.join("; ");
      }
      
      if (!validationState.B.valid) {
        errorMessage += "\n- List B: " + validationState.B.errorMessages.join("; ");
      }
      
      throw new Error(errorMessage);
    }
    
    // Use the values from interactive inputs (which are now validated)
    let listA = [];
    let listB = [];
    
    // Safely get values from input elements
    const containerA = document.getElementById('A-array-container');
    if (containerA) {
      containerA.querySelectorAll('.array-input-item input').forEach(input => {
        if (input && input.value && typeof input.value === 'string' && !isNaN(parseInt(input.value.trim()))) {
          listA.push(parseInt(input.value.trim()));
        }
      });
    }
    
    const containerB = document.getElementById('B-array-container');
    if (containerB) {
      containerB.querySelectorAll('.array-input-item input').forEach(input => {
        if (input && input.value && typeof input.value === 'string' && !isNaN(parseInt(input.value.trim()))) {
          listB.push(parseInt(input.value.trim()));
        }
      });
    }
    
    // Double-check validation with the parsed arrays
    if (!listA || listA.length === 0) {
      validateArrayContainer('A'); // Force update the validation state
      throw new Error("List A cannot be empty. Please add at least one number.");
    }
    if (!listB || listB.length === 0) {
      validateArrayContainer('B'); // Force update the validation state
      throw new Error("List B cannot be empty. Please add at least one number.");
    }
    
    // Show animation controls
    const animControls = document.getElementById("animation-controls");
    if (animControls) {
      animControls.classList.add("visible");
    }
    
    // Reset UI controls
    document.getElementById("pause-animation").textContent = "Pause";
    document.getElementById("pause-animation").disabled = false;
    document.getElementById("prev-step").disabled = true;
    document.getElementById("next-step").disabled = true;
      // Build steps for visualization
    let i = 0, j = 0;
    let C = [];
    steps = [];
    
    // Add initial step to show the starting state
    steps.push({
      C: [],
      A_pointer: 0,
      B_pointer: 0,
      listA: [...listA],
      listB: [...listB],
      currentA: listA[0],
      currentB: listB[0],
      explanation: [
        "Starting the merge process",
        "Pointers initialized at the beginning of both arrays",
        "Result array C is empty"
      ],
      action: "initialize",
      fromArray: null,
      prevPointerA: null,
      prevPointerB: null
    });
    
    while (i < listA.length && j < listB.length) {
      // First add a comparison step
      steps.push({
        C: [...C],
        A_pointer: i,
        B_pointer: j,
        listA: [...listA],
        listB: [...listB],
        currentA: listA[i],
        currentB: listB[j],
        explanation: [
          `Comparing A[${i}] and B[${j}]`,
          `A[${i}] = ${listA[i]}, B[${j}] = ${listB[j]}`,
          listA[i] < listB[j] ? 
            `Since ${listA[i]} < ${listB[j]}, we'll select from A` : 
            `Since ${listB[j]} <= ${listA[i]}, we'll select from B`
        ],
        action: "compare",
        fromArray: null,
        prevPointerA: i,
        prevPointerB: j
      });
      
      if (listA[i] < listB[j]) {
        C.push(listA[i]);
        const prevI = i; // Store current position before incrementing
        i++;
        
        // Then add a selection/movement step
        steps.push({
          C: [...C],
          A_pointer: i,
          B_pointer: j,
          listA: [...listA],
          listB: [...listB],
          currentA: i < listA.length ? listA[i] : null,
          currentB: listB[j],
          explanation: [
            `Selected A[${prevI}] = ${listA[prevI]}`,
            `Appended ${listA[prevI]} to C`,
            `Advanced A pointer from ${prevI} to ${i}`
          ],
          action: "select",
          fromArray: "A",
          prevPointerA: prevI,
          prevPointerB: j,
          selectedValue: listA[prevI]
        });
      } else {
        C.push(listB[j]);
        const prevJ = j; // Store current position before incrementing
        j++;
        
        // Then add a selection/movement step
        steps.push({
          C: [...C],
          A_pointer: i,
          B_pointer: j,
          listA: [...listA],
          listB: [...listB],
          currentA: listA[i],
          currentB: j < listB.length ? listB[j] : null,
          explanation: [
            `Selected B[${prevJ}] = ${listB[prevJ]}`,
            `Appended ${listB[prevJ]} to C`,
            `Advanced B pointer from ${prevJ} to ${j}`
          ],
          action: "select",
          fromArray: "B",
          prevPointerA: i,
          prevPointerB: prevJ,
          selectedValue: listB[prevJ]
        });
      }
    }    // Add remaining elements from array A, if any
    if (i < listA.length) {
      // First add an explanation step
      steps.push({
        C: [...C],
        A_pointer: i,
        B_pointer: j,
        listA: [...listA],
        listB: [...listB],
        currentA: listA[i],
        currentB: null,
        explanation: [
          `Array B is exhausted`,
          `${listA.length - i} elements remaining in A`,
          `We'll append all remaining elements from A to C`
        ],
        action: "remaining-start",
        fromArray: "A",
        prevPointerA: i,
        prevPointerB: j
      });
      
      const remaining = listA.slice(i);
      C.push(...remaining); // Push all remaining elements to array at once
      
      // Then add the step showing all remaining elements added
      steps.push({
        C: [...C],
        A_pointer: listA.length,
        B_pointer: j,
        listA: [...listA],
        listB: [...listB],
        currentA: null,
        currentB: null,
        explanation: [
          `Added ${remaining.length} elements from A: ${remaining.join(', ')}`,
          `All elements have been merged into C`,
          `Merge complete`
        ],
        action: "remaining-end",
        fromArray: "A",
        remainingIndices: Array.from({length: remaining.length}, (_, idx) => C.length - remaining.length + idx), // Indices in C for highlighting
        prevPointerA: i,
        prevPointerB: j
      });
    }
    
    // Add remaining elements from array B, if any
    if (j < listB.length) {
      // First add an explanation step
      steps.push({
        C: [...C],
        A_pointer: i,
        B_pointer: j,
        listA: [...listA],
        listB: [...listB],
        currentA: null,
        currentB: listB[j],
        explanation: [
          `Array A is exhausted`,
          `${listB.length - j} elements remaining in B`,
          `We'll append all remaining elements from B to C`
        ],
        action: "remaining-start",
        fromArray: "B",
        prevPointerA: i,
        prevPointerB: j
      });
      
      const remaining = listB.slice(j);
      C.push(...remaining); // Push all remaining elements to array at once
      
      // Then add the step showing all remaining elements added
      steps.push({
        C: [...C],
        A_pointer: i,
        B_pointer: listB.length,
        listA: [...listA],
        listB: [...listB],
        currentA: null,
        currentB: null,
        explanation: [
          `Added ${remaining.length} elements from B: ${remaining.join(', ')}`,
          `All elements have been merged into C`,
          `Merge complete`
        ],
        action: "remaining-end",
        fromArray: "B",
        remainingIndices: Array.from({length: remaining.length}, (_, idx) => C.length - remaining.length + idx), // Indices in C for highlighting
        prevPointerA: i,
        prevPointerB: j
      });
    }
    
    // If both arrays are already exhausted (edge case)
    if (i >= listA.length && j >= listB.length && steps.length > 0) {
      steps[steps.length-1].explanation.push("Merge complete");
    }
    
    currentStep = 0;
    displayStep();
    updateProgressTracker();
    const speedValue = document.getElementById("speed").value;
    animationInterval = setInterval(nextStep, speedValue);
    
    // Auto-scroll to the animation section
    setTimeout(() => {
      document.getElementById("visualization").scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      });
    }, 100);
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}

// Display the current step in the visualization
function displayStep() {
  const visualization = document.getElementById("visualization");
  visualization.innerHTML = "<h2>Merging Process:</h2>";
  
  if (steps.length === 0) return;
  
  const step = steps[currentStep];
  const stepDiv = document.createElement("div");
  stepDiv.className = "step active";

  // Get the transition type to apply appropriate visual effects
  const action = step.action || '';
  const fromArray = step.fromArray || '';
  
  // Create visual representation of arrays
  let listAHtml = '<div class="array-container">';
  step.listA.forEach((num, idx) => {
    // Basic pointer checks
    const isPointer = idx === step.A_pointer;
    const isPrevPointer = step.prevPointerA !== null && idx === step.prevPointerA;
    
    // For transition effects
    const wasSelected = isPrevPointer && step.fromArray === 'A';
    const isSelected = (idx === step.A_pointer && step.currentA !== null) || 
                      (action === 'remaining-start' && idx >= step.A_pointer && fromArray === 'A');
                      
    // For dimming effect
    const isOtherArraySelected = (step.currentB !== null && step.currentA === null && isPointer && 
                                  action !== 'initialize' && action !== 'compare') || 
                                 (action === 'select' && fromArray === 'B');
    
    // Classes based on state
    let classes = [];
    if (isPointer) classes.push('pointer');
    if (isPrevPointer && action === 'select' && fromArray === 'A') classes.push('prev-pointer');
    if (wasSelected && action === 'select') classes.push('was-selected');
    if (isSelected) {
      if (action === 'compare') classes.push('comparing');
      else if (action === 'remaining-start') classes.push('to-be-selected');
      else classes.push('selected outstanding');
    }
    if (isOtherArraySelected) classes.push('dimmed');
    
    listAHtml += `<div class="array-item ${classes.join(' ')}">${num}</div>`;
  });
  listAHtml += '</div>';
  
  let listBHtml = '<div class="array-container">';
  step.listB.forEach((num, idx) => {
    // Basic pointer checks
    const isPointer = idx === step.B_pointer;
    const isPrevPointer = step.prevPointerB !== null && idx === step.prevPointerB;
    
    // For transition effects
    const wasSelected = isPrevPointer && step.fromArray === 'B';
    const isSelected = (idx === step.B_pointer && step.currentB !== null) ||
                      (action === 'remaining-start' && idx >= step.B_pointer && fromArray === 'B');
                      
    // For dimming effect
    const isOtherArraySelected = (step.currentA !== null && step.currentB === null && isPointer && 
                                 action !== 'initialize' && action !== 'compare') ||
                                (action === 'select' && fromArray === 'A');
    
    // Classes based on state
    let classes = [];
    if (isPointer) classes.push('pointer');
    if (isPrevPointer && action === 'select' && fromArray === 'B') classes.push('prev-pointer');
    if (wasSelected && action === 'select') classes.push('was-selected');
    if (isSelected) {
      if (action === 'compare') classes.push('comparing');
      else if (action === 'remaining-start') classes.push('to-be-selected');
      else classes.push('selected outstanding');
    }
    if (isOtherArraySelected) classes.push('dimmed');
    
    listBHtml += `<div class="array-item ${classes.join(' ')}">${num}</div>`;
  });
  listBHtml += '</div>';
  
  // Create visual representation of result array C - now always an array
  let resultCHtml = '<div class="array-container result-container">';
  
  step.C.forEach((num, idx) => {
    let classes = [];
    
    // Check if this is the latest added item based on step type
    const isLatest = step.action === 'select' && idx === step.C.length - 1;
    
    // Check if this is part of the remaining items batch
    const isRemainingElement = step.remainingIndices && step.remainingIndices.includes(idx);
    
    if (isLatest) classes.push('latest-added');
    if (isRemainingElement) classes.push('remaining-element');
    
    resultCHtml += `<div class="array-item ${classes.join(' ')}">${num}</div>`;
  });
  resultCHtml += '</div>';
  
  // Create explanation text with animation
  let explanationHtml = '';
  if (step.explanation && step.explanation.length > 0) {
    explanationHtml = `
      <div class="step-explanation">
        <ul>
          ${step.explanation.map(line => `<li class="explanation-line">${line}</li>`).join('')}
        </ul>
      </div>
    `;
  }
  
  // Build the complete step display
  stepDiv.innerHTML = `
    <div class="step-header">
      <strong>Step ${currentStep + 1}:</strong>
    </div>
    
    ${explanationHtml}
    
    <div class="step-details">
      <div class="arrays">
        <div class="array-row">
          <span class="array-label">A:</span>
          ${listAHtml}
        </div>
        <div class="array-row">
          <span class="array-label">B:</span>
          ${listBHtml}
        </div>
      </div>
      <div class="result-section">
        <p class="result-label">Current C:</p>
        ${resultCHtml}
      </div>
    </div>
  `;
  
  visualization.appendChild(stepDiv);
  
  // Apply animation to explanation lines with delay
  const explanationLines = stepDiv.querySelectorAll('.explanation-line');
  explanationLines.forEach((line, index) => {
    setTimeout(() => {
      line.classList.add('active');
    }, index * 300); // 300ms delay between each line
  });
}

// Update the progress tracker display
function updateProgressTracker() {
  const progressTracker = document.getElementById("progress-tracker");
  progressTracker.textContent = `Step ${currentStep + 1} of ${steps.length}`;
}

// Move to the next step in animation
function nextStep(isManual = false) {
  // Prevent stepping beyond array bounds
  if (currentStep >= steps.length - 1) {
    // If at the last step, stop the animation
    clearInterval(animationInterval);
    
    // Always use array join for display
    const finalResult = steps[steps.length - 1].C.join(', ');
    document.getElementById("result").innerText = `Final Result C: [${finalResult}]`;
    document.getElementById("progress-tracker").textContent = `Completed: ${steps.length} steps`;
    
    return;
  }

  currentStep++;
  if (currentStep < steps.length) {
    displayStep();
    updateProgressTracker();
    
    // If manual navigation, update button states with robust boundary checks
    if (isManual) {
      document.getElementById("prev-step").disabled = currentStep <= 0;
      document.getElementById("next-step").disabled = currentStep >= steps.length - 1;
    }
  } else {
    // Safety check - this should not happen due to the check at the beginning
    clearInterval(animationInterval);
    document.getElementById("result").innerText = `Smallest Number C: ${steps[steps.length - 1].C.join(', ')}`;
    document.getElementById("progress-tracker").textContent = `Completed: ${steps.length} steps`;
  }
}

// Move to the previous step in animation
function prevStep() {
  // Prevent stepping before first step
  if (currentStep <= 0) return;
  
  currentStep--;
  displayStep();
  updateProgressTracker();
  
  // Update button states with strict boundary checks
  document.getElementById("next-step").disabled = false; // Next is always available if we went back
  document.getElementById("prev-step").disabled = currentStep <= 0;
}

// Reset the visualization
function resetVisualization() {
  clearInterval(animationInterval);
  document.getElementById("visualization").innerHTML = "";
  document.getElementById("result").innerText = "";
  document.getElementById("progress-tracker").textContent = "";
  document.getElementById("A").value = "";
  document.getElementById("B").value = "";
  
  // Reset animation control buttons
  isPaused = false;
  document.getElementById("pause-animation").textContent = "Pause";
  document.getElementById("pause-animation").disabled = false;
  document.getElementById("prev-step").disabled = true;
  document.getElementById("next-step").disabled = true;
  
  // Reset the visualization container to show initial state
  document.getElementById("visualization").innerHTML = 
    "<div class='initial-state'>Enter numbers and press 'Generate & Play' to start</div>";
}
