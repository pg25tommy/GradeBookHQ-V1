// Function to generate the file content
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

    const ell = document.getElementById('ell').checked;
    const ellSupport = getTrimmedValue('ellSupport');
  
    let data = `Student Name: ${studentName}\nGrade: ${grade}\nTerm: ${term}\nBlock: ${block}\n\nAssignments:\n`;
  
    // Default categories if placeholder is not provided (assuming exactly 4 criteria)
    const defaultCategories = ["Understanding", "Communication", "Critical Thinking", "Application"];
  
    // Loop through each assignment
    for (const assign of assignments) {
      const assignName = assign.querySelector(".assignmentName").value;
      data += `- ${assignName}\n`;
  
      // Get all grading criteria inputs for this assignment
      const criteriaInputs = assign.querySelectorAll(".gradingCriteria");
      criteriaInputs.forEach((crit, index) => {
        let categoryName = crit.getAttribute("placeholder");
        if (!categoryName || categoryName.trim() === "") {
          if (criteriaInputs.length === 4) {
            categoryName = defaultCategories[index];
          } else {
            categoryName = "Graded Category";
          }
        }
        const scoreValue = parseInt(crit.value, 10);
        let categoryGrade = "N/A";
        
        if (!isNaN(scoreValue)) {
          const percentage = (scoreValue / 4) * 100;
          if (percentage < 60) {
            categoryGrade = "Developing";
          } else if (percentage < 73) {
            categoryGrade = "Emerging";
          } else if (percentage < 89) {
            categoryGrade = "Proficient";
          } else {
            categoryGrade = "Extending";
          }
        }
        data += `    ${categoryName}: ${categoryGrade}\n`;
      });
    }
  
    data += `\nTeacher Notes:\n${teacherNotes}\n`;
  
    if (iep) {
      data += `\nIEP: Yes\nIEP Goals: ${iepGoals}\nIEP Designation: ${iepDesignation}\n`;
    } else {
      data += `\nIEP: No\n`;
    }

    if (ell) {
      data += `\nELL: Yes\nELL Support: ${ellSupport}\n`;
    } else {
      data += `\nELL: No\n`;
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
  
    const reportCardItems = document.getElementsByClassName("report-card-item");
    if (reportCardItems.length > 0) {
      data += `\nReport Card Necessities:\n`;
      for (const item of reportCardItems) {
        const classification = item.querySelector("textarea").placeholder;
        const text = item.querySelector("textarea").value;
        if (text.trim() !== "") {
          data += `- ${classification}: ${text}\n`;
        }
      }
    }
  
    // Get overall grade details (using the most frequent grade computed)
    const overall = calculateOverallGrade(assignments);
    data += `\nGrade: ${overall.grade}\n`;
  
    return { data, studentName };
  }
  
  // Function to download the file using jsPDF
  function downloadFile() {
    try {
      const { data, studentName: fileStudentName } = generateFileContent();
  
      // Ensure jsPDF is available
      if (!window.jspdf || !window.jspdf.jsPDF) {
        console.error("jsPDF is not available. Please include the jsPDF library.");
        return;
      }
  
      const doc = new window.jspdf.jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
      });
  
      doc.setFontSize(18);
      doc.text(`Grading Report for ${fileStudentName}`, 40, 40);
  
      doc.setFontSize(12);
      const lines = doc.splitTextToSize(data, 500);
      doc.text(lines, 40, 70);
  
      const fileName = `${fileStudentName}_Grading_Report.pdf`;
      doc.save(fileName);
    } catch (error) {
      console.error("Error during PDF generation: ", error);
    }
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
    document.getElementById("reportCardContainer").innerHTML = "";
    document.getElementById("addAreaOfStrengthBtn").disabled = false;
    document.getElementById("addNeedForImprovementBtn").disabled = false;
    document.getElementById("addHowToImproveBtn").disabled = false;
  }
  
  // Save form data to localStorage, update history, download the file, and clear the form
  function saveFormData() {
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
  
    const currentUser = localStorage.getItem("currentUser");
    const history = JSON.parse(localStorage.getItem(`history_${currentUser}`)) || [];
    const firstAssignmentName = document.querySelector(".assignmentName")
      ? document.querySelector(".assignmentName").value
      : "No Assignment";
  
    history.push({
      studentName: formData.studentName,
      grade: formData.grade,
      term: formData.term,
      block: formData.block,
      firstAssignmentName,
      date: new Date().toLocaleString()
    });
  
    localStorage.setItem(`history_${currentUser}`, JSON.stringify(history));
    displayHistory();
  
    downloadFile();
    clearFormFields();
  }
  
  // Load form data from localStorage when the page loads
  function loadFormData() {
    // Clear local storage
    localStorage.removeItem('formData');

    // Clear form fields
    document.getElementById('studentName').value = '';
    document.getElementById('iep').checked = false;
    document.getElementById('iepGoals').value = '';
    document.getElementById('iepDesignation').value = '';
    document.getElementById('ell').checked = false;
    document.getElementById('ellSupport').value = '';
    document.getElementById('grade').value = '';
    document.getElementById('term').value = '';
    document.getElementById('block').value = '';
    document.getElementById('teacherNotes').value = '';
    toggleIEP();
    toggleELL();
  }
  
  // Attach loadFormData to window onload event
  window.onload = loadFormData;
  
  // Functions to add text boxes for Report Card Necessities
  function addAreaOfStrength() {
    const container = document.getElementById("reportCardContainer");
    const div = document.createElement("div");
    div.className = "report-card-item";
    const textarea = document.createElement("textarea");
    textarea.placeholder = "Area of Strength";
    div.appendChild(textarea);
    container.appendChild(div);
    document.getElementById("addAreaOfStrengthBtn").disabled = true;
    document.getElementById("addAreaOfStrengthBtn").classList.add("disabled");
  }
  
  function addNeedForImprovement() {
    const container = document.getElementById("reportCardContainer");
    const div = document.createElement("div");
    div.className = "report-card-item";
    const textarea = document.createElement("textarea");
    textarea.placeholder = "Need for Improvement";
    div.appendChild(textarea);
    container.appendChild(div);
    document.getElementById("addNeedForImprovementBtn").disabled = true;
    document.getElementById("addNeedForImprovementBtn").classList.add("disabled");
  }
  
  function addHowToImprove() {
    const container = document.getElementById("reportCardContainer");
    const div = document.createElement("div");
    div.className = "report-card-item";
    const textarea = document.createElement("textarea");
    textarea.placeholder = "How to Improve";
    div.appendChild(textarea);
    container.appendChild(div);
    document.getElementById("addHowToImproveBtn").disabled = true;
    document.getElementById("addHowToImproveBtn").classList.add("disabled");
  }
