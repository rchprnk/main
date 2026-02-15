let countdown = 180;

// Оновлення таймера
function updateTimer() {
  const timerElement = document.getElementById('timer');
  const minutes = Math.floor(countdown / 60).toString().padStart(2, '0');
  const seconds = (countdown % 60).toString().padStart(2, '0');
  timerElement.textContent = `${minutes}:${seconds}`;

  if (countdown > 0) {
    countdown--;
  } else {
    generateQRCode();
    countdown = 180;
  }
}

// Генерація QR-коду
function generateQRCode() {
  const qrCodeElement = document.getElementById('qr-code');
  const texts = [
    "що сука, немає 18 що сука, немає 18 що сука, немає 18 що сука, немає 18 що сука, немає 18 що сука, немає 18 ",
    "Що за хрін, немає 18 Що за хрін, немає 18 Що за хрін, немає 18 Що за хрін, немає 18 Що за хрін, немає 18 18",
    "шо блядь, немає 18 шо блядь, немає 18 шо блядь, немає 18 шо блядь, немає 18 шо блядь, немає 18 " +
      Math.random().toString(36).substring(2, 8).toUpperCase()
  ];
  const randomText = texts[Math.floor(Math.random() * texts.length)];
  qrCodeElement.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(randomText)}`;
}

// Генерація штрих-коду
function generateBarcode() {
  const barcodeElement = document.getElementById('qr-code');
  const texts = [
    "6784  5839  93402",
    "9684  8275  62757",
    "8275  9239  38949"
  ];
  const randomCode = texts[Math.floor(Math.random() * texts.length)];
  barcodeElement.src = `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(randomCode)}&code=Code128&dpi=300&scale=4&barwidth=1.7&height=40&fontname=Arial&fontsize=26&includetext=True&textsize=26`;
}

// Запобігання перевертанню при натисканні на кнопки
function toggleDocument(event) {
  const isNoFlip = event.target.closest('#qr-button, #barcode-button, [data-no-flip]');
  if (!isNoFlip) {
    document.querySelector('.container').classList.toggle('flipped');
  }
}

// Обробка меню
document.addEventListener('DOMContentLoaded', function () {
  const image1 = document.getElementById("imageDisplay1");
  const image2 = document.getElementById("imageDisplay2");

  function changeImage(menu) {
    document.getElementById("strichkaName").style.display = "none";
    document.getElementById("icon-menu").src = "menu.jpg";
    document.getElementById("icon-menu1").src = "servis.jpg";
    document.getElementById("icon-menu2").src = "dokument.jpg";
    document.getElementById("icon-menu3").src = "strichka.jpg";

    image1.style.display = 'block';
    image2.style.display = 'block';

    switch(menu) {
      case 'menu':
        image1.src = "serwis.jpg";
        image2.src = "foon.jpg";
        document.getElementById("icon-menu").src = "menu-active.jpg";
        break;
      case 'menu1':
        image1.src = "menuu.jpg";
        image2.src = "foon.jpg";
        document.getElementById("icon-menu1").src = "servis-active.jpg";
        break;
      case 'menu2':
        image1.style.display = 'none';
        image2.style.display = 'none';
        document.getElementById("icon-menu2").src = "dokument-active.jpg";
        break;
        case 'menu3':
          image1.src = "striczka.jpg";
          image2.src = "foon.jpg";
          document.getElementById("icon-menu3").src = "strichka-active.jpg";
        
          const strichka = document.getElementById("strichkaName");
          strichka.style.display = "block";
        
          // Беремо текст без HTML тегів
          const fullNameElement = document.getElementById("userName");
          const fullName = fullNameElement.innerText || fullNameElement.textContent || "";
          const parts = fullName.replace(/\n/g, ' ').trim().split(/\s+/);
          const firstName = parts[1] || parts[0];
        
          strichka.textContent = `Привіт, ${firstName} 👋`;
          break;
    }
  }

  document.getElementById("icon-menu").addEventListener("click", () => changeImage('menu'));
  document.getElementById("icon-menu1").addEventListener("click", () => changeImage('menu1'));
  document.getElementById("icon-menu2").addEventListener("click", () => changeImage('menu2'));
  document.getElementById("icon-menu3").addEventListener("click", () => changeImage('menu3'));
});

// Кнопки QR і Штрих-код
const qrButton = document.getElementById('qr-button');
const barcodeButton = document.getElementById('barcode-button');

qrButton.addEventListener('click', () => {
  qrButton.classList.add('active');
  barcodeButton.classList.remove('active');
  generateQRCode();
});

barcodeButton.addEventListener('click', () => {
  barcodeButton.classList.add('active');
  qrButton.classList.remove('active');
  generateBarcode();
});

// Обробка кліків по документу
document.querySelectorAll('.document').forEach((doc) => {
  doc.addEventListener('click', toggleDocument);
});

// Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('ServiceWorker зареєстровано з успіхом:', reg))
      .catch(err => console.log('Помилка реєстрації ServiceWorker:', err));
  });
}

// --- Меню з 4 опціями ---
function togglePopupMenu() {
  document.getElementById("popupMenu").classList.toggle("hidden");
}

function openChangeMenu() {
  const choice = prompt(
    "Виберіть опцію:\n" +
    "1. Змінити ПІБ\n" +
    "2. Змінити дату\n" +
    "3. Змінити фото\n" +
    "4. Скинути все"
  );

  switch(choice) {
    case "1": changeName(); break;
    case "2": changeDate(); break;
    case "3": changePhoto(); break;
    case "4": resetData(); break;
    default: alert("Невірна опція"); break;
  }
}

// Зміна ПІБ
function changeName() {
  const name = prompt("Введіть новий ПІБ (наприклад: Чепорнюк Роман Сергійович):");
  if (name) {
    const parts = name.trim().split(/\s+/);
    const formatted = parts.join("<br>");
    document.getElementById("userName").innerHTML = `<p>${formatted}</p>`;
    const firstName = parts[1] || parts[0];
    document.getElementById("strichkaName").textContent = `Привіт, ${firstName} 👋`;
    localStorage.setItem("userName", name);
  }
  togglePopupMenu();
}

// Зміна дати
function changeDate() {
  const date = prompt("Введіть нову дату:");
  if (date) {
    document.getElementById("userDate").innerText = date;
    localStorage.setItem("userDate", date);
  }
  togglePopupMenu();
}

// Зміна фото
function changePhoto() {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        document.getElementById("userPhoto").src = reader.result;
        localStorage.setItem("userPhoto", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  fileInput.click();
  togglePopupMenu();
}

// Скидання до початкового стану
function resetData() {
  localStorage.removeItem("userName");
  localStorage.removeItem("userDate");
  localStorage.removeItem("userPhoto");

  document.getElementById("userName").innerHTML = "<p>Ваш ПІБ</p>";
  document.getElementById("userDate").innerText = "дата";
  document.getElementById("userPhoto").src = "default-photo.jpg";
  document.getElementById("strichkaName").textContent = "";
  
  togglePopupMenu();
}

// Відновлення даних при завантаженні
window.addEventListener("load", () => {
  const savedName = localStorage.getItem("userName");
  const savedDate = localStorage.getItem("userDate");
  const savedPhoto = localStorage.getItem("userPhoto");

  if (savedName) {
    const parts = savedName.trim().split(/\s+/);
    document.getElementById("userName").innerHTML = `<p>${parts.join("<br>")}</p>`;
    const firstName = parts[1] || parts[0];
    document.getElementById("strichkaName").textContent = `Привіт, ${firstName} 👋`;
  }
  if (savedDate) document.getElementById("userDate").innerText = savedDate;
  if (savedPhoto) document.getElementById("userPhoto").src = savedPhoto;
});

// --- Запуск таймера і QR ---
generateQRCode();
setInterval(updateTimer, 1000);

// --- Усі інші твої блоки залишені без змін: lock орієнтації, overlay, заборона копіювання, подвійний клік, свайпи, зум ---

window.addEventListener("load", () => {
  const savedName = localStorage.getItem("userName");
  const savedDate = localStorage.getItem("userDate");
  const savedPhoto = localStorage.getItem("userPhoto");

  // Відновлюємо userName, userDate, userPhoto без показу strichkaName
  if (savedName) {
    const parts = savedName.trim().split(/\s+/);
    document.getElementById("userName").innerHTML = `<p>${parts.join("<br>")}</p>`;
  }
  if (savedDate) document.getElementById("userDate").innerText = savedDate;
  if (savedPhoto) document.getElementById("userPhoto").src = savedPhoto;

  // Сховати стрічку на старті
  const strichka = document.getElementById("strichkaName");
  strichka.style.display = "none";

  // Показуємо стрічку тільки після кліку на меню3
  document.getElementById("icon-menu3").addEventListener("click", () => {
    if (savedName) {
      const parts = savedName.trim().split(/\s+/);
      const firstName = parts[1] || parts[0];
      strichka.textContent = `Привіт, ${firstName} 👋`;
    }
    strichka.style.display = "block";
  });
});