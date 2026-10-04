// ===============================
// MOBILE NAVIGATION
// ===============================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

  navMenu.classList.toggle("open", !isOpen);
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.textContent = isOpen ? "☰" : "✕";
});

// Close mobile menu after clicking a link

navMenu.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});


// ===============================
// PRODUCT CATEGORY FILTER
// ===============================

const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedCategory = button.dataset.filter;

    // Update the active button

    filterButtons.forEach(function (item) {
      item.classList.remove("active");
    });

    button.classList.add("active");

    // Show matching products

    productCards.forEach(function (card) {
      if (
        selectedCategory === "all" ||
        card.dataset.category === selectedCategory
      ) {
        card.hidden = false;
      } else {
        card.hidden = true;
      }
    });
  });
});


// ===============================
// PRODUCT ENQUIRY LINKS
// ===============================

const enquiryLinks = document.querySelectorAll("[data-inquiry]");
const categorySelect = document.querySelector(
  'select[name="category"]'
);

enquiryLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    const requestedCategory = link.dataset.inquiry;

    if (!categorySelect) {
      return;
    }

    const matchingOption = Array.from(
      categorySelect.options
    ).find(function (option) {
      return option.text === requestedCategory;
    });

    if (matchingOption) {
      categorySelect.value = matchingOption.value;
    }
  });
});


// ===============================
// QUOTATION FORM
// ===============================

const quoteForm = document.getElementById("quoteForm");
const formMessage = document.getElementById("formMessage");

quoteForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!quoteForm.reportValidity()) {
    return;
  }

  const formData = new FormData(quoteForm);

  const name = formData.get("name");
  const company = formData.get("company") || "Not provided";
  const email = formData.get("email");
  const phone = formData.get("phone") || "Not provided";
  const category = formData.get("category");
  const message = formData.get("message");

  const subject = encodeURIComponent(
    "Quotation Enquiry - " + category
  );

  const body = encodeURIComponent(
    `Hello MACHPULSE TRADING FZE LLC,

I would like to request a quotation.

Name: ${name}
Company: ${company}
Email: ${email}
Phone: ${phone}
Product Category: ${category}

Project Requirements:
${message}

Thank you.`
  );

  formMessage.textContent =
    "Opening your email application with the enquiry details. Please send the email to complete your request.";

  window.location.href =
    "mailto:info@machpulsetrading.com" +
    "?subject=" + subject +
    "&body=" + body;
});


// ===============================
// AUTOMATIC COPYRIGHT YEAR
// ===============================

document.getElementById("year").textContent =
  new Date().getFullYear();