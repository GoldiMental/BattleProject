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
 * @param {array} [options.buttons] Ein Array von Objekten für benutzerdefinierte Buttons.
 **/
function showCustomModal(title, message, options = {}) {
    return new Promise(resolve => {
        resolveModalPromise = resolve;
        customModalTitle.textContent = title;
        customModalMessage.textContent = message;
        
        // Verstecke Input und Standard-OK-Button, wenn benutzerdefinierte Buttons vorhanden sind
        const hasCustomButtons = options.buttons && options.buttons.length > 0;
        customModalInput.classList.toggle("hidethis", hasCustomButtons || !!options.inputType);
        customModalOkButton.classList.toggle("hidethis", hasCustomButtons);

        // Der Abbrechen-Button wird nur versteckt, wenn er explizit nicht angezeigt werden soll.
        customModalCancelButton.classList.toggle("hidethis", !options.showCancelButton);
        
        // Entferne alte Buttons und verwalte den Container
        customModalButtonsContainer.innerHTML = '';
        customModalButtonsContainer.classList.toggle("hidethis", !hasCustomButtons);

        if (hasCustomButtons) {
            options.buttons.forEach(buttonConfig => {
                const newButton = document.createElement('button');
                newButton.textContent = buttonConfig.text;
                newButton.className = 'modal-button'; 
                newButton.onclick = () => { closeModal(buttonConfig.value); };
                customModalButtonsContainer.appendChild(newButton);
            });
        }
        
        // Event-Listener für Standard-Buttons
        if (!hasCustomButtons) {
            customModalOkButton.onclick = () => { closeModal(options.inputType ? customModalInput.value : true); };
        }
        
        customModalCancelButton.onclick = () => { closeModal(false); };

        customModalOverlay.classList.remove("hidethis");
    });
}

function showCustomMenu(message, buttons, showCancel = false) {
    return showCustomModal('Wählen Sie eine Option', message, {
        buttons: buttons,
        showCancelButton: showCancel
    });
}

function closeModal(value) {
    customModalOverlay.classList.add("hidethis");
    if (resolveModalPromise) {
        resolveModalPromise(value);
        resolveModalPromise = null;
    }
}