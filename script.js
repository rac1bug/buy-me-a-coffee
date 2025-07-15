const cardContainer = document.querySelector('.cards');
const profiles = [
  { name: 'Ana, 24', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Luis, 28', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Karen, 22', img: 'https://randomuser.me/api/portraits/women/55.jpg' },
  { name: 'Carlos, 26', img: 'https://randomuser.me/api/portraits/men/45.jpg' }
];

function createCard(profile) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.style.backgroundImage = `url(${profile.img})`;
  card.innerHTML = `<div class="card-info">${profile.name}</div>`;
  addSwipe(card);
  return card;
}

function addSwipe(card) {
  let startX = 0;
  card.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    card.style.transition = 'none';
    const move = (ev) => {
      let deltaX = ev.clientX - startX;
      card.style.transform = `translateX(${deltaX}px) rotate(${deltaX * 0.05}deg)`;
    };
    const end = (ev) => {
      let deltaX = ev.clientX - startX;
      card.style.transition = 'transform 0.3s ease';
      if (deltaX > 100) {
        card.style.transform = 'translateX(500px) rotate(45deg)';
        setTimeout(() => card.remove(), 300);
      } else if (deltaX < -100) {
        card.style.transform = 'translateX(-500px) rotate(-45deg)';
        setTimeout(() => card.remove(), 300);
      } else {
        card.style.transform = 'translateX(0px) rotate(0deg)';
      }
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', end);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);
  });
}

profiles.reverse().forEach(profile => {
  cardContainer.appendChild(createCard(profile));
});

// Botones
document.querySelector('.like').addEventListener('click', () => swipe('right'));
document.querySelector('.nope').addEventListener('click', () => swipe('left'));

function swipe(direction) {
  const topCard = document.querySelector('.card:last-child');
  if (!topCard) return;
  topCard.style.transition = 'transform 0.4s ease';
  if (direction === 'right') {
    topCard.style.transform = 'translateX(500px) rotate(45deg)';
  } else {
    topCard.style.transform = 'translateX(-500px) rotate(-45deg)';
  }
  setTimeout(() => topCard.remove(), 300);
}
