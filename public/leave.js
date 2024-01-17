document.addEventListener('DOMContentLoaded', () => {
    const leaveForm = document.querySelector('.form');
    const errorMessage = document.getElementById('error-message');

    leaveForm.addEventListener('submit', handleLeave);

    async function handleLeave(event) {
        event.preventDefault();

        const reason = document.getElementById('reason').value;
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;

        clearError();

        try {
            const response = await sendLeaveRequest(reason, startDate, endDate);

            if (response.ok) {
                window.location.href = 'leave.html';
            } else {
                const data = await response.json();
                displayError(data.error || 'Leave failed.', 'red');
            }
        } catch (error) {
            displayError('An error occurred.', 'red');
        }
    }

    async function sendLeaveRequest(reason, startDate, endDate) {
        return fetch('/leave', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                reason,
                startDate,
                endDate,
            }),
        });
    }

    function displayError(message, color) {
        errorMessage.textContent = message;
        errorMessage.style.color = color;
    }

    function clearError() {
        errorMessage.textContent = '';
        errorMessage.style.color = '';
    }

});