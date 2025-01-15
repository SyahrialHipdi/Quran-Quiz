// script.js
function openPopup(title, subtitle, arabic, ayahCount) {
    document.getElementById('popup-title').innerText = title;
    document.getElementById('popup-subtitle').innerText = "Masukan range ayat yang akan dihafal";
    document.getElementById('popup-arabic').innerText = arabic;
    document.getElementById('popup-ayah-count').innerText = ayahCount;
  
    document.getElementById('popup').style.display = 'flex';
  }
  
  function closePopup() {
    document.getElementById('popup').style.display = 'none';
  }
  
