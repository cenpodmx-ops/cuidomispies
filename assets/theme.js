(() => {
  const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const closeMobileMenu = () => {
    const menu = document.querySelector('[data-mobile-menu]');
    if (!menu) return;
    menu.hidden = true;
    document.body.classList.remove('cmp-menu-open');
    document.querySelector('[data-mobile-menu-open]')?.setAttribute('aria-expanded', 'false');
  };

  document.addEventListener('click', (event) => {
    const opener = event.target.closest('[data-mobile-menu-open]');
    if (opener) {
      const menu = document.querySelector('[data-mobile-menu]');
      if (!menu) return;
      menu.hidden = false;
      document.body.classList.add('cmp-menu-open');
      opener.setAttribute('aria-expanded', 'true');
      menu.querySelector(focusableSelector)?.focus();
      return;
    }

    if (event.target.closest('[data-mobile-menu-close]') || event.target.matches('[data-mobile-menu-overlay]')) {
      closeMobileMenu();
    }

    const quantityButton = event.target.closest('[data-quantity-change]');
    if (quantityButton) {
      const wrapper = quantityButton.closest('[data-quantity]');
      const input = wrapper?.querySelector('input[type="number"]');
      if (!input) return;
      const step = Number(quantityButton.dataset.quantityChange || 0);
      const minimum = Number(input.min || 1);
      input.value = String(Math.max(minimum, Number(input.value || minimum) + step));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }

    const galleryButton = event.target.closest('[data-gallery-thumbnail]');
    if (galleryButton) {
      const gallery = galleryButton.closest('[data-product-gallery]');
      const target = gallery?.querySelector(`[data-gallery-media="${galleryButton.dataset.galleryThumbnail}"]`);
      if (!target) return;
      gallery.querySelectorAll('[data-gallery-media]').forEach((media) => { media.hidden = media !== target; });
      gallery.querySelectorAll('[data-gallery-thumbnail]').forEach((button) => {
        button.setAttribute('aria-current', String(button === galleryButton));
      });
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMobileMenu();
      window.CMPCart?.close();
    }
  });

  document.querySelectorAll('[data-product-section]').forEach((section) => {
    const select = section.querySelector('[data-variant-select]');
    const price = section.querySelector('[data-product-price]');
    const compare = section.querySelector('[data-product-compare-price]');
    const submit = section.querySelector('[data-product-submit]');
    const variantsScript = section.querySelector('[data-product-variants]');
    if (!select || !variantsScript) return;

    let variants = [];
    try {
      variants = JSON.parse(variantsScript.textContent);
    } catch (_error) {
      return;
    }

    select.addEventListener('change', () => {
      const variant = variants.find((item) => String(item.id) === select.value);
      if (!variant) return;
      const formatter = new Intl.NumberFormat(document.documentElement.lang || 'es-MX', {
        style: 'currency',
        currency: window.CMP?.currency || 'MXN',
        maximumFractionDigits: 0
      });
      if (price) price.textContent = formatter.format(variant.price / 100);
      if (compare) {
        compare.textContent = variant.compare_at_price ? formatter.format(variant.compare_at_price / 100) : '';
        compare.hidden = !variant.compare_at_price;
      }
      if (submit) {
        submit.disabled = !variant.available;
        const label = submit.querySelector('[data-submit-label]');
        if (label) label.textContent = variant.available ? 'Añadir al carrito' : 'Agotado';
      }
      if (history.replaceState) {
        const url = new URL(window.location.href);
        url.searchParams.set('variant', variant.id);
        history.replaceState({}, '', url);
      }
    });
  });
})();
