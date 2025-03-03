
<h1> GradeBookHQ </h1>
<p>
  This is a simple <strong>web application</strong> for teachers to log in, grade assignments based on multiple criteria, download
  those grades as a PDF file, and keep a simple history of saved assignments in <em>localStorage</em>.
</p>

<hr />

<h2>Features</h2>
<ul>
  <li><strong>Login system</strong> with local <code>users.json</code> file.</li>
  <li><strong>Multi-criteria Grading</strong>: Understanding, Application, Communication, Critical Thinking.</li>
  <li><strong>Downloads a .txt file</strong> for each student’s final grade.</li>
  <li><strong>Local History Tracking</strong> for each user, stored in the browser’s <code>localStorage</code>.</li>
  <li><strong>Calendar Integration</strong> for tracking important dates and assignments.</li>
</ul>

<hr />

<h2>Installation</h2>
<ol>
  <li>Clone or download this repository.</li>
  <li>Make sure you have a local server or place these files where they can be served.</li>
  <li>Keep <code>index.html</code>, <code>grading.html</code>, <code>script.js</code>, <code>styles.css</code>, and <code>users.json</code> in the same folder.</li>
</ol>

<hr />

<h2>Usage</h2>

<h3>Login</h3>
<ol>
  <li>Open <code>index.html</code> (e.g., <code>http://localhost/index.html</code>).</li>
  <li>Enter a <strong>username</strong> and <strong>password</strong> that exist in <code>users.json</code>.</li>
  <li>Click <strong>Login</strong>. You’ll be taken to <code>grading.html</code> on success.</li>
</ol>

<h3>Grading</h3>
<ol>
  <li>In <code>grading.html</code>, click <strong>Add Assignment</strong> to add new assignment blocks.</li>
  <li>Fill out each block (assignment name, criteria scores).</li>
  <li>Enter a <strong>Student Name</strong> and <strong>Term</strong>, plus any <strong>Teacher Notes</strong>.</li>
  <li>Click <strong>Save &amp; Download</strong> to:
    <ul>
      <li><strong>Download a text file</strong> with the assignment details.</li>
      <li><strong>Update the grading history</strong> for the current user.</li>
    </ul>
  </li>
</ol>

<h3>Calendar</h3>
<ul>
  <li>In <code>grading.html</code>, the calendar section allows you to track important dates and assignments.</li>
  <li>Use the FullCalendar integration to add, edit, and view events.</li>
</ul>

<h3>History</h3>
<ul>
  <li>The right-hand panel (or wherever <code>#history</code> is placed) shows <strong>Saved Assignments</strong> for the current user.</li>
  <li>Click <strong>Clear History</strong> (if available) to remove all saved assignments from localStorage.</li>
</ul>

<h3>Logout</h3>
<ul>
  <li>Click <strong>Logout</strong> to remove the session from localStorage and return to <code>index.html</code>.</li>
</ul>

<hr />

<h2>File Structure</h2>
<pre>
Student-Grading-App/
├─ index.html       (Login Screen)
├─ grading.html     (Main Grading Interface)
├─ JavaScript/      (JavaScript Logic)
│  ├─ calendar.js
│  ├─ grading.js
│  ├─ save.js
│  ├─ auth.js
│  ├─ greeting.js
│  ├─ history.js
│  ├─ assignments.js
│  ├─ version.js
│  └─ toggle.js
├─ Styles/          (CSS Styling)
│  ├─ common.css
│  └─ grading.css
├─ users.json       (Local Username/Password Store)
</pre>

<hr />

<h2>Technical Explanation</h2>
<ul>
  <li><strong>Local Authentication</strong>: <code>login()</code> fetches <code>users.json</code> and checks credentials. Stores <code>authenticated</code> and <code>currentUser</code> in localStorage.</li>
  <li><strong>Guarding grading.html</strong>: If <code>authenticated</code> != <code>true</code>, user is redirected to <code>index.html</code>.</li>
  <li><strong>Grading</strong>: <code>addAssignment()</code> appends new blocks. <code>saveToFile()</code> calculates assignment averages and an overall ranking, then triggers a file download.</li>
  <li><strong>Calendar</strong>: FullCalendar integration allows adding, editing, and viewing events within the application.</li>
  <li><strong>History</strong>: For each user, we track previous saves in <code>localStorage</code> as <code>history_username</code>. <code>displayHistory()</code> shows them. <code>clearHistory()</code> removes them.</li>
  <li><strong>Versioning</strong>: <code>appVersion</code> is displayed on pages via the <code>.app-version</code> elements.</li>
</ul>

<hr />

<h2>Future Improvements</h2>
<ul>
  <li><strong>Real-Time Preview</strong> of grades without refreshing.</li>
  <li>Improved <strong>UI/UX</strong>, including responsive design and theming.</li>
  <li><strong>Database/Server Integration</strong> for multi-teacher collaboration and persistent storage.</li>
  <li>Export grades to <strong>PDF</strong> or integrate with school systems.</li>
</ul>

<hr />

<h2>License</h2>
<p>
  <strong>MIT License</strong>: You are free to use, modify, and distribute this project as needed for educational purposes.
</p>
