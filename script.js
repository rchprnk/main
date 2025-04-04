let countdown = 180; 
  
    // Функція для оновлення таймера
    function updateTimer() {
      const timerElement = document.getElementById('timer');
      const minutes = Math.floor(countdown / 60).toString().padStart(2, '0');
      const seconds = (countdown % 60).toString().padStart(2, '0');
      timerElement.textContent = `${minutes}:${seconds}`;
  
      if (countdown > 0) {
        countdown--;
      } else {
        generateQRCode();
        countdown = 180; // Перезапуск таймера
      }
    }
  
    function generateQRCode() {
    const qrCodeElement = document.getElementById('qr-code');
    
    // Масив з різними варіантами тексту
    const texts = [
        "що сука, немає 18 що сука, немає 18 що сука, немає 18 що сука, немає 18 що сука, немає 18 що сука, немає 18 ",
        "Що за хрін, немає 18 Що за хрін, немає 18 Що за хрін, немає 18 Що за хрін, немає 18 Що за хрін, немає 18 18",
        "шо блядь, немає 18 шо блядь, немає 18 шо блядь, немає 18 шо блядь, немає 18 шо блядь, немає 18 шо блядь, не"
          + Math.random().toString(36).substring(2, 8).toUpperCase()
    ];
    
    // Вибір випадкового тексту з масиву
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    
    // Оновлення джерела для нового QR-коду
    qrCodeElement.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(randomText)}`;
}
  
function generateBarcode() {
    const barcodeElement = document.getElementById('qr-code');

    // Масив із фіксованими номерами для штрих-коду
    const texts = [
        "6784  5839  93402",
        "9684  8275  62757",
        "8275  9239  38949"
    ];

    // Вибір випадкового тексту з масиву
    const randomCode = texts[Math.floor(Math.random() * texts.length)];

    // Оновлення джерела для нового штрих-коду
    barcodeElement.src = `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(randomCode)}&code=Code128&dpi=300&scale=4&barwidth=1.7&height=40&fontname=Arial&fontsize=26&includetext=True&textsize=26`;
}


function toggleDocument() {
    document.querySelector('.container').classList.toggle('flipped');
}
  
    // Ініціалізація
    generateQRCode();
    setInterval(updateTimer, 1000);
  
    // Перевертання документа при кліку
    document.querySelectorAll('.document').forEach((doc) => {
      doc.addEventListener('click', toggleDocument);
    });
  
    // Додавання функціоналу кнопок
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
    function toggleDocument(event) {
  if (!event.target.closest('.button')) {
    document.querySelector('.container').classList.toggle('flipped');
  }
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
      console.log('ServiceWorker зареєстровано з успіхом:', registration);
    }, function(error) {
      console.log('Помилка реєстрації ServiceWorker:', error);
    });
  });
}

function changeImage(menu) {
  const image1 = document.getElementById("imageDisplay1");
  const image2 = document.getElementById("imageDisplay2");

  // Зміна джерела зображення залежно від натиснутої вкладки
  switch(menu) {
    case 'menu':
      image1.src = 'serwis.jpg';  // Перше зображення для меню
      image2.src = 'foon.jpg';  // Друге зображення для меню
      image1.style.display = 'block';  // Переконуємося, що зображення видно
      image2.style.display = 'block';  // Переконуємося, що друге зображення видно
      break;
    case 'menu1':
      image1.src = 'menuu.jpg'; // Перше зображення для сервісів
      image2.src = 'foon.jpg'; // Друге зображення для сервісів
      image1.style.display = 'block';  // Переконуємося, що зображення видно
      image2.style.display = 'block';  // Переконуємося, що друге зображення видно
      break;
    case 'menu3':
      image1.src = 'striczka.jpg'; // Перше зображення для стрічки
      image2.src = 'foon.jpg'; // Друге зображення для стрічки
      image1.style.display = 'block';  // Переконуємося, що зображення видно
      image2.style.display = 'block';  // Переконуємося, що друге зображення видно
      break;
    case 'menu2':
      image1.src = '';  // Зображення не змінюється для "Документів"
      image2.src = '';  // Зображення не змінюється для "Документів"
      image1.style.display = 'none'; // Приховуємо зображення
      image2.style.display = 'none'; // Приховуємо зображення
      break;
  }
}