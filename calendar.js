class Calendar {
    constructor() {
        this.currentDate = new Date();
        this.monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        this.monthElement = document.getElementById('currentMonth');
        this.daysElement = document.getElementById('calendarDays');
        this.prevButton = document.getElementById('prevMonth');
        this.nextButton = document.getElementById('nextMonth');
        
        this.init();
    }

    init() {
        this.renderCalendar();
        this.setupEventListeners();
    }

    getMonthName(month) {
        return this.monthNames[month];
    }

    getFirstDayOfMonth(year, month) {
        return new Date(year, month, 1);
    }

    getLastDayOfMonth(year, month) {
        return new Date(year, month + 1, 0);
    }

    getDaysInMonth(year, month) {
        return this.getLastDayOfMonth(year, month).getDate();
    }

    getPreviousMonthDays(year, month) {
        const prevMonth = new Date(year, month, 0);
        return prevMonth.getDate();
    }

    isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    }

    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // Update month and year display
        this.monthElement.textContent = `${this.getMonthName(month)} ${year}`;

        // Get first day of the month
        const firstDay = this.getFirstDayOfMonth(year, month);
        const startingDay = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.

        // Get last day of the month
        const totalDays = this.getDaysInMonth(year, month);
        const prevMonthDays = this.getPreviousMonthDays(year, month);

        // Clear previous calendar
        this.daysElement.innerHTML = '';

        // Add days from previous month
        for (let i = startingDay - 1; i >= 0; i--) {
            const day = document.createElement('div');
            day.className = 'day other-month';
            day.textContent = prevMonthDays - i;
            this.daysElement.appendChild(day);
        }

        // Add days of current month
        for (let i = 1; i <= totalDays; i++) {
            const day = document.createElement('div');
            day.className = 'day';
            day.textContent = i;

            // Highlight today
            const date = new Date(year, month, i);
            if (this.isToday(date)) {
                day.classList.add('today');
            }

            this.daysElement.appendChild(day);
        }

        // Add days from next month to complete the grid
        const remainingDays = 42 - (startingDay + totalDays); // 6 rows * 7 days = 42
        for (let i = 1; i <= remainingDays; i++) {
            const day = document.createElement('div');
            day.className = 'day other-month';
            day.textContent = i;
            this.daysElement.appendChild(day);
        }
    }

    setupEventListeners() {
        this.prevButton.addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.renderCalendar();
        });

        this.nextButton.addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderCalendar();
        });
    }
}

// Initialize calendar when the page loads
window.addEventListener('load', () => {
    new Calendar();
}); 