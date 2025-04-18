const form = document.getElementById("loginForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const fullName = document.getElementById("fullname").value.trim();
  const password = document.getElementById("password").value;

  if (!fullName || !password) {
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

  Swal.fire({
    icon: 'success',
    title: 'Login Successful!',
    text: `Welcome, ${user.fullName}!`,
    confirmButtonColor: '#f44336'
  });

  localStorage.setItem("loggedInUser", JSON.stringify(user));
  form.reset();
});