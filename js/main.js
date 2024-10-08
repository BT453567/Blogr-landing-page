const menuLinks = document.querySelectorAll('.popup-link');
const menuButton = document.getElementById('menu-button');
const menu = document.getElementById('nav-bar-mobile');
const body = document.getElementById("body");
const menuButtonIcon = document.getElementById('menu-button-icon');
const hamburgerIcon = './assets/images/icon-hamburger.svg';
const closeIcon = './assets/images/icon-close.svg';
const mobileProductButton = document.getElementById('mobile-product-menu-link');
const mobileMenuLinks = document.querySelectorAll('.mobile-link');

mobileMenuLinks.forEach(link => {
    link.addEventListener('click', (event) => {

        const isExpanded = link.getAttribute('aria-expanded') === 'true';
        const wrapper = link.parentElement.querySelector('.mobile-submenu-wrapper');

        link.setAttribute('aria-expanded', !isExpanded);

        wrapper.setAttribute('aria-hidden', isExpanded);
    });
});

menuLinks.forEach(link => {
    link.addEventListener('click', (event) => {

        event.stopPropagation();

        const isExpanded = link.getAttribute('aria-expanded') === 'true';
        
        if(!isExpanded) {
            menuLinks.forEach(otherLink => {
                otherLink.setAttribute('aria-expanded', 'false');
              });
        }

        link.setAttribute('aria-expanded', !isExpanded);
      });
});

document.addEventListener('click', () => {
  menuLinks.forEach(link => {
      link.setAttribute('aria-expanded', 'false');
  });
});

// Main mobile menu

function menuListener() {

  menu.setAttribute('aria-hidden', true);
  menu.removeEventListener('transitionend', menuListener);
}

function toggleMenu() {
  // Find current state of menu
  const isMenuOpen = menuButton.getAttribute('aria-expanded') === 'true';
  
  // Change attributes to new menu states
  menuButton.setAttribute('aria-expanded', !isMenuOpen);
  

  if (!isMenuOpen) {
      //open menu

      // change icon to close
      menuButtonIcon.src = closeIcon;

      //menu settings
      menu.removeEventListener('transitionend', menuListener);
      menu.setAttribute('aria-hidden', isMenuOpen);

      void menu.offsetHeight;

      //prevent scroll on body
      body.classList.add("no-scroll");

      //menu settings
      menu.classList.add('nav-bar-mobile--active');

  } else {
      // close menu
      menuButtonIcon.src = hamburgerIcon;

      //remove prevent scroll on body
      body.classList.remove("no-scroll");

      //menu 
      menu.addEventListener('transitionend', menuListener);
      menu.classList.remove('nav-bar-mobile--active');
      
  }
}

menuButton.addEventListener('click', toggleMenu);