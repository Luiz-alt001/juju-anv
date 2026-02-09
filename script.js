const birthdayMonth = 7; // Agosto (0-11)
const birthdayDay = 14; // ajuste aqui para o dia real

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

updateCountdown();
setInterval(updateCountdown, 1000);
setInterval(spawnHeart, 450);
