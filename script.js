const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.14 });

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 4, 3) * 80}ms`;
  observer.observe(item);
});

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

const marquee = document.querySelector('.marquee');
const marqueeGroup = document.querySelector('.marquee-group');

document.fonts.ready.then(() => {
  let startTime;
  const groupWidth = marqueeGroup.getBoundingClientRect().width;

  function moveMarquee(time) {
    if (!startTime) startTime = time;
    const distance = ((time - startTime) * .07) % groupWidth;
    marquee.style.transform = `translate3d(${-distance}px, 0, 0)`;
    requestAnimationFrame(moveMarquee);
  }

  requestAnimationFrame(moveMarquee);
});

document.querySelectorAll('.tilt-card').forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    card.style.transform = `perspective(700px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateY(-7px)`;
  });
  card.addEventListener('pointerleave', () => { card.style.transform = ''; });
});
