const birthdayUnlockAt = new Date(2026, 6, 5, 0, 0, 0, 0);
const birthdayGatePage = "index.html";
const birthdayHomePage = "home.html";
const protectedPages = new Set([
  birthdayHomePage,
  "memories.html",
  "reasons.html",
  "gallery.html",
  "guestbook.html",
  "letter.html",
  "countdown.html",
]);

const resolveCurrentPage = () => {
  const segments = window.location.pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];

  if (!lastSegment || !lastSegment.includes(".")) {
    return birthdayGatePage;
  }

  return lastSegment;
};

const currentPage = resolveCurrentPage();

const isBirthdayUnlocked = () => Date.now() >= birthdayUnlockAt.getTime();

window.birthdayUnlockAt = birthdayUnlockAt;
window.birthdayHomePage = birthdayHomePage;
window.isBirthdayUnlocked = isBirthdayUnlocked;

if (!isBirthdayUnlocked() && protectedPages.has(currentPage)) {
  window.location.replace(birthdayGatePage);
}

if (isBirthdayUnlocked() && currentPage === birthdayGatePage) {
  window.location.replace(birthdayHomePage);
}