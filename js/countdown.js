const defaultDate = "2026-12-31T20:00";
const storageKey = "birthday-countdown-target";

const countdownInput = document.getElementById("countdownDate");
const countdownForm = document.getElementById("countdownForm");

const getTargetDate = () => {
  const saved = localStorage.getItem(storageKey) || defaultDate;
  return new Date(saved);
};

let targetDate = getTargetDate();

const parts = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

const pad = (value) => String(value).padStart(2, "0");

const updateCountdown = () => {
  const now = new Date();
  const difference = Math.max(0, targetDate.getTime() - now.getTime());

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  if (parts.days) {
    parts.days.textContent = pad(days);
    parts.hours.textContent = pad(hours);
    parts.minutes.textContent = pad(minutes);
    parts.seconds.textContent = pad(seconds);
  }
};

if (countdownInput) {
  const saved = localStorage.getItem(storageKey) || defaultDate;
  countdownInput.value = saved;
}

countdownForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!countdownInput?.value) {
    return;
  }

  localStorage.setItem(storageKey, countdownInput.value);
  targetDate = new Date(countdownInput.value);
  updateCountdown();
  window.showToast?.("Countdown date saved.");
});

updateCountdown();
window.setInterval(updateCountdown, 1000);