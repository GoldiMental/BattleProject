const customModalOverlay = document.getElementById('customModalOverlay');
const customModalTitle = document.getElementById('customModalTitle');
const customModalMessage = document.getElementById('customModalMessage');
const customModalInput = document.getElementById('customModalInput');
const customModalOkButton = document.getElementById('customModalOkButton');
const customModalCancelButton = document.getElementById('customModalCancelButton');
const customModalButtonsContainer = document.getElementById('customModalButtonsContainer');

let resolveModalPromise;

/**
 * Eine einzige Funktion zur Verarbeitung aller Modal-Typen.
 * @param {string} title Der Titel des Modals.
 * @param {string} message Die Nachricht des Modals.
 * @param {object} options Optionale Konfiguration für das Modal.
 * @param {string} [options.inputType] Der Eingabetyp (z.B. 'text').
 * @param {string} [options.inputValue] Der Anfangswert der Eingabe.
 * @param {boolean} [options.showCancelButton] Ob die Abbrechen-Schaltfläche angezeigt werden soll.
 * @param {array} [options.buttons] Ein Array von Objekten für benutzerdefinierte Buttons (z.B. [{ text: 'Ja', value: true }, { text: 'Nein', value: false }]).
 **/
function showCustomModal(title, message, options = {}) {
    return new Promise(resolve => {
        resolveModalPromise = resolve;
        customModalTitle.textContent = title;
        customModalMessage.textContent = message;

        const isInputVisible = !!options.inputType;
        customModalInput.classList.toggle("hidethis", !isInputVisible);
        if (isInputVisible) {
            customModalInput.value = options.inputValue || '';
        }

        const isCancelVisible = !!options.showCancelButton;
        customModalCancelButton.classList.toggle("hidethis", !isCancelVisible);

        customModalOkButton.classList.toggle("hidethis", !!options.buttons);
        customModalCancelButton.classList.toggle("hidethis", !isCancelVisible);

        customModalButtonsContainer.innerHTML = '';

        if (options.buttons && options.buttons.length > 0) {
            options.buttons.forEach(buttonConfig => {
                const newButton = document.createElement('button');
                newButton.textContent = buttonConfig.text;
                newButton.className = 'modal-button';
                newButton.addEventListener('click', () => {
                    closeModal(buttonConfig.value);
                });
                customModalButtonsContainer.appendChild(newButton);
            });
            customModalButtonsContainer.classList.remove('hidethis');
        } else {
            customModalButtonsContainer.classList.add('hidethis');
        }

        customModalOverlay.classList.remove("hidethis");

        if (!options.buttons) {
            const handleOkClick = () => {
                const result = options.inputType ? customModalInput.value : true;
                closeModal(result);
            };

            const handleCancelClick = () => {
                const result = options.inputType ? null : false;
                closeModal(result);
            };

            customModalOkButton.onclick = handleOkClick;
            customModalCancelButton.onclick = handleCancelClick;
        }
    });
}

function showCustomPrompt(message, defaultValue = '') {
    return showCustomModal('Eingabe erforderlich', message, {
        inputType: 'string',
        inputValue: defaultValue,
        showCancelButton: true
    });
}

function showCustomAlert(message) {
    return showCustomModal('Information', message, {
        showCancelButton: false,
        inputType: false
    });
}

function showCustomConfirm(message) {
    return showCustomModal('Bestätigen', message, {
        showCancelButton: true,
        inputType: false
    });
}

function showCustomMenu(message, buttons) {
    return showCustomModal('Wählen Sie eine Option', message, {
        buttons: buttons,
        showCancelButton: true,
        inputType: false
    });
}

function closeModal(value) {
    customModalOverlay.classList.add("hidethis");
    if (resolveModalPromise) {
        resolveModalPromise(value);
        resolveModalPromise = null;
    }
}