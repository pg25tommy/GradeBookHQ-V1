// calendar.js
document.addEventListener("DOMContentLoaded", function() {
    // Create the calendar section container
    const calendarSection = document.createElement("div");
    calendarSection.id = "dueDatesSection";
    calendarSection.innerHTML = `
      <h3>Assignment Due Dates</h3>
      <div>
        <label for="dueAssignmentName">Assignment Name:</label>
        <input type="text" id="dueAssignmentName" placeholder="Enter assignment name">
      </div>
      <div>
        <label for="dueDate">Select Due Date:</label>
        <input type="date" id="dueDate">
        <button type="button" id="addDueDateBtn">Add Due Date</button>
      </div>
      <ul id="dueDateList"></ul>
    `;
    
    // Append the calendar section to the form container if it exists; otherwise, append to body
    const formContainer = document.querySelector(".form-container");
    if (formContainer) {
      formContainer.appendChild(calendarSection);
    } else {
      document.body.appendChild(calendarSection);
    }
    
    // Event listener for the "Add Due Date" button
    document.getElementById("addDueDateBtn").addEventListener("click", function() {
      const assignmentNameInput = document.getElementById("dueAssignmentName");
      const dueDateInput = document.getElementById("dueDate");
      const assignmentName = assignmentNameInput.value.trim();
      const dueDateValue = dueDateInput.value;
      
      if (!assignmentName) {
        alert("Please enter an assignment name.");
        return;
      }
      if (!dueDateValue) {
        alert("Please select a due date.");
        return;
      }
      
      const dueDateList = document.getElementById("dueDateList");
      const li = document.createElement("li");
      li.textContent = `${assignmentName} - Due: ${dueDateValue}`;
      dueDateList.appendChild(li);
      
      // Clear the input fields after adding
      assignmentNameInput.value = "";
      dueDateInput.value = "";
    });
  });
  