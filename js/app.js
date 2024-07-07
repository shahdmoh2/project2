document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const navBarList = document.getElementById('navbar-list');
  const links = [];

  sections.forEach(sec => {
      const item = document.createElement('li');
      const sectionNumber = sec.getAttribute('id');
      const secName = sec.getAttribute('data-nav');
      item.innerHTML = `<a href="#${sectionNumber}" class="list-link">${secName}</a>`;
      navBarList.appendChild(item);
      links.push(item.firstChild);  // Store links for easy access later
  });

  links.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetSection = document.querySelector(e.target.getAttribute('href'));
          const offsetTop = targetSection.offsetTop - document.querySelector('header').offsetHeight;
          window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
          });
          highlightLink(link);
      });
  });

  const highlightLink = (link) => {
      links.forEach(lnk => lnk.classList.remove('active'));
      link.classList.add('active');
  };

  // New Scroll Event Listener Logic
  window.addEventListener('scroll', () => {
      sections.forEach((sec, index) => {
          const rect = sec.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight * 0.5) {
              highlightLink(links[index]);
          }
      });
  });

  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  window.addEventListener('scroll', () => {
      if (window.scrollY > window.innerHeight * 0.9) {
          scrollToTopBtn.style.display = 'block';
      } else {
          scrollToTopBtn.style.display = 'none';
      }
  });

  scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
});
