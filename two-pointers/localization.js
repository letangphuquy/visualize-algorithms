/**
 * Localization Module
 * Contains functions and data for managing translations of UI text
 */

// Available languages
const availableLanguages = {
  en: "English",
  vi: "Tiếng Việt"
};

// Default language (Vietnamese)
let currentLanguage = 'vi';

// Translation dictionaries
const translations = {
  // English translations
  en: {
    // Page title & headers
    "title": "Two-Pointer Algorithm Visualization",
    "header": "Merge Sorting Two-Pointer Visualization",
    
    // Input labels and buttons
    "listA": "List A:",
    "listB": "List B:",
    "sort": "Sort",
    "random": "Random",
    "clear": "Clear",
    "generatePlay": "Generate & Play",
    "clearAll": "Clear All",
    
    // Tooltips
    "sortTooltip": "Sort list in ascending order",
    "clearTooltip": "Clear list",
    "randomSize": "Number of random elements",
    
    // Info box
    "note": "Note:",
    "tip": "Tip:",
    "numberRangeInfo": "Each number must be between -10^9 and 10^9",
    "editTip": "Click on an element box to edit or remove it. Press Enter to add a new element.",
    
    // Animation controls
    "animationSpeed": "Animation Speed:",
    "stepCounter": "Step {0} of {1}",
    "completed": "Completed: {0} steps",
    
    // Step controls
    "start": "Start",
    "back": "Back",
    "pause": "Pause",
    "resume": "Resume",
    "next": "Next",
    "finish": "Finish",
    "play": "Play",
    
    // Result display
    "finalResult": "Final Result C:",
    "initialState": "Enter numbers and press 'Generate & Play' to start",
    "mergingProcess": "Merging Process:",    // Error messages & validation
    "fixValidationErrors": "Please fix validation errors before starting:",
    "listAErrors": "List A:",
    "listBErrors": "List B:",
    "emptyListA": "List A cannot be empty. Please add at least one number.",
    "emptyListB": "List B cannot be empty. Please add at least one number.",
    "invalidNumber": "Invalid number found",
    "error": "Error: {0}",
    "fixErrorsFirst": "Fix errors first",
    "validInput": "✓ Input is valid",
    "fixIssues": "Please fix the following issues:",
    "valueEmpty": "Value cannot be empty",
    "elementEmpty": "Element {0} in List {1} is empty. Please enter a valid number.",
    "mustBeInteger": "Must be a valid integer",
    "notValidInteger": "Element {0} in List {1} is not a valid integer. Please enter a whole number.",    "valueRangeError": "Value must be between {0} and {1}",
    "outOfRange": "Element {0} ({1}) in List {2} is out of the allowed range. Please enter a number between -10^9 and 10^9.",
    "validNumber": "Valid number",
    
    // Animation explanations
    "startingMerge": "Starting the merge process",
    "pointersInitialized": "Pointers initialized at the beginning of both arrays",
    "resultEmpty": "Result array C is empty",
    "comparing": "Comparing A[{0}] and B[{1}]",
    "valuesAre": "A[{0}] = {1}, B[{2}] = {3}",
    "selectFromA": "Since {0} < {1}, we'll select from A",
    "selectFromB": "Since {0} <= {1}, we'll select from B",
    "selectedA": "Selected A[{0}] = {1}",
    "selectedB": "Selected B[{0}] = {1}",
    "appendedToC": "Appended {0} to C",
    "advancedAPointer": "Advanced A pointer from {0} to {1}",
    "advancedBPointer": "Advanced B pointer from {0} to {1}",
    "arrayAExhausted": "Array A is exhausted",
    "arrayBExhausted": "Array B is exhausted",
    "elementsRemainingA": "{0} elements remaining in A",
    "elementsRemainingB": "{0} elements remaining in B",
    "appendRemainingA": "We'll append all remaining elements from A to C",
    "appendRemainingB": "We'll append all remaining elements from B to C",
    "addedElementsA": "Added {0} elements from A: {1}",
    "addedElementsB": "Added {0} elements from B: {1}",
    "allElementsMerged": "All elements have been merged into C",
    "mergeComplete": "Merge complete"
  },
  
  // Vietnamese translations
  vi: {
    // Page title & headers
    "title": "Minh Họa Thuật Toán Hai Con Trỏ",
    "header": "Minh Họa Sắp Xếp Trộn Hai Con Trỏ",
    
    // Input labels and buttons
    "listA": "Danh sách A:",
    "listB": "Danh sách B:",
    "sort": "Sắp xếp",
    "random": "Ngẫu nhiên",
    "clear": "Xóa",
    "generatePlay": "Tạo & Phát",
    "clearAll": "Xóa Tất Cả",
    
    // Tooltips
    "sortTooltip": "Sắp xếp danh sách theo thứ tự tăng dần",
    "clearTooltip": "Xóa danh sách",
    "randomSize": "Số phần tử ngẫu nhiên",
    
    // Info box
    "note": "Lưu ý:",
    "tip": "Mẹo:",
    "numberRangeInfo": "Mỗi số phải nằm trong khoảng từ -10^9 đến 10^9",
    "editTip": "Nhấp vào ô phần tử để chỉnh sửa hoặc xóa. Nhấn Enter để thêm phần tử mới.",
    
    // Animation controls
    "animationSpeed": "Tốc độ Hoạt hình:",
    "stepCounter": "Bước {0} của {1}",
    "completed": "Đã hoàn thành: {0} bước",
    
    // Step controls
    "start": "Bắt đầu",
    "back": "Lùi",
    "pause": "Tạm dừng",
    "resume": "Tiếp tục",
    "next": "Tiếp",
    "finish": "Kết thúc",
    "play": "Phát",
    
    // Result display
    "finalResult": "Kết quả cuối C:",
    "initialState": "Nhập các số và nhấn 'Tạo & Phát' để bắt đầu",
    "mergingProcess": "Quá trình Trộn:",    // Error messages & validation
    "fixValidationErrors": "Vui lòng sửa lỗi trước khi bắt đầu:",
    "listAErrors": "Danh sách A:",
    "listBErrors": "Danh sách B:",
    "emptyListA": "Danh sách A không thể trống. Vui lòng thêm ít nhất một số.",
    "emptyListB": "Danh sách B không thể trống. Vui lòng thêm ít nhất một số.",
    "invalidNumber": "Số không hợp lệ",
    "error": "Lỗi: {0}",
    "fixErrorsFirst": "Sửa lỗi trước",
    "validInput": "✓ Dữ liệu nhập hợp lệ",
    "fixIssues": "Vui lòng sửa các lỗi sau:",
    "valueEmpty": "Giá trị không thể trống",
    "elementEmpty": "Phần tử {0} trong Danh sách {1} đang trống. Vui lòng nhập một số hợp lệ.",
    "mustBeInteger": "Phải là số nguyên hợp lệ",
    "notValidInteger": "Phần tử {0} trong Danh sách {1} không phải số nguyên hợp lệ. Vui lòng nhập một số nguyên.",    "valueRangeError": "Giá trị phải nằm trong khoảng {0} đến {1}",
    "outOfRange": "Phần tử {0} ({1}) trong Danh sách {2} nằm ngoài phạm vi cho phép. Vui lòng nhập một số từ -10^9 đến 10^9.",
    "validNumber": "Số hợp lệ",
    
    // Animation explanations
    "startingMerge": "Bắt đầu quá trình trộn",
    "pointersInitialized": "Con trỏ được khởi tạo ở đầu cả hai mảng",
    "resultEmpty": "Mảng kết quả C đang trống",
    "comparing": "So sánh A[{0}] và B[{1}]",
    "valuesAre": "A[{0}] = {1}, B[{2}] = {3}",
    "selectFromA": "Vì {0} < {1}, chúng ta sẽ chọn từ A",
    "selectFromB": "Vì {0} <= {1}, chúng ta sẽ chọn từ B",
    "selectedA": "Đã chọn A[{0}] = {1}",
    "selectedB": "Đã chọn B[{0}] = {1}",
    "appendedToC": "Đã thêm {0} vào C",
    "advancedAPointer": "Đã di chuyển con trỏ A từ {0} đến {1}",
    "advancedBPointer": "Đã di chuyển con trỏ B từ {0} đến {1}",
    "arrayAExhausted": "Mảng A đã hết phần tử",
    "arrayBExhausted": "Mảng B đã hết phần tử",
    "elementsRemainingA": "{0} phần tử còn lại trong A",
    "elementsRemainingB": "{0} phần tử còn lại trong B",
    "appendRemainingA": "Chúng ta sẽ thêm tất cả phần tử còn lại từ A vào C",
    "appendRemainingB": "Chúng ta sẽ thêm tất cả phần tử còn lại từ B vào C",
    "addedElementsA": "Đã thêm {0} phần tử từ A: {1}",
    "addedElementsB": "Đã thêm {0} phần tử từ B: {1}",
    "allElementsMerged": "Tất cả phần tử đã được trộn vào C",
    "mergeComplete": "Hoàn tất quá trình trộn"
  }
};

// Helper function to format translation strings with parameters
// Examples: formatString("Hello {0}", "World") -> "Hello World"
function formatString(str, ...args) {
  return str.replace(/{(\d+)}/g, (match, number) => {
    return typeof args[number] !== 'undefined' ? args[number] : match;
  });
}

// Function to get translated text
function getText(key, ...args) {
  // Get the translation for the current language
  const translation = translations[currentLanguage]?.[key] || translations['en']?.[key] || key;
  
  // If there are format arguments, apply them
  if (args.length > 0) {
    return formatString(translation, ...args);
  }
  
  return translation;
}

// Function to change the current language
function setLanguage(lang) {
  // Check if the language is supported
  if (translations[lang]) {
    currentLanguage = lang;
    
    // Update the UI
    updateAllUIText();
    
    // Save the language preference to localStorage
    localStorage.setItem('preferredLanguage', lang);
    
    // Return true to indicate success
    return true;
  }
  
  // Return false if the language is not supported
  return false;
}

// Load language preference from localStorage
function loadLanguagePreference() {
  const savedLang = localStorage.getItem('preferredLanguage');
  if (savedLang && translations[savedLang]) {
    currentLanguage = savedLang;
  }
}

// Initialize language dropdown
function initializeLanguageSelector() {
  const container = document.getElementById('language-selector');
  if (!container) return;
  
  // Create select element
  const select = document.createElement('select');
  select.id = 'language-select';
  select.className = 'language-select';
  
  // Add options for each available language
  Object.entries(availableLanguages).forEach(([code, name]) => {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = name;
    option.selected = code === currentLanguage;
    select.appendChild(option);
  });
  
  // Add change event listener
  select.addEventListener('change', (e) => {
    setLanguage(e.target.value);
  });
  
  // Add to container
  const label = document.createElement('label');
  label.htmlFor = 'language-select';
  label.className = 'language-label';
  
  // Different labels for different languages
  if (currentLanguage === 'vi') {
    label.textContent = 'Ngôn ngữ:';
  } else {
    label.textContent = 'Language:';
  }
  
  container.appendChild(label);
  container.appendChild(select);
}

// Function to update all UI text based on current language
function updateAllUIText() {
  // Update document title
  document.title = getText('title');
  
  // Update header
  const header = document.querySelector('h1');
  if (header) header.textContent = getText('header');
  
  // Update list labels
  const listLabels = document.querySelectorAll('label[for="A"], label[for="B"]');
  if (listLabels[0]) listLabels[0].textContent = getText('listA');
  if (listLabels[1]) listLabels[1].textContent = getText('listB');
  
  // Update buttons
  const sortBtns = document.querySelectorAll('.action-btn[onclick*="sortArrayInput"]');
  sortBtns.forEach(btn => {
    const iconSpan = btn.querySelector('.icon');
    if (iconSpan) {
      btn.innerHTML = '';
      btn.appendChild(iconSpan);
      btn.appendChild(document.createTextNode(' ' + getText('sort')));
      btn.title = getText('sortTooltip');
    }
  });
  
  const randomBtns = document.querySelectorAll('.action-btn[onclick*="generateRandomArray"]');
  randomBtns.forEach(btn => {
    const iconSpan = btn.querySelector('.icon');
    if (iconSpan) {
      btn.innerHTML = '';
      btn.appendChild(iconSpan);
      btn.appendChild(document.createTextNode(' ' + getText('random')));
    }
  });
  
  const clearBtns = document.querySelectorAll('.action-btn[onclick*="initArrayContainer"]');
  clearBtns.forEach(btn => {
    const iconSpan = btn.querySelector('.icon');
    if (iconSpan) {
      btn.innerHTML = '';
      btn.appendChild(iconSpan);
      btn.appendChild(document.createTextNode(' ' + getText('clear')));
      btn.title = getText('clearTooltip');
    }
  });
  
  // Update input tooltips
  const randomSizeInputs = document.querySelectorAll('input[id^="random-size-"]');
  randomSizeInputs.forEach(input => {
    input.title = getText('randomSize');
  });
  
  // Update info box
  const infoBox = document.querySelector('.info-box');
  if (infoBox) {
    const paragraphs = infoBox.querySelectorAll('p');
    if (paragraphs[0]) {
      paragraphs[0].innerHTML = `<strong>${getText('note')}</strong> ${getText('numberRangeInfo')}`;
    }
    if (paragraphs[1]) {
      paragraphs[1].innerHTML = `<strong>${getText('tip')}</strong> ${getText('editTip')}`;
    }
  }
  
  // Update main buttons
  const playButton = document.getElementById('play-button');
  if (playButton) {
    const iconSpan = playButton.querySelector('.icon');
    if (iconSpan) {
      playButton.innerHTML = '';
      playButton.appendChild(iconSpan);
      playButton.appendChild(document.createTextNode(' ' + getText('generatePlay')));
    }
  }
  
  const resetButton = document.getElementById('reset-button');
  if (resetButton) {
    const iconSpan = resetButton.querySelector('.icon');
    if (iconSpan) {
      resetButton.innerHTML = '';
      resetButton.appendChild(iconSpan);
      resetButton.appendChild(document.createTextNode(' ' + getText('clearAll')));
    }
  }
  
  // Update animation controls
  const speedLabel = document.querySelector('label[for="speed"]');
  if (speedLabel) {
    speedLabel.textContent = getText('animationSpeed');
  }
  
  // Update step controls
  const startBtn = document.getElementById('start-btn');
  if (startBtn) startBtn.innerHTML = `<i>⏮</i> ${getText('start')}`;
  
  const prevStepBtn = document.getElementById('prev-step');
  if (prevStepBtn) prevStepBtn.innerHTML = `<i>◀</i> ${getText('back')}`;
  
  const pauseBtn = document.getElementById('pause-animation');
  if (pauseBtn) {
    if (pauseBtn.textContent.includes('Resume')) {
      pauseBtn.innerHTML = `<i>⏯</i> ${getText('resume')}`;
    } else {
      pauseBtn.innerHTML = `<i>⏯</i> ${getText('pause')}`;
    }
  }
  
  const nextStepBtn = document.getElementById('next-step');
  if (nextStepBtn) nextStepBtn.innerHTML = `${getText('next')} <i>▶</i>`;
  
  const finishBtn = document.getElementById('finish-btn');
  if (finishBtn) finishBtn.innerHTML = `<i>⏭</i> ${getText('finish')}`;
  
  // Update language selector label
  const langLabel = document.querySelector('.language-label');
  if (langLabel) {
    if (currentLanguage === 'vi') {
      langLabel.textContent = 'Ngôn ngữ:';
    } else {
      langLabel.textContent = 'Language:';
    }
  }
  
  // Update any existing results
  const resultDiv = document.getElementById('result');
  if (resultDiv && resultDiv.innerText) {
    if (resultDiv.innerText.includes('Final Result C:')) {
      const resultArray = resultDiv.innerText.split('[')[1]?.split(']')[0];
      if (resultArray) {
        resultDiv.innerText = `${getText('finalResult')} [${resultArray}]`;
      }
    }
  }
  
  // Update the visualization container if in initial state
  const visualization = document.getElementById('visualization');
  if (visualization) {
    const initialState = visualization.querySelector('.initial-state');
    if (initialState) {
      initialState.textContent = getText('initialState');
    }
    
    // Update step header if present
    const stepHeader = visualization.querySelector('h2');
    if (stepHeader) {
      stepHeader.textContent = getText('mergingProcess');
    }
  }
  
  // Update progress tracker if present
  const progressTracker = document.getElementById('progress-tracker');
  if (progressTracker && progressTracker.textContent) {
    if (progressTracker.textContent.startsWith('Step ')) {
      const parts = progressTracker.textContent.split(' of ');
      if (parts.length === 2) {
        const stepNum = parts[0].replace('Step ', '');
        const totalSteps = parts[1];
        progressTracker.textContent = getText('stepCounter', stepNum, totalSteps);
      }
    } else if (progressTracker.textContent.startsWith('Completed: ')) {
      const steps = progressTracker.textContent.replace('Completed: ', '').replace(' steps', '');
      progressTracker.textContent = getText('completed', steps);
    }
  }
}

// Load language preference on script initialization
loadLanguagePreference();