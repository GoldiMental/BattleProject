function Exit_Game() {
    const popup = document.createElement('div');
    popup.className = 'retro-popup';

    popup.innerHTML = `
        <div class="retro-popup-window">
        <div class="retro-popup-title">SPIEL VERLASSEN?</div>
        <div class="retro-popup-text">Bist du sicher?</div> <!-- Mit neuer Klasse -->
        <div>
                <button class="retro-popup-btn retro-popup-btn-yes" id="retroPopupYes" onclick="Click()">JA</button>
                <button class="retro-popup-btn retro-popup-btn-no" id="retroPopupNo" onclick="Click()">NEIN</button>
            </div>
        </div>
    `;

    document.body.appendChild(popup);

    document.getElementById('retroPopupYes').addEventListener('click', function () {
        try {window.location.replace(GAME_SERVER_IP);}
        catch (e) {window.location.href = 'about:blank';}
    });

    document.getElementById('retroPopupNo').addEventListener('click', function () {
        document.body.removeChild(popup);
    });
}