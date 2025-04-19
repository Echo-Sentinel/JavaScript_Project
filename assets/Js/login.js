const form = document.getElementById("loginForm");
const isAdminCheckbox = document.getElementById("isAdmin");
const adminNameContainer = document.getElementById("adminNameContainer");


isAdminCheckbox.addEventListener("change", () => {
  adminNameContainer.style.display = isAdminCheckbox.checked ? "block" : "none";
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullName = document.getElementById("fullname").value.trim();
  const password = document.getElementById("password").value.trim();
  const isAdmin = isAdminCheckbox.checked;
  const adminName = document.getElementById("adminName").value.trim();

  if (!fullName || !password || (isAdmin && !adminName)) {
    showToast("Please fill in all fields.");
    return;
  }

  if (password.length < 6) {
    showToast("Password must be at least 6 characters.");
    return;
  }

  try {
    let url = `http://localhost:3000/users?fullName=${fullName}&password=${password}`;
    if (isAdmin) {
      url += `&isAdmin=true&adminName=${adminName}`;
    }

    const response = await fetch(url);
    const users = await response.json();

    if (users.length === 0) {
      showToast("Wrong email or password.");
      return;
    }

    const user = users[0];
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    Swal.fire(
      'Login Successful!',
      isAdmin ? `Welcome, Admin ${adminName}!` : `Welcome, ${user.fullName}!`,
      'success'
    ).then(() => {
      window.location.href = "index.html";
    });

    form.reset();
  } catch (err) {
    console.error(err);
    showToast("Server error. Try again later.");
  }
});

function showToast(message) {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "center",
    backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
  }).showToast();
}