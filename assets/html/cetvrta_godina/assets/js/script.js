'use strict';

const toggleActive = (elem) => elem?.classList.toggle('active');
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
const on = (element, event, handler) => element?.addEventListener(event, handler);

// Sidebar toggle
const sidebar = $('[data-sidebar]');
const sidebarBtn = $('[data-sidebar-btn]');
on(sidebarBtn, 'click', () => toggleActive(sidebar));

// Testimonials modal
const modalContainer = $('[data-modal-container]');
const modalCloseBtn = $('[data-modal-close-btn]');
const overlay = $('[data-overlay]');
const modalImg = $('[data-modal-img]');
const modalTitle = $('[data-modal-title]');
const modalText = $('[data-modal-text]');
const testimonialsItems = $$('[data-testimonials-item]');

const toggleModal = () => {
  toggleActive(modalContainer);
  toggleActive(overlay);
};

if (testimonialsItems.length && modalContainer && modalCloseBtn && overlay) {
  testimonialsItems.forEach((item) => {
    on(item, 'click', () => {
      const avatar = item.querySelector('[data-testimonials-avatar]');
      const title = item.querySelector('[data-testimonials-title]');
      const text = item.querySelector('[data-testimonials-text]');

      if (modalImg && avatar) {
        modalImg.src = avatar.src;
        modalImg.alt = avatar.alt;
      }

      if (modalTitle && title) modalTitle.innerHTML = title.innerHTML;
      if (modalText && text) modalText.innerHTML = text.innerHTML;

      toggleModal();
    });
  });

  on(modalCloseBtn, 'click', toggleModal);
  on(overlay, 'click', toggleModal);
}

// Filtering helpers
const select = $('[data-select]');
const selectItems = $$('[data-select-item]');
const selectValue = $('[data-select-value], [data-selecct-value]');
const filterButtons = $$('[data-filter-btn]');
const filterItems = $$('[data-filter-item]');

const setSelectLabel = (value) => {
  if (selectValue) selectValue.innerText = value;
};

const normalizeValue = (value) => (value || '').trim().toLowerCase() || 'all';

const applyFilter = (value) => {
  if (!filterItems.length) return;
  const normalized = normalizeValue(value);
  filterItems.forEach((item) => {
    const matches = normalized === 'all' || normalized === item.dataset.category;
    item.classList.toggle('active', matches);
  });
};

on(select, 'click', () => toggleActive(select));

if (selectItems.length) {
  selectItems.forEach((item) => {
    on(item, 'click', () => {
      const value = item.innerText.trim();
      setSelectLabel(value);
      if (select) toggleActive(select);
      applyFilter(value);
    });
  });
}

let lastClickedBtn = filterButtons.find((btn) => btn.classList.contains('active')) || filterButtons[0] || null;

if (filterButtons.length) {
  filterButtons.forEach((btn) => {
    on(btn, 'click', () => {
      const value = btn.innerText.trim();
      setSelectLabel(value);
      applyFilter(value);

      if (lastClickedBtn && lastClickedBtn !== btn) {
        lastClickedBtn.classList.remove('active');
      }

      btn.classList.add('active');
      lastClickedBtn = btn;
    });
  });
}

// Contact form validation
const form = $('[data-form]');
const formInputs = $$('[data-form-input]');
const formBtn = $('[data-form-btn]');

if (form && formInputs.length && formBtn) {
  const toggleSubmitState = () => {
    formBtn.toggleAttribute('disabled', !form.checkValidity());
  };

  formInputs.forEach((input) => on(input, 'input', toggleSubmitState));
  toggleSubmitState();
}

// Page navigation
const navigationLinks = $$('[data-nav-link]');
const pages = $$('[data-page]');

const resolveTarget = (link) => normalizeValue(link.dataset.navLink || link.textContent);

if (navigationLinks.length && pages.length) {
  const activatePage = (target) => {
    pages.forEach((page) => {
      page.classList.toggle('active', page.dataset.page === target);
    });

    navigationLinks.forEach((link) => {
      link.classList.toggle('active', resolveTarget(link) === target);
    });

    window.scrollTo(0, 0);
  };

  navigationLinks.forEach((link) => {
    on(link, 'click', () => activatePage(resolveTarget(link)));
  });
}
