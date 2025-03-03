/**
 * Calculates the overall grade based on individual grading criteria.
 * For each grading criterion (each input with class "gradingCriteria"),
 * it computes a grade based solely on that single score (assuming a max score of 4):
 *   - <60%: "Developing"
 *   - 60% to <73%: "Emerging"
 *   - 73% to <89%: "Proficient"
 *   - 89% to 100%: "Extending"
 * It counts each grade and returns the most frequently occurring one.
 * In the event of a 4-way tie, it uses the overall percentage to determine the grade.
 * Also computes the overall percentage (averaged over all criteria) for reference.
 * If the ELL toggle is enabled, it adjusts the grading scale accordingly.
 *
 * @param {NodeList} assignments - A collection of assignment elements.
 * @param {boolean} isELL - Indicates if the ELL toggle is enabled.
 * @returns {Object} - An object containing the overall percentage and the final grade.
 */
function calculateOverallGrade(assignments, isELL) {
  const gradeCounts = {
    "Developing": 0,
    "Emerging": 0,
    "Proficient": 0,
    "Extending": 0
  };

  let totalScore = 0;
  let totalCriteria = 0;

  // Loop through each assignment element and each grading criterion within it
  for (const assign of assignments) {
    const criteria = assign.querySelectorAll(".gradingCriteria");
    criteria.forEach(crit => {
      const scoreValue = parseInt(crit.value, 10);
      if (!isNaN(scoreValue)) {
        totalCriteria++;
        totalScore += scoreValue;
        const percentage = (scoreValue / 4) * 100;
        let grade = "";
        if (isELL) {
          if (percentage < 50) {
            grade = "Developing";
          } else if (percentage < 65) {
            grade = "Emerging";
          } else if (percentage < 80) {
            grade = "Proficient";
          } else {
            grade = "Extending";
          }
        } else {
          if (percentage < 60) {
            grade = "Developing";
          } else if (percentage < 73) {
            grade = "Emerging";
          } else if (percentage < 89) {
            grade = "Proficient";
          } else {
            grade = "Extending";
          }
        }
        gradeCounts[grade] = (gradeCounts[grade] || 0) + 1;
      }
    });
  }

  let overallPercentage = 0;
  if (totalCriteria > 0) {
    overallPercentage = (totalScore / (totalCriteria * 4)) * 100;
  }

  // Determine the most frequently occurring grade
  let maxCount = 0;
  for (const grade in gradeCounts) {
    if (gradeCounts[grade] > maxCount) {
      maxCount = gradeCounts[grade];
    }
  }
  
  // Get all grades that have the max count
  const tiedGrades = [];
  for (const grade in gradeCounts) {
    if (gradeCounts[grade] === maxCount) {
      tiedGrades.push(grade);
    }
  }

  let finalGrade;
  // If all four grades are tied, use overallPercentage to determine grade
  if (tiedGrades.length === 4) {
    if (overallPercentage < 60) {
      finalGrade = "Developing";
    } else if (overallPercentage < 73) {
      finalGrade = "Emerging";
    } else if (overallPercentage < 89) {
      finalGrade = "Proficient";
    } else {
      finalGrade = "Extending";
    }
  } else {
    // Otherwise, choose the grade with max frequency (ties resolved by order of iteration)
    finalGrade = tiedGrades[0];
  }

  return {
    percentage: overallPercentage,
    grade: finalGrade
  };
}
