const customModalOverlay = document.getElementById('customModalOverlay');
const customModalTitle = document.getElementById('customModalTitle');
const customModalMessage = document.getElementById('customModalMessage');
const customModalInput = document.getElementById('customModalInput');
const customModalOkButton = document.getElementById('customModalOkButton');
const customModalCancelButton = document.getElementById('customModalCancelButton');

let resolveModalPromise;
/**
 * Eine einzige Funktion zur Verarbeitung aller Modal-Typen.
 * @param {string} title Der Titel des Modals.
 * @param {string} message Die Nachricht des Modals.
 * @param {object} options Optionale Konfiguration für das Modal.
 * @param {string} [options.inputType] Der Eingabetyp (z.B. 'text').
 * @param {string} [options.inputValue] Der Anfangswert der Eingabe.
 * @param {boolean} [options.showCancelButton] Ob die Abbrechen-Schaltfläche angezeigt werden soll.
 **/
function showCustomModal(title, message, options = {}) {
    return new Promise(resolve => {
        resolveModalPromise = resolve;
        customModalTitle.textContent = title;
        customModalMessage.textContent = message;

        if (options.inputType) { customModalInput.value = options.inputValue || ''; customModalInput.classList.remove('hidden'); }
        else { customModalInput.classList.add('hidden'); }

        if (options.showCancelButton) { customModalCancelButton.classList.remove('hidden'); }
        else { customModalCancelButton.classList.add('hidden'); }

        customModalOverlay.classList.add('visible');

        const handleOkClick = () => { const result = options.inputType ? customModalInput.value : true; closeModal(result); };

        const handleCancelClick = () => { const result = options.inputType ? null : false; closeModal(result); };

        customModalOkButton.addEventListener('click', handleOkClick); customModalOkButton.addEventListener('click', Click);
        customModalCancelButton.addEventListener('click', handleCancelClick); customModalCancelButton.addEventListener('click', Click);
    });
}

function showCustomPrompt(message, defaultValue = '') {
    return showCustomModal('Eingabe erforderlich', message, {
        inputType: 'text', inputValue: defaultValue, showCancelButton: true
    });
}

function showCustomAlert(message) { return showCustomModal('Information', message); }

function showCustomConfirm(message) { return showCustomModal('Bestätigung', message, { showCancelButton: true }); }

function closeModal(value) {
    customModalOverlay.classList.remove('visible');
    if (resolveModalPromise) { resolveModalPromise(value); resolveModalPromise = null; }
}