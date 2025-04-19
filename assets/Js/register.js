const form = document.getElementById("registerForm");
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

  // If it's an admin, save differently
  if (isAdmin) {
    const admin = { fullName: adminName, password: adminPassword, role: "admin" };
    users.push(admin); // Save admin as a special user
  } else {
    const user = { fullName: fullName, password: password, role: "user" };
    users.push(user); // Save regular user
  }

  localStorage.setItem("users", JSON.stringify(users));

  Swal.fire({
    icon: 'success',
    title: 'Registration Successful!',
    text: `Welcome, ${fullName}!`,
    confirmButtonColor: '#f44336'
  });

  form.reset();
});