function Delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

const loginMessageElement = document.getElementById('loginMessage');
const registerMessageElement = document.getElementById('registerMessage');
const passwordMatchErrorElement = document.getElementById('passwordMatchError');
const confirmPasswordInput = document.getElementById('confirm-password');

function showMessage(element, message, type) {
    element.textContent = message;
    element.className = 'message-area';
    if (type) {
        element.classList.add(type);
    }
}

function clearMessagesAndValidation() {
    showMessage(loginMessageElement, '', '');
    showMessage(registerMessageElement, '', '');
    showMessage(passwordMatchErrorElement, '', '');
    if (confirmPasswordInput) {
        confirmPasswordInput.classList.remove('input-error');
    }
}

document.addEventListener('DOMContentLoaded', clearMessagesAndValidation);

async function changeMode(LoginOrRegister) {
    clearMessagesAndValidation();

    if (LoginOrRegister == 0) {
        document.getElementById("Login-Container").classList.add("opacity0");
        document.getElementById("Register-Container").classList.remove("hidden", "opacity0");
        await Delay(1000);
        document.getElementById("Login-Container").classList.add("hidden");
    } else {
        document.getElementById("Register-Container").classList.add("opacity0");
        document.getElementById("Login-Container").classList.remove("hidden", "opacity0");
        await Delay(1000);
        document.getElementById("Register-Container").classList.add("hidden");
    }
}

document.getElementById("loginForm").addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    showMessage(loginMessageElement, 'Anmeldung läuft...', '');

    try {
        const res = await fetch('${GAME_SERVER_IP}/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (res.ok) {
            showMessage(loginMessageElement, data.message, 'success');

            if (data.token) { localStorage.setItem('authToken', data.token); }
            if (data.username) { localStorage.setItem('loggedInUsername', data.username); }
            if (data.playerdata) { localStorage.setItem('playerData', JSON.stringify(data.playerdata)); }

            e.target.reset();

            await Delay(1500);
            window.location.href = 'game.html';
        } else {
            showMessage(loginMessageElement, data.message, 'error');
        }
    } catch (error) {
        console.error('Netzwerk- oder Serverfehler beim Login:', error);
        showMessage(loginMessageElement, 'Es gab ein Problem beim Verbinden mit dem Server.', 'error');
    }
});

document.getElementById("registerForm").addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirm_password.value;

    clearMessagesAndValidation();

    if (password !== confirmPassword) {
        showMessage(passwordMatchErrorElement, 'Passwörter stimmen nicht überein.', 'error');
        confirmPasswordInput.classList.add('input-error');
        return;
    }

    showMessage(registerMessageElement, 'Registrierung läuft...', '');

    try {
        const res = await fetch('${GAME_SERVER_IP}/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            showMessage(registerMessageElement, data.message, 'success');
            e.target.reset();
            await Delay(1500);
            changeMode(1);
        } else {
            showMessage(registerMessageElement, data.message, 'error');
        }
    } catch (error) {
        console.error('Netzwerk- oder Serverfehler bei der Registrierung:', error);
        showMessage(registerMessageElement, 'Es gab ein Problem beim Verbinden mit dem Server.', 'error');
    }
});