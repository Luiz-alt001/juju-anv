const birthdayMonth = 1; 
const birthdayDay = 14;


const preloadedImages = [
  "fotos/foto1.jpg",
  "fotos/foto2.jpg",
  "fotos/foto3.jpg",
  "fotos/foto4.jpg",
  "fotos/foto5.jpg",
  "fotos/foto6.jpg",
  "fotos/foto7.jpg",
  "fotos/foto8.jpg",
  "fotos/foto9.jpg",
  "fotos/foto10.jpg",
  "fotos/foto11.jpg",
  "fotos/foto12.jpg",
  "fotos/foto13.jpg",
  "fotos/foto14.jpg",
  "fotos/foto15.jpg",
  "fotos/foto16.jpg",
  "fotos/foto17.jpg",
  "fotos/foto18.jpg",
  "fotos/foto19.jpg",
  "fotos/foto20.jpg",
  "fotos/foto21.jpg",
  "fotos/foto22.jpg",
  "fotos/foto23.jpg",
  "fotos/foto24.jpg",
  "fotos/foto25.jpg",
  "fotos/foto26.jpg",
  "fotos/foto27.jpg",
  "fotos/foto28.jpg",
  "fotos/foto29.jpg",
  "fotos/foto30.jpg",
  "fotos/foto31.jpg",
  "fotos/foto32.jpg",
  "fotos/foto33.jpg",
  "fotos/foto34.jpg",
  "fotos/foto35.jpg",
  "fotos/foto36.jpg",
  "fotos/foto37.jpg",
  "fotos/foto38.jpg",
  "fotos/foto39.jpg",
];

const gallery = document.getElementById("gallery");
const picker = document.getElementById("photoPicker");
const photoModal = document.getElementById("photoModal");
const modalImage = document.getElementById("modalImage");
const closeModalButton = document.getElementById("closeModal");

function getNextBirthdayDate() {
  const now = new Date();
  let year = now.getFullYear();
  let birthday = new Date(year, birthdayMonth, birthdayDay, 0, 0, 0);

  if (birthday < now) {
    birthday = new Date(year + 1, birthdayMonth, birthdayDay, 0, 0, 0);
  }

  return birthday;
}

const birthdayDate = getNextBirthdayDate();
const dateNote = document.getElementById("dateNote");

dateNote.textContent = `Data configurada: ${birthdayDate.toLocaleDateString("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
})}`;

function updateCountdown() {
  const now = new Date();
  const diff = birthdayDate - now;

  if (diff <= 0) {
    document.getElementById("timer").innerHTML = "<strong>É hoje! Feliz aniversário, Juju! 🎉💖</strong>";
    return;
  }

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  document.getElementById("days").textContent = String(days);
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

function spawnHeart() {
  const heartsContainer = document.querySelector(".floating-hearts");
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = "❤";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${14 + Math.random() * 20}px`;
  heart.style.animationDuration = `${5 + Math.random() * 5}s`;
  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 10000);
}

function setEmptyState() {
  gallery.innerHTML = `
    <div class="empty-state">
      <p>Suas fotos vão aparecer aqui 💕<br/>Adicione arquivos na pasta <strong>fotos/</strong> e liste no <strong>script.js</strong>.</p>
    </div>
  `;
}

function getPolaroidDate(photoNumber) {
  if (photoNumber >= 1 && photoNumber <= 6) return "15/12/2025";
  if (photoNumber >= 7 && photoNumber <= 21) return "08/01/2026";
  if (photoNumber >= 22 && photoNumber <= 39) return "08/02/2026";
  return "";
}

function createImageCard(src, altText, dateText = "") {
  const card = document.createElement("div");
  card.className = "photo-card";

  const img = document.createElement("img");
  img.src = src;
  img.alt = altText;
  img.loading = "lazy";

  const caption = document.createElement("p");
  caption.className = "photo-date";
  caption.textContent = dateText;

  card.appendChild(img);
  if (dateText) {
    card.appendChild(caption);
  }
  gallery.appendChild(card);
}

function renderPreloadedImages() {
  const validPaths = preloadedImages.filter((path) => typeof path === "string" && path.trim().length > 0);

  if (!validPaths.length) {
    setEmptyState();
    return;
  }

  gallery.innerHTML = "";
  validPaths.forEach((path, index) => {
    const photoNumber = index + 1;
    createImageCard(path, `Foto de Julia e namorado ${photoNumber}`, getPolaroidDate(photoNumber));
  });
}

function addImages(files) {
  const imageFiles = [...files].filter((file) => file.type.startsWith("image/"));

  if (!imageFiles.length) {
    return;
  }

  gallery.innerHTML = "";

  imageFiles.forEach((file) => {
    const objectUrl = URL.createObjectURL(file);
    createImageCard(objectUrl, `Foto de Julia e namorado - ${file.name}`);
  });
}

picker.addEventListener("change", (event) => {
  addImages(event.target.files);
});

gallery.addEventListener("dragover", (event) => {
  event.preventDefault();
  gallery.classList.add("drag-over");
});

gallery.addEventListener("dragleave", () => {
  gallery.classList.remove("drag-over");
});

gallery.addEventListener("drop", (event) => {
  event.preventDefault();
  gallery.classList.remove("drag-over");
  addImages(event.dataTransfer.files);
});

gallery.addEventListener("click", (event) => {
  const imageElement = event.target.closest("img");
  if (!imageElement || !gallery.contains(imageElement)) {
    return;
  }

  openModal(imageElement.src, imageElement.alt);
});

closeModalButton.addEventListener("click", closeModal);

photoModal.addEventListener("click", (event) => {
  if (event.target === photoModal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && photoModal.classList.contains("open")) {
    closeModal();
  }
});


function openModal(src, altText) {
  modalImage.src = src;
  modalImage.alt = altText || "Foto ampliada";
  photoModal.classList.add("open");
  photoModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  photoModal.classList.remove("open");
  photoModal.setAttribute("aria-hidden", "true");
  modalImage.src = "";
  document.body.style.overflow = "";
}

updateCountdown();
renderPreloadedImages();
setInterval(updateCountdown, 1000);
setInterval(spawnHeart, 450);