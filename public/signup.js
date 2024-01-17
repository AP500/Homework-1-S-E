document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.querySelector('.form');
    const errorMessage = document.getElementById('error-message');

    signUpForm.addEventListener('submit', handleSignUp);

    async function handleSignUp(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        const department = document.getElementById('department').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;

        if (password !== passwordConfirm) {
            displayError('Passwords do not match.', 'red');
            return;
        }

        clearError();

        try {
            const response = await sendSignUpRequest(username, name, surname, department, password);

            if (response.ok) {
                window.location.href = 'login.html';
            } else {
                const data = await response.json();
                displayError(data.error || 'Registration failed.', 'red');
            }
        } catch (error) {
            displayError('An error occurred.', 'red');
        }
    }

    async function sendSignUpRequest(username, name, surname, department, password) {
        return fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                name,
                surname,
                department,
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

