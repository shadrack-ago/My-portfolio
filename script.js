// Define closeModal function globally first
window.closeModal = function() {
  const modal = document.getElementById('discoveryModal');
  if (modal) {
    modal.classList.remove('active');
    // Mark as closed in session storage
    sessionStorage.setItem('discoveryModalClosed', 'true');
  }
};

// Function to show the discovery modal (triggered by button)
window.showDiscoveryModal = function() {
  const modal = document.getElementById('discoveryModal');
  if (modal) {
    modal.classList.add('active');
    // Initialize icons
    setTimeout(() => {
      lucide.createIcons();
    }, 100);
  }
};

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.navbar-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        
        // Update icon based on menu state
        const icon = menuToggle.querySelector('i');
        
        if (mobileMenu.classList.contains('active')) {
          icon && icon.setAttribute('data-lucide', 'x');
        } else {
          icon && icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
      });
      // Close mobile menu when clicking on a link
      const mobileLinks = mobileMenu.querySelectorAll('a');
      mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
          mobileMenu.classList.remove('active');
          const icon = menuToggle.querySelector('i');
          icon && icon.setAttribute('data-lucide', 'menu');
          lucide.createIcons();
        });
      });
    }
    
    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    
    function showTestimonial(index) {
      if (!testimonials.length || !dots.length) return;
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
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = testimonials.length - 1;
        showTestimonial(newIndex);
      });
    }
    
    // Next button
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
      });
    }
    
    // Auto advance testimonials every 5 seconds
    if (testimonials.length) {
      setInterval(() => {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
      }, 5000);
    }
    
    //contact form submission
    function sendEmail(){
      const formStatus = document.getElementById('form-status');
      const submitBtn = document.getElementById('submitBtn');

      let params = {
        name : document.getElementById('name').value,
        email : document.getElementById('email').value,
        subject : document.getElementById('subject').value,
        message : document.getElementById('message').value
      }
      
      // Basic validation (browser also enforces required attributes)
      if(!params.name || !params.email || !params.subject || !params.message){
        if (formStatus) {
          formStatus.textContent = 'Please fill in all required fields.';
          formStatus.className = 'form-status error';
        } else {
          alert('Please fill in all required fields');
        }
        return;
      }

      // UI: disable while sending
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }
      if (formStatus) {
        formStatus.textContent = 'Sending your message...';
        formStatus.className = 'form-status';
      }
      
      emailjs.send("service_4eluhde","template_114jkgj",params)
        .then(function(response){
          if (formStatus) {
            formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
            formStatus.className = 'form-status success';
          } else {
            alert("Message sent successfully! I will get back to you soon.");
          }
          document.getElementById('contactForm').reset();
        }, function(error){
          const errorMsg = (error && (error.text || error.message)) ? `Failed to send: ${error.text || error.message}` : 'Failed to send message. Please try again later.';
          if (formStatus) {
            formStatus.textContent = errorMsg;
            formStatus.className = 'form-status error';
          } else {
            alert(errorMsg);
          }
        })
        .finally(function(){
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i data-lucide="send"></i> Send Message';
            lucide.createIcons();
          }
        });
    }

    // Attach sendEmail to form submit event
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        sendEmail();
      });
    }
    
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

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Discovery Call Modal Functionality
    const discoveryModal = document.getElementById('discoveryModal');
    
    if (discoveryModal) {
      // Close modal when clicking outside (on overlay)
      discoveryModal.addEventListener('click', function(e) {
        if (e.target === discoveryModal) {
          closeModal();
        }
      });

      // Close modal on Escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && discoveryModal.classList.contains('active')) {
          closeModal();
        }
      });

      // Check if modal was already closed in this session
      const modalClosed = sessionStorage.getItem('discoveryModalClosed');
      
      // Show modal after 4.5 seconds if not already closed
      if (!modalClosed) {
        setTimeout(() => {
          discoveryModal.classList.add('active');
          // Initialize icons after showing modal
          setTimeout(() => {
            lucide.createIcons();
          }, 100);
        }, 4500); // 4.5 seconds delay
      }
    }
  });
  