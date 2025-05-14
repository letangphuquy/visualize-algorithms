/**
 * Test script for localization
 * This will check if all translations are correctly applied
 */

function testLocalization() {
  // Test switching between languages
  console.log("Current language:", currentLanguage);
  
  // Log a few translations to verify they're working
  console.log("Testing English translations:");
  setLanguage('en');
  console.log("Title:", getText('title'));
  console.log("Button:", getText('generatePlay'));
  console.log("Error:", getText('invalidNumber'));
  console.log("Formatted:", getText('comparing', 1, 2));
  
  console.log("\nTesting Vietnamese translations:");
  setLanguage('vi');
  console.log("Title:", getText('title'));
  console.log("Button:", getText('generatePlay'));
  console.log("Error:", getText('invalidNumber'));
  console.log("Formatted:", getText('comparing', 1, 2));
  
  // Switch back to default
  setLanguage('vi');
  console.log("\nAll tests completed!");
}

// To run this test, open the developer console and call testLocalization()
