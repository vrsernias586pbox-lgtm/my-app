document.addEventListener("DOMContentLoaded", function () {
  initializePortfolio();
});

function initializePortfolio() {
  initMobileNavigation();
  initSmoothScrolling();
  initSkillBars();
  initContactForm();
  initScrollAnimations();
  initNavbarScroll();
}

// Mobile Navigation Toggle
function initMobileNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });

    document.addEventListener("click", function (event) {
      if (
        !hamburger.contains(event.target) &&
        !navMenu.contains(event.target)
      ) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  }
}

// Smooth Scrolling
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Skill Bars Animation
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");

  const animateSkillBars = () => {
    skillBars.forEach((bar) => {
      const rect = bar.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight * 0.8) {
        const width = bar.getAttribute("data-width");
        bar.style.width = width + "%";
      }
    });
  };

  animateSkillBars();
  window.addEventListener("scroll", animateSkillBars);
}

// Contact Form
function initContactForm() {
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");

      if (!name || !email || !message) {
        showNotification("Please fill in all fields.", "error");
        return;
      }

      if (!isValidEmail(email)) {
        showNotification("Please enter a valid email address.", "error");
        return;
      }

      showNotification(
        "Message sent successfully! I'll get back to you soon.",
        "success"
      );
      this.reset();
    });
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showNotification(message, type = "info") {
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "16px 24px",
    borderRadius: "8px",
    color: type === "error" ? "#ff4444" : "#00d4ff",
    backgroundColor: "#111122",
    border: `2px solid ${type === "error" ? "#ff4444" : "#0099cc"}`,
    boxShadow: `0 4px 20px ${
      type === "error" ? "rgba(255, 68, 68, 0.3)" : "rgba(0, 212, 255, 0.3)"
    }`,
    zIndex: "9999",
    fontWeight: "500",
    maxWidth: "400px",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease",
  });

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 5000);
}

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    ".about-content, .skill-category, .contact-item, .stat-item"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// Navbar Scroll Effect
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;

    if (scrollTop > 50) {
      navbar.style.background = "rgba(10, 10, 26, 0.98)";
      navbar.style.backdropFilter = "blur(15px)";
      navbar.style.boxShadow = "0 2px 30px rgba(0, 212, 255, 0.3)";
    } else {
      navbar.style.background = "rgba(10, 10, 26, 0.95)";
      navbar.style.backdropFilter = "blur(10px)";
      navbar.style.boxShadow = "0 2px 20px rgba(0, 212, 255, 0.3)";
    }
  });
}

// Active Navigation Link
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const debouncedScrollHandler = debounce(() => {
  updateActiveNavLink();
}, 10);

window.addEventListener("scroll", debouncedScrollHandler);

console.log("Portfolio initialized successfully!");
