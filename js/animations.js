// Animations JavaScript File
document.addEventListener("DOMContentLoaded", function () {
  initFloatingShapes();
  initScrollEffects();
  initParallaxEffects();
  initHoverAnimations();
});

// Floating Shapes Animation
function initFloatingShapes() {
  const shapes = document.querySelectorAll(".floating-shapes .shape");

  shapes.forEach((shape, index) => {
    // Set random initial positions
    shape.style.left = Math.random() * 100 + "%";
    shape.style.top = Math.random() * 100 + "%";

    // Set random animation duration and delay
    const duration = 15 + Math.random() * 10;
    const delay = Math.random() * 5;

    shape.style.animationDuration = duration + "s";
    shape.style.animationDelay = delay + "s";
  });
}

// Scroll Effects
function initScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  const animateElements = document.querySelectorAll(
    ".skill-item, .project-card, .stat-card"
  );
  animateElements.forEach((el) => observer.observe(el));
}

// Parallax Effects
function initParallaxEffects() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".parallax");

    parallaxElements.forEach((element) => {
      const speed = element.dataset.speed || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// Hover Animations
function initHoverAnimations() {
  // Add hover effects to interactive elements
  const hoverElements = document.querySelectorAll(
    ".btn, .skill-item, .project-card"
  );

  hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.02)";
    });

    element.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
}

// Typing Effect Enhancement
function enhanceTypingEffect() {
  const typingText = document.getElementById("typing-text");
  if (!typingText) return;

  const texts = [
    "Software Engineer",
    "Full Stack Developer",
    "AI/ML Enthusiast",
    "Flutter Developer",
    "CS & Business Systems Student",
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 100 : 150;

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500; // Pause before next word
    }

    setTimeout(type, typeSpeed);
  }

  // Start typing effect
  setTimeout(type, 1000);
}

// Initialize enhanced typing effect
document.addEventListener("DOMContentLoaded", enhanceTypingEffect);

// Smooth reveal animations
function initRevealAnimations() {
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
}

// Initialize reveal animations
document.addEventListener("DOMContentLoaded", initRevealAnimations);

// Particle system enhancement
function enhanceParticleSystem() {
  const particlesContainer = document.getElementById("particles");
  if (!particlesContainer) return;

  // Add mouse interaction to particles
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Create additional floating elements
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.className = "floating-particle";
    particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 171, 240, 0.6);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${10 + Math.random() * 10}s infinite linear;
        `;
    particlesContainer.appendChild(particle);
  }
}

// Initialize particle enhancement
document.addEventListener("DOMContentLoaded", enhanceParticleSystem);

// Add CSS animations dynamically
const style = document.createElement("style");
style.textContent = `
    @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); opacity: 1; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 0.5; }
        100% { transform: translateY(-40px) rotate(360deg); opacity: 0; }
    }

    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }

    .reveal.revealed {
        opacity: 1;
        transform: translateY(0);
    }

    .floating-particle {
        animation: float 10s infinite linear;
    }

    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
