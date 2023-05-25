const startButton1 = document.getElementById('restartbutton');
const catContainer1 = document.getElementById('catcontainer1');

startButton1.addEventListener('mouseenter', () => {
  catContainer1.style.display = 'block';
});

startButton1.addEventListener('mouseleave', () => {
  catContainer1.style.display = 'none';
});