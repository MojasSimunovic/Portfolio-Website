function linkActiveToggle() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.js-link')

  function removeActiveClasses() {
    navLinks.forEach(link => link.classList.remove('active'));
  }
  function setActiveLink(targetId) {
    const activeLink = document.querySelector(`a[href="#${targetId}"]`);
    if (activeLink) {
      removeActiveClasses();
      activeLink.classList.add('active');
    }
  }

  // Intersection Observer options
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px', // Trigger when section is 20% from top
    threshold: 0.1
  };

  // Create intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  // Optional: Handle direct clicks on navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        setActiveLink(targetId);
      }
    });
  });
}

function createSpotlightInit() {
  
  // Create the spotlight element
  function createSpotlight() {
    const spotlight = document.createElement('div');
    spotlight.className = 'cursor-spotlight';
    spotlight.style.cssText = `
      pointer-events: none;
      position: fixed;
      inset: 0;
      z-index: 30;
      transition: opacity 0.3s ease;
      background: radial-gradient(600px at 50% 50%, rgba(29, 78, 216, 0.15), transparent 80%);
      opacity: 0;
    `;
    
    document.body.appendChild(spotlight);
    return spotlight;
  }

  // Initialize spotlight
  const spotlight = createSpotlight();

  // Track mouse movement
  let mouseX = 0;
  let mouseY = 0;
  let isMouseMoving = false;

  // Smooth animation using requestAnimationFrame
  function updateSpotlight() {
    if (isMouseMoving) {
      spotlight.style.background = `radial-gradient(600px at ${mouseX}px ${mouseY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
    }
    requestAnimationFrame(updateSpotlight);
  }

  // Mouse move handler
  function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseMoving = true;
    
    // Show spotlight when mouse moves
    if (spotlight.style.opacity !== '1') {
      spotlight.style.opacity = '1';
    }
  }

  // Mouse leave handler - hide spotlight when mouse leaves window
  function handleMouseLeave() {
    isMouseMoving = false;
    spotlight.style.opacity = '0';
  }

  // Mouse enter handler - show spotlight when mouse enters window
  function handleMouseEnter() {
    spotlight.style.opacity = '1';
  }

  // Event listeners
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseleave', handleMouseLeave);
  document.addEventListener('mouseenter', handleMouseEnter);

  // Start the animation loop
  updateSpotlight();

  // Optional: Different color variants
  const spotlightVariants = {
    blue: 'rgba(29, 78, 216, 0.15)',
    purple: 'rgba(147, 51, 234, 0.15)',
    green: 'rgba(34, 197, 94, 0.15)',
    orange: 'rgba(249, 115, 22, 0.15)',
    pink: 'rgba(236, 72, 153, 0.15)'
  };

  // Function to change spotlight color
  function changeSpotlightColor(colorName) {
    const color = spotlightVariants[colorName] || spotlightVariants.blue;
    spotlight.style.background = `radial-gradient(600px at ${mouseX}px ${mouseY}px, ${color}, transparent 80%)`;
  }

  // Optional: Responsive spotlight size
  function updateSpotlightSize() {
    const screenWidth = window.innerWidth;
    let size = 600;
    
    if (screenWidth < 768) {
      size = 400; // Smaller on mobile
    } else if (screenWidth < 1024) {
      size = 500; // Medium on tablets
    }
    
    spotlight.style.background = `radial-gradient(${size}px at ${mouseX}px ${mouseY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
  }

  // Listen for window resize to adjust spotlight size
  window.addEventListener('resize', updateSpotlightSize);

  // Export functions for external use (optional)
  window.spotlightEffect = {
    changeColor: changeSpotlightColor,
    updateSize: updateSpotlightSize,
    hide: () => spotlight.style.opacity = '0',
    show: () => spotlight.style.opacity = '1'
  };
}

window.addEventListener('DOMContentLoaded', ()=> {
  linkActiveToggle();
  createSpotlightInit();
})