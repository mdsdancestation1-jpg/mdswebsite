/**
 * Mobile Navigation - Hamburger Menu + Slide-in Drawer
 * Shared across all pages of M.D.S DANCE STATION website
 */
(function () {
  'use strict';

  // Detect which page is active based on the current URL
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // Navigation links configuration
  const navLinks = [
    { href: 'index.html', icon: 'home', label: 'Home' },
    { href: 'about.html', icon: 'info', label: 'About' },
    { href: 'courses.html', icon: 'school', label: 'Courses' },
    { href: 'gallery.html', icon: 'photo_library', label: 'Gallery' },
    { href: 'students.html', icon: 'groups', label: 'Students' },
    { href: 'contact.html', icon: 'mail', label: 'Contact' },
  ];

  // Build the mobile nav HTML
  function createMobileNav() {
    // Overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';
    overlay.id = 'mobileNavOverlay';

    // Drawer
    const drawer = document.createElement('div');
    drawer.className = 'mobile-nav-drawer';
    drawer.id = 'mobileNavDrawer';

    // Brand area
    const brand = document.createElement('div');
    brand.className = 'mobile-nav-brand';
    brand.innerHTML = '<img src="assets/icon.png" alt="Logo" /><span>M.D.S Dance Station</span>';
    drawer.appendChild(brand);

    // Nav links
    navLinks.forEach(function (link) {
      const a = document.createElement('a');
      a.href = link.href;
      if (currentPage === link.href || (currentPage === '' && link.href === 'index.html')) {
        a.className = 'active-link';
      }
      a.innerHTML = '<span class="material-symbols-outlined">' + link.icon + '</span> ' + link.label;
      drawer.appendChild(a);
    });

    // Action buttons
    const actions = document.createElement('div');
    actions.className = 'mobile-nav-actions';
    actions.innerHTML =
      '<a href="tel:+1234567890" class="call-btn"><span class="material-symbols-outlined">call</span> Call</a>' +
      '<a href="#" class="chat-btn"><span class="material-symbols-outlined">chat</span> Chat</a>';
    drawer.appendChild(actions);

    // Hamburger button
    const btn = document.createElement('button');
    btn.className = 'mobile-menu-btn md:hidden';
    btn.id = 'mobileMenuBtn';
    btn.setAttribute('aria-label', 'Toggle navigation menu');
    btn.innerHTML = '<span></span><span></span><span></span>';

    // Insert hamburger into the nav bar
    const navBar = document.querySelector('nav');
    if (navBar) {
      // Find the last flex div in nav (the call/chat icons area)
      const navInner = navBar.querySelector('.flex.justify-between');
      if (navInner) {
        // Find or create a wrapper for the right side
        const rightItems = navInner.lastElementChild;
        if (rightItems) {
          // Wrap call/chat in hidden md:flex and add hamburger
          rightItems.classList.add('flex', 'items-center', 'gap-3');

          // Find existing icon buttons/links and hide them on mobile
          const iconElements = rightItems.querySelectorAll('a, button');
          iconElements.forEach(function (el) {
            if (!el.classList.contains('mobile-menu-btn')) {
              el.classList.add('hidden', 'md:inline-flex');
            }
          });

          rightItems.appendChild(btn);
        }
      }
    }

    // Insert overlay and drawer into body
    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    return { btn: btn, overlay: overlay, drawer: drawer };
  }

  // Wait for DOM ready
  function init() {
    var elements = createMobileNav();
    var btn = elements.btn;
    var overlay = elements.overlay;
    var drawer = elements.drawer;

    function toggleMenu() {
      var isOpen = drawer.classList.contains('active');
      btn.classList.toggle('active', !isOpen);
      drawer.classList.toggle('active', !isOpen);
      overlay.classList.toggle('active', !isOpen);
      document.body.classList.toggle('nav-open', !isOpen);
    }

    function closeMenu() {
      btn.classList.remove('active');
      drawer.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('nav-open');
    }

    btn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);

    // Close on nav link click
    drawer.querySelectorAll('a:not(.call-btn):not(.chat-btn)').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
