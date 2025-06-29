function enterRole(role) {
  document.getElementById("roleSelect").style.display = "none";
  if (role === "admin") {
    document.getElementById("loginScreen").style.display = "block";
  } else {
    document.getElementById("dashboard").style.display = "block";
    document.querySelectorAll(".admin-only").forEach(el => el.style.display = "none");
  }
}

function validateLogin() {
  const password = document.getElementById("passwordInput").value;
  if (password === "principal123") {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
  } else {
    document.getElementById("