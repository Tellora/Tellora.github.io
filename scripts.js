// Create animated background particles
function createParticles() {
  const particlesContainer = document.querySelector('.particles');
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random size between 2px and 6px
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      
      // Random opacity
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      
      // Animation
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      particle.style.animation = `float ${duration}s ${delay}s infinite linear`;
      
      particlesContainer.appendChild(particle);
  }
}

// Interactive element following mouse
function setupInteractiveElement() {
  const interactiveElement = document.querySelector('.interactive-element');
  
  document.addEventListener('mousemove', (e) => {
      const x = e.clientX;
      const y = e.clientY;
      
      interactiveElement.style.left = `${x}px`;
      interactiveElement.style.top = `${y}px`;
      interactiveElement.style.opacity = '0.7';
  });
  
  document.addEventListener('mouseout', () => {
      interactiveElement.style.opacity = '0';
  });
}

// Header Scroll Effect
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
      header.classList.add('scrolled');
  } else {
      header.classList.remove('scrolled');
  }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', function() {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
  });
});

// Scroll Animation
function checkFadeElements() {
  const animatedElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .zoom-in');
  animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('active');
      }
  });
}

// Count animation for stats
function animateStats() {
  const stats = document.querySelectorAll('.stat-number');
  stats.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'));
      const duration = 2000; // 2 seconds
      const step = target / (duration / 16); // 60fps
      let current = 0;
      
      const updateStat = () => {
          current += step;
          if (current < target) {
              stat.textContent = Math.floor(current);
              requestAnimationFrame(updateStat);
          } else {
              stat.textContent = target + '+';
          }
      };
      
      // Only start animation when element is in view
      const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
              updateStat();
              observer.disconnect();
          }
      });
      
      observer.observe(stat);
  });
}

// Services Tabs
function setupServicesTabs() {
  const tabs = document.querySelectorAll('.services-tab');
  const contents = document.querySelectorAll('.service-content');
  
  tabs.forEach(tab => {
      tab.addEventListener('click', () => {
          const target = tab.getAttribute('data-tab');
          
          // Remove active class from all tabs and contents
          tabs.forEach(t => t.classList.remove('active'));
          contents.forEach(c => c.classList.remove('active'));
          
          // Add active class to clicked tab and corresponding content
          tab.classList.add('active');
          document.getElementById(`${target}-content`).classList.add('active');
      });
  });
  
  // Handle service card buttons
  document.querySelectorAll('.service-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
          e.preventDefault();
          const target = btn.getAttribute('data-tab');
          
          // Scroll to services detail section
          document.querySelector('.services-detail').scrollIntoView({ behavior: 'smooth' });
          
          // Activate the corresponding tab
          setTimeout(() => {
              document.getElementById(`${target}-tab`).click();
          }, 500);
      });
  });
}

// Portfolio Filter
function setupPortfolioFilter() {
  const filterButtons = document.querySelectorAll('.portfolio-filter button');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach(button => {
      button.addEventListener('click', () => {
          // Remove active class from all buttons
          filterButtons.forEach(btn => btn.classList.remove('active'));
          // Add active class to clicked button
          button.classList.add('active');
          
          const filterValue = button.getAttribute('data-filter');
          
          portfolioItems.forEach(item => {
              if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
                  item.style.display = 'block';
              } else {
                  item.style.display = 'none';
              }
          });
      });
  });
}

// Contact Form Submission
function setupContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          alert('Thank you for your message! We will get back to you soon.');
          contactForm.reset();
      });
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  createParticles();
  setupInteractiveElement();
  checkFadeElements();
  animateStats();
  setupServicesTabs();
  setupPortfolioFilter();
  setupContactForm();
  
  // Add CSS animation for floating particles
  const style = document.createElement('style');
  style.textContent = `
      @keyframes float {
          0% {
              transform: translate(0, 0);
          }
          25% {
              transform: translate(10px, 10px);
          }
          50% {
              transform: translate(0, 20px);
          }
          75% {
              transform: translate(-10px, 10px);
          }
          100% {
              transform: translate(0, 0);
          }
      }
  `;
  document.head.appendChild(style);

  // Three.js 3D scene setup for hero section
  const canvas = document.getElementById('hero-3d-canvas');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Create a rotating cube
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshStandardMaterial({ color: 0xff6b00, metalness: 0.7, roughness: 0.2 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xff6b00, 1);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  camera.position.z = 5;

  // Resize handler
  function onWindowResize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', onWindowResize);
  onWindowResize();

  // Mouse move interaction
  let mouseX = 0;
  let mouseY = 0;
  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01 + mouseY * 0.05;
    cube.rotation.y += 0.01 + mouseX * 0.05;
    renderer.render(scene, camera);
  }
  animate();
});

window.addEventListener('scroll', checkFadeElements);
window.addEventListener('load', checkFadeElements);
(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9667443232eb8adb',t:'MTc1MzczNjAxMS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();
