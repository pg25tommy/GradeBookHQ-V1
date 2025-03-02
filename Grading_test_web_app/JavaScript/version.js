// version.js

const appVersion = "Version 1.1.1";

// Dynamically sets the version text on elements with .app-version
function setVersion() {
  const versionElements = document.querySelectorAll(".app-version");
  versionElements.forEach(element => {
    element.textContent = appVersion;
  });
}

// Run once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", setVersion);
