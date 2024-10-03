document.addEventListener(
  'DOMContentLoaded',
  function () {
    function saveCheckboxStatus() {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      const checkboxStatus = {};
      var pct_inc = 0.534759358;
      var pct = 0;
      var completed = 0;
      checkboxes.forEach(
        checkbox => {
          checkboxStatus[checkbox.id] = checkbox.checked;
          const parentElement = checkbox.parentElement;
          if (
            parentElement.classList.contains('gives-percent') &&
            checkbox.checked
          ) {
            pct += pct_inc;
            completed++
          }
        }
      );
      // var message_title = 'Checklist Saved';
      // var message = pct.toFixed(2) + '% Complete';
      // showToast(message_title, message);
      updateCompletionOverview(pct, completed);
      localStorage.setItem('checkboxStatus', JSON.stringify(checkboxStatus))
    }
    function loadCheckboxStatus() {
      const checkboxStatus = JSON.parse(localStorage.getItem('checkboxStatus')) ||
      {
      };
      var pct_inc = 0.534759358;
      var pct = 0;
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
            pct += pct_inc;
            completed++
          }
        }
      }
      updateCompletionOverview(pct, completed)
    }
    // function showToast(header, message) {
    //   const toast = document.getElementById('toast');
    //   const toast_title = document.getElementById('toast_title');
    //   const toast_body = document.getElementById('toast_body');
    //   toast_title.innerText = header;
    //   toast_body.innerText = message;
    //   const existingBsToast = bootstrap.Toast.getInstance(toast);
    //   if (existingBsToast) {
    //     existingBsToast.dispose()
    //   }
    //   const bsToast = new bootstrap.Toast(toast, {
    //     delay: 5000
    //   });
    //   bsToast.show()
    // }
    function updateCompletionOverview(pct, completed) {
      var pct_fixed = pct.toFixed(2);
      document.getElementById('completion_overview_percent_nav_min').innerText = pct_fixed + '%';
      document.getElementById('completion_overview_percent_nav').innerText = pct_fixed + '%';
      document.getElementById('completion_overview_percent').innerText = pct_fixed + '%';
      // document.getElementById('completion_progress_bar').style.width = pct_fixed + '%';
      // document.getElementById('completion_progress_bar').style.width = pct_fixed + '%';
      document.getElementById('num_completed_nav_min').innerText = completed
      document.getElementById('num_completed_nav').innerText = completed
      document.getElementById('num_completed').innerText = completed
    }
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(
      checkbox => {
        checkbox.addEventListener('change', saveCheckboxStatus)
      }
    );
    // var checkAllGroups = document.querySelectorAll('.check-all-group');
    // checkAllGroups.forEach(
    //   function (group) {
    //     var checkAllLink = group.querySelector('.check-all');
    //     var uncheckAllLink = group.querySelector('.uncheck-all');
    //     checkAllLink.addEventListener(
    //       'click',
    //       function (event) {
    //         event.preventDefault();
    //         checkAll(group);
    //         saveCheckboxStatus()
    //       }
    //     );
    //     uncheckAllLink.addEventListener(
    //       'click',
    //       function (event) {
    //         event.preventDefault();
    //         uncheckAll(group);
    //         saveCheckboxStatus()
    //       }
    //     )
    //   }
    // );
    // function checkAll(group) {
    //   var checkboxes = group.querySelectorAll('.form-check-input');
    //   checkboxes.forEach(function (checkbox) {
    //     checkbox.checked = true
    //   })
    // }
    // function uncheckAll(group) {
    //   var checkboxes = group.querySelectorAll('.form-check-input');
    //   checkboxes.forEach(function (checkbox) {
    //     checkbox.checked = false
    //   })
    // }
    loadCheckboxStatus()
  }
);