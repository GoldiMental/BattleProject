function Exit_Game() {
    // Erstelle Popup-Element
    const popup = document.createElement('div');
    popup.className = 'retro-popup';
    
    // Popup-Inhalt
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
    
    // Füge Popup zum DOM hinzu
    document.body.appendChild(popup);
    
    // Event-Handler für Buttons
    document.getElementById('retroPopupYes').addEventListener('click', function() {
        try {
            window.close();
        } catch (e) {
            window.location.href = 'about:blank';
        }
    });
    
    document.getElementById('retroPopupNo').addEventListener('click', function() {
        document.body.removeChild(popup);
    });
}