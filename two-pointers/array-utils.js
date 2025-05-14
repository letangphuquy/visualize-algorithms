/**
 * Array Utilities Module
 * Contains functions for array manipulation, validation and interactive array inputs
 */

// Global validation state
let validationState = {
  A: { valid: false, errorMessages: [] },
  B: { valid: false, errorMessages: [] }
};

// Interactive array input functions
function createInteractiveArrayInputs() {
  initArrayContainer('A');
  initArrayContainer('B');
}

function initArrayContainer(id) {
  const container = document.getElementById(`${id}-array-container`);
  if (!container) return;
  
  // Clear the container
  container.innerHTML = '';
  
  // Add the "add item" button
  const addBtn = document.createElement('div');
  addBtn.className = 'add-item-btn';
  addBtn.innerHTML = '+';
  addBtn.onclick = () => addArrayItem(id);
  container.appendChild(addBtn);
  
  // Add 5 empty items by default
  for (let i = 0; i < 5; i++) {
    addArrayItem(id);
  }
  
  // Clear the hidden textarea
  const textarea = document.getElementById(id);
  if (textarea) textarea.value = '';
    // Initialize validation state 
  validationState[id] = { valid: false, errorMessages: [id === 'A' ? getText("emptyListA") : getText("emptyListB")] };
  updateValidationMessage(id);
  updatePlayButtonState();
}

function addArrayItem(id, value = '') {
  const container = document.getElementById(`${id}-array-container`);
  if (!container) return;
  
  const addBtn = container.querySelector('.add-item-btn');
  if (!addBtn) return;
  
  // Create a new item
  const item = document.createElement('div');
  item.className = 'array-input-item';
  
  // Create input element
  const input = document.createElement('input');
  input.type = 'text';
  input.value = value;
  input.placeholder = '#';
  
  // Add event listeners
  input.addEventListener('input', () => {
    validateInput(input);
    updateHiddenInput(container);
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (validateInput(input)) {
        addArrayItem(id);
      } else {
        // Display more prominent error if trying to add with invalid input
        input.classList.add('input-error-highlight');
        setTimeout(() => input.classList.remove('input-error-highlight'), 1000);
      }
    }
  });
  input.addEventListener('blur', () => {
    // Re-validate on focus out
    validateInput(input);
  });
  
  // Create remove button
  const removeBtn = document.createElement('div');
  removeBtn.className = 'remove-btn';
  removeBtn.innerHTML = '×';
  removeBtn.onclick = (e) => {
    e.stopPropagation();
    item.remove();
    updateHiddenInput(container);
    // Re-validate the container after removing an item
    validateArrayContainer(id);
  };
  
  // Append elements
  item.appendChild(input);
  item.appendChild(removeBtn);
  
  // Insert before the add button
  container.insertBefore(item, addBtn);
  
  // Focus on the new input
  if (value === '') {
    setTimeout(() => input.focus(), 0);
  } else {
    // Validate the input if it has a value
    validateInput(input);
  }
  
  // Update hidden textarea
  updateHiddenInput(container);
  
  // Validate the entire container
  validateArrayContainer(id);
}

function updateHiddenInput(container) {
  if (!container) return;
  
  const arrayId = container.id.split('-')[0]; // A-array-container -> A
  if (!arrayId) return;
  
  const hiddenInput = document.getElementById(arrayId);
  if (!hiddenInput) return;
  
  const values = [];
  container.querySelectorAll('.array-input-item input').forEach(input => {
    if (input && input.value && input.value.trim && input.value.trim() !== '') {
      values.push(input.value.trim());
    }
  });
  
  hiddenInput.value = values.join(', ');
}

function generateRandomArray(id, size) {
  const container = document.getElementById(`${id}-array-container`);
  if (!container) return;
  
  // Clear current items
  const items = container.querySelectorAll('.array-input-item');
  items.forEach(item => item.remove());
  
  // Get size safely
  size = parseInt(size);
  if (isNaN(size) || size < 1) size = 5;
  if (size > 20) size = 20; // For safety
  
  // Generate random values
  for (let i = 0; i < size; i++) {
    // Random value between -100 and 100
    const value = Math.floor(Math.random() * 201) - 100;
    addArrayItem(id, value);
  }
  
  // Update validation state
  validationState[id].valid = true;
  validationState[id].errorMessages = [];
  updateValidationMessage(id);
  updatePlayButtonState();
}

function sortArrayInput(id) {
  const container = document.getElementById(`${id}-array-container`);
  if (!container) return;
  
  // Get current values
  const values = [];
  let allValid = true;
  
  container.querySelectorAll('.array-input-item input').forEach(input => {
    if (input && input.value && input.value.trim() !== '') {
      const val = parseInt(input.value.trim());
      if (!isNaN(val)) {
        values.push(val);
      } else {
        allValid = false;
      }
    }
  });
    if (!allValid) {
    alert(getText("invalidNumber"));
    return;
  }
  
  if (values.length === 0) {
    alert(id === 'A' ? getText("emptyListA") : getText("emptyListB"));
    return;
  }
  
  // Sort numerically
  values.sort((a, b) => a - b);
  
  // Clear current items
  const items = container.querySelectorAll('.array-input-item');
  items.forEach(item => item.remove());
  
  // Add sorted items
  values.forEach(val => addArrayItem(id, val));
  
  // Set validation state after sorting
  if (values.length > 0) {
    validationState[id].valid = true;
    validationState[id].errorMessages = [];
    updateValidationMessage(id);
    updatePlayButtonState();
  }
}

// Parse input string to array of numbers
function parseInput(inputStr) {
  // Replace commas with spaces and split by whitespace
  return inputStr.replace(/,/g, ' ')
                 .trim()
                 .split(/\s+/)
                 .filter(val => val !== '')
                 .map(val => {
                    const num = parseInt(val);
                    if (isNaN(num)) {
                      throw new Error(`"${val}" is not a valid number`);
                    }
                    return num;
                 });
}

// Validate input arrays
function validateInput(input) {
  // For array inputs passed to validateInput(listA, 'A')
  if (Array.isArray(input)) {
    const arr = input;
    const name = arguments[1] || "Array";
    
    if (arr.length === 0) {
      throw new Error(`${name} cannot be empty`);
    }
    
    const MIN_VAL = -1e9;
    const MAX_VAL = 1e9;
    
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < MIN_VAL || arr[i] > MAX_VAL) {
        throw new Error(`Number at position ${i+1} in ${name} (${arr[i]}) is out of range. Values must be between -10^9 and 10^9.`);
      }
    }
    
    return true;
  }

  // Safety check for undefined or null inputs
  if (!input) return false;
  if (typeof input.value === 'undefined') return false;
  
  const value = input.value.toString().trim();
  const arrayContainer = input.closest('.array-input-container');
  const arrayId = arrayContainer ? arrayContainer.id.split('-')[0] : null; // Get 'A' or 'B'
  
  // Get the position of the current input in its container for better error messages
  let inputPosition = 0;
  if (arrayContainer) {
    const inputs = Array.from(arrayContainer.querySelectorAll('.array-input-item input'));
    inputPosition = inputs.indexOf(input) + 1;
  }
  
  if (value === '') {
    if (input.parentElement) {
      input.parentElement.remove();
      validateArrayContainer(arrayId);
    }
    return true;
  }
    // More strict validation - must be a valid integer
  if (!/^-?\d+$/.test(value)) {
    markInputInvalid(input, getText("mustBeInteger"), 
      getText("notValidInteger", inputPosition, arrayId), arrayId);
    return false;
  }
  
  const num = parseInt(value);
  
  // Range validation
  const MIN_VAL = -1e9;
  const MAX_VAL = 1e9;
  if (num < MIN_VAL || num > MAX_VAL) {
    markInputInvalid(input, getText("valueRangeError", MIN_VAL, MAX_VAL), 
      getText("outOfRange", inputPosition, num, arrayId), arrayId);
    return false;
  }
    // Valid input
  markInputValid(input, getText("validInput"));
  input.value = num; // Normalize the display
  
  // Check the entire array container for validation
  if (arrayId) {
    validateArrayContainer(arrayId);
  }
  
  // Update hidden input
  const container = input.closest('.array-input-container');
  if (container) {
    updateHiddenInput(container);
  }
  
  return true;
}

// Mark an input as invalid with tooltip and error message
function markInputInvalid(input, tooltipMessage, errorMessage, arrayId) {
  // Apply visual styling
  input.style.borderColor = '#f44336';
  input.style.boxShadow = '0 0 5px rgba(244,67,54,0.5)';
  input.title = tooltipMessage;
  input.classList.add('invalid');
  
  // If this is part of an array with an ID, update the validation state
  if (arrayId && (arrayId === 'A' || arrayId === 'B')) {
    // Add error message if it doesn't exist already
    if (!validationState[arrayId].errorMessages.includes(errorMessage)) {
      validationState[arrayId].errorMessages.push(errorMessage);
    }
    validationState[arrayId].valid = false;
    
    // Update validation message display
    updateValidationMessage(arrayId);
  }
  
  // Disable play button if any input is invalid
  updatePlayButtonState();
}

// Mark an input as valid
function markInputValid(input, tooltipMessage) {
  // Apply visual styling
  input.style.borderColor = '#4caf50';
  input.style.boxShadow = '0 0 5px rgba(76,175,80,0.5)';
  input.title = tooltipMessage || getText("validNumber");
  input.classList.remove('invalid');
  
  // We don't immediately update validation state here
  // as we need to check all inputs in the container
}

// Validate an entire array container
function validateArrayContainer(arrayId) {
  if (!arrayId || (arrayId !== 'A' && arrayId !== 'B')) return;
  
  const container = document.getElementById(`${arrayId}-array-container`);
  if (!container) return;
  
  // Reset validation state for this array
  validationState[arrayId] = { valid: true, errorMessages: [] };
  
  // Check if the array has any inputs
  const inputs = container.querySelectorAll('.array-input-item input');
  if (inputs.length === 0) {
    validationState[arrayId].valid = false;
    validationState[arrayId].errorMessages.push(`List ${arrayId} is empty. Please add at least one number.`);
    updateValidationMessage(arrayId);
    updatePlayButtonState();
    return;
  }
  
  // Check each input
  let position = 1;
  inputs.forEach(input => {
    const value = input.value.toString().trim();
    
  // Empty value check
    if (value === '') {
      markInputInvalid(input, getText("valueEmpty"), 
        getText("elementEmpty", position, arrayId), arrayId);
    }
    // Integer check
    else if (!/^-?\d+$/.test(value)) {
      markInputInvalid(input, getText("mustBeInteger"), 
        getText("notValidInteger", position, arrayId), arrayId);
    }
    // Range check
    else {
      const num = parseInt(value);
      const MIN_VAL = -1e9;
      const MAX_VAL = 1e9;
      if (num < MIN_VAL || num > MAX_VAL) {
        markInputInvalid(input, getText("valueRangeError", MIN_VAL, MAX_VAL), 
          getText("outOfRange", position, num, arrayId), arrayId);
      }
    }
    position++;
  });
  
  // Update validation message display
  updateValidationMessage(arrayId);
  
  // Update play button state
  updatePlayButtonState();
}

// Update the validation message display for an array
function updateValidationMessage(arrayId) {
  // Find or create validation message container
  let messageContainer = document.getElementById(`${arrayId}-validation-messages`);
  if (!messageContainer) {
    messageContainer = document.createElement('div');
    messageContainer.id = `${arrayId}-validation-messages`;
    messageContainer.className = 'validation-messages';
    
    const container = document.getElementById(`${arrayId}-array-container`);
    if (container && container.parentNode) {
      container.parentNode.insertBefore(messageContainer, container.nextSibling);
    }
  }
    // Display validation status
  if (validationState[arrayId].valid) {
    messageContainer.innerHTML = `<div class="validation-success">${getText("validInput")}</div>`;
    messageContainer.classList.remove('has-errors');
  } else {
    let messages = validationState[arrayId].errorMessages.map(msg => 
      `<li><span class="error-icon">⚠️</span> ${msg}</li>`).join('');
    
    messageContainer.innerHTML = `
      <div class="validation-error">
        <strong>${getText("fixIssues")}</strong>
        <ul>${messages}</ul>
      </div>
    `;
    messageContainer.classList.add('has-errors');
  }
}

// Update the state of the play button based on validation
function updatePlayButtonState() {
  const playButton = document.getElementById('play-button');
  if (!playButton) return;
  
  // Disable button if any array has validation errors
  const isValid = validationState.A.valid && validationState.B.valid;
    if (isValid) {
    playButton.disabled = false;
    playButton.title = "Generate visualization and start animation";
    playButton.classList.remove('disabled');
  } else {
    playButton.disabled = true;
    playButton.title = getText("fixValidationErrors");
    playButton.classList.add('disabled');
    playButton.setAttribute('data-error-message', getText("fixErrorsFirst"));
  }
}
