// Test helper functions
function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
    console.log('✓ ' + message);
}

function testGetMonthName() {
    const calendar = new Calendar();
    
    // Test January
    assert(calendar.getMonthName(0) === 'January', 'January month name is correct');
    
    // Test December
    assert(calendar.getMonthName(11) === 'December', 'December month name is correct');
    
    // Test invalid month
    assert(calendar.getMonthName(12) === undefined, 'Invalid month returns undefined');
}

function testGetDaysInMonth() {
    const calendar = new Calendar();
    
    // Test January 2024 (31 days)
    assert(calendar.getDaysInMonth(2024, 0) === 31, 'January has 31 days');
    
    // Test February 2024 (leap year, 29 days)
    assert(calendar.getDaysInMonth(2024, 1) === 29, 'February 2024 has 29 days (leap year)');
    
    // Test February 2023 (non-leap year, 28 days)
    assert(calendar.getDaysInMonth(2023, 1) === 28, 'February 2023 has 28 days (non-leap year)');
    
    // Test April (30 days)
    assert(calendar.getDaysInMonth(2024, 3) === 30, 'April has 30 days');
}

function testIsToday() {
    const calendar = new Calendar();
    const today = new Date();
    
    // Test today's date
    assert(calendar.isToday(today) === true, 'Today is correctly identified');
    
    // Test tomorrow's date
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    assert(calendar.isToday(tomorrow) === false, 'Tomorrow is not identified as today');
    
    // Test yesterday's date
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    assert(calendar.isToday(yesterday) === false, 'Yesterday is not identified as today');
}

function testGetFirstDayOfMonth() {
    const calendar = new Calendar();
    
    // Test January 1, 2024 (Monday)
    const janFirst = calendar.getFirstDayOfMonth(2024, 0);
    assert(janFirst.getDay() === 1, 'January 1, 2024 is a Monday');
    
    // Test February 1, 2024 (Thursday)
    const febFirst = calendar.getFirstDayOfMonth(2024, 1);
    assert(febFirst.getDay() === 4, 'February 1, 2024 is a Thursday');
}

function testGetPreviousMonthDays() {
    const calendar = new Calendar();
    
    // Test days in December 2023 (31 days) when current month is January 2024
    assert(calendar.getPreviousMonthDays(2024, 0) === 31, 'December 2023 has 31 days');
    
    // Test days in January 2024 (31 days) when current month is February 2024
    assert(calendar.getPreviousMonthDays(2024, 1) === 31, 'January 2024 has 31 days');
    
    // Test days in March 2024 (31 days) when current month is April 2024
    assert(calendar.getPreviousMonthDays(2024, 3) === 31, 'March 2024 has 31 days');
}

// Run all tests
console.log('Running Calendar Tests...\n');

try {
    testGetMonthName();
    testGetDaysInMonth();
    testIsToday();
    testGetFirstDayOfMonth();
    testGetPreviousMonthDays();
    
    console.log('\nAll tests passed successfully!');
} catch (error) {
    console.error('\nTest failed:', error.message);
} 