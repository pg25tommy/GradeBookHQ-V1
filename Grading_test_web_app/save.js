// save.js

// Generates the file content from the current form values.
function generateFileContent() {
    let studentName = document.getElementById("studentName").value.trim().replace(/\s+/g, '_');
    let grade = document.getElementById("grade").value.trim();
    let term = document.getElementById("term").value.trim().replace(/\s+/g, '_');
    let block = document.getElementById("block").value.trim();
    let assignments = document.getElementsByClassName("assignment");
    let teacherNotes = document.getElementById("teacherNotes").value;

    // IEP information
    let iep = document.getElementById('iep').checked;
    let iepGoals = document.getElementById('iepGoals').value;
    let iepDesignation = document.getElementById('iepDesignation').value;

    let data = `Student Name: ${studentName}\nGrade: ${grade}\nTerm: ${term}\nBlock: ${block}\n\nAssignments:\n`;
    
    for (let assign of assignments) {
        let name = assign.querySelector(".assignmentName").value;
        data += `- ${name}\n`;
    }
    
    data += `\nTeacher Notes:\n${teacherNotes}\n`;

    // Include IEP information in the data
    if (iep) {
        data += `\nIEP: Yes\n`;
        data += `IEP Goals: ${iepGoals}\n`;
        data += `IEP Designation: ${iepDesignation}\n`;
    } else {
        data += `\nIEP: No\n`;
    }
    
    let formativeTextareas = document.getElementsByClassName("formative-assessment");
    if (formativeTextareas.length > 0) {
        data += `\nFormative Assessments:\n`;
        for (let ta of formativeTextareas) {
            let text = ta.querySelector("textarea").value;
            if (text.trim() !== "") {
                data += `- ${text}\n`;
            }
        }
    }
    
    let overall = calculateOverallGrade(assignments);
    data += `\nOverall Percentage: ${overall.percentage}%`;
    data += `\nRanking: ${overall.ranking}`;
    data += `\nLetter Grade: ${overall.letterGrade}\n`;
    
    return { data, studentName };
}

// Common function that updates local history, generates a PDF using jsPDF, downloads it, and clears the form.
function commonSaveAndDownload() {
    let studentName = document.getElementById("studentName").value.trim().replace(/\s+/g, '_');
    let grade = document.getElementById("grade").value.trim();
    let term = document.getElementById("term").value.trim().replace(/\s+/g, '_');
    let block = document.getElementById("block").value.trim();
    let assignments = document.getElementsByClassName("assignment");
    let currentUser = localStorage.getItem("currentUser");

    if (!studentName || !term || !grade || !block) {
        alert("Please enter the student's name, grade, term, and block.");
        return;
    }
    
    let history = JSON.parse(localStorage.getItem(`history_${currentUser}`)) || [];
    let firstAssignmentName = assignments.length > 0
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
    
    let { data, studentName: fileStudentName } = generateFileContent();
    
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
    
    let fileName = `${fileStudentName}_${firstAssignmentName}_Assignment.pdf`;
    doc.save(fileName);
    
    // Clear form fields
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

function saveFormData() {
    commonSaveAndDownload();
    const studentName = document.getElementById('studentName').value;
    const iep = document.getElementById('iep').checked;
    const iepGoals = document.getElementById('iepGoals').value;
    const iepDesignation = document.getElementById('iepDesignation').value;
    const grade = document.getElementById('grade').value;
    const term = document.getElementById('term').value;
    const block = document.getElementById('block').value;
    const teacherNotes = document.getElementById('teacherNotes').value;

    const formData = {
        studentName,
        iep,
        iepGoals,
        iepDesignation,
        grade,
        term,
        block,
        teacherNotes
    };

    localStorage.setItem('formData', JSON.stringify(formData));
    // Removed alert message
}

function downloadFile() {
    commonSaveAndDownload();
}

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
        // Default to "No" for IEP
        document.getElementById('iep').checked = false;
        document.getElementById('iepGoals').value = "";
        document.getElementById('iepDesignation').value = "";
        toggleIEP();
    }
}

// Load form data when the page loads
window.onload = loadFormData;

