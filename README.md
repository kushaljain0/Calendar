# Interactive Calendar

A simple interactive calendar application built with vanilla JavaScript, HTML, and CSS. This calendar allows users to view dates in a monthly format and navigate between months using arrow buttons.

## Features

- Monthly calendar view
- Navigation between months using left/right buttons
- Highlights current day
- Responsive design
- Proper handling of leap years and month lengths
- Unit tests for core calendar logic

## Files

- `index.html` - Main HTML file containing the calendar structure
- `styles.css` - CSS styles for the calendar
- `calendar.js` - JavaScript code handling calendar functionality
- `tests.js` - Unit tests for calendar logic functions

## Getting Started

1. Clone the repository:
```bash
git clone <your-repository-url>
```

2. Open `index.html` in your web browser

That's it! No build steps or dependencies required.

## Running Tests

To run the unit tests:

1. Open `index.html` in your web browser
2. Open the browser's developer console:
   - Press F12 or right-click and select "Inspect"
   - Go to the "Console" tab
3. The test results will be displayed in the console

The tests verify:
- Month name retrieval
- Number of days in each month (including leap years)
- Today's date detection
- First day of month calculation
- Previous month days calculation

## How to Use

- Click the left arrow button (`<`) to go to the previous month
- Click the right arrow button (`>`) to go to the next month
- The current day is highlighted in blue
- Days from previous and next months are shown in gray

## Technologies Used

- Vanilla JavaScript
- HTML5
- CSS3