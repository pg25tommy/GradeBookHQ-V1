// assignments.js

// Constants for grading criteria options
const gradingOptions = `
  <option value="1">Emerging</option>
  <option value="2">Developing</option>
  <option value="3">Proficient</option>
  <option value="4">Extending</option>
`;

// Function to create a select element with grading criteria options
function createGradingSelect(labelText) {
  return `
    <label>${labelText}:</label>
    <select class="gradingCriteria">
      ${gradingOptions}
    </select>
  `;
}

// Dynamically adds an assignment block with multiple criteria
function addAssignment() {
  const container = document.getElementById("assignments");
  const div = document.createElement("div");
  div.classList.add("assignment");

  div.innerHTML = `
    <label>Assignment Name:</label>
    <input type="text" class="assignmentName" required>
    ${createGradingSelect('Understanding')}
    ${createGradingSelect('Application')}
    ${createGradingSelect('Communication')}
    ${createGradingSelect('Critical Thinking')}
    <button type="button" class="remove-assignment">Remove</button>
  `;
  container.appendChild(div);
}

// Event delegation for remove buttons
document.getElementById("assignments").addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-assignment")) {
    event.target.closest(".assignment").remove();
  }
});

// Dynamically adds a formative assessment textbox in the formativeContainer.
function addFormativeAssessment() {
  const container = document.getElementById("formativeContainer");
  const textarea = document.createElement("textarea");
  textarea.classList.add("formativeAssessment");
  textarea.rows = 3;
  textarea.placeholder = "Enter formative assessment details...";
  container.appendChild(textarea);
}
