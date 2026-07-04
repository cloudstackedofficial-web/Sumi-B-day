# Birthday Website

A polished multi-page birthday website built for GitHub Pages. It uses plain HTML, CSS, and JavaScript so it stays fast, easy to personalize, and simple to deploy.

## Structure

```text
Birthday-Website/
├── index.html
├── home.html
├── memories.html
├── reasons.html
├── gallery.html
├── guestbook.html
├── letter.html
├── countdown.html
├── css/
│   ├── style.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── app.js
│   ├── timeline.js
│   ├── gallery.js
│   ├── countdown.js
│   ├── guestbook.js
│   └── music.js
└── assets/
    ├── images/
    ├── videos/
    ├── music/
    └── lottie/
```

## Features

- Premium glassmorphism UI with soft editorial typography
- Midnight countdown gate before the story unlocks
- Responsive layouts tuned for mobile and desktop
- Interactive birthday cake with confetti
- Love timeline and animated story flow
- Gallery placeholders with a lightbox preview
- Animated letter reveal
- Background music controls
- Countdown finale page
- 100 date ideas spin wheel
- Hidden code-based surprise and swipe navigation
- Dark mode with persisted preference
- Static hosting compatibility for GitHub Pages

## Personalize It

1. Put your images in `assets/images/`.
2. Put your background track in `assets/music/birthday-theme.mp3`.
3. Replace the sample text in each HTML page with your real story.
4. If you need a different unlock moment, update the date in `js/unlock.js`.
5. Update the reunion countdown date in `js/countdown.js`.
6. If you want real gallery images, edit the `data-full` paths in `gallery.html`.

## Local Preview

Because this is a static site, you can preview it by opening `index.html` in a browser. A local static server is better if you want cleaner asset loading.

## Deploy To GitHub Pages

1. Push the repository to GitHub.
2. Open the repository Settings.
3. Go to Pages.
4. Set the source to `Deploy from a branch`.
5. Choose the `main` branch and the `/ (root)` folder.
6. Save and wait for the Pages URL.

## Notes

- The guestbook stores entries in local browser storage. That is intentional so it works on GitHub Pages without a backend.
- `index.html` is the pre-midnight gate page. The full experience opens from `home.html` after the unlock time passes.
- The legacy `birthday-surprise/` folder from the original prototype can be kept for reference or removed later if you no longer need it.