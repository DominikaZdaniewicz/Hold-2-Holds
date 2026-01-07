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

/* Product list */

document.addEventListener('DOMContentLoaded', () => {

  // Adding products
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (event) => {
      const productEl = event.target.closest('.product');
      const name = productEl.querySelector('.name').textContent;
      const price = parseFloat(productEl.querySelector('.price').textContent.replace('€',''));

      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existing = cart.find(item => item.name === name);

      if (existing) {
        existing.amount++;
        existing.totalPrice = existing.amount * price;
      } else {
        cart.push({ name, amount: 1, price, totalPrice: price });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${name} added to cart!`);
    });
  });

  // Going to check out
  const toCheckOutBtn = document.querySelector('#toCheckOut');
  if (toCheckOutBtn) {
    toCheckOutBtn.addEventListener('click', () => {
      window.location.href = 'checkout.html';
    });
  }

  // Checkout: cart
  const productTableEl = document.querySelector('#cart-content');
  const emptyCartEl = document.querySelector('#empty');

  if (productTableEl && emptyCartEl) {
    const tableList = productTableEl.querySelector('.product-table');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const summaryCostEl = document.querySelector('.summary .cost');

    function renderCart() {
      if (cart.length === 0) {
        productTableEl.classList.add('hidden');
        emptyCartEl.classList.remove('hidden');
        summaryCostEl.textContent = "$0.00";
        summaryCostEl.parentElement.classList.add('hidden');
        return;
      }

      emptyCartEl.classList.add('hidden');
      productTableEl.classList.remove('hidden');
      summaryCostEl.parentElement.classList.remove('hidden');

      tableList.querySelectorAll('li:not(.table-header)').forEach(li => li.remove()); 

      let totalSum = 0; 

      cart.forEach((item, index) => {
        const totalPrice = item.price * item.amount; 
        totalSum += totalPrice;

        const li = document.createElement('li'); 
        li.classList.add('table-row');

        li.innerHTML = `
          <span class="table-name">${item.name}</span>
          <span>${item.amount}</span>
          <span>$${item.price.toFixed(2)}</span>
          <span>$${totalPrice.toFixed(2)}</span> <!-- ZMIANA: użycie totalPrice -->
          <span><button data-index="${index}" class="remove-item">X</button></span>
        `;

        tableList.appendChild(li);
      });

      summaryCostEl.textContent = `$${totalSum.toFixed(2)}`;
    };

    renderCart();

    productTableEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-item')) {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      };
    });
  };
});
