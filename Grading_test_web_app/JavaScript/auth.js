// auth.js

// Login function reads #username, #password, fetches users.json
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    if (data.success) {
      // Store authentication state
      localStorage.setItem("authenticated", "true");
      localStorage.setItem("currentUser", username);
      window.location.href = "grading.html"; // Redirect to grading page
    } else {
      alert("Invalid username or password."); // Show error if login fails
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

// Ensures the user must be authenticated if on grading.html
function checkAuth() {
  if (window.location.pathname.includes("grading.html")) {
    if (localStorage.getItem("authenticated") !== "true") {
      window.location.href = "index.html"; // Not authenticated? Go to login
    }
  }
}

// Logout function that clears localStorage and records logout time
async function logout() {
  const currentUser = localStorage.getItem("currentUser");

  if (currentUser) {
    try {
      const response = await fetch("/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: currentUser }),
      });
      const data = await response.json();
      console.log("🔹 Logout Successful:", data.message);
      localStorage.removeItem("authenticated");
      localStorage.removeItem("currentUser");
      window.location.href = "index.html"; // Redirect to login
    } catch (error) {
      console.error("❌ Logout Error:", error);
    }
  } else {
    // If no user is logged in, just redirect
    window.location.href = "index.html";
  }
}

// Check authentication on DOMContentLoaded
document.addEventListener("DOMContentLoaded", checkAuth);

// Add event listener for Enter key to trigger login
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    login();
  }
});
