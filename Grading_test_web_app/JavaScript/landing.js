// The paragraph text to animate in a typewriter style
const textContent = `I've known several teachers who take their work home, spending countless hours grading assignments with little to no streamlined systems in place to help. Watching them struggle with inefficient processes made me realize how much time and energy they lose—time that could be better spent on their students or their own well-being.

That’s when I started thinking about building this app. I wanted to create something that simplifies grading, making it faster and more organized while still aligning with the BC Canada grading scale. The goal is to provide an intuitive tool where teachers can easily input student names, track assignments across terms, and apply grading criteria efficiently—all while storing their data in a simple, accessible format.`;

const typewriter = document.getElementById("typewriter");
typewriter.innerHTML = "";

// Wrap each character of the text in a span for individual animation
const letters = Array.from(textContent).map(char => {
  const span = document.createElement("span");
  span.className = "letter";
  span.textContent = char;
  span.style.opacity = 0; // start hidden
  typewriter.appendChild(span);
  return span;
});

// Create the blinking cursor element
const cursor = document.createElement("span");
cursor.className = "cursor";
typewriter.appendChild(cursor);

// Define the delay per character (in milliseconds)
const delay = 50;

// Function to reveal letters one by one and reposition the cursor after each letter
function typeLetter(index) {
  if (index < letters.length) {
    letters[index].style.opacity = 1;
    // Remove and re-append the cursor so it always follows the last visible letter
    typewriter.removeChild(cursor);
    typewriter.appendChild(cursor);
    setTimeout(() => typeLetter(index + 1), delay);
  }
}

// Start the typewriter effect after a short delay
setTimeout(() => typeLetter(0), 500);

// Add click event for the ENTER button
document.addEventListener("DOMContentLoaded", () => {
  const enterButton = document.getElementById("enterButton");

  enterButton.addEventListener("click", () => {
    window.location.href = "login.html";
  });
});
