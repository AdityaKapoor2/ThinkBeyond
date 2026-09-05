document.addEventListener('DOMContentLoaded', () => {
  const splashVideo = document.getElementById('splash-video');
  const progressFill = document.getElementById('splash-progress-fill');
  const skipBtn = document.getElementById('skip-btn');

  // Play the video
  splashVideo.play().catch(() => { });

  // Update progress bar
  splashVideo.addEventListener('timeupdate', () => {
    if (splashVideo.duration) {
      const progress = (splashVideo.currentTime / splashVideo.duration) * 100;
      progressFill.style.width = progress + '%';
    }
  });
  //skip button with no delay
  skipBtn.classList.add('visible');

  // Skip button — for now just pauses video (you can add redirect later)
  skipBtn.addEventListener('click', () => {
    splashVideo.pause();
    // TODO: navigate to next page when ready
  });

  // Video ended
  splashVideo.addEventListener('ended', () => {
    progressFill.style.width = '100%';
    // TODO: navigate to next page when ready
  });
});
