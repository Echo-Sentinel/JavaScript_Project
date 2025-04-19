const registerForm = document.getElementById("registerForm");
const isAdminCheckbox = document.getElementById("isAdmin");
const adminField = document.getElementById("adminField");

isAdminCheckbox.addEventListener("change", function () {
  adminField.style.display = this.checked ? "block" : "none";
});

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const gmail = document.getElementById("gmail").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const isAdmin = document.getElementById("isAdmin").checked;
  const adminName = document.getElementById("adminName").value.trim();
  const adminPassword = document.getElementById("adminPassword").value;

  if (!gmail || !username || !password || !confirmPassword) {
    Toastify({
      text: "Please fill in all fields.",
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
    }).showToast();
    return;
  }

  if (password !== confirmPassword) {
    Toastify({
      text: "Passwords do not match.",
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
    }).showToast();
    return;
  }

  if (password.length < 6) {
    Toastify({
      text: "Password must be at least 6 characters.",
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
    }).showToast();
    return;
  }

  if (isAdmin && (!adminName || !adminPassword)) {
    Toastify({
      text: "Please fill in all admin fields.",
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
    }).showToast();
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = users.find(user => user.username === username);

  if (userExists) {
    Toastify({
      text: "User with this username already exists.",
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
    }).showToast();
    return;
  }

  const newUser = {
    gmail,
    username,
    password,
    isAdmin,
    adminName: isAdmin ? adminName : null,
    adminPassword: isAdmin ? adminPassword : null,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  Swal.fire({
    icon: 'success',
    title: 'Registration Successful!',
    text: 'You can now log in.',
    confirmButtonColor: '#f44336'
  }).then(() => {
    window.location.href = "login.html";
  });
});