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
    // Use the values from interactive inputs
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
    
    // Validation
    if (!listA || listA.length === 0) {
      throw new Error("List A cannot be empty. Please add at least one number.");
    }
    if (!listB || listB.length === 0) {
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
    
    while (i < listA.length && j < listB.length) {
      if (listA[i] < listB[j]) {
        C.push(listA[i]);
        steps.push({
          C: [...C],
          A_pointer: i,
          B_pointer: j,
          selected: `A: ${listA[i]}`,
          listA: [...listA],
          listB: [...listB],
          currentA: listA[i],
          currentB: j < listB.length ? listB[j] : null
        });
        i++;
      } else {
        C.push(listB[j]);
        steps.push({
          C: [...C],
          A_pointer: i,
          B_pointer: j,
          selected: `B: ${listB[j]}`,
          listA: [...listA],
          listB: [...listB],
          currentA: i < listA.length ? listA[i] : null,
          currentB: listB[j]
        });
        j++;
      }
    }
    
    // Add each remaining element as a separate step
    while (i < listA.length) {
      C.push(listA[i]);
      steps.push({
        C: [...C],
        A_pointer: i,
        B_pointer: j,
        selected: `A: ${listA[i]}`,
        listA: [...listA],
        listB: [...listB],
        currentA: listA[i],
        currentB: null
      });
      i++;
    }
    
    while (j < listB.length) {
      const remaining = listB.slice(j);
      C.push(...remaining); // Push all remaining elements to array
      steps.push({
        C: [...C], // Clone the array
        A_pointer: i,
        B_pointer: listB.length,
        selected: `B (remaining): ${remaining.join(', ')}`,
        listA: [...listA],
        listB: [...listB],
        currentA: null,
        currentB: null
      });
      j++;
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
  
  // Create visual representation of arrays
  let listAHtml = '<div class="array-container">';
  step.listA.forEach((num, idx) => {
    const isPointer = idx === step.A_pointer;
    const isSelected = idx === step.A_pointer && step.currentA !== null;
    listAHtml += `<div class="array-item ${isPointer ? 'pointer' : ''} ${isSelected ? 'selected' : ''}">${num}</div>`;
  });
  listAHtml += '</div>';
  
  let listBHtml = '<div class="array-container">';
  step.listB.forEach((num, idx) => {
    const isPointer = idx === step.B_pointer;
    const isSelected = idx === step.B_pointer && step.currentB !== null;
    listBHtml += `<div class="array-item ${isPointer ? 'pointer' : ''} ${isSelected ? 'selected' : ''}">${num}</div>`;
  });
  listBHtml += '</div>';
  
  // Create visual representation of result array C - now always an array
  let resultCHtml = '<div class="array-container result-container">';
  step.C.forEach((num, idx) => {
    // Highlight the latest added item
    const isLatest = idx === step.C.length - 1;
    resultCHtml += `<div class="array-item ${isLatest ? 'latest-added' : ''}">${num}</div>`;
  });
  resultCHtml += '</div>';
  
  stepDiv.innerHTML = `
    <strong>Step ${currentStep + 1}:</strong><br>
    <div class="step-details">
      <p>Selected: ${step.selected}</p>
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
