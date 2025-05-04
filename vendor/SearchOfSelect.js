function enhanceSelectWithSearch() {
  const styleId = 'custom-dropdown-style';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .custom-dropdown {
        position: relative;
        display: inline-block;
        width: 100%;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }

      .custom-dropdown button {
        text-align: left;
        padding: 0.6rem 1rem;
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        background-color: #fff;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: border-color 0.2s;
      }

      .custom-dropdown button:after {
        content: '';
        border: solid #666;
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 4px;
        transform: rotate(45deg);
        margin-left: 10px;
        transition: transform 0.2s;
      }

      .custom-dropdown button.open:after {
        transform: rotate(-135deg);
      }

      .custom-dropdown button:hover {
        border-color: #007bff;
      }

      .custom-dropdown button:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
      }

      .custom-dropdown ul {
        position: absolute;
        z-index: 1000;
        background: white;
        width: 100%;
        max-height: 240px;
        overflow-y: auto;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        list-style: none;
        padding: 0;
        margin: 5px 0 0 0;
        opacity: 0;
        transform: translateY(-10px) scale(0.95);
        transform-origin: top;
        pointer-events: none;
        transition: all 0.2s ease;
      }

      .custom-dropdown ul.show {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }

      .custom-dropdown ul li {
        padding: 0.6rem 1rem;
        cursor: pointer;
        transition: background-color 0.2s;
      }

      .custom-dropdown ul li:hover {
        background-color: #f1f5f9;
      }

      .custom-dropdown ul li.disabled-option {
        color: #999;
        cursor: not-allowed;
      }

      .custom-dropdown ul .search-input-wrapper {
        padding: 0.5rem;
        border-bottom: 1px solid #ddd;
        background-color: #f9fafb;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .custom-dropdown ul .search-input-wrapper input {
        flex: 1;
        padding: 0.4rem 0.6rem;
        border: 1px solid #ccc;
        border-radius: 0.4rem;
        transition: border-color 0.2s;
      }

      .custom-dropdown ul .search-input-wrapper input:focus {
        border-color: #007bff;
        outline: none;
        box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
      }

      .custom-dropdown ul li.focused {
        background-color: #e2e8f0 !important;
      }

      .custom-dropdown button.placeholder {
        color: #666;
        opacity: 0.9;
      }

      .search-input-wrapper:focus-within {
        background-color: #fff;
      }

      .search-icon {
        color: #666;
        transition: color 0.2s;
        font-size: 1rem;
      }

      .search-input-wrapper:focus-within .search-icon {
        color: #007bff;
      }
    `;
    document.head.appendChild(style);
  }

  document.querySelectorAll('.searchable-select:not([data-enhanced])').forEach(originalSelect => {
    originalSelect.setAttribute('data-enhanced', 'true');
    originalSelect.style.display = 'none';

    const wrapper = document.createElement('div');
    wrapper.classList.add('custom-dropdown');

    const list = document.createElement('ul');
    list.setAttribute('role', 'listbox');

    // إنشاء حقل البحث مع أيقونة العدسة (بدون Font Awesome)
    const searchWrapper = document.createElement('li');
    searchWrapper.classList.add('search-input-wrapper');
    
    const searchIcon = document.createElement('span');
    searchIcon.classList.add('search-icon');
    searchIcon.innerHTML = '🔍'; // استخدام رمز Unicode بدلاً من Font Awesome
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search...';
    
    searchWrapper.appendChild(searchIcon);
    searchWrapper.appendChild(searchInput);
    list.appendChild(searchWrapper);

    // باقي الكود يبقى كما هو...
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-haspopup', 'listbox');
    button.setAttribute('aria-expanded', 'false');

    const placeholderText = originalSelect.getAttribute('data-placeholder') || 'Please select...';

    const updateButtonText = (text, isPlaceholder = false) => {
      button.textContent = text;
      if (isPlaceholder) {
        button.classList.add('placeholder');
      } else {
        button.classList.remove('placeholder');
      }
    };

    updateButtonText(placeholderText, true);
    wrapper.appendChild(button);

    let focusedIndex = -1;

    const renderList = (filter = '') => {
      const fragment = document.createDocumentFragment();
      list.querySelectorAll('li.option-item').forEach(li => li.remove());
      const options = Array.from(originalSelect.options).filter(opt => opt.value !== '');

      const filteredOptions = options.filter(option =>
        option.text.toLowerCase().includes(filter.toLowerCase())
      );

      filteredOptions.forEach((option, index) => {
        const li = document.createElement('li');
        li.textContent = option.text;
        li.classList.add('option-item');
        li.setAttribute('role', 'option');
        li.setAttribute('tabindex', '-1');

        if (option.disabled) {
          li.classList.add('disabled-option');
        } else {
          li.addEventListener('click', () => {
            originalSelect.value = option.value;
            updateButtonText(option.text);
            const event = new Event('change');
            originalSelect.dispatchEvent(event);
            list.classList.remove('show');
            button.classList.remove('open');
            button.setAttribute('aria-expanded', 'false');

            if (originalSelect.id) {
              localStorage.setItem('dropdown_' + originalSelect.id, option.value);
            }
          });
        }
        fragment.appendChild(li);
      });

      list.appendChild(fragment);
      focusedIndex = -1;
    };

    const restorePreviousSelection = () => {
      if (originalSelect.id) {
        const savedValue = localStorage.getItem('dropdown_' + originalSelect.id);
        if (savedValue) {
          const matchedOption = Array.from(originalSelect.options).find(opt => opt.value === savedValue);
          if (matchedOption) {
            originalSelect.value = savedValue;
            updateButtonText(matchedOption.text);
          }
        }
      }
    };

    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = list.classList.contains('show');
      document.querySelectorAll('.custom-dropdown ul').forEach(l => l.classList.remove('show'));
      document.querySelectorAll('.custom-dropdown button').forEach(b => {
        b.classList.remove('open');
        b.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        renderList('');
        list.classList.add('show');
        button.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
        searchInput.focus();
      }
    });

    searchInput.addEventListener('input', (e) => {
      renderList(e.target.value);
    });

    document.addEventListener('click', (e) => {
      if (!wrapper.contains(e.target)) {
        list.classList.remove('show');
        button.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
      }
    });

    button.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        button.click();
      }
    });

    list.addEventListener('keydown', (e) => {
      const options = Array.from(list.querySelectorAll('li.option-item:not(.disabled-option)'));

      if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault();
        if (options.length === 0) return;
        focusedIndex = e.key === 'ArrowDown'
          ? (focusedIndex + 1) % options.length
          : (focusedIndex - 1 + options.length) % options.length;
        options.forEach(opt => opt.classList.remove('focused'));
        options[focusedIndex].classList.add('focused');
        options[focusedIndex].focus();
      }

      if (e.key === 'Enter' && focusedIndex > -1) {
        options[focusedIndex].click();
      }

      if (e.key === 'Escape') {
        list.classList.remove('show');
        button.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
        button.focus();
      }
    });

    wrapper.appendChild(list);
    originalSelect.parentNode.insertBefore(wrapper, originalSelect.nextSibling);

    restorePreviousSelection();
  });
}

// Auto initialize + clean observer
document.addEventListener('DOMContentLoaded', () => {
  enhanceSelectWithSearch();

  const observer = new MutationObserver(() => {
    enhanceSelectWithSearch();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  window.addEventListener('beforeunload', () => {
    observer.disconnect();
  });
});