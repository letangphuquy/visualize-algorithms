/**
 * array-utils.js
 * Utility functions for handling arrays in the prefix sum visualization
 */

const ArrayUtils = {
    /**
     * Parse a comma-separated string input into an array of numbers
     * @param {string} input - Comma-separated string of numbers
     * @returns {number[]} - Array of numbers
     */
    parseArrayInput(input) {
        if (!input || input.trim() === '') {
            return [];
        }
        
        return input.split(',')
            .map(item => item.trim())
            .filter(item => item !== '')
            .map(item => {
                const num = Number(item);
                return isNaN(num) ? 0 : num;
            });
    },

    /**
     * Generate a random array of integers
     * @param {number} size - Size of the array to generate
     * @param {number} min - Minimum value (inclusive)
     * @param {number} max - Maximum value (inclusive)
     * @returns {number[]} - Random array of integers
     */
    generateRandomArray(size = 8, min = 1, max = 10) {
        const array = [];
        for (let i = 0; i < size; i++) {
            array.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return array;
    },    /**
     * Validate query indices against array bounds
     * @param {number} left - Left index (1-indexed)
     * @param {number} right - Right index (1-indexed)
     * @param {number} arrayLength - Length of the original array
     * @returns {boolean} - Whether the indices are valid
     */
    validateQueryIndices(left, right, arrayLength) {
        return left >= 1 && right >= left && right <= arrayLength;
    },
      /**
     * Shuffle an array using the Fisher-Yates algorithm
     * @param {number[]} array - The array to shuffle
     * @returns {number[]} - The shuffled array (same reference)
     */
    shuffleArray(array) {
        const arrCopy = [...array];
        for (let i = arrCopy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
        }
        return arrCopy;
    },

    /**
     * Update the UI input field with the array
     * @param {number[]} array - Array to display
     * @param {string} inputId - ID of the input element
     */
    updateArrayInput(array, inputId = 'array-input') {
        const inputElement = document.getElementById(inputId);
        if (inputElement) {
            inputElement.value = array.join(', ');
        }
    },

    /**
     * Creates a DOM element representing an array element for visualization
     * @param {number} value - The value of the array element
     * @param {number} index - The index of the element (0-based)
     * @param {boolean} showIndex - Whether to show the index below the element
     * @returns {HTMLElement} - The DOM element representing the array element
     */
    createArrayElementDOM(value, index, showIndex = true) {
        const element = document.createElement('div');
        element.className = 'array-element';
        element.textContent = value;
        element.dataset.value = value;
        element.dataset.index = index;
        
        if (showIndex) {
            const indexSpan = document.createElement('span');
            indexSpan.className = 'array-index';
            indexSpan.textContent = index;
            element.appendChild(indexSpan);
        }
        
        return element;
    },

    /**
     * Renders an array as DOM elements in a container
     * @param {number[]} array - The array to render
     * @param {string} containerId - The ID of the container element
     * @param {boolean} showIndices - Whether to show indices
     * @param {number} indexOffset - Offset for displaying indices (e.g., 0 or 1 for 0-indexed or 1-indexed)
     */
    renderArray(array, containerId, showIndices = true, indexOffset = 0) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Clear the container
        container.innerHTML = '';
        
        // Create and append array elements
        array.forEach((value, index) => {
            const element = this.createArrayElementDOM(value, index + indexOffset, showIndices);
            container.appendChild(element);
        });
    }
};

// Make ArrayUtils available globally
window.ArrayUtils = ArrayUtils;
