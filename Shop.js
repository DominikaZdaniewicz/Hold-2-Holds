/*banner*/
document.addEventListener('DOMContentLoaded', () => {
  const wrapperEl = document.querySelector('.slides-wrapper');
  const slidesEl = document.querySelectorAll('.slide');
  const totalS = slidesEl.length;

  const slideClone = slidesEl[0].cloneNode(true);
  wrapperEl.appendChild(slideClone);

  let indexS = 0;

  function nextSlide() {
    indexS++;
    wrapperEl.style.transition = 'transform 0.5s ease-in-out';
    wrapperEl.style.transform = `translateX(-${indexS * 100}%)`;

    if (indexS === totalS) {
      setTimeout(() => {
        wrapperEl.style.transition = 'none'; 
        wrapperEl.style.transform = 'translateX(0)'; 
        indexS = 0;
      }, 500); 
    }
  }

  setInterval(nextSlide, 5500);
});


/*products*/

document.addEventListener('DOMContentLoaded', () => {
  const productListEl = document.getElementById('productList');
  const productsEl = document.querySelectorAll('.product');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  let indexP = 0;
  const productWidth = productsEl[0].getBoundingClientRect().width + 30;
  const totalP = productsEl.length;
  const visibleCount = 4;
  const maxIndex = totalP - visibleCount;

  function updateTransform() {
    productListEl.style.transform =
      `translateX(-${indexP * productWidth}px)`;

    prevBtn.style.display = indexP === 0 ? 'none' : 'flex';
    nextBtn.style.display = indexP >= maxIndex ? 'none' : 'flex';
  }

  prevBtn.addEventListener('click', () => {
    if (indexP > 0) {
      indexP--;
      updateTransform();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (indexP < maxIndex) {
      indexP++;
      updateTransform();
    }
  });

  updateTransform();
});
