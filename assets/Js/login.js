const form = document.getElementById("loginForm");
const isAdminCheckbox = document.getElementById("isAdmin");
const adminField = document.getElementById("adminField");

isAdminCheckbox.addEventListener("change", function () {
  adminField.style.display = this.checked ? "block" : "none";
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const fullName = document.getElementById("fullname").value.trim();
  const password = document.getElementById("password").value;
  const isAdmin = isAdminCheckbox.checked;
  const adminName = document.getElementById("adminName").value.trim();
  const adminPassword = document.getElementById("adminPassword").value;

  if (!fullName || !password || (isAdmin && (!adminName || !adminPassword))) {
    Toastify({
      text: "Please fill in all fields.",
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
    }).showToast();
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.fullName === fullName && u.password === password);

  if (!user) {
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: 'Incorrect email or password.',
      confirmButtonColor: '#f44336'
    });
    return;
  }

  if (isAdmin && (user.fullName !== adminName || user.password !== adminPassword)) {
    Swal.fire({
      icon: 'error',
      title: 'Admin Login Failed',
      text: 'Incorrect admin name or password.',
      confirmButtonColor: '#f44336'
    });
    return;
  }

  Swal.fire({
    icon: 'success',
    title: 'Login Successful!',
    text: `Welcome, ${user.fullName}!`,
    confirmButtonColor: '#f44336'
  });

  localStorage.setItem("loggedInUser", JSON.stringify(user));
  form.reset();
});