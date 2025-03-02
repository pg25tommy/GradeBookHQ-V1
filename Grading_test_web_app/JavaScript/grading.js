// grading.js

/**
 * Calculates the overall grade based on the provided assignments.
 * @param {NodeList} assignments - A collection of assignment elements.
 * @returns {Object} - An object containing the percentage, ranking, and letterGrade.
 */
function calculateOverallGrade(assignments) {
  let totalScore = 0;
  let totalCriteria = 0;
  
  // Loop through each assignment element
  for (let assign of assignments) {
    // Get all elements with the class "gradingCriteria" within the assignment
    let scores = assign.querySelectorAll(".gradingCriteria");
    // Sum up the scores and count each criterion
    scores.forEach(score => {
      totalScore += parseInt(score.value);
      totalCriteria++;
    });
  }
  
  // If there are no grading criteria, return default values
  if (totalCriteria === 0) {
    return {
      percentage: "0.00",
      ranking: "Insufficient Evidence (IE)",
      letterGrade: "N/A"
    };
  }
  
  // Calculate average score and percentage (assuming a maximum score of 4)
  let averageScore = totalScore / totalCriteria;
  let percentage = (averageScore / 4) * 100;
  
  let ranking = "";
  let letterGrade = "";
  
  // Determine ranking and letter grade based on percentage
  if (percentage < 60) {
    ranking = "Emerging";
    letterGrade = "F";
  } else if (percentage < 73) {
    ranking = "Developing";
    letterGrade = "C";
  } else if (percentage < 89) {
    ranking = "Proficient";
    letterGrade = "B";
  } else {
    ranking = "Extending";
    letterGrade = "A";
  }
  
  return {
    percentage: percentage.toFixed(2),
    ranking,
    letterGrade
  };
}

/**
 * Adds a new formative assessment block to the formative assessments container.
 */
function addFormativeAssessment() {
  // Get the container element where formative assessments are added
  const formativeContainer = document.getElementById('formativeContainer');
  // Create a new div element for the formative assessment
  const newFormative = document.createElement('div');
  newFormative.classList.add('formative-assessment');
  
  // Set the inner HTML for the new formative assessment block
  newFormative.innerHTML = `
    <label for="formativeTitle">Title:</label>
    <input type="text" name="formativeTitle" required>
    
    <label for="formativeDescription">Description:</label>
    <textarea name="formativeDescription" rows="2" required></textarea>
    
    <button type="button" class="remove-formative" onclick="removeFormativeAssessment(this)">Remove</button>
  `;
  
  // Append the new formative assessment block to the container
  formativeContainer.appendChild(newFormative);
}

/**
 * Removes the formative assessment block that contains the clicked remove button.
 * @param {HTMLElement} button - The button element that was clicked.
 */
function removeFormativeAssessment(button) {
  // Remove the parent element (the formative assessment block)
  const formative = button.parentElement;
  formative.remove();
}
