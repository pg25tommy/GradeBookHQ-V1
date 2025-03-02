// history.js

// Display the saved assignments for the current user
function displayHistory() {
  let currentUser = localStorage.getItem("currentUser");
  let history = JSON.parse(localStorage.getItem(`history_${currentUser}`)) || [];
  let historyContainer = document.getElementById("history");

  if (!historyContainer) return; // If there's no #history element, do nothing

  historyContainer.innerHTML = "<h3>Saved Assignments</h3>";

  if (history.length === 0) {
    historyContainer.innerHTML += "<p>No saved assignments.</p>";
    return;
  }

  history.forEach(record => {
    historyContainer.innerHTML += `
      <p>${record.studentName} - ${record.term} - ${record.firstAssignmentName} (${record.date})</p>
    `;
  });
}

// Clears the localStorage history for current user
function clearHistory() {
  let currentUser = localStorage.getItem("currentUser");
  localStorage.removeItem(`history_${currentUser}`);
  displayHistory();
}

// On DOM load, display the user's history (greeting is handled separately)
document.addEventListener("DOMContentLoaded", displayHistory);
