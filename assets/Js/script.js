const signInBtn = document.getElementById('signInBtn');
const authArea = document.getElementById('authArea');
const dropdown = document.getElementById('dropdownMenu');
const logoutBtn = document.getElementById('logoutBtn');

// Псевдо-логин (можно сделать login.html потом)
signInBtn?.addEventListener('click', () => {
  const username = prompt("Enter your username:");
  if (username) {
    localStorage.setItem('username', username);
    location.reload();
  }
});

// Отображение username и dropdown
window.addEventListener('DOMContentLoaded', () => {
  const username = localStorage.getItem('username');
  if (username) {
    authArea.innerHTML = `<span id="userDropdown" style="cursor:pointer; font-weight:bold;">👤 ${username}</span>`;
    document.getElementById('userDropdown').addEventListener('click', () => {
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
  }
});

// Logout
logoutBtn?.addEventListener('click', () => {
  localStorage.removeItem('username');
  location.reload();
});