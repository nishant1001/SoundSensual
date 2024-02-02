document.addEventListener("DOMContentLoaded", function() {
  // To add colors to the buttons automatically
  const availableColors = ["lime", "deeppink", "deepskyblue", "hotpink", "lawngreen", "limegreen", "darkorchid", "aquamarine", "aqua", "greenyellow", "crimson", "mistyrose", "red", "green", "grey", "lightgreen", "lightyellow", "gold", "salmon", "indigo", "magenta", "teal", "darkred", "blue", "yellow", "orange", "pink", "pink", "cyan", "lightblue", "lavender", "skyblue", "violet", "turquoise"];
  const buttons = document.querySelectorAll('.button');

  // Iterate through each button and assign a random color
  buttons.forEach(function(button) {
    const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];
    button.style.backgroundColor = randomColor;
  });


  //To move the rown in the left direction
  const container = document.querySelector('.rows-container');
  const rows = document.querySelectorAll('.rows-container > div');
  const buttonWidth = rows[0].querySelector('.button').offsetWidth + 5; // Width of a button including margin
  let isHovered = false; 
  let speed=1;

  // Setting the initial position of the container
  container.style.transform = `translateX(${-buttonWidth}px)`;

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

  // Event listeners to track mouse enter and leave
  rows.forEach(function(row) {
    const buttons = row.querySelectorAll('.button');
    buttons.forEach(function(button) {
      button.addEventListener('mouseenter', function() {
        isHovered = true;
      });
      button.addEventListener('mouseleave', function() {
        isHovered = false;
      });
    });
  });


  const audioPlayer = document.getElementById('audioPlayer');

  function playRandomAudio() {
    const randomNumber = Math.floor(Math.random() * 28) + 1; // Assuming you have 44 audio files
    const audioSrc = `audios/audio(${randomNumber}).mp3`;
    
    audioPlayer.src = audioSrc;
    audioPlayer.play();
  }

  rows.forEach(function(row) {
    buttons.forEach(function(button) {
      button.addEventListener('mouseenter', playRandomAudio);
      button.addEventListener('mouseleave', function() {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      });
    });
  });
  });
  
