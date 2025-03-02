// greeting.js

// Display a greeting based on the logged-in user
function displayGreeting() {
    const currentUser = localStorage.getItem("currentUser");
    const greetingDiv = document.getElementById("greeting");
    if (greetingDiv && currentUser) {
      greetingDiv.innerHTML = `<p>Hello, ${currentUser}!</p>`;
    }
  }
  
  // Initialize greeting on DOM load
  document.addEventListener("DOMContentLoaded", displayGreeting);
  