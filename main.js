document.addEventListener(
  'DOMContentLoaded',
  function () {
    function saveCheckboxStatus() {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      const checkboxStatus = {};
      var completed = 0;
      checkboxes.forEach(
        checkbox => {
          checkboxStatus[checkbox.id] = checkbox.checked;
          const parentElement = checkbox.parentElement;
          if (
            parentElement.classList.contains('gives-percent') &&
            checkbox.checked
          ) {
            completed++
          }
        }
      );
      updateCompletionOverview(completed);
      localStorage.setItem('checkboxStatus', JSON.stringify(checkboxStatus))
    }
    function loadCheckboxStatus() {
      const checkboxStatus = JSON.parse(localStorage.getItem('checkboxStatus')) ||
      {
      };
      var completed = 0;
      for (const id in checkboxStatus) {
        const checkbox = document.getElementById(id);
        if (checkbox) {
          checkbox.checked = checkboxStatus[id];
          const parentElement = checkbox.parentElement;
          if (
            parentElement.classList.contains('gives-percent') &&
            checkbox.checked
          ) {
            completed++
          }
        }
      }
      updateCompletionOverview(completed)
    }
    function updateCompletionOverview(completed) {
      document.getElementById('num_completed').innerText = completed;
      document.getElementById('num_completed_nav').innerText = completed;
    }
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(
      checkbox => {
        checkbox.addEventListener('change', saveCheckboxStatus)
      }
    );
    loadCheckboxStatus()
  }
);