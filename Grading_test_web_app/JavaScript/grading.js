/**
 * Calculates the overall grade based on individual grading criteria.
 * For each grading criterion (each input with class "gradingCriteria"),
 * it computes a grade based solely on that single score (assuming a max score of 4):
 *   - <60%: "Developing"
 *   - 60% to <73%: "Emerging"
 *   - 73% to <89%: "Proficient"
 *   - 89% to 100%: "Extending"
 * It counts each grade and returns the most frequently occurring one.
 * Also computes the overall percentage (averaged over all criteria) for reference.
 *
 * @param {NodeList} assignments - A collection of assignment elements.
 * @returns {Object} - An object containing the overall percentage and the most frequent grade.
 */
function calculateOverallGrade(assignments) {
  const gradeCounts = {
    "Developing": 0,
    "Emerging": 0,
    "Proficient": 0,
    "Extending": 0
  };

  let totalScore = 0;
  let totalCriteria = 0;

  // Loop through each assignment element and each criterion within it
  for (const assign of assignments) {
    const criteria = assign.querySelectorAll(".gradingCriteria");
    criteria.forEach(crit => {
      const scoreValue = parseInt(crit.value, 10);
      if (!isNaN(scoreValue)) {
        totalCriteria++;
        totalScore += scoreValue;
        const percentage = (scoreValue / 4) * 100;
        let grade = "";
        if (percentage < 60) {
          grade = "Developing";
        } else if (percentage < 73) {
          grade = "Emerging";
        } else if (percentage < 89) {
          grade = "Proficient";
        } else {
          grade = "Extending";
        }
        gradeCounts[grade] = (gradeCounts[grade] || 0) + 1;
      }
    });
  }

  let overallPercentage = 0;
  if (totalCriteria > 0) {
    overallPercentage = (totalScore / (totalCriteria * 4)) * 100;
  }

  let mostFrequentGrade = "N/A";
  let maxCount = 0;
  for (const grade in gradeCounts) {
    if (gradeCounts[grade] > maxCount) {
      maxCount = gradeCounts[grade];
      mostFrequentGrade = grade;
    }
  }

  return {
    percentage: overallPercentage,
    grade: mostFrequentGrade
  };
}
