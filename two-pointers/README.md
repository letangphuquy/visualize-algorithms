# Two-Pointers Algorithm Visualization

This is an interactive visualization tool for understanding the two-pointers algorithm in the context of merging two sorted arrays.

## Features

- Interactive array input with validation
- Step-by-step visualization of the merge process
- Animation controls (play, pause, step forward/backward)
- Visual highlighting of pointers and selected elements
- Clear explanations at each step

## Localization

The application supports multiple languages:
- English
- Vietnamese (default)

The language preference is stored in the browser's local storage, so it will be remembered across sessions.

### Adding a new language

To add a new language:

1. Add the language to the `availableLanguages` object in `localization.js`
2. Add translations to the `translations` object in `localization.js`
3. The application will automatically include the new language in the selector

## How to Use

1. Enter numbers in lists A and B (they will be sorted automatically)
2. Click "Generate & Play" to start the visualization
3. Use the animation controls to navigate through the steps
4. See the explanation of each step in the visualization area
5. The final merged result will be displayed at the end

## Browser Support

This visualization works best in modern browsers (Chrome, Firefox, Safari, Edge).

## Credits

Created for educational purposes to help students understand merge algorithms and the two-pointers technique.
