document.addEventListener('DOMContentLoaded', function() {
    // Scroll animation
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
      fadeObserver.observe(element);
    });

    // Progress bars animation
    const progressBars = document.querySelectorAll('.progress-bar');
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.style.width;
          entry.target.style.width = '0';
          setTimeout(() => {
            entry.target.style.width = width;
          }, 300);
        }
      });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
      progressObserver.observe(bar);
    });

    // Navbar animation on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Update active navbar item
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 150)) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    });

    // Handling the Show more/less button for projects
    const toggleButton = document.getElementById('toggleProjects');
    const hiddenProjects = document.querySelectorAll('.project-item.hidden');
    const showText = toggleButton.querySelector('.show-text');
    const hideText = toggleButton.querySelector('.hide-text');
    let projectsExpanded = false;

    toggleButton.addEventListener('click', function() {
      if (!projectsExpanded) {
        // Show hidden projects with animation
        hiddenProjects.forEach((project, index) => {
          setTimeout(() => {
            project.classList.remove('hidden');
            project.classList.add('show-animated');
          }, index * 100); // Cascade effect
        });

        // Change button text
        showText.style.display = 'none';
        hideText.style.display = 'inline-block';
        projectsExpanded = true;

        // Smooth scroll to new projects after a short delay
        setTimeout(() => {
          const firstHiddenProject = hiddenProjects[0];
          if (firstHiddenProject) {
            firstHiddenProject.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
          }
        }, 200);
      } else {
        // Hide additional projects
        hiddenProjects.forEach(project => {
          project.classList.add('hidden');
          project.classList.remove('show-animated');
        });

        // Change button text
        showText.style.display = 'inline-block';
        hideText.style.display = 'none';
        projectsExpanded = false;

        // Scroll to the top of the projects section
        document.getElementById('projects').scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    });

    // Modal Image Handling
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('imageModalLabel');

    if (imageModal) {
      imageModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const imgSrc = button.getAttribute('data-img-src');
        const imgAlt = button.getAttribute('data-img-alt');

        modalImage.src = imgSrc;
        modalImage.alt = imgAlt;
        modalTitle.textContent = imgAlt;
      });
    }
});

// Contact form handling (outside DOMContentLoaded or inside? Inside is better but ID lookup needs DOM)
// The original code had it mixed. Let's put it completely inside DOMContentLoaded or leave it if defer used.
// I'll put it in a separate event listener for safety.

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
        
          const form = this;
          const formData = new FormData(form);
          const formMessage = document.getElementById('formMessage');
          const submitButton = form.querySelector('button[type="submit"]');
        
          // Disable button
          submitButton.disabled = true;
          submitButton.textContent = 'Sending...';
          formMessage.innerHTML = '<div class="alert alert-info"><i class="bi bi-hourglass-split me-2"></i>Sending your message...</div>';
        
          // AJAX to Formspree
          fetch('https://formspree.io/f/xpwbvrod', {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          })
          .then(response => {
            if (response.ok) {
              formMessage.innerHTML = '<div class="alert alert-success"><i class="bi bi-check-circle me-2"></i>Message sent successfully! I will reply soon.</div>';
              form.reset();
            } else {
              return response.json().then(data => {
                throw new Error(data.error || 'Error sending message');
              });
            }
          })
          .catch(error => {
            formMessage.innerHTML = '<div class="alert alert-danger"><i class="bi bi-exclamation-triangle me-2"></i>Error: ' + error.message + '. Please try again or contact me directly.</div>';
          })
          .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
          });
        });
    }
});
