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
        
        this.notes = this.loadNotes();
        this.init();
    }

    init() {
        this.renderCalendar();
        this.setupEventListeners();
    }

    loadNotes() {
        const savedNotes = localStorage.getItem('calendarNotes');
        return savedNotes ? JSON.parse(savedNotes) : {};
    }

    saveNotes() {
        localStorage.setItem('calendarNotes', JSON.stringify(this.notes));
    }

    getDateKey(date) {
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    }

    addNote(date, note) {
        const dateKey = this.getDateKey(date);
        if (!this.notes[dateKey]) {
            this.notes[dateKey] = [];
        }
        this.notes[dateKey].push(note);
        this.saveNotes();
    }

    removeNote(date, noteIndex) {
        const dateKey = this.getDateKey(date);
        if (this.notes[dateKey]) {
            this.notes[dateKey].splice(noteIndex, 1);
            if (this.notes[dateKey].length === 0) {
                delete this.notes[dateKey];
            }
            this.saveNotes();
        }
    }

    getNotesForDate(date) {
        const dateKey = this.getDateKey(date);
        return this.notes[dateKey] || [];
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

    createNoteInput(dayElement, date) {
        // Remove any other open note input
        const openInputs = document.querySelectorAll('.note-input');
        openInputs.forEach(input => input.remove());

        const noteInput = document.createElement('div');
        noteInput.className = 'note-input';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Add a note...';
        
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.addEventListener('click', (e) => {
            e.stopPropagation();
            if (input.value.trim()) {
                this.addNote(date, input.value.trim());
                this.renderNotes(dayElement, date);
            }
            noteInput.remove();
        });

        noteInput.appendChild(input);
        noteInput.appendChild(saveButton);

        // Close input if clicking outside
        setTimeout(() => {
            const closeInput = (event) => {
                if (!noteInput.contains(event.target)) {
                    noteInput.remove();
                    document.removeEventListener('mousedown', closeInput);
                }
            };
            document.addEventListener('mousedown', closeInput);
        }, 0);

        return noteInput;
    }

    renderNotes(dayElement, date) {
        const notesContainer = dayElement.querySelector('.notes-container') || document.createElement('div');
        notesContainer.className = 'notes-container';
        
        const notes = this.getNotesForDate(date);
        notesContainer.innerHTML = '';
        
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note';
            
            const noteText = document.createElement('span');
            noteText.textContent = note;
            
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-note';
            deleteButton.textContent = '×';
            deleteButton.addEventListener('click', () => {
                this.removeNote(date, index);
                this.renderNotes(dayElement, date);
            });
            
            noteElement.appendChild(noteText);
            noteElement.appendChild(deleteButton);
            notesContainer.appendChild(noteElement);
        });
        
        if (!dayElement.querySelector('.notes-container')) {
            dayElement.appendChild(notesContainer);
        }
    }

    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        this.monthElement.textContent = `${this.getMonthName(month)} ${year}`;
        this.daysElement.innerHTML = '';

        const firstDay = this.getFirstDayOfMonth(year, month);
        const startingDay = firstDay.getDay();
        const totalDays = this.getDaysInMonth(year, month);
        const prevMonthDays = this.getPreviousMonthDays(year, month);

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

            // Add date number at the top
            const dateNumber = document.createElement('span');
            dateNumber.className = 'date-number';
            dateNumber.textContent = i;
            day.appendChild(dateNumber);

            const date = new Date(year, month, i);
            if (this.isToday(date)) {
                day.classList.add('today');
            }

            day.addEventListener('click', (e) => {
                // Prevent opening input if clicking on note or delete button
                if (e.target.classList.contains('delete-note') || e.target.classList.contains('note')) return;
                const existingInput = day.querySelector('.note-input');
                if (!existingInput) {
                    const noteInput = this.createNoteInput(day, date);
                    day.appendChild(noteInput);
                }
            });

            this.renderNotes(day, date);
            this.daysElement.appendChild(day);
        }

        // Add days from next month
        const remainingDays = 42 - (startingDay + totalDays);
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