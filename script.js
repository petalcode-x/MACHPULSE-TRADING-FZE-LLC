/* ========================================================= */
/* ================= MOBILE MENU =========================== */
/* ========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {

  menuToggle.addEventListener("click", () => {

    const isOpen = mainNav.classList.toggle("active");

    menuToggle.setAttribute(
      "aria-expanded",
      isOpen
    );

  });


  /* Close menu when clicking a navigation link */

  const navLinks = mainNav.querySelectorAll("a");

  navLinks.forEach((link) => {

    link.addEventListener("click", () => {

      mainNav.classList.remove("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });

}


/* ========================================================= */
/* ================= HERO SLIDER =========================== */
/* ========================================================= */

const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".hero-dot");
const nextButton = document.querySelector(".hero-next");
const prevButton = document.querySelector(".hero-prev");

let currentSlide = 0;
let slideTimer;


/* Show selected slide */

function showSlide(index) {

  if (!slides.length) {
    return;
  }


  if (index >= slides.length) {
    currentSlide = 0;
  }

  else if (index < 0) {
    currentSlide = slides.length - 1;
  }

  else {
    currentSlide = index;
  }


  slides.forEach((slide, i) => {

    slide.classList.toggle(
      "active",
      i === currentSlide
    );

  });


  dots.forEach((dot, i) => {

    dot.classList.toggle(
      "active",
      i === currentSlide
    );

  });

}


/* Next slide */

function nextSlide() {

  showSlide(currentSlide + 1);

}


/* Previous slide */

function previousSlide() {

  showSlide(currentSlide - 1);

}


/* Automatic slider */

function startSlider() {

  clearInterval(slideTimer);

  slideTimer = setInterval(() => {

    nextSlide();

  }, 5000);

}


/* Next button */

if (nextButton) {

  nextButton.addEventListener("click", () => {

    nextSlide();

    startSlider();

  });

}


/* Previous button */

if (prevButton) {

  prevButton.addEventListener("click", () => {

    previousSlide();

    startSlider();

  });

}


/* Dots */

dots.forEach((dot) => {

  dot.addEventListener("click", () => {

    const slideNumber = Number(
      dot.dataset.slide
    );

    showSlide(slideNumber);

    startSlider();

  });

});


/* Start slider */

if (slides.length > 0) {

  showSlide(0);

  startSlider();

}


/* ========================================================= */
/* ================= PRODUCT FILTER ======================== */
/* ========================================================= */

const filterButtons =
  document.querySelectorAll(".filter-btn");

const productCards =
  document.querySelectorAll(".product-card");


/* ========================================================= */
/* ============== SHOW PRODUCT CATEGORY ==================== */
/* ========================================================= */

function showProductCategory(category) {

  productCards.forEach((card) => {

    if (card.dataset.product === category) {

      card.classList.remove("hidden");

    }

    else {

      card.classList.add("hidden");

    }

  });


  /* Change selected filter button */

  filterButtons.forEach((button) => {

    if (button.dataset.filter === category) {

      button.classList.add("selected");

    }

    else {

      button.classList.remove("selected");

    }

  });

}


/* ========================================================= */
/* ============== INITIAL PAGE LOAD ======================== */
/* ========================================================= */

/*
   When the website first opens,
   show ONLY the 5 Bearings products.
*/

if (productCards.length > 0) {

  showProductCategory("bearings");

}


/* ========================================================= */
/* ================= FILTER BUTTONS ======================== */
/* ========================================================= */

filterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const selectedFilter =
      button.dataset.filter;


    /* ===================================================== */
    /* ================= ALL PRODUCTS ======================= */
    /* ===================================================== */

    if (selectedFilter === "all") {

      productCards.forEach((card) => {

        card.classList.remove("hidden");

      });


      filterButtons.forEach((btn) => {

        btn.classList.remove("selected");

      });


      button.classList.add("selected");

      return;

    }


    /* ===================================================== */
    /* ================= CATEGORY =========================== */
    /* ===================================================== */

    showProductCategory(selectedFilter);

  });

});


/* ========================================================= */
/* ============== CATEGORY CARD FILTER ===================== */
/* ========================================================= */

const categoryCards =
  document.querySelectorAll(".category-card");


categoryCards.forEach((card) => {

  card.addEventListener("click", () => {

    const selectedCategory =
      card.dataset.category;


    /* Show selected category */

    showProductCategory(selectedCategory);


    /* Scroll to products section */

    const productsSection =
      document.getElementById("products");


    if (productsSection) {

      productsSection.scrollIntoView({
        behavior: "smooth"
      });

    }

  });

});


/* ========================================================= */
/* ================= PRODUCT ENQUIRY ======================= */
/* ========================================================= */

const inquiryLinks =
  document.querySelectorAll(".product-link");


const categorySelect =
  document.querySelector('select[name="category"]');


inquiryLinks.forEach((link) => {

  link.addEventListener("click", () => {

    const inquiry =
      link.dataset.inquiry;


    if (categorySelect && inquiry) {

      const options =
        Array.from(categorySelect.options);


      const matchingOption =
        options.find(
          (option) =>
            option.textContent.trim() === inquiry
        );


      if (matchingOption) {

        categorySelect.value =
          matchingOption.value;

      }

    }

  });

});


/* ========================================================= */
/* ================= QUOTE FORM ============================ */
/* ========================================================= */

const quoteForm =
  document.getElementById("quote-form");

const formMessage =
  document.getElementById("form-message");


if (quoteForm) {

  quoteForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const formData =
      new FormData(quoteForm);


    const name =
      formData.get("name") || "";

    const company =
      formData.get("company") || "";

    const email =
      formData.get("email") || "";

    const phone =
      formData.get("phone") || "";

    const category =
      formData.get("category") || "";

    const message =
      formData.get("message") || "";


    const subject =
      "Machinery Spare Parts Enquiry - " + category;


    const emailBody =
`Hello MACHPULSE TRADING FZE LLC,

I would like to enquire about machinery spare parts.

Name: ${name}
Company: ${company}
Email: ${email}
Phone: ${phone}
Required Category: ${category}

Requirements:
${message}

Thank you.`;


    /* Show message */

    if (formMessage) {

      formMessage.textContent =
        "Opening Gmail...";

    }


    /* Open Gmail compose window */

    const gmailURL =
      "https://mail.google.com/mail/?view=cm" +
      "&fs=1" +
      "&to=salesmachpulse@gmail.com" +
      "&su=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(emailBody);


    window.open(
      gmailURL,
      "_blank"
    );

  });

}


/* ========================================================= */
/* ================= CURRENT YEAR ========================== */
/* ========================================================= */

const yearElement =
  document.getElementById("year");


if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}


/* ========================================================= */
/* ================= BACK TO TOP =========================== */
/* ========================================================= */

const backToTop =
  document.querySelector(".back-to-top");


if (backToTop) {

  window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

      backToTop.classList.add("show");

    }

    else {

      backToTop.classList.remove("show");

    }

  });


  backToTop.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

}


/* ========================================================= */
/* ================= ACTIVE NAVIGATION ===================== */
/* ========================================================= */

const sections =
  document.querySelectorAll("main section[id]");

const navigationLinks =
  document.querySelectorAll(".main-nav > a:not(.nav-cta)");


window.addEventListener("scroll", () => {

  let currentSection = "";


  sections.forEach((section) => {

    const sectionTop =
      section.offsetTop - 120;

    const sectionHeight =
      section.offsetHeight;


    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {

      currentSection =
        section.getAttribute("id");

    }

  });


  navigationLinks.forEach((link) => {

    link.classList.remove("active");


    if (
      link.getAttribute("href") ===
      `#${currentSection}`
    ) {

      link.classList.add("active");

    }

  });

});


/* ========================================================= */
/* ========== ABOUT + ELECTRICAL SCROLL ANIMATION ========== */
/* ========================================================= */

/*
   ABOUT SECTION

   Image:
   Starts slightly toward the centre
   and moves to the LEFT.

   Text:
   Starts slightly toward the centre
   and moves to the RIGHT.


   ELECTRICAL SECTION

   Text:
   Starts slightly toward the centre
   and moves to the LEFT.

   Image:
   Starts slightly toward the centre
   and moves to the RIGHT.
*/


const animatedAboutSections = document.querySelectorAll(
  ".about-section, .electrical-about-section"
);


if (animatedAboutSections.length > 0) {

  const aboutObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) {
          return;
        }


        const section =
          entry.target;


        const image =
          section.querySelector(".about-photo");


        const text =
          section.querySelector(
            ".about-copy, .electrical-about-copy"
          );


        /* Animate image */

        if (image) {

          image.classList.add("about-visible");

        }


        /* Animate text */

        if (text) {

          text.classList.add("about-visible");

        }


        /* Animate only once */

        observer.unobserve(section);

      });

    },
    {
      threshold: 0.20
    }
  );


  animatedAboutSections.forEach((section) => {

    aboutObserver.observe(section);

  });

}


/* ========================================================= */
/* ================= REDUCED MOTION ======================== */
/* ========================================================= */

/*
   Respect users who have enabled
   reduced motion in their device settings.
*/

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

  document
    .querySelectorAll(
      ".about-copy, .electrical-about-copy, .about-photo > img"
    )
    .forEach((element) => {

      element.classList.add("about-visible");

    });

}
