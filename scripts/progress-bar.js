// Progress bar functionality
document.addEventListener('DOMContentLoaded', function() {
  const progressBar = document.getElementById('progress-bar');
  const progressContainer = document.getElementById('progress-container');
  
  // Calculate scroll progress
  function updateProgressBar() {
    // Calculate how far down the page the user has scrolled
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    
    // Calculate the percentage scrolled
    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
    
    // Update the width of the progress bar
    progressBar.style.width = scrollPercentage + '%';
    
    // Make the progress bar visible only when scrolling has started
    if (scrollTop > 50) {
      progressContainer.style.opacity = '1';
    } else {
      progressContainer.style.opacity = '0.7';
    }
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', updateProgressBar);
  
  // Initialize progress bar
  updateProgressBar();
});
