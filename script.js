// --- PWA перевірка ---
(function () {
  function isPWA() {
    return window.navigator.standalone === true ||
           window.matchMedia('(display-mode: standalone)').matches;
  }

  if (!isPWA()) {
    document.documentElement.innerHTML = `
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>PWA Only</title>
      </head>
      <body style="
        margin:0;
        height:100vh;
        display:flex;
        justify-content:center;
        align-items:center;
        background:#ffffff;
        font-family:'e-Ukraine', Arial, sans-serif;
        text-align:center;
        padding:20px;
        box-sizing:border-box;">
        <div>
          <h2>Встановіть додаток на iPhone</h2>
          <p>Натисніть <strong>«Поділитися»</strong> у Safari та оберіть <strong>«Додати на головний екран»</strong>.</p>
          <img src="pwaimage.png" style="max-width:450px;margin-top:20px;">
        </div>
      </body>
    `;
    return;
  }
})();

// --- QR / Штрих-код ---
function generateQRCode() {
  const qrCodeElement = document.getElementById('qr-code');
  if (!qrCodeElement) return;
  const texts = [
    "що сука, немає 18 ".repeat(6),
    "Що за хрін, немає 18 ".repeat(5),
    "шо блядь, немає 18 " + Math.random().toString(36).substring(2,8).toUpperCase()
  ];
  const randomText = texts[Math.floor(Math.random() * texts.length)];
  qrCodeElement.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(randomText)}`;
}

function generateBarcode() {
  const barcodeElement = document.getElementById('qr-code');
  if (!barcodeElement) return;
  const texts = ["6784 5839 93402","9684 8275 62757","8275 9239 38949"];
  const randomCode = texts[Math.floor(Math.random() * texts.length)];
  barcodeElement.src = `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(randomCode)}&code=Code128&dpi=300&scale=4&barwidth=1.7&height=40&fontname=Arial&fontsize=26&includetext=True&textsize=26`;
}

const qrButton = document.getElementById('qr-button');
const barcodeButton = document.getElementById('barcode-button');
if (qrButton && barcodeButton) {
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

function changeName() {
  const name = prompt("Введіть новий ПІБ (прізвище ім'я по-батькові):");
  if (name) {
    const parts = name.trim().split(/\s+/);
    document.getElementById("userName").innerHTML = `<p>${parts.join("<br>")}</p>`;
    const firstName = parts[1] || parts[0];
    document.getElementById("strichkaName").textContent = `Привіт, ${firstName} 👋`;
    localStorage.setItem("userName", name);
  }
  togglePopupMenu();
}

function changeDate() {
  const date = prompt("Введіть нову дату:");
  if (date) {
    document.getElementById("userDate").innerText = date;
    localStorage.setItem("userDate", date);
  }
  togglePopupMenu();
}

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

function resetData() {
  localStorage.removeItem("userName");
  localStorage.removeItem("userDate");
  localStorage.removeItem("userPhoto");
  document.getElementById("userName").innerHTML = "<p>Прізвище<br>Ім'я<br>По-Батькові</p>";
  document.getElementById("userDate").innerText = "ВВЕДІТЬ ДАТУ!";
  document.getElementById("userPhoto").src = "ВСТАВТЕ ФОТО!";
  document.getElementById("strichkaName").textContent = "";
  togglePopupMenu();
}

// --- Відновлення даних ---
window.addEventListener("load", () => {
  const savedName = localStorage.getItem("userName");
  const savedDate = localStorage.getItem("userDate");
  const savedPhoto = localStorage.getItem("userPhoto");
  if (savedName) {
    const parts = savedName.trim().split(/\s+/);
    document.getElementById("userName").innerHTML = `<p>${parts.join("<br>")}</p>`;
  }
  if (savedDate) document.getElementById("userDate").innerText = savedDate;
  if (savedPhoto) document.getElementById("userPhoto").src = savedPhoto;

  // Приховуємо стрічку до кліку меню3
  const strichka = document.getElementById("strichkaName");
  strichka.style.display = "none";
  const menu3 = document.getElementById("icon-menu3");
  if (menu3 && savedName) {
    menu3.addEventListener("click", () => {
      const parts = savedName.trim().split(/\s+/);
      const firstName = parts[1] || parts[0];
      strichka.textContent = `Привіт, ${firstName} 👋`;
      strichka.style.display = "block";
    });
  }
});

// --- Клавіатура PIN входу ---
const pinInput = document.getElementById("pinInput");
const dots = document.querySelectorAll(".dot");
const keys = document.querySelectorAll(".key");
const pinButton = document.getElementById("pinButton");
const loginScreen = document.getElementById("loginScreen");
const appContent = document.getElementById("appContent");

let currentPin = "";

// Натискання клавіш
keys.forEach(key => {
  key.addEventListener("click", () => {
    if (key.classList.contains("delete")) {
      currentPin = currentPin.slice(0, -1);
    } else if (!key.classList.contains("transparent") && currentPin.length < 4) {
      currentPin += key.textContent;
    }
    updateDots();
    if (currentPin.length === 4) pinButton.click();
  });
});

function updateDots() {
  dots.forEach((dot, i) => {
    dot.style.background = i < currentPin.length ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)";
  });
}

// Перевірка PIN
pinButton.addEventListener("click", () => {
  const savedPin = localStorage.getItem("userPin");

  if (!/^\d{4}$/.test(currentPin)) {
    alert("Пароль повинен містити 4 цифри!");
    return;
  }

  if (!savedPin) {
    localStorage.setItem("userPin", currentPin);
    alert("Пароль збережено! Тепер можна входити за паролем.");
  } else if (currentPin !== savedPin) {
    alert("Невірний пароль!");
    currentPin = "";
    updateDots();
    return;
  }

  loginScreen.style.display = "none";
  appContent.style.display = "block";
  currentPin = "";
  updateDots();
});

// --- Блокування pinch / zoom ---
document.addEventListener('gesturestart', e => e.preventDefault());
document.addEventListener('wheel', e => { if(e.ctrlKey)e.preventDefault(); }, { passive:false });

// --- Service Worker ---
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('ServiceWorker зареєстровано:', reg))
      .catch(err => console.log('Помилка реєстрації SW:', err));
  });
}

// --- Запуск QR на старт ---
generateQRCode();