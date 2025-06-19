const customModalOverlay = document.getElementById('customModalOverlay');
const customModalTitle = document.getElementById('customModalTitle');
const customModalMessage = document.getElementById('customModalMessage');
const customModalInput = document.getElementById('customModalInput');
const customModalOkButton = document.getElementById('customModalOkButton');
const customModalCancelButton = document.getElementById('customModalCancelButton');
let resolveModalPromise;

async function showCustomPrompt(message, defaultValue = '') {
    return new Promise(resolve => {
        resolveModalPromise = resolve;
        customModalTitle.textContent = "Eingabe erforderlich";
        customModalMessage.textContent = message;
        customModalInput.value = defaultValue;
        customModalInput.classList.remove('hidden');
        customModalCancelButton.classList.remove('hidden');
        customModalOverlay.classList.add('visible');
        customModalOkButton.onclick = () => { closeModal(customModalInput.value); };
        customModalCancelButton.onclick = () => { closeModal(null); };
    });
}


function showCustomAlert(message) {
    return new Promise(resolve => {
        resolveModalPromise = resolve;
        customModalTitle.textContent = "Information";
        customModalMessage.textContent = message;
        customModalInput.classList.add('hidden');
        customModalCancelButton.classList.add('hidden');
        customModalOverlay.classList.add('visible');
        customModalOkButton.onclick = () => { closeModal(); };
    });
}

function showCustomConfirm(message) {
    return new Promise(resolve => {
        resolveModalPromise = resolve;
        customModalTitle.textContent = "Bestätigung";
        customModalMessage.textContent = message;
        customModalInput.classList.add('hidden');
        customModalCancelButton.classList.remove('hidden');
        customModalOverlay.classList.add('visible');
        customModalOkButton.onclick = () => {closeModal(true);};
        customModalCancelButton.onclick = () => {closeModal(false);};
    });
}

function closeModal(value) {
    customModalOverlay.classList.remove('visible');
    if (resolveModalPromise) {
        resolveModalPromise(value);
        resolveModalPromise = null;
    }
}