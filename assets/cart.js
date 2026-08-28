(() => {
  const drawer = document.querySelector('[data-cart-drawer]');
  if (!drawer) return;

  const itemsContainer = drawer.querySelector('[data-cart-items]');
  const subtotal = drawer.querySelector('[data-cart-subtotal]');
  const emptyState = drawer.querySelector('[data-cart-empty]');
  const footer = drawer.querySelector('[data-cart-footer]');
  const progressText = drawer.querySelector('[data-shipping-text]');
  const progressBar = drawer.querySelector('[data-shipping-progress]');
  const errorBox = drawer.querySelector('[data-cart-error]');
  const threshold = Number(drawer.dataset.freeShipping || 0) * 100;
  const drawerEnabled = drawer.dataset.drawerEnabled === 'true';
  const liveRegion = document.querySelector('[data-live-region]');
  let lastFocusedElement = null;
  let trapHandler = null;

  // Focus trap: mantén el foco dentro del drawer mientras esté abierto
  const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const trapFocus = () => {
    trapHandler = (event) => {
      if (event.key !== 'Tab') return;
      const focusable = drawer.querySelectorAll(focusableSelector);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    drawer.addEventListener('keydown', trapHandler);
  };

  const releaseFocus = () => {
    if (trapHandler) {
      drawer.removeEventListener('keydown', trapHandler);
      trapHandler = null;
    }
  };

  const money = (cents, currency = window.CMP?.currency || 'MXN') => new Intl.NumberFormat(
    document.documentElement.lang || 'es-MX',
    { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 2 }
  ).format(cents / 100);

  const escapeHTML = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const sizedImage = (url) => {
    if (!url) return '';
    return `${url}${url.includes('?') ? '&' : '?'}width=180`;
  };

  const showError = (message = '') => {
    if (errorBox) {
      errorBox.textContent = message;
      errorBox.hidden = !message;
    }
    if (liveRegion) liveRegion.textContent = message;
  };

  const open = () => {
    lastFocusedElement = document.activeElement;
    drawer.hidden = false;
    requestAnimationFrame(() => {
      drawer.classList.add('is-open');
      drawer.querySelector('[data-cart-close]')?.focus();
      trapFocus();
    });
    document.body.classList.add('cmp-drawer-open');
  };

  const close = () => {
    releaseFocus();
    drawer.classList.remove('is-open');
    document.body.classList.remove('cmp-drawer-open');
    window.setTimeout(() => { drawer.hidden = true; }, 180);
    lastFocusedElement?.focus();
  };

  const itemMarkup = (item, index, currency) => `
    <article class="cmp-cart-item" data-cart-item>
      <a class="cmp-cart-item__image" href="${escapeHTML(item.url)}" tabindex="-1">
        ${item.image ? `<img src="${escapeHTML(sizedImage(item.image))}" alt="${escapeHTML(item.product_title)}" width="90" height="90" loading="lazy">` : ''}
      </a>
      <div class="cmp-cart-item__content">
        <div>
          <a class="cmp-cart-item__title" href="${escapeHTML(item.url)}">${escapeHTML(item.product_title)}</a>
          ${item.variant_title && item.variant_title !== 'Default Title' ? `<p class="cmp-cart-item__variant">${escapeHTML(item.variant_title)}</p>` : ''}
        </div>
        <button class="cmp-cart-item__remove" type="button" data-cart-change="${index + 1}" data-cart-quantity="0" aria-label="Eliminar ${escapeHTML(item.product_title)}">Eliminar</button>
        <div class="cmp-cart-item__bottom">
          <div class="cmp-quantity cmp-quantity--small">
            <button type="button" data-cart-change="${index + 1}" data-cart-quantity="${Math.max(0, item.quantity - 1)}" aria-label="Reducir cantidad">−</button>
            <span aria-label="Cantidad">${item.quantity}</span>
            <button type="button" data-cart-change="${index + 1}" data-cart-quantity="${item.quantity + 1}" aria-label="Aumentar cantidad">+</button>
          </div>
          <strong>${money(item.final_line_price, currency)}</strong>
        </div>
      </div>
    </article>`;

  const render = (cart) => {
    document.querySelectorAll('[data-cart-count]').forEach((element) => {
      element.textContent = cart.item_count;
      element.hidden = cart.item_count === 0;
    });

    emptyState.hidden = cart.item_count > 0;
    footer.hidden = cart.item_count === 0;
    itemsContainer.innerHTML = cart.items.map((item, index) => itemMarkup(item, index, cart.currency)).join('');
    subtotal.textContent = money(cart.total_price, cart.currency);

    if (threshold > 0) {
      const remaining = Math.max(0, threshold - cart.total_price);
      const percentage = Math.min(100, (cart.total_price / threshold) * 100);
      progressText.textContent = remaining > 0 ? `Te faltan ${money(remaining, cart.currency)} para envío gratis.` : '¡Tu pedido tiene envío gratis!';
      progressBar.style.width = `${percentage}%`;
    }
  };

  const fetchCart = async () => {
    const response = await fetch(`${window.CMP.routes.cart}.js`, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('No se pudo actualizar el carrito.');
    return response.json();
  };

  const changeItem = async (line, quantity) => {
    const response = await fetch(`${window.CMP.routes.cartChange}.js`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ line, quantity })
    });
    if (!response.ok) throw new Error('No se pudo cambiar la cantidad.');
    render(await response.json());
  };

  document.addEventListener('click', async (event) => {
    if (event.target.closest('[data-cart-open]')) {
      event.preventDefault();
      showError('');
      try { render(await fetchCart()); } catch (error) { showError(error.message); }
      open();
    }

    if (event.target.closest('[data-cart-close]') || event.target.matches('[data-cart-overlay]')) close();

    const changeButton = event.target.closest('[data-cart-change]');
    if (changeButton) {
      changeButton.disabled = true;
      showError('');
      try {
        await changeItem(Number(changeButton.dataset.cartChange), Number(changeButton.dataset.cartQuantity));
      } catch (error) {
        showError(error.message);
      } finally {
        changeButton.disabled = false;
      }
    }
  });

  document.addEventListener('submit', async (event) => {
    const form = event.target.closest('[data-product-form]');
    if (!form || !window.CMP || !drawerEnabled) return;
    event.preventDefault();
    const submit = form.querySelector('[type="submit"]');
    const formError = form.querySelector('[data-product-error], [data-form-error]');
    submit?.setAttribute('aria-busy', 'true');
    if (formError) formError.hidden = true;
    try {
      const response = await fetch(`${window.CMP.routes.cartAdd}.js`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.description || 'No se pudo agregar el producto.');
      render(await fetchCart());
      if (liveRegion) liveRegion.textContent = `${result.product_title || 'Producto'} añadido al carrito.`;
      open();
    } catch (error) {
      if (formError) {
        formError.textContent = error.message;
        formError.hidden = false;
      }
      if (liveRegion) liveRegion.textContent = error.message;
    } finally {
      submit?.removeAttribute('aria-busy');
    }
  });

  window.CMPCart = { open, close, refresh: async () => render(await fetchCart()) };
})();
