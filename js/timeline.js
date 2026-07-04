const timelineCards = document.querySelectorAll(".timeline-card");

timelineCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 120}ms`;
});