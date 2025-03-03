
document.addEventListener('DOMContentLoaded', (event) => {
  const ellToggle = document.getElementById('ellToggle');
  ellToggle.addEventListener('change', (event) => {
    const isELL = event.target.checked;
    const assignments = document.querySelectorAll('.assignment');
    const result = calculateOverallGrade(assignments, isELL);
    document.getElementById('overallPercentage').textContent = result.percentage.toFixed(2) + '%';
    document.getElementById('finalGrade').textContent = result.grade;
  });
});
