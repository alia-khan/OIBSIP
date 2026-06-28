// Check session
const user = JSON.parse(localStorage.getItem("currentUser"));

if (!user) {
    window.location.href = "login.html";
}

// Show username
const display = document.getElementById("displayUser");

if (display) {
    display.textContent = user.username;
}

// Logout function
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {

    const confirmLogout = confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    // Small animation effect
    document.body.style.opacity = "0.5";

    setTimeout(() => {
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
    }, 500);
});