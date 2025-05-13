/**
 * Array Utilities Module
 * Contains functions for array manipulation, validation and interactive array inputs
 */

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
  input.addEventListener('input', () => validateInput(input));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addArrayItem(id);
    }
  });
  
  // Create remove button
  const removeBtn = document.createElement('div');
  removeBtn.className = 'remove-btn';
  removeBtn.innerHTML = '×';
  removeBtn.onclick = (e) => {
    e.stopPropagation();
    item.remove();
    updateHiddenInput(container);
  };
  
  // Append elements
  item.appendChild(input);
  item.appendChild(removeBtn);
  
  // Insert before the add button
  container.insertBefore(item, addBtn);
  
  // Focus on the new input
  if (value === '') {
    setTimeout(() => input.focus(), 0);
  }
  
  // Update hidden textarea
  updateHiddenInput(container);
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
}

function sortArrayInput(id) {
  const container = document.getElementById(`${id}-array-container`);
  if (!container) return;
  
  // Get current values
  const values = [];
  container.querySelectorAll('.array-input-item input').forEach(input => {
    if (input && input.value && input.value.trim() !== '') {
      const val = parseInt(input.value.trim());
      if (!isNaN(val)) values.push(val);
    }
  });
  
  // Sort numerically
  values.sort((a, b) => a - b);
  
  // Clear current items
  const items = container.querySelectorAll('.array-input-item');
  items.forEach(item => item.remove());
  
  // Add sorted items
  values.forEach(val => addArrayItem(id, val));
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
  
  if (value === '') {
    if (input.parentElement) {
      input.parentElement.remove();
    }
    return true;
  }
  
  // More strict validation - must be a valid integer
  if (!/^-?\d+$/.test(value)) {
    input.style.borderColor = '#f44336';
    input.style.boxShadow = '0 0 5px rgba(244,67,54,0.5)';
    input.title = "Must be a valid integer";
    return false;
  }
  
  const num = parseInt(value);
  
  // Range validation
  const MIN_VAL = -1e9;
  const MAX_VAL = 1e9;
  if (num < MIN_VAL || num > MAX_VAL) {
    input.style.borderColor = '#f44336';
    input.style.boxShadow = '0 0 5px rgba(244,67,54,0.5)';
    input.title = `Value must be between ${MIN_VAL} and ${MAX_VAL}`;
    return false;
  }
  
  // Valid input
  input.style.borderColor = '#4caf50';
  input.style.boxShadow = '0 0 5px rgba(76,175,80,0.5)';
  input.title = 'Valid number';
  input.value = num; // Normalize the display
  
  setTimeout(() => {
    // Remove success indicators after 500ms
    input.style.borderColor = '';
    input.style.boxShadow = '';
  }, 500);
  
  // Update hidden input
  const container = input.closest('.array-input-container');
  if (container) {
    updateHiddenInput(container);
  }
  
  return true;
}
