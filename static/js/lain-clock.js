function updateLainClock() {
    const now = new Date();
    const timeElement = document.getElementById('lain-clock-time');
    const dayElement = document.getElementById('lain-clock-day');

    if (timeElement && dayElement) {
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayName = days[now.getDay()];

        dayElement.textContent = `Present Day: ${dayName}`;
        timeElement.textContent = `Present Time  ${hours}:${minutes}:${seconds}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Check if the widget exists before setting up the interval
    if (document.getElementById('lain-clock-widget')) {
        updateLainClock();
        setInterval(updateLainClock, 1000);
    }
}); 