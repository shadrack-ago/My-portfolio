// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.navbar-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      
      // Update icon based on menu state
      const icon = menuToggle.querySelector('i');
      
    if (mobileMenu.classList.contains('active')) {
        icon.setAttribute('data-lucide', 'x');
      } else {
        icon.setAttribute('data-lucide', 'menu');
      }
      lucide.createIcons();
    });
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        menuToggle.querySelector('i').setAttribute('data-lucide', 'menu');
        lucide.createIcons();
      });
    });
    
    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    
    function showTestimonial(index) {
      testimonials.forEach(card => card.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      testimonials[index].classList.add('active');
      dots[index].classList.add('active');
      currentIndex = index;
    }
    
    // Initialize dots click events
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => showTestimonial(index));
    });
    
    // Previous button
    prevBtn.addEventListener('click', () => {
      let newIndex = currentIndex - 1;
      if (newIndex < 0) newIndex = testimonials.length - 1;
      showTestimonial(newIndex);
    });
    
    // Next button
    nextBtn.addEventListener('click', () => {
      let newIndex = currentIndex + 1;
      if (newIndex >= testimonials.length) newIndex = 0;
      showTestimonial(newIndex);
    });
    
    // Auto advance testimonials every 5 seconds
    setInterval(() => {
      let newIndex = currentIndex + 1;
      if (newIndex >= testimonials.length) newIndex = 0;
      showTestimonial(newIndex);
    }, 5000);
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !message) {
          alert('Please fill in all required fields');
          return;
        }
        
        // Here you would typically send the form data to a server
        // For this example, we'll just show a success message
        alert('Message sent successfully! I will get back to you soon.');
        contactForm.reset();
      });
    }
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Account for fixed header
            behavior: 'smooth'
          });
        }
      });
    });

    // Project carousels logic
    function initProjectCarousel(trackId, prevBtnSelector, nextBtnSelector, visibleCount = 3) {
      const track = document.getElementById(trackId);
      const cards = Array.from(track.children);
      let currentIndex = 0;

      function updateCarousel() {
        cards.forEach((card, idx) => {
          if (idx >= currentIndex && idx < currentIndex + visibleCount) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      }

      updateCarousel();

      document.querySelector(prevBtnSelector).addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
        } else {
          currentIndex = Math.max(0, cards.length - visibleCount);
        }
        updateCarousel();
      });

      document.querySelector(nextBtnSelector).addEventListener('click', () => {
        if (currentIndex < cards.length - visibleCount) {
          currentIndex++;
        } else {
          currentIndex = 0;
        }
        updateCarousel();
      });
    }

    // Initialize carousels for each group
    initProjectCarousel('webstack-track', '#webstack-carousel .prev', '#webstack-carousel .next');
    initProjectCarousel('data-track', '#data-carousel .prev', '#data-carousel .next');
    initProjectCarousel('ai-track', '#ai-carousel .prev', '#ai-carousel .next');

    // See More/See Less logic for project groups
    function setupSeeMoreButtons() {
      document.querySelectorAll('.see-more-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const group = btn.getAttribute('data-group');
          const grid = document.getElementById(`${group}-group`);
          const extras = grid.querySelectorAll('.extra-project');
          const isExpanded = btn.classList.toggle('expanded');
          extras.forEach(card => {
            if (isExpanded) {
              card.style.display = '';
              card.classList.add('fade-in');
            } else {
              card.style.display = 'none';
            }
          });
          btn.textContent = isExpanded ? 'See Less' : 'See More';
        });
      });
    }

    // Run on DOMContentLoaded
    window.addEventListener('DOMContentLoaded', function() {
      setupSeeMoreButtons();
    });
  });
  