// ===========================
// SERVICE PAGE JAVASCRIPT
// ===========================

;(() => {
  // ===========================
  // IMAGE CAROUSEL
  // ===========================
  const carouselImages = document.getElementById("carouselImages")
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")
  const indicators = document.querySelectorAll(".carousel__indicator")

  if (carouselImages && prevBtn && nextBtn) {
    const images = carouselImages.querySelectorAll(".carousel__image")
    let currentIndex = 0

    function showImage(index) {
      images.forEach((img, i) => {
        img.classList.toggle("active", i === index)
      })

      indicators.forEach((indicator, i) => {
        indicator.classList.toggle("active", i === index)
      })
    }

    function nextImage() {
      currentIndex = (currentIndex + 1) % images.length
      showImage(currentIndex)
    }

    function prevImage() {
      currentIndex = (currentIndex - 1 + images.length) % images.length
      showImage(currentIndex)
    }

    prevBtn.addEventListener("click", prevImage)
    nextBtn.addEventListener("click", nextImage)

    // Indicator clicks
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        currentIndex = index
        showImage(currentIndex)
      })
    })

    // Auto-advance carousel every 5 seconds
    setInterval(nextImage, 5000)
  }

  // ===========================
  // BOOKING FORM SUBMISSION
  // ===========================
  const bookingForm = document.getElementById("bookingForm")
  const toast = document.getElementById("toast")

  if (bookingForm && toast) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const date = document.getElementById("bookingDate").value
      const time = document.getElementById("bookingTime").value
      const type = document.getElementById("serviceType").value

      // Show toast notification
      toast.classList.add("show")

      // Update cart badge
      const cartBadge = document.querySelector(".cart-badge")
      if (cartBadge) {
        const currentCount = Number.parseInt(cartBadge.textContent)
        cartBadge.textContent = currentCount + 1
      }

      // Reset form
      bookingForm.reset()

      // Hide toast after 5 seconds
      setTimeout(() => {
        toast.classList.remove("show")
      }, 5000)
    })
  }

  // ===========================
  // SET MINIMUM DATE FOR BOOKING
  // ===========================
  const bookingDateInput = document.getElementById("bookingDate")
  if (bookingDateInput) {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const year = tomorrow.getFullYear()
    const month = String(tomorrow.getMonth() + 1).padStart(2, "0")
    const day = String(tomorrow.getDate()).padStart(2, "0")

    bookingDateInput.min = `${year}-${month}-${day}`
  }
})()
