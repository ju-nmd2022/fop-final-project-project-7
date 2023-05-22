const startButton = document.getElementById('startbutton');
const catContainer = document.getElementById('catcontainer');

startButton.addEventListener('mouseenter', () => {
  catContainer.style.display = 'block';
});

startButton.addEventListener('mouseleave', () => {
  catContainer.style.display = 'none';
});
