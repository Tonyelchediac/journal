      // Hamburger menu
      const hamburger = document.getElementById('hamburger');
      const navList = document.getElementById('nav-list');

      hamburger.addEventListener('click', () => {
        navList.classList.toggle('show');
      });

      // date
      const date = new Date();
      const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
      document.querySelector('.to-day').textContent = date.toLocaleDateString('en-US', options);




