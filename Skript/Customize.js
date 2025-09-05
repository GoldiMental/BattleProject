const customModalOverlay = document.getElementById('customModalOverlay');
const customModalTitle = document.getElementById('customModalTitle');
const customModalMessage = document.getElementById('customModalMessage');
const customModalInput = document.getElementById('customModalInput');
const customModalOkButton = document.getElementById('customModalOkButton');
const customModalCancelButton = document.getElementById('customModalCancelButton');
const customModalButtonsContainer = document.getElementById('customModalButtonsContainer');

let resolveModalPromise;

function showCustomModal(title, message, options = {}) {
    return new Promise(resolve => {
        resolveModalPromise = resolve;
        customModalTitle.textContent = title;
        customModalMessage.textContent = message;
        const hasCustomButtons = options.buttons && options.buttons.length > 0;
        customModalInput.classList.toggle("hidethis", hasCustomButtons || !!options.inputType);
        customModalOkButton.classList.toggle("hidethis", hasCustomButtons);
        const isCancelVisible = options.showCancelButton || (!hasCustomButtons && !options.inputType);
        customModalCancelButton.classList.toggle("hidethis", !isCancelVisible);
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
        if (!hasCustomButtons) {
            customModalOkButton.onclick = () => { closeModal(options.inputType ? customModalInput.value : true); };
            customModalCancelButton.onclick = () => { closeModal(options.inputType ? null : false); };
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