function shopHandel() 
{
  const welcome = document.getElementById('welcomeMessage');
  const shopMenu = document.getElementById('shopMenu');
  const leaveBtn = document.getElementById('shopMenu');

  // Show welcome message for 5 seconds, then show shop menu
    welcome.style.display = 'block';
    shopMenu.style.display = 'none';
    setTimeout(function() {
      welcome.style.display = 'none';
      shopMenu.style.display = 'flex';
    }, 5000);

  // When "Verlassen" is clicked, hide menu and show welcome again
  leaveBtn.onclick = function() {
    shopMenu.style.display = 'none';
    showWelcomeThenMenu();
  };

  // Optional: Actions for buy/sell
  document.getElementById('buyBtn').onclick = function() {
    alert('Was möchten Sie kaufen?');
  };
  document.getElementById('sellBtn').onclick = function() {
    alert('Was möchten Sie verkaufen?');
  };
};