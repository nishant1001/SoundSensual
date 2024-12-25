document.addEventListener("DOMContentLoaded", function() {
  // Get modal elements
  const mainContent = document.querySelector('.rows-container');
  const ageModal = document.getElementById('ageVerificationModal');
  const genderModal = document.getElementById('genderModal');
  let selectedAudioFolder = '';
  
  // Initially make content visible but not interactive
  mainContent.style.pointerEvents = 'none';

  // Initialize the visual elements immediately
  initializeVisuals();

  // Exit button handler
  document.getElementById('exitButton').addEventListener('click', function() {
    window.location.href = 'https://www.google.com';
  });

  // Age confirmation handler
  document.getElementById('confirmAgeButton').addEventListener('click', function() {
    ageModal.style.display = 'none'; // Hide age modal
    genderModal.style.display = 'flex'; // Show gender modal
    genderModal.classList.remove('hidden');
  });

  const getAudioFileCount = async (folderPath) => {
    try {
        const files = await fs.promises.readdir(folderPath);
        const audioFiles = files.filter(file => /^audio\(\d+\)\.mp3$/.test(file));
        return audioFiles.length;
    } catch (err) {
        console.error('Error reading directory:', err);
        return 0;
    }
  };

  // Gender selection handlers
  document.getElementById('maleButton').addEventListener('click', function() {
    selectedAudioFolder = 'male-audios';
    totalAudioFiles = 28;
    completeVerification();
  });

  document.getElementById('femaleButton').addEventListener('click', function() {
    selectedAudioFolder = 'female-audios'; 
    totalAudioFiles = 28;
    completeVerification();
  });

  function completeVerification() {
    genderModal.style.display = 'none';
    mainContent.style.pointerEvents = 'auto';
    mainContent.classList.add('verified');
    initializeAudio();
  }

  // Function to initialize visual elements
  function initializeVisuals() {
    const availableColors = ["lime", "deeppink", "deepskyblue", "hotpink", "lawngreen", "limegreen", 
                           "darkorchid", "aquamarine", "aqua", "greenyellow", "crimson", "mistyrose", 
                           "red", "green", "grey", "lightgreen", "lightyellow", "gold", "salmon", 
                           "indigo", "magenta", "teal", "darkred", "blue", "yellow", "orange", "pink", 
                           "pink", "cyan", "lightblue", "lavender", "skyblue", "violet", "turquoise"];
    
    const buttons = document.querySelectorAll('.button');
    const container = document.querySelector('.rows-container');
    const rows = document.querySelectorAll('.rows-container > div');
    const buttonWidth = rows[0].querySelector('.button').offsetWidth + 5;
    let isHovered = false;
    let speed = 1;

    // Assign random colors
    buttons.forEach(function(button) {
      const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];
      button.style.backgroundColor = randomColor;
    });

    // Set initial position
    container.style.transform = `translateX(${-buttonWidth}px)`;

    // Animation function
    function moveRows() {
      if(!isHovered){
        const currentPosition = container.getBoundingClientRect().left;

        rows.forEach(function(row) {
          if (currentPosition <= -buttonWidth - 5) {
            const firstButton = row.firstElementChild;
            row.appendChild(firstButton);
            container.style.transform = `translateX(0)`;
          }
          else {
            container.style.transform = `translateX(${currentPosition - speed}px)`;
          }
        });
      }
      requestAnimationFrame(moveRows);
    }

    moveRows();

    // Basic hover and touch state tracking
    rows.forEach(function(row) {
      const buttons = row.querySelectorAll('.button');
      buttons.forEach(function(button) {
        // Mouse events
        button.addEventListener('mouseenter', function() {
          isHovered = true;
        });
        button.addEventListener('mouseleave', function() {
          isHovered = false;
        });
        
        // Touch events
        button.addEventListener('touchstart', function(e) {
          e.preventDefault();
          isHovered = true;
        });
        button.addEventListener('touchend', function() {
          isHovered = false;
        });
      });
    });
  }

  // Function to initialize audio functionality
  function initializeAudio() {
    const audioPlayer = document.getElementById('audioPlayer');
    const buttons = document.querySelectorAll('.button');

    // Initialize audio context for mobile
    let audioContext;
    function initAudioContext() {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
    }

    function playRandomAudio() {
      const randomNumber = Math.floor(Math.random() *totalAudioFiles) + 1;
      const audioSrc = `${selectedAudioFolder}/audio(${randomNumber}).mp3`;
      audioPlayer.src = audioSrc;
      audioPlayer.play().catch(error => console.log('Audio playback error:', error));
    }

    function stopAudio() {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
    }

    // Add event listeners for both mouse and touch
    buttons.forEach(function(button) {
      // Mouse events
      button.addEventListener('mouseenter', playRandomAudio);
      button.addEventListener('mouseleave', stopAudio);

      // Touch events
      button.addEventListener('touchstart', function(e) {
        e.preventDefault();
        playRandomAudio();
      });
      button.addEventListener('touchend', function(e) {
        e.preventDefault();
        stopAudio();
      });
    });

    // Initialize audio context on first user interaction
    document.addEventListener('touchstart', function() {
      initAudioContext();
      // Try to play audio on first interaction
      audioPlayer.play().then(() => {
        audioPlayer.pause();
      }).catch(error => console.log('Audio initialization error:', error));
    }, { once: true });
  }

  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      const container = document.querySelector('.rows-container');
      const buttons = document.querySelectorAll('.button');
      const buttonWidth = buttons[0].offsetWidth + 5;
      container.style.transform = `translateX(${-buttonWidth}px)`;
    }, 250);
  });
});