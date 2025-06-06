function linkActiveToggle() {
  const navLinks = document.querySelectorAll(".js-link");

  function removeActiveClasses() {
    navLinks.forEach((link) => link.classList.remove("active"));
  }

  function setActiveLink(targetId) {
    const activeLink = document.querySelector(`#${targetId}`);
    if (activeLink) {
      removeActiveClasses();
      activeLink.classList.add("active");
    }
  }

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;

    if (scrollPosition < 350) {
      onScrollBelow350();
    } else if (scrollPosition >= 350 && scrollPosition < 1000) {
      onScrollBetween350And1000();
    } else {
      onScrollAbove1000();
    }
  });

  function onScrollBelow350() {
    setActiveLink("about-link");
  }

  function onScrollBetween350And1000() {
    setActiveLink("experience-link");
  }

  function onScrollAbove1000() {
    setActiveLink("projects-link");
  }
}

function createSpotlightInit() {
  function createSpotlight() {
    const spotlight = document.createElement("div");
    spotlight.className = "cursor-spotlight";
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

  const spotlight = createSpotlight();

  let mouseX = 0;
  let mouseY = 0;
  let isMouseMoving = false;

  function updateSpotlight() {
    if (isMouseMoving) {
      spotlight.style.background = `radial-gradient(600px at ${mouseX}px ${mouseY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
    }
    requestAnimationFrame(updateSpotlight);
  }

  function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseMoving = true;

    if (spotlight.style.opacity !== "1") {
      spotlight.style.opacity = "1";
    }
  }

  function handleMouseLeave() {
    isMouseMoving = false;
    spotlight.style.opacity = "0";
  }

  function handleMouseEnter() {
    spotlight.style.opacity = "1";
  }

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseleave", handleMouseLeave);
  document.addEventListener("mouseenter", handleMouseEnter);

  updateSpotlight();

  function updateSpotlightSize() {
    const screenWidth = window.innerWidth;
    let size = 600;

    if (screenWidth < 768) {
      size = 400;
    } else if (screenWidth < 1024) {
      size = 500;
    }

    spotlight.style.background = `radial-gradient(${size}px at ${mouseX}px ${mouseY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
  }

  window.addEventListener("resize", updateSpotlightSize);

  window.spotlightEffect = {
    updateSize: updateSpotlightSize,
    hide: () => (spotlight.style.opacity = "0"),
    show: () => (spotlight.style.opacity = "1"),
  };
}

function loadMoreProjects() {
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  function showNextBatch() {
    noInitial = true;
    const hiddenProjects = document.querySelectorAll(".project-card.hidden");
    if (hiddenProjects.length === 0) {
      loadMoreBtn.classList.add("hidden");
      return;
    }
    const projectsToShow = Array.from(hiddenProjects).slice(0, 3);

    projectsToShow.forEach((project, index) => {
      setTimeout(() => {
        project.classList.remove("hidden");
        project.classList.add("fade-in");
        linkActiveToggle();
      }, index * 150);
    });

    setTimeout(() => {
      const remainingProjects = document.querySelectorAll(
        ".project-card.hidden"
      );

      if (remainingProjects.length === 0) {
        loadMoreBtn.classList.add("hidden");
      } else {
        loadMoreBtn.textContent = `Load More Projects (${remainingProjects.length} remaining)`;
      }
    }, 600);
  }

  loadMoreBtn.addEventListener("click", showNextBatch);
}

window.addEventListener("DOMContentLoaded", () => {
  linkActiveToggle();
  createSpotlightInit();
  loadMoreProjects();
});
