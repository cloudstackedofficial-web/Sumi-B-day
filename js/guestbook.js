const guestbookForm = document.getElementById("guestbookForm");
const guestbookList = document.getElementById("guestbookList");
const storageKey = "birthday-guestbook-entries";

const renderGuestbook = () => {
  if (!guestbookList) {
    return;
  }

  const entries = JSON.parse(localStorage.getItem(storageKey) || "[]");
  guestbookList.innerHTML = "";

  if (!entries.length) {
    guestbookList.innerHTML = "<div class='guestbook-entry'><strong>No wishes yet.</strong><p>Add the first one and test how it looks.</p></div>";
    return;
  }

  entries.slice().reverse().forEach((entry) => {
    const article = document.createElement("article");
    article.className = "guestbook-entry";
    article.innerHTML = `<strong>${entry.name}</strong><p>${entry.message}</p><small>${entry.date}</small>`;
    guestbookList.appendChild(article);
  });
};

guestbookForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("guestName")?.value.trim();
  const message = document.getElementById("guestMessage")?.value.trim();

  if (!name || !message) {
    window.showToast?.("Both fields are required.");
    return;
  }

  const entries = JSON.parse(localStorage.getItem(storageKey) || "[]");
  entries.push({
    name,
    message,
    date: new Date().toLocaleDateString(),
  });

  localStorage.setItem(storageKey, JSON.stringify(entries));
  guestbookForm.reset();
  renderGuestbook();
  window.showToast?.("Wish saved locally in this browser.");
});

renderGuestbook();