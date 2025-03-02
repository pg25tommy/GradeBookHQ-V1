// history.js

// Display the saved assignments for the current user
function displayHistory() {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) return; // If there's no current user, do nothing

  const history = JSON.parse(localStorage.getItem(`history_${currentUser}`)) || [];
  const historyContainer = document.getElementById("history");

  if (!historyContainer) return; // If there's no #history element, do nothing

  let historyContent = "<h3>Saved Assignments</h3>";

  if (history.length === 0) {
    historyContent += "<p>No saved assignments.</p>";
  } else {
    history.forEach(record => {
      historyContent += `
        <p>${record.studentName} - ${record.term} - ${record.firstAssignmentName} (${record.date})</p>
      `;
    });
  }

  historyContainer.innerHTML = historyContent;
}

// Clears the localStorage history for current user
function clearHistory() {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) return; // If there's no current user, do nothing

  localStorage.removeItem(`history_${currentUser}`);
  displayHistory();
}

// On DOM load, display the user's history (greeting is handled separately)
document.addEventListener("DOMContentLoaded", displayHistory);
