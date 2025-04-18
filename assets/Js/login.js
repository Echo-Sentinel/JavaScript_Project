const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const fullName = document.getElementById("fullname").value.trim();
  const password = document.getElementById("password").value;

  if (!fullName || !password ) {
    Toastify({
      text: "Please fill in all fields.",
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

  if (password !== confirmPassword) {
    Toastify({
      text: " Wrong password.",
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
    }).showToast();
    return;
  }

  Swal.fire({
    icon: 'success',
    title: 'Account Created!',
    text: 'Your account has been successfully created.',
    confirmButtonColor: '#f44336'
  });

  form.reset();
});