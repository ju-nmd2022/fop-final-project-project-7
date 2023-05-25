const startButton2 = document.getElementById('restartbutton');
const catContainer2 = document.getElementById('catcontainer2');

startButton2.addEventListener('mouseenter', () => {
  catContainer2.style.display = 'block';
});

startButton2.addEventListener('mouseleave', () => {
  catContainer2.style.display = 'none';
});