// assignments.js

// Dynamically adds an assignment block with multiple criteria
function addAssignment() {
  let container = document.getElementById("assignments");
  let div = document.createElement("div");
  div.classList.add("assignment");

  div.innerHTML = `
    <label>Assignment Name:</label>
    <input type="text" class="assignmentName" required>
    
    <label>Understanding:</label>
    <select class="gradingCriteria">
      <option value="1">Emerging</option>
      <option value="2">Developing</option>
      <option value="3">Proficient</option>
      <option value="4">Extending</option>
    </select>

    <label>Application:</label>
    <select class="gradingCriteria">
      <option value="1">Emerging</option>
      <option value="2">Developing</option>
      <option value="3">Proficient</option>
      <option value="4">Extending</option>
    </select>

    <label>Communication:</label>
    <select class="gradingCriteria">
      <option value="1">Emerging</option>
      <option value="2">Developing</option>
      <option value="3">Proficient</option>
      <option value="4">Extending</option>
    </select>

    <label>Critical Thinking:</label>
    <select class="gradingCriteria">
      <option value="1">Emerging</option>
      <option value="2">Developing</option>
      <option value="3">Proficient</option>
      <option value="4">Extending</option>
    </select>

    <button type="button" class="remove-assignment">Remove</button>
  `;
  container.appendChild(div);

  // Remove button deletes this assignment block
  div.querySelector(".remove-assignment").addEventListener("click", () => {
    div.remove();
  });
}

// Dynamically adds a formative assessment textbox in the formativeContainer.
function addFormativeAssessment() {
  const container = document.getElementById("formativeContainer");
  const textarea = document.createElement("textarea");
  textarea.classList.add("formativeAssessment");
  textarea.rows = 3;
  textarea.placeholder = "Enter formative assessment details...";
  container.appendChild(textarea);
}
