const gateDays = document.getElementById("gateDays");
const gateHours = document.getElementById("gateHours");
const gateMinutes = document.getElementById("gateMinutes");
const gateSeconds = document.getElementById("gateSeconds");
const enterStoryButton = document.getElementById("enterStory");
const gateMessage = document.getElementById("gateMessage");
let unlockRedirectScheduled = false;

const formatUnit = (value) => String(Math.max(0, value)).padStart(2, "0");

const openBirthdayStory = () => {
  window.location.href = window.birthdayHomePage || "home.html";
};

const unlockStory = () => {
  if (enterStoryButton) {
    enterStoryButton.disabled = false;
    enterStoryButton.textContent = "Enter the birthday story";
  }

  if (gateMessage) {
    gateMessage.textContent = "It is midnight. The surprise is open now.";
  }

  document.body.classList.add("is-unlocked");

  if (!unlockRedirectScheduled) {
    unlockRedirectScheduled = true;
    if (typeof window.showToast === "function") {
      window.showToast("It is midnight. Opening the birthday story.");
    }
    window.setTimeout(openBirthdayStory, 1200);
  }
};

const updateGateCountdown = () => {
  const unlockAt = window.birthdayUnlockAt;

  if (!unlockAt) {
    return;
  }

  const remainingMs = unlockAt.getTime() - Date.now();

  if (remainingMs <= 0) {
    [gateDays, gateHours, gateMinutes, gateSeconds].forEach((element) => {
      if (element) {
        element.textContent = "00";
      }
    });
    unlockStory();
    return;
  }

  const totalSeconds = Math.floor(remainingMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (gateDays) {
    gateDays.textContent = formatUnit(days);
  }

  if (gateHours) {
    gateHours.textContent = formatUnit(hours);
  }

  if (gateMinutes) {
    gateMinutes.textContent = formatUnit(minutes);
  }

  if (gateSeconds) {
    gateSeconds.textContent = formatUnit(seconds);
  }
};

enterStoryButton?.addEventListener("click", () => {
  if (window.isBirthdayUnlocked?.()) {
    openBirthdayStory();
    return;
  }

  if (typeof window.showToast === "function") {
    window.showToast("The story opens at midnight.");
  }
});

updateGateCountdown();
window.setInterval(updateGateCountdown, 1000);

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    updateGateCountdown();
  }
});