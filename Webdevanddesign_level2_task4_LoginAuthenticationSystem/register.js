const form = document.getElementById("registerForm");
const error = document.getElementById("errorMessage");

// Password toggle (optional UI support)
function togglePassword(id) {
    const field = document.getElementById(id);
    field.type = field.type === "password" ? "text" : "password";
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    error.textContent = "";

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#]).{8,}$/;
    const usernamePattern = /^[A-Za-z0-9_]{4,20}$/;

    // Validation
    if (!username || !email || !password || !confirmPassword) {
        error.textContent = "All fields are required.";
        return;
    }

    if (!usernamePattern.test(username)) {
        error.textContent = "Invalid username (4-20 chars, no spaces).";
        return;
    }

    if (!emailPattern.test(email)) {
        error.textContent = "Invalid email format.";
        return;
    }

    const passwordPattern = /^(?=.*\d).{8,}$/;

    if (!passwordPattern.test(password)) {
        error.textContent =
            "Password must be at least 8 characters and contain at least 1 number.";
        return;
    }

    if (password !== confirmPassword) {
        error.textContent = "Passwords do not match.";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(
        u => u.username.toLowerCase() === username.toLowerCase() ||
             u.email === email
    );

    if (exists) {
        error.textContent = "User already exists.";
        return;
    }

    const hashed = await hashPassword(password);

    users.push({
        username,
        email,
        password: hashed
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");

    window.location.href = "login.html";
});