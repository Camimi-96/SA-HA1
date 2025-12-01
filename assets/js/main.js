// ===========================
// 404 SERVICE - MAIN JAVASCRIPT
// ===========================

;(() => {
  // ===========================
  // HEADER SCROLL EFFECT
  // ===========================
  const header = document.getElementById("header")
  let lastScroll = 0

  function handleScroll() {
    const currentScroll = window.pageYOffset

    if (currentScroll > 10) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }

    lastScroll = currentScroll
  }

  window.addEventListener("scroll", handleScroll)

  // ===========================
  // MOBILE MENU TOGGLE
  // ===========================
  const menuToggle = document.getElementById("menuToggle")
  const mobileMenu = document.getElementById("mobileMenu")

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active")
      mobileMenu.classList.toggle("active")
    })

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll(".mobile-menu__link")
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active")
        mobileMenu.classList.remove("active")
      })
    })
  }

  // ===========================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ===========================
  const anchorLinks = document.querySelectorAll('a[href^="#"]')

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      // Skip if it's just "#"
      if (href === "#") {
        e.preventDefault()
        return
      }

      const target = document.querySelector(href)

      if (target) {
        e.preventDefault()
        const headerHeight = header.offsetHeight
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // ===========================
  // CONTACT FORM SUBMISSION
  // ===========================
  const contactForm = document.getElementById("contactForm")
  const toast = document.getElementById("toast")

  if (contactForm && toast) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Show toast notification
      toast.classList.add("show")

      // Reset form
      contactForm.reset()

      // Hide toast after 5 seconds
      setTimeout(() => {
        toast.classList.remove("show")
      }, 5000)
    })
  }

  // ===========================
  // INTERSECTION OBSERVER FOR ANIMATIONS
  // ===========================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements that should animate on scroll
  const animatedElements = document.querySelectorAll(".service-card, .benefit-card, .testimonial-card")

  animatedElements.forEach((el, index) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    el.style.transitionDelay = (index % 3) * 0.1 + "s"
    observer.observe(el)
  })
})()
