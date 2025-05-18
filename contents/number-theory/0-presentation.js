// 0-presentation.js

// Global variables
let currentSlide = 0;
let totalSlides = 0;
let isPlaying = false;
let slideTimer = null;
let totalTime = 0;
let elapsedTime = 0;
let animationFrameId = null;

// DOM Elements
const slidesContainer = document.getElementById('slides-container');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const progressIndicator = document.getElementById('progress-indicator');
const timerDisplay = document.getElementById('timer');

// Initialize presentation
document.addEventListener('DOMContentLoaded', () => {
    totalSlides = slides.length;
    
    // Calculate total time from all slides
    slides.forEach(slide => {
        totalTime += parseInt(slide.dataset.duration);
    });

    // Set up initial slide
    slides[0].classList.add('active');
    updateProgress();
    
    // Initialize animations for the first slide
    initSlideAnimation(0);
    
    // Add event listeners
    prevBtn.addEventListener('click', previousSlide);
    nextBtn.addEventListener('click', nextSlide);
    playBtn.addEventListener('click', startPresentation);
    pauseBtn.addEventListener('click', pausePresentation);
});

// Navigation functions
function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        changeSlide(currentSlide + 1);
    }
}

function previousSlide() {
    if (currentSlide > 0) {
        changeSlide(currentSlide - 1);
    }
}

function changeSlide(index) {
    // Remove classes from current slide
    slides[currentSlide].classList.remove('active');
    
    // Add classes to previous slide if going forward
    if (index > currentSlide) {
        slides[currentSlide].classList.add('prev');
    } else {
        slides[currentSlide].classList.remove('prev');
    }
    
    // Update current slide index
    currentSlide = index;
    
    // Add classes to new current slide
    slides[currentSlide].classList.add('active');
    slides[currentSlide].classList.remove('prev');
    
    // Initialize the animation for this slide
    initSlideAnimation(currentSlide);
    
    // Update progress
    updateProgress();
    
    // Reset timers if presentation is playing
    if (isPlaying) {
        clearTimeout(slideTimer);
        autoAdvance();
    }
}

// Timing and progress functions
function updateProgress() {
    // Calculate elapsed time up to the current slide
    let timeUntilCurrentSlide = 0;
    for (let i = 0; i < currentSlide; i++) {
        timeUntilCurrentSlide += parseInt(slides[i].dataset.duration);
    }
    
    elapsedTime = timeUntilCurrentSlide;
    
    // Update progress bar
    const progress = (elapsedTime / totalTime) * 100;
    progressIndicator.style.width = `${progress}%`;
    
    // Update timer display
    updateTimer();
}

function updateTimer() {
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startPresentation() {
    isPlaying = true;
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
    autoAdvance();
}

function pausePresentation() {
    isPlaying = false;
    playBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
    clearTimeout(slideTimer);
}

function autoAdvance() {
    const slideDuration = parseInt(slides[currentSlide].dataset.duration);
    slideTimer = setTimeout(() => {
        if (currentSlide < totalSlides - 1) {
            nextSlide();
        } else {
            pausePresentation();
        }
    }, slideDuration * 1000);
}

// Animation functions for each slide
function initSlideAnimation(slideIndex) {
    // Cancel any ongoing animations
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    
    // Initialize the appropriate animation based on slide index
    switch (slideIndex) {
        case 0:
            initIntroAnimation();
            break;
        case 1:
            initDefinitionAnimation();
            break;
        case 2:
            initNumberLineAnimation();
            break;
        case 3:
            initDivisorsAnimation();
            break;
        case 4:
            initDualRelationAnimation();
            break;
        case 5:
            initModularAnimation();
            break;
        case 6:
            initConclusionAnimation();
            break;
    }
}

// Slide-specific animations
function initIntroAnimation() {
    const container = document.getElementById('intro-animation');
    container.innerHTML = '';
    
    // Create numbers that will appear and float around
    for (let i = 1; i <= 24; i++) {
        const numElement = document.createElement('div');
        numElement.className = 'number';
        numElement.textContent = i;
        numElement.style.position = 'absolute';
        
        // Randomly position the numbers
        const x = Math.random() * 80 + 10; // 10% to 90% of container width
        const y = Math.random() * 80 + 10; // 10% to 90% of container height
        numElement.style.left = `${x}%`;
        numElement.style.top = `${y}%`;
        
        // Add animation delay
        numElement.style.opacity = '0';
        numElement.style.transform = 'scale(0.5)';
        numElement.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        container.appendChild(numElement);
        
        // Animate appearance
        setTimeout(() => {
            numElement.style.opacity = '1';
            numElement.style.transform = 'scale(1)';
        }, i * 100);
        
        // Add gentle floating animation
        animateFloat(numElement);
    }
    
    // Highlight some special numbers after a delay
    setTimeout(() => {
        // Highlight multiples of 3
        const allNumbers = container.querySelectorAll('.number');
        allNumbers.forEach(num => {
            const value = parseInt(num.textContent);
            if (value % 3 === 0) {
                num.classList.add('multiple');
            }
        });
    }, 3000);
}

function animateFloat(element) {
    let x = parseFloat(element.style.left);
    let y = parseFloat(element.style.top);
    
    // Random movement directions
    const dx = (Math.random() - 0.5) * 0.1;
    const dy = (Math.random() - 0.5) * 0.1;
    
    function updatePosition() {
        // Update position
        x += dx;
        y += dy;
        
        // Keep within bounds (5% to 95%)
        if (x < 5) x = 5;
        if (x > 95) x = 95;
        if (y < 5) y = 5;
        if (y > 95) y = 95;
        
        element.style.left = `${x}%`;
        element.style.top = `${y}%`;
        
        // Continue animation loop
        animationFrameId = requestAnimationFrame(updatePosition);
    }
    
    updatePosition();
}

function initDefinitionAnimation() {
    const container = document.getElementById('definition-animation');
    container.innerHTML = '';
    
    // Create the division animation (12 ÷ 3 = 4)
    const divisionContainer = document.createElement('div');
    divisionContainer.className = 'division-container';
    container.appendChild(divisionContainer);
    
    // Create 12 elements
    const twelveContainer = document.createElement('div');
    twelveContainer.className = 'twelve-container';
    twelveContainer.style.display = 'flex';
    twelveContainer.style.flexWrap = 'wrap';
    twelveContainer.style.justifyContent = 'center';
    twelveContainer.style.marginBottom = '20px';
    
    for (let i = 1; i <= 12; i++) {
        const element = document.createElement('div');
        element.className = 'number';
        element.textContent = i;
        element.style.opacity = '0';
        element.style.transform = 'scale(0.5)';
        element.style.transition = 'all 0.5s ease';
        twelveContainer.appendChild(element);
        
        // Animate appearance
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        }, i * 100);
    }
    
    divisionContainer.appendChild(twelveContainer);
    
    // After a delay, reorganize into 4 groups of 3
    setTimeout(() => {
        twelveContainer.innerHTML = '';
        twelveContainer.style.display = 'flex';
        twelveContainer.style.justifyContent = 'space-around';
        twelveContainer.style.width = '100%';
        
        // Create 4 groups of 3
        for (let i = 0; i < 4; i++) {
            const group = document.createElement('div');
            group.className = 'division-group';
            group.style.opacity = '0';
            group.style.transform = 'translateY(20px)';
            group.style.transition = 'all 0.5s ease';
            
            for (let j = 1; j <= 3; j++) {
                const element = document.createElement('div');
                element.className = 'number';
                element.textContent = i * 3 + j;
                group.appendChild(element);
            }
            
            twelveContainer.appendChild(group);
            
            // Animate group appearance
            setTimeout(() => {
                group.style.opacity = '1';
                group.style.transform = 'translateY(0)';
            }, i * 300 + 1000);
        }
        
        // After groups are formed, show the equation
        setTimeout(() => {
            const equation = document.createElement('div');
            equation.className = 'equation';
            equation.style.fontSize = '2rem';
            equation.style.marginTop = '30px';
            equation.style.opacity = '0';
            equation.style.transition = 'opacity 1s ease';
            equation.innerHTML = '<span style="color: var(--multiple-color);">12</span> ÷ <span style="color: var(--divisor-color);">3</span> = <span style="color: var(--division-color);">4</span> (dư 0)';
            
            divisionContainer.appendChild(equation);
            
            setTimeout(() => {
                equation.style.opacity = '1';
            }, 500);
        }, 3000);
    }, 2000);
}

function initNumberLineAnimation() {
    const container = document.getElementById('visualization-number-line');
    container.innerHTML = '';
    
    // Create number line
    const numberLine = document.createElement('div');
    numberLine.className = 'number-line';
    container.appendChild(numberLine);
    
    // Add numbers 1-24 on the line
    for (let i = 1; i <= 24; i++) {
        const numElement = document.createElement('div');
        numElement.className = 'number';
        numElement.textContent = i;
        numElement.style.position = 'absolute';
        
        // Position the number on the line
        const left = ((i - 1) / 23 * 100);
        numElement.style.left = `${left}%`;
        numElement.style.top = '-20px';
        numElement.style.transform = 'translateX(-50%)';
        numElement.style.opacity = '0';
        numElement.style.transition = 'opacity 0.3s ease';
        
        numberLine.appendChild(numElement);
        
        // Animate number appearance
        setTimeout(() => {
            numElement.style.opacity = '1';
        }, i * 100);
    }
    
    // Highlight multiples of 3 after all numbers appear
    setTimeout(() => {
        const allNumbers = numberLine.querySelectorAll('.number');
        allNumbers.forEach(num => {
            const value = parseInt(num.textContent);
            if (value % 3 === 0) {
                num.style.transition = 'all 0.5s ease';
                num.classList.add('multiple');
                num.style.transform = 'translateX(-50%) translateY(-10px)';
            }
        });
    }, 3000);
}

function initDivisorsAnimation() {
    const container = document.getElementById('visualization-divisors');
    container.innerHTML = '';
    
    // Create central number 12
    const center = document.createElement('div');
    center.className = 'number';
    center.textContent = '12';
    center.style.width = '60px';
    center.style.height = '60px';
    center.style.fontSize = '1.5rem';
    center.style.position = 'absolute';
    center.style.top = '50%';
    center.style.left = '50%';
    center.style.transform = 'translate(-50%, -50%)';
    center.style.zIndex = '10';
    container.appendChild(center);
    
    // Create divisors around the center
    const divisors = [1, 2, 3, 4, 6, 12];
    const radius = 120; // Distance from center
    
    divisors.forEach((divisor, index) => {
        const divElement = document.createElement('div');
        divElement.className = 'number divisor';
        divElement.textContent = divisor;
        divElement.style.position = 'absolute';
        
        // Position in a circle around the center
        const angle = (index / divisors.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius + 50;
        const y = Math.sin(angle) * radius + 50;
        
        divElement.style.top = `${y}%`;
        divElement.style.left = `${x}%`;
        divElement.style.transform = 'translate(-50%, -50%)';
        divElement.style.opacity = '0';
        divElement.style.transition = 'all 0.8s ease';
        
        container.appendChild(divElement);
        
        // Animate appearance
        setTimeout(() => {
            divElement.style.opacity = '1';
        }, index * 500 + 500);
    });
    
    // Highlight divisions on the list as they appear
    const divisorList = document.getElementById('divisor-list');
    const divisorItems = divisorList.querySelectorAll('li');
    
    divisorItems.forEach((item, index) => {
        // Clear any previous animations
        item.classList.remove('active');
        
        // Add new animation after a delay
        setTimeout(() => {
            item.classList.add('active');
            
            // Remove highlight after 1.5 seconds
            setTimeout(() => {
                item.classList.remove('active');
            }, 1500);
        }, index * 2000 + 3000);
    });
}

function initDualRelationAnimation() {
    const container = document.getElementById('dual-relation');
    container.innerHTML = '';
    
    // Create two sets container
    const setsContainer = document.createElement('div');
    setsContainer.style.display = 'flex';
    setsContainer.style.justifyContent = 'space-around';
    setsContainer.style.width = '100%';
    setsContainer.style.height = '100%';
    container.appendChild(setsContainer);
    
    // Create divisors of 12 set
    const divisorsSet = document.createElement('div');
    divisorsSet.className = 'set-container';
    divisorsSet.style.flex = '1';
    divisorsSet.style.padding = '20px';
    divisorsSet.style.display = 'flex';
    divisorsSet.style.flexDirection = 'column';
    divisorsSet.style.alignItems = 'center';
    
    const divisorsTitle = document.createElement('h3');
    divisorsTitle.textContent = 'Ước của 12';
    divisorsTitle.style.marginBottom = '20px';
    divisorsTitle.style.color = 'var(--divisor-color)';
    divisorsSet.appendChild(divisorsTitle);
    
    const divisorsContent = document.createElement('div');
    divisorsContent.style.display = 'flex';
    divisorsContent.style.flexWrap = 'wrap';
    divisorsContent.style.justifyContent = 'center';
    divisorsContent.style.gap = '10px';
    
    [1, 2, 3, 4, 6, 12].forEach(div => {
        const divElement = document.createElement('div');
        divElement.className = 'number divisor';
        divElement.textContent = div;
        divElement.style.opacity = '0';
        divElement.style.transition = 'opacity 0.5s ease';
        divisorsContent.appendChild(divElement);
    });
    
    divisorsSet.appendChild(divisorsContent);
    setsContainer.appendChild(divisorsSet);
    
    // Create multiples of 3 set
    const multiplesSet = document.createElement('div');
    multiplesSet.className = 'set-container';
    multiplesSet.style.flex = '1';
    multiplesSet.style.padding = '20px';
    multiplesSet.style.display = 'flex';
    multiplesSet.style.flexDirection = 'column';
    multiplesSet.style.alignItems = 'center';
    
    const multiplesTitle = document.createElement('h3');
    multiplesTitle.textContent = 'Bội của 3';
    multiplesTitle.style.marginBottom = '20px';
    multiplesTitle.style.color = 'var(--multiple-color)';
    multiplesSet.appendChild(multiplesTitle);
    
    const multiplesContent = document.createElement('div');
    multiplesContent.style.display = 'flex';
    multiplesContent.style.flexWrap = 'wrap';
    multiplesContent.style.justifyContent = 'center';
    multiplesContent.style.gap = '10px';
    
    [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36].forEach(mult => {
        const multElement = document.createElement('div');
        multElement.className = 'number multiple';
        multElement.textContent = mult;
        multElement.style.opacity = '0';
        multElement.style.transition = 'opacity 0.5s ease';
        multiplesContent.appendChild(multElement);
    });
    
    multiplesSet.appendChild(multiplesContent);
    setsContainer.appendChild(multiplesSet);
    
    // Animate appearance of numbers
    setTimeout(() => {
        const divisorNums = divisorsContent.querySelectorAll('.number');
        divisorNums.forEach((num, i) => {
            setTimeout(() => {
                num.style.opacity = '1';
            }, i * 200);
        });
        
        const multipleNums = multiplesContent.querySelectorAll('.number');
        multipleNums.forEach((num, i) => {
            setTimeout(() => {
                num.style.opacity = '1';
            }, i * 100 + 1000);
        });
    }, 500);
    
    // Draw connection between 3 and 12
    setTimeout(() => {
        const connection = document.createElement('div');
        connection.style.position = 'absolute';
        connection.style.top = '50%';
        connection.style.left = '0';
        connection.style.width = '100%';
        connection.style.height = '2px';
        connection.style.backgroundColor = 'var(--highlight-color)';
        connection.style.transform = 'scaleX(0)';
        connection.style.transition = 'transform 1s ease';
        container.appendChild(connection);
        
        setTimeout(() => {
            connection.style.transform = 'scaleX(1)';
        }, 500);
    }, 4000);
}

function initModularAnimation() {
    const container = document.getElementById('modular-animation');
    container.innerHTML = '';
    
    // Create modular classes container
    const moduloContainer = document.createElement('div');
    moduloContainer.style.display = 'flex';
    moduloContainer.style.justifyContent = 'space-around';
    moduloContainer.style.height = '100%';
    moduloContainer.style.padding = '20px';
    container.appendChild(moduloContainer);
    
    // Create 3 modular classes (mod 3)
    const modClasses = [
        { remainder: 0, numbers: [0, 3, 6, 9, 12, 15, 18, 21] },
        { remainder: 1, numbers: [1, 4, 7, 10, 13, 16, 19, 22] },
        { remainder: 2, numbers: [2, 5, 8, 11, 14, 17, 20, 23] }
    ];
    
    modClasses.forEach((modClass, index) => {
        const classContainer = document.createElement('div');
        classContainer.className = 'modulo-group';
        classContainer.style.backgroundColor = 'rgba(70, 130, 180, 0.2)';
        classContainer.style.flex = '1';
        classContainer.style.margin = '0 10px';
        classContainer.style.transform = 'translateY(50px)';
        classContainer.style.opacity = '0';
        classContainer.style.transition = 'all 0.8s ease';
        
        const title = document.createElement('h3');
        title.textContent = `≡ ${modClass.remainder} (mod 3)`;
        title.style.textAlign = 'center';
        title.style.marginBottom = '15px';
        title.style.color = 'var(--modular-color)';
        classContainer.appendChild(title);
        
        const numbersContainer = document.createElement('div');
        numbersContainer.style.display = 'flex';
        numbersContainer.style.flexWrap = 'wrap';
        numbersContainer.style.justifyContent = 'center';
        numbersContainer.style.gap = '5px';
        
        modClass.numbers.forEach(number => {
            const numElement = document.createElement('div');
            numElement.className = 'number';
            numElement.textContent = number;
            numElement.style.backgroundColor = index === 0 ? 'var(--multiple-color)' : 
                                              index === 2 ? 'var(--highlight-color)' : 
                                              'var(--secondary-text)';
            numbersContainer.appendChild(numElement);
        });
        
        classContainer.appendChild(numbersContainer);
        moduloContainer.appendChild(classContainer);
        
        // Animate appearance
        setTimeout(() => {
            classContainer.style.opacity = '1';
            classContainer.style.transform = 'translateY(0)';
        }, index * 500 + 500);
    });
    
    // Highlight specific example after all classes appear
    setTimeout(() => {
        // Create example container for 8 ≡ 2 (mod 3)
        const exampleContainer = document.createElement('div');
        exampleContainer.style.position = 'absolute';
        exampleContainer.style.bottom = '20px';
        exampleContainer.style.left = '50%';
        exampleContainer.style.transform = 'translateX(-50%)';
        exampleContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        exampleContainer.style.padding = '15px';
        exampleContainer.style.borderRadius = '8px';
        exampleContainer.style.opacity = '0';
        exampleContainer.style.transition = 'opacity 0.8s ease';
        
        exampleContainer.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
                <div class="number" style="background-color: var(--highlight-color);">8</div>
                <div style="font-size: 1.5rem;">≡</div>
                <div class="number" style="background-color: var(--highlight-color);">2</div>
                <div style="font-size: 1.5rem;">(mod 3)</div>
            </div>
            <div style="text-align: center; margin-top: 10px;">
                8 ÷ 3 = 2 với dư <span style="font-weight: bold; color: var(--highlight-color);">2</span><br>
                2 ÷ 3 = 0 với dư <span style="font-weight: bold; color: var(--highlight-color);">2</span>
            </div>
        `;
        
        container.appendChild(exampleContainer);
        
        setTimeout(() => {
            exampleContainer.style.opacity = '1';
        }, 500);
    }, 3000);
}

function initConclusionAnimation() {
    const container = document.getElementById('conclusion-animation');
    container.innerHTML = '';
    
    // Create a mind map
    const mindMap = document.createElement('div');
    mindMap.style.position = 'relative';
    mindMap.style.width = '100%';
    mindMap.style.height = '100%';
    container.appendChild(mindMap);
    
    // Central concept
    const center = document.createElement('div');
    center.textContent = 'Ước & Bội';
    center.style.position = 'absolute';
    center.style.top = '50%';
    center.style.left = '50%';
    center.style.transform = 'translate(-50%, -50%)';
    center.style.backgroundColor = 'var(--highlight-color)';
    center.style.color = 'black';
    center.style.padding = '15px';
    center.style.borderRadius = '50%';
    center.style.width = '100px';
    center.style.height = '100px';
    center.style.display = 'flex';
    center.style.alignItems = 'center';
    center.style.justifyContent = 'center';
    center.style.fontWeight = 'bold';
    center.style.textAlign = 'center';
    center.style.zIndex = '10';
    center.style.opacity = '0';
    center.style.transition = 'opacity 1s ease';
    mindMap.appendChild(center);
    
    // Branches
    const branches = [
        { title: 'Số nguyên tố', color: 'var(--divisor-color)', angle: -60 },
        { title: 'GCD & LCM', color: 'var(--multiple-color)', angle: 60 },
        { title: 'Thuật toán Euclid', color: 'var(--division-color)', angle: 180 },
        { title: 'Đồng dư thức', color: 'var(--modular-color)', angle: 0 }
    ];
    
    branches.forEach((branch, index) => {
        // Create branch
        const branchEl = document.createElement('div');
        branchEl.style.position = 'absolute';
        branchEl.style.top = '50%';
        branchEl.style.left = '50%';
        
        // Calculate position using angle and distance
        const distance = 120; // Distance from center
        const radians = (branch.angle * Math.PI) / 180;
        const x = Math.cos(radians) * distance;
        const y = Math.sin(radians) * distance;
        
        branchEl.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        branchEl.style.backgroundColor = branch.color;
        branchEl.style.color = branch.color === 'var(--divisor-color)' ? 'black' : 'white';
        branchEl.style.padding = '10px';
        branchEl.style.borderRadius = '8px';
        branchEl.style.minWidth = '100px';
        branchEl.style.textAlign = 'center';
        branchEl.style.fontWeight = 'bold';
        branchEl.style.opacity = '0';
        branchEl.style.transition = 'opacity 0.8s ease';
        branchEl.textContent = branch.title;
        mindMap.appendChild(branchEl);
        
        // Create connecting line
        const line = document.createElement('div');
        line.style.position = 'absolute';
        line.style.top = '50%';
        line.style.left = '50%';
        line.style.width = `${distance}px`;
        line.style.height = '2px';
        line.style.backgroundColor = branch.color;
        line.style.transform = `rotate(${branch.angle}deg)`;
        line.style.transformOrigin = 'left center';
        line.style.opacity = '0';
        line.style.transition = 'opacity 0.8s ease';
        mindMap.appendChild(line);
        
        // Animate branches with delay
        setTimeout(() => {
            if (index === 0) {
                center.style.opacity = '1';
            }
            
            setTimeout(() => {
                line.style.opacity = '1';
                
                setTimeout(() => {
                    branchEl.style.opacity = '1';
                }, 300);
            }, 500);
        }, index * 800 + 500);
    });
}
