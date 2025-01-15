// script.js
function openPopup(title) {
  document.getElementById('popup-title').innerText = title;
  document.getElementById('popup-subtitle').innerText = "Masukan range ayat yang akan dihafal";

  document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}
