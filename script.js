// Calendar functionality
class EventCalendar {
    constructor() {
        this.currentDate = new Date();
        this.events = {
            '2025-01-15': 'New Year Art Exhibition Opening',
            '2025-01-22': 'Youth Theater Auditions',
            '2025-02-05': 'Community Art Workshop',
            '2024-12-20': 'Holiday Art Show',
            '2024-12-24': 'Community Caroling Event'
        };
        this.init();
    }

    init() {
        this.renderCalendar();
        this.attachEventListeners();
    }

    attachEventListeners() {
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.renderCalendar();
        });

        document.getElementById('nextMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderCalendar();
        });
    }

    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // Update month display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December'];
        document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;

        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        const calendarDays = document.getElementById('calendarDays');
        calendarDays.innerHTML = '';

        const today = new Date();
        const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
        const todayDate = today.getDate();

        // Add previous month's days
        for (let i = firstDay - 1; i >= 0; i--) {
            const day = daysInPrevMonth - i;
            const dayElement = this.createDayElement(day, true, false);
            calendarDays.appendChild(dayElement);
        }

        // Add current month's days
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = isCurrentMonth && day === todayDate;
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const hasEvent = this.events.hasOwnProperty(dateString);
            const dayElement = this.createDayElement(day, false, isToday, hasEvent, dateString);
            calendarDays.appendChild(dayElement);
        }

        // Add next month's days to fill the grid
        const totalCells = calendarDays.children.length;
        const remainingCells = 35 - totalCells; // 5 rows of 7 days
        for (let day = 1; day <= remainingCells; day++) {
            const dayElement = this.createDayElement(day, true, false);
            calendarDays.appendChild(dayElement);
        }
    }

    createDayElement(day, isOtherMonth, isToday, hasEvent = false, dateString = '') {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;

        if (isOtherMonth) {
            dayElement.classList.add('other-month');
        }
        if (isToday) {
            dayElement.classList.add('today');
        }
        if (hasEvent) {
            dayElement.classList.add('has-event');
            dayElement.title = this.events[dateString];
        }

        return dayElement;
    }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', () => {
    // Initialize calendar
    new EventCalendar();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation on scroll for service cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe service cards and project items
    document.querySelectorAll('.service-card, .project-item, .event-item').forEach(el => {
        observer.observe(el);
    });

    // Button interactions
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const buttonText = e.target.textContent;
            console.log(`${buttonText} button clicked`);
            // In a real implementation, this would trigger actual actions
            alert(`Thank you for your interest in ${buttonText}! This feature would connect to our registration system.`);
        });
    });
});
