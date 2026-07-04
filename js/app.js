const toast = document.getElementById("toast");

const showToast = (message) => {
  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.classList.add("is-visible");

  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2200);
};

window.showToast = showToast;

const themeToggle = document.getElementById("themeToggle");
const storedTheme = localStorage.getItem("birthday-theme");

if (storedTheme) {
  document.body.dataset.theme = storedTheme;
}

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
  document.body.dataset.theme = nextTheme;
  localStorage.setItem("birthday-theme", nextTheme);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

document.querySelectorAll("a[href$='.html']").forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || link.target === "_blank" || event.metaKey || event.ctrlKey) {
      return;
    }

    event.preventDefault();
    document.querySelector(".page-transition")?.classList.add("is-active");
    window.setTimeout(() => {
      window.location.href = href;
    }, 220);
  });
});

let touchStartX = 0;

document.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
});

document.addEventListener("touchend", (event) => {
  if (document.body.dataset.swipe !== "true") {
    return;
  }

  const deltaX = event.changedTouches[0].clientX - touchStartX;
  const nextPage = document.body.dataset.next;
  const prevPage = document.body.dataset.prev;

  if (deltaX < -90 && nextPage) {
    window.location.href = nextPage;
  }

  if (deltaX > 90 && prevPage) {
    window.location.href = prevPage;
  }
});

const pulseButton = document.getElementById("surprisePulse");

pulseButton?.addEventListener("click", () => {
  launchConfetti(18);
  showToast("A little sparkle for the birthday girl.");
});

const cake = document.getElementById("birthdayCake");
let cakeTapCount = 0;

const handleCakeTap = () => {
  cakeTapCount += 1;
  launchConfetti(14);

  if (cakeTapCount >= 3) {
    cakeTapCount = 0;
    showToast("Wish unlocked. Keep going, there is more ahead.");
  }
};

cake?.addEventListener("click", handleCakeTap);

const rotatingMemory = document.getElementById("rotatingMemory");

if (rotatingMemory) {
  const lines = [
    "You turned ordinary time into something worth remembering.",
    "The smallest moments with you became the ones I replay most.",
    "Some people arrive softly and still change everything.",
  ];

  let index = 0;
  window.setInterval(() => {
    index = (index + 1) % lines.length;
    rotatingMemory.textContent = lines[index];
  }, 3200);
}

const openLetter = document.getElementById("openLetter");

openLetter?.addEventListener("click", () => {
  document.getElementById("letterPaper")?.classList.add("is-visible");
  document.getElementById("letterPaper")?.setAttribute("aria-hidden", "false");
  document.getElementById("letterEnvelope")?.classList.add("hidden");
  launchConfetti(28);
  showToast("The letter is open.");
});

const dateIdeas = [
  "A long scooty ride with random stops and no fixed plan",
  "Breakfast at your favorite aesthetic cafe",
  "Street food hopping until we find an accidental favorite",
  "A beach walk with no phones for one hour",
  "A temple visit followed by chai and quiet conversation",
  "A theatre date with snacks and zero chance of behaving properly",
  "A small shopping day where we pick one thing for each other",
  "A local dhaba night that turns into a long drive",
  "Recreating one of our old photos at the same place",
  "A bookstore stop and coffee after",
  "Sunset desserts and talking about everything",
  "A lazy home date with music and comfort food",
];

const wheel = document.getElementById("dateWheel");
const ideaGrid = document.getElementById("ideaGrid");
const wheelResult = document.getElementById("wheelResult");
const spinWheelButton = document.getElementById("spinWheel");

if (wheel) {
  const segmentColors = [
    "#f4b39d",
    "#92c5b0",
    "#9cb7d6",
    "#f3d9a7",
    "#ef9d8c",
    "#b7c9e6",
  ];

  const segmentAngle = 360 / dateIdeas.length;
  const slices = dateIdeas
    .map((_, index) => {
      const start = index * segmentAngle;
      const end = start + segmentAngle;
      const color = segmentColors[index % segmentColors.length];
      return `${color} ${start}deg ${end}deg`;
    })
    .join(", ");

  wheel.style.background = `conic-gradient(${slices})`;
}

if (ideaGrid) {
  Array.from({ length: 100 }, (_, index) => index + 1).forEach((number) => {
    const card = document.createElement("article");
    card.className = "idea-card glass-card reveal";
    const idea = dateIdeas[(number - 1) % dateIdeas.length];
    card.innerHTML = `<p class="mini-label">Idea ${number}</p><h3>${idea}</h3><p>Customize this card with a shared place, song, or food to make it unmistakably yours.</p>`;
    ideaGrid.appendChild(card);
    revealObserver.observe(card);
  });
}

spinWheelButton?.addEventListener("click", () => {
  if (!wheel || wheel.classList.contains("is-spinning")) {
    return;
  }

  const nextIndex = Math.floor(Math.random() * dateIdeas.length);
  wheel.classList.add("is-spinning");

  window.setTimeout(() => {
    wheel.classList.remove("is-spinning");
    wheelResult.textContent = `Tonight's idea: ${dateIdeas[nextIndex]}.`;
    showToast("The wheel picked a date idea.");
  }, 4200);
});

const finaleButton = document.getElementById("finaleButton");

finaleButton?.addEventListener("click", () => {
  document.getElementById("finalePanel")?.scrollIntoView({ behavior: "smooth", block: "center" });
  launchConfetti(40);
  showToast("Finale launched.");
});

const surpriseCode = ["l", "o", "v", "e"];
const enteredKeys = [];

document.addEventListener("keydown", (event) => {
  enteredKeys.push(event.key.toLowerCase());

  if (enteredKeys.length > surpriseCode.length) {
    enteredKeys.shift();
  }

  if (enteredKeys.join("") === surpriseCode.join("")) {
    launchConfetti(22);
    showToast("Secret code accepted.");
  }
});

function launchConfetti(amount = 24) {
  let layer = document.getElementById("confettiCanvas");

  if (!layer) {
    layer = document.createElement("div");
    layer.id = "confettiCanvas";
    layer.className = "confetti-layer";
    document.body.appendChild(layer);
  }

  Array.from({ length: amount }, () => {
    const piece = document.createElement("span");
    const size = 6 + Math.random() * 10;
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.width = `${size}px`;
    piece.style.height = `${size * 0.66}px`;
    piece.style.background = ["#db745e", "#92c5b0", "#9cb7d6", "#f3d9a7"][Math.floor(Math.random() * 4)];
    piece.style.setProperty("--duration", `${1200 + Math.random() * 900}ms`);
    piece.style.setProperty("--drift", `${-80 + Math.random() * 160}px`);
    layer.appendChild(piece);

    window.setTimeout(() => {
      piece.remove();
    }, 2300);
  });
}

window.launchConfetti = launchConfetti;