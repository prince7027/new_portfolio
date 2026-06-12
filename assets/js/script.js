'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// ===== CERTIFICATE PANEL =====
// Slide-in panel from right, main content shifts left
// ===== CERTIFICATE PANEL =====
// Panel HTML must exist in index.html (see below).
// All card data comes from data-* attributes on .certificate-card elements.

(function () {

  const overlay = document.getElementById("certPanelOverlay");
  const panel = document.getElementById("certPanel");
  const closeBtn = document.getElementById("certPanelClose");

  const mainContent = document.querySelector("main") ||
    document.querySelector(".main-content") ||
    document.querySelector("article") ||
    document.querySelector(".right-content");

  let activeCard = null;

  function openPanel(card) {
    const d = card.dataset;

    document.getElementById("cpImage").src = card.querySelector("img")?.src || "";
    document.getElementById("cpTitle").textContent = d.title || "";
    document.getElementById("cpOrg").textContent = d.org || "";
    document.getElementById("cpDate").textContent = d.date || "";
    document.getElementById("cpId").textContent = d.id || "";
    document.getElementById("cpIssuedTo").textContent = d.issuedTo || "—";
    document.getElementById("cpDescription").textContent = d.description || "";

    const credUrl = d.credentialUrl || "#";
    document.getElementById("cpUrl").href = credUrl;
    document.getElementById("cpDownload").href = credUrl;

    const skillsEl = document.getElementById("cpSkills");
    skillsEl.innerHTML = "";
    (d.skills ? d.skills.split(",").map(s => s.trim()).filter(Boolean) : [])
      .forEach(skill => {
        const tag = document.createElement("span");
        tag.className = "cert-skill-tag";
        tag.textContent = skill;
        skillsEl.appendChild(tag);
      });

    if (activeCard) activeCard.classList.remove("active");
    card.classList.add("active");
    activeCard = card;

    panel.classList.add("open");
    overlay.classList.add("open");
    if (mainContent) mainContent.classList.add("panel-open");
    panel.scrollTop = 0;
  }

  function closePanel() {
    panel.classList.remove("open");
    overlay.classList.remove("open");
    if (mainContent) mainContent.classList.remove("panel-open");
    if (activeCard) { activeCard.classList.remove("active"); activeCard = null; }
  }

  document.querySelectorAll(".certificate-card").forEach(card => {
    card.addEventListener("click", () => {
      (card === activeCard && panel.classList.contains("open")) ? closePanel() : openPanel(card);
    });
  });

  closeBtn.addEventListener("click", closePanel);
  overlay.addEventListener("click", e => { if (e.target === overlay) closePanel(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closePanel(); });

})();