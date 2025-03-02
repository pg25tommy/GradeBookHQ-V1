// save.js

// Generates the file content from the current form values.
function generateFileContent() {
  const studentName = getTrimmedValue("studentName").replace(/\s+/g, '_');
  const grade = getTrimmedValue("grade");
  const term = getTrimmedValue("term").replace(/\s+/g, '_');
  const block = getTrimmedValue("block");
  const assignments = document.getElementsByClassName("assignment");
  const teacherNotes = getTrimmedValue("teacherNotes");

  const iep = document.getElementById('iep').checked;
  const iepGoals = getTrimmedValue('iepGoals');
  const iepDesignation = getTrimmedValue('iepDesignation');

  let data = `Student Name: ${studentName}\nGrade: ${grade}\nTerm: ${term}\nBlock: ${block}\n\nAssignments:\n`;

  for (const assign of assignments) {
    const name = assign.querySelector(".assignmentName").value;
    data += `- ${name}\n`;
  }

  data += `\nTeacher Notes:\n${teacherNotes}\n`;

  if (iep) {
    data += `\nIEP: Yes\nIEP Goals: ${iepGoals}\nIEP Designation: ${iepDesignation}\n`;
  } else {
    data += `\nIEP: No\n`;
  }

  const formativeTextareas = document.getElementsByClassName("formative-assessment");
  if (formativeTextareas.length > 0) {
    data += `\nFormative Assessments:\n`;
    for (const ta of formativeTextareas) {
      const text = ta.querySelector("textarea").value;
      if (text.trim() !== "") {
        data += `- ${text}\n`;
      }
    }
  }

  const overall = calculateOverallGrade(assignments);
  data += `\nOverall Percentage: ${overall.percentage}%\nRanking: ${overall.ranking}\nLetter Grade: ${overall.letterGrade}\n`;

  return { data, studentName };
}

// Common function that updates local history, generates a PDF using jsPDF, downloads it, and clears the form.
function commonSaveAndDownload() {
  const studentName = getTrimmedValue("studentName").replace(/\s+/g, '_');
  const grade = getTrimmedValue("grade");
  const term = getTrimmedValue("term").replace(/\s+/g, '_');
  const block = getTrimmedValue("block");
  const assignments = document.getElementsByClassName("assignment");
  const currentUser = localStorage.getItem("currentUser");

  if (!studentName || !term || !grade || !block) {
    alert("Please enter the student's name, grade, term, and block.");
    return;
  }

  const history = JSON.parse(localStorage.getItem(`history_${currentUser}`)) || [];
  const firstAssignmentName = assignments.length > 0
    ? assignments[0].querySelector(".assignmentName").value.trim().replace(/\s+/g, '_')
    : "No_Assignment";

  history.push({
    studentName,
    grade,
    term,
    block,
    firstAssignmentName,
    date: new Date().toLocaleString()
  });

  localStorage.setItem(`history_${currentUser}`, JSON.stringify(history));
  displayHistory();

  const { data, studentName: fileStudentName } = generateFileContent();

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4'
  });

  doc.setFontSize(18);
  doc.text(`Grading Report for ${fileStudentName}`, 40, 40);

  doc.setFontSize(12);
  const lines = doc.splitTextToSize(data, 500);
  doc.text(lines, 40, 70);

  const fileName = `${fileStudentName}_${firstAssignmentName}_Assignment.pdf`;
  doc.save(fileName);

  clearFormFields();
}

// Helper function to get trimmed value of an element by ID
function getTrimmedValue(id) {
  return document.getElementById(id).value.trim();
}

// Clears the form fields
function clearFormFields() {
  document.getElementById("studentName").value = "";
  document.getElementById("iep").checked = false;
  document.getElementById("iepGoals").value = "";
  document.getElementById("iepDesignation").value = "";
  document.getElementById("grade").value = "";
  document.getElementById("term").value = "";
  document.getElementById("block").value = "";
  document.getElementById("teacherNotes").value = "";
  document.getElementById("assignments").innerHTML = "<h3>Assignments</h3>";
  document.getElementById("formativeContainer").innerHTML = "";
}

// Save form data to localStorage
function saveFormData() {
  commonSaveAndDownload();
  const formData = {
    studentName: getTrimmedValue('studentName'),
    iep: document.getElementById('iep').checked,
    iepGoals: getTrimmedValue('iepGoals'),
    iepDesignation: getTrimmedValue('iepDesignation'),
    grade: getTrimmedValue('grade'),
    term: getTrimmedValue('term'),
    block: getTrimmedValue('block'),
    teacherNotes: getTrimmedValue('teacherNotes')
  };

  localStorage.setItem('formData', JSON.stringify(formData));
}

// Load form data from localStorage
function loadFormData() {
  const formData = JSON.parse(localStorage.getItem('formData'));

  if (formData) {
    document.getElementById('studentName').value = formData.studentName;
    document.getElementById('iep').checked = formData.iep;
    document.getElementById('iepGoals').value = formData.iepGoals;
    document.getElementById('iepDesignation').value = formData.iepDesignation;
    document.getElementById('grade').value = formData.grade;
    document.getElementById('term').value = formData.term;
    document.getElementById('block').value = formData.block;
    document.getElementById('teacherNotes').value = formData.teacherNotes;

    toggleIEP();
  } else {
    document.getElementById('iep').checked = false;
    document.getElementById('iepGoals').value = "";
    document.getElementById('iepDesignation').value = "";
    toggleIEP();
  }
}

// Load form data when the page loads
window.onload = loadFormData;

