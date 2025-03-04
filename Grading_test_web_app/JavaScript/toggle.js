// function to toggle the IEP goals container based on the IEP checkbox
function toggleIEP() {
    const iepCheckbox = document.getElementById('iep');
    const iepGoalsContainer = document.getElementById('iepGoalsContainer');
    iepGoalsContainer.classList.toggle('hidden', !iepCheckbox.checked);
}