document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;

  const res = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  alert(data.message);
});

document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const email = e.target.email.value;
  const password = e.target.password.value;
  const confirmPassword = e.target.confirm_password.value;

  if (password !== confirmPassword) {
    alert('Passwörter stimmen nicht überein.');
    return;
  }

  const res = await fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();
  alert(data.message);
});