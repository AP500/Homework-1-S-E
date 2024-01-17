document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', handleLogin);

    async function handleLogin(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
       
        clearError();

        try {
            const response = await sendLoginRequest(username, password);

            if (response.ok) {
                window.location.href = 'leave.html';
            } else {
                const data = await response.json();
                displayError(data.error || 'Login failed.', 'red');
            }
        } catch (error) {
            displayError('An error occurred.', 'red');
        }
    }

    async function sendLoginRequest(username, password) {
        return fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
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


