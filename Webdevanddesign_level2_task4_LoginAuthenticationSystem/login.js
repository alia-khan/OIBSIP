const form = document.getElementById("loginForm");
const error = document.getElementById("errorMessage");

let attempts = localStorage.getItem("loginAttempts") || 0;
let lockTime = localStorage.getItem("lockTime");

// Check lock
if (lockTime && Date.now() < lockTime) {
    document.body.innerHTML =
        "<h2 style='text-align:center;color:red;'>Account locked. Try later.</h2>";
}

function togglePassword() {
    const field = document.getElementById("loginPassword");
    field.type = field.type === "password" ? "text" : "password";
}

function forgotPassword() {
    alert("Password reset link sent (demo feature).");
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    error.textContent = "";

    const userInput = document
        .getElementById("loginUser")
        .value
        .trim()
        .toLowerCase();

    const password = document
        .getElementById("loginPassword")
        .value;

    const remember = document
        .getElementById("rememberMe")?.checked;

    if (!userInput || !password) {
        error.textContent = "All fields required.";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const hashed = await hashPassword(password);

    const user = users.find(
        u =>
            (u.username.toLowerCase() === userInput ||
             u.email.toLowerCase() === userInput) &&
            u.password === hashed
    );

    if (!user) {
        attempts++;
        localStorage.setItem("loginAttempts", attempts);

        if (attempts >= 3) {
            localStorage.setItem("lockTime", Date.now() + 60000); // 1 min lock
            error.textContent = "Too many attempts. Locked for 1 minute.";
            return;
        }

        error.textContent = "Invalid credentials.";
        return;
    }

    // Reset attempts on success
    localStorage.removeItem("loginAttempts");
    localStorage.removeItem("lockTime");

    localStorage.setItem(
        "currentUser",
        JSON.stringify({
            username: user.username,
            email: user.email
        })
    );

    // Remember me
    if (remember) {
        localStorage.setItem("rememberUser", user.username);
    } else {
        localStorage.removeItem("rememberUser");
    }

    window.location.href = "dashboard.html";
});