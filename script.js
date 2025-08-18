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

function togglePopupMenu() {
  document.getElementById("popupMenu").classList.toggle("hidden");
}

function changeName() {
  const name = prompt("Введіть нове ім’я:");
  if (name) {
    document.getElementById("userName").innerText = name;
  }
  togglePopupMenu();
}

function changeDate() {
  const date = prompt("Введіть нову дату:");
  if (date) {
    document.getElementById("userDate").innerText = date;
  }
  togglePopupMenu();
}

function changePhoto() {
  const url = prompt("Введіть посилання на фото:");
  if (url) {
    document.getElementById("userPhoto").src = url;
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
      };
      reader.readAsDataURL(file);
    }
  };
  fileInput.click();
  togglePopupMenu();
}

// Запуск
generateQRCode();
setInterval(updateTimer, 1000);



function changeName() {
  const name = prompt("Введіть новий ПІБ (наприклад: Чепорнюк Роман Сергійович):");
  if (name) {
    const parts = name.trim().split(/\s+/); // розбиває по пробілах
    const formatted = parts.join("<br>");   // додає <br> між словами
    document.getElementById("userName").innerHTML = `<p>${formatted}</p>`;
  }
  togglePopupMenu();
}

if (screen.orientation && screen.orientation.lock) {
  screen.orientation.lock('portrait').catch(function(error) {
    console.log("Orientation lock failed:", error);
  });
}

document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('selectstart', event => event.preventDefault());
document.addEventListener('copy', event => event.preventDefault());
document.addEventListener('touchstart', function(e) {
  if (e.touches.length > 1) e.preventDefault(); // два пальці
}, { passive: false });

// Заборона подвійного кліку (double tap)
document.addEventListener('dblclick', (e) => {
  e.preventDefault();
}, { passive: false });

// Заборона контекстного меню (правий клік)
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// Заборона вибору тексту
document.addEventListener('selectstart', (e) => {
  e.preventDefault();
});

// Блокування будь-яких жестів
document.addEventListener('gesturestart', (e) => {
  e.preventDefault();
});
document.addEventListener('gesturechange', (e) => {
  e.preventDefault();
});
document.addEventListener('gestureend', (e) => {
  e.preventDefault();
});

// Блокування свайпів і зуму
document.addEventListener('touchmove', (e) => {
  e.preventDefault();
}, { passive: false });


window.addEventListener('load', function() {
  document.body.style.height = '103.5vh'; // Встановлюємо висоту 80% від висоти вікна
});

window.addEventListener('resize', function() {
  document.body.style.height = '103.5vh'; // При зміні розміру вікна знову встановлюємо 80% висоти
});

// Додаємо елемент для чорного екрану
const overlay = document.createElement('div');
overlay.id = 'overlay';
overlay.textContent = 'Перемкніть пристрій у портретний режим';
document.body.appendChild(overlay);

// Слухач події для зміни орієнтації
window.addEventListener('orientationchange', function() {
  if (window.orientation === 90 || window.orientation === -90) {
    // Якщо орієнтація ландшафтна, показуємо чорний екран
    overlay.style.display = 'flex';
  } else {
    // Якщо орієнтація портретна, приховуємо чорний екран
    overlay.style.display = 'none';
  }
});

// Спочатку перевіряємо орієнтацію при завантаженні сторінки
if (window.orientation === 90 || window.orientation === -90) {
  overlay.style.display = 'flex';
} else {
  overlay.style.display = 'none';
}

// Оновити рядок "Документ оновлено ..." тільки текстом, без змін стилів/HTML
window.addEventListener("load", function updateMovingTextOnce() {
  try {
    const now = new Date();

    const time = now.toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit"
    });

    const date = now.toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });

    const text = `Документ оновлено о ${time} | ${date} • `; // пробіл після • збережено

    document.querySelectorAll(".moving-text-container .moving-text")
      .forEach(el => { el.textContent = text; });
  } catch (_) {
    // тихо ігноруємо — стилі/розмітка не змінюються
  }
});