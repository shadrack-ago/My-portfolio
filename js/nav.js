 // Close mobile menu on link click
 const navLinks = document.querySelectorAll(".nav-links li a");
 const check = document.getElementById("check");

 navLinks.forEach(link => {
   link.addEventListener("click", () => {
     check.checked = false;
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