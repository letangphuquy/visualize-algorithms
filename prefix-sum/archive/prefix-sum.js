/**
 * prefix-sum.js
 * Implements the prefix sum algorithm and range sum queries
 */

const PrefixSum = {
    /**
     * Original array for which we calculate the prefix sum
     * @type {number[]}
     */
    originalArray: [],

    /**
     * Prefix sum array (1-indexed)
     * S[i] represents the sum of elements A[0] to A[i-1]
     * @type {number[]}
     */
    prefixSumArray: [],

    /**
     * Steps recorded during prefix sum computation for visualization
     * @type {Array}
     */
    computationSteps: [],

    /**
     * Initialize with a new array and calculate its prefix sum
     * @param {number[]} array - Input array
     * @returns {number[]} - Prefix sum array
     */
    initialize(array) {
        this.originalArray = [...array];
        this.computationSteps = [];
        return this.calculatePrefixSum();
    },

    /**
     * Calculate the prefix sum array (1-indexed representation)
     * @returns {number[]} - Prefix sum array
     */
    calculatePrefixSum() {
        const n = this.originalArray.length;
        // Create a prefix sum array with n+1 elements (for 1-indexed queries)
        this.prefixSumArray = new Array(n + 1).fill(0);
        
        // Record the initial state
        this.recordComputationStep(0, 0, 0);
        
        // Calculate prefix sums
        for (let i = 0; i < n; i++) {
            this.prefixSumArray[i + 1] = this.prefixSumArray[i] + this.originalArray[i];
            
            // Record this step for visualization
            this.recordComputationStep(
                i + 1,  // current position in prefix sum array
                i,      // current position in original array
                this.originalArray[i] // current value being added
            );
        }
        
        return this.prefixSumArray;
    },

    /**
     * Record a step in the prefix sum computation process
     * @param {number} position - Current position in the prefix sum array
     * @param {number} originalPosition - Current position in the original array
     * @param {number} value - Value being added
     */
    recordComputationStep(position, originalPosition, value) {
        this.computationSteps.push({
            position,
            originalPosition,
            value,
            currentPrefixSum: position > 0 ? this.prefixSumArray[position] : 0,
            previousPrefixSum: position > 0 ? this.prefixSumArray[position - 1] : 0
        });
    },

    /**
     * Execute a range sum query
     * @param {number} left - Left index (1-indexed)
     * @param {number} right - Right index (1-indexed)
     * @returns {number} - Sum of elements in the range
     */
    rangeSum(left, right) {
        // Ensure indices are within bounds
        if (!ArrayUtils.validateQueryIndices(left, right, this.originalArray.length)) {
            return null;
        }
        
        return this.prefixSumArray[right] - this.prefixSumArray[left - 1];
    },

    /**
     * Get the computation steps for visualization
     * @returns {Array} - Array of computation steps
     */
    getComputationSteps() {
        return this.computationSteps;
    },

    /**
     * Get detailed information about a range sum query
     * @param {number} left - Left index (1-indexed)
     * @param {number} right - Right index (1-indexed)
     * @returns {Object} - Query details
     */
    getQueryDetails(left, right) {
        if (!ArrayUtils.validateQueryIndices(left, right, this.originalArray.length)) {
            return {
                valid: false,
                message: 'Invalid query indices'
            };
        }
        
        const rightSum = this.prefixSumArray[right];
        const leftMinusOneSum = this.prefixSumArray[left - 1];
        const rangeSum = rightSum - leftMinusOneSum;
        
        return {
            valid: true,
            left,
            right,
            rightSum,
            leftMinusOneSum,
            rangeSum,
            formula: `S[${right}] - S[${left-1}] = ${rightSum} - ${leftMinusOneSum} = ${rangeSum}`
        };
    }
};

// Make PrefixSum available globally
window.PrefixSum = PrefixSum;
