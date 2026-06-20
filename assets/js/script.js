'use strict';

/* ===== CORE UTILITIES ===== */
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

/* ===== SIDEBAR TOGGLE FUNCTIONALITY ===== */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

/* ===== PORTFOLIO FILTER SYSTEM ===== */
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

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

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

if (filterBtn.length > 0) {
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
}

/* ===== CONTACT FORM VALIDATION ===== */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formInputs.length > 0 && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}

/* ===== PAGE NAV LINK CONTROLS ===== */
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}
/* ===== CERTIFICATE PANEL SYSTEM ===== */
(function () {
  const overlay = document.getElementById("certPanelOverlay");
  const panel = document.getElementById("certPanel");
  const closeBtn = document.getElementById("certPanelClose");

  const mainContent = document.querySelector("main") ||
    document.querySelector(".main-content") ||
    document.querySelector("article") ||
    document.querySelector(".right-content");

  let activeCard = null;
  let panelOpenedByUs = false; // flag to track if WE pushed a state

  function openPanel(card) {
    const d = card.dataset;

    const cpImg = document.getElementById("cpImage");
    if (cpImg) cpImg.src = card.querySelector("img")?.src || "";

    document.getElementById("cpTitle").textContent = d.title || "";
    document.getElementById("cpOrg").textContent = d.org || "";
    document.getElementById("cpDate").textContent = d.date || "";
    document.getElementById("cpId").textContent = d.id || "";
    document.getElementById("cpIssuedTo").textContent = d.issuedTo || "—";
    document.getElementById("cpDescription").textContent = d.description || "";

    const credUrl = d.credentialUrl || "#";
    const cpUrl = document.getElementById("cpUrl");
    const cpDownload = document.getElementById("cpDownload");
    if (cpUrl) cpUrl.href = credUrl;
    if (cpDownload) cpDownload.href = credUrl;

    const skillsEl = document.getElementById("cpSkills");
    if (skillsEl) {
      skillsEl.innerHTML = "";
      (d.skills ? d.skills.split(",").map(s => s.trim()).filter(Boolean) : [])
        .forEach(skill => {
          const tag = document.createElement("span");
          tag.className = "cert-skill-tag";
          tag.textContent = skill;
          skillsEl.appendChild(tag);
        });
    }

    if (activeCard) activeCard.classList.remove("active");
    card.classList.add("active");
    activeCard = card;

    if (panel) panel.classList.add("open");
    if (overlay) overlay.classList.add("open");
    if (mainContent) mainContent.classList.add("panel-open");
    if (panel) panel.scrollTop = 0;

    // Push state ONLY if panel isn't already tracked in history
    if (!panelOpenedByUs) {
      history.pushState({ certPanel: true }, "");
      panelOpenedByUs = true;
    }
  }

  function closePanel() {
    if (panel) panel.classList.remove("open");
    if (overlay) overlay.classList.remove("open");
    if (mainContent) mainContent.classList.remove("panel-open");
    if (activeCard) { activeCard.classList.remove("active"); activeCard = null; }
    panelOpenedByUs = false;
  }

  // Mobile back button triggers this
  window.addEventListener("popstate", () => {
    if (panelOpenedByUs) {
      closePanel();
    }
  });

  // Close button / overlay — manually go back in history to clean up the pushed state
  function manualClose() {
    if (panelOpenedByUs) {
      history.back(); // triggers popstate → closePanel()
    } else {
      closePanel();
    }
  }

  document.querySelectorAll(".certificate-card").forEach(card => {
    card.addEventListener("click", () => {
      if (card === activeCard && panel && panel.classList.contains("open")) {
        manualClose();
      } else {
        openPanel(card);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", manualClose);
  if (overlay) overlay.addEventListener("click", e => {
    if (e.target === overlay) manualClose();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") manualClose();
  });
})();

/* ===== PROJECTS TRACK INTERACTION & MODAL HANDLERS ===== */
const projectItems = document.querySelectorAll("[data-projects-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlayElement = document.querySelector("[data-overlay]");

const modalThumb = document.querySelector("[data-modal-thumb]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalCreated = document.querySelector("[data-modal-created]");
const modalUpdated = document.querySelector("[data-modal-updated]");
const modalText = document.querySelector("[data-modal-text]");
const modalGithub = document.querySelector("[data-modal-github]");
const modalDemo = document.querySelector("[data-modal-demo]");

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric"
});

function formatDate(isoString) {
  const date = new Date(isoString);
  return isNaN(date) ? isoString : dateFormatter.format(date);
}

function toggleModal() {
  if (modalContainer) modalContainer.classList.toggle("active");
  if (overlayElement) overlayElement.classList.toggle("active");
}

projectItems.forEach((item) => {
  item.addEventListener("click", function (event) {
    // Stop modal activation when external anchor tabs are targeted
    if (event.target.closest('.project-buttons a') || event.target.closest('.projects-link')) {
      return;
    }

    if (modalThumb) {
      const thumbHTML = this.querySelector(".project-thumb").innerHTML;
      const thumbClass = Array.from(this.querySelector(".project-thumb").classList)
        .find((cls) => cls.startsWith("project-thumb--"));

      modalThumb.innerHTML = thumbHTML;
      modalThumb.className = "modal-thumb-box";
      if (thumbClass) modalThumb.classList.add(thumbClass.replace("project-thumb", "modal-thumb-box"));
    }

    if (modalTitle) modalTitle.innerHTML = this.dataset.projectTitle;

    if (modalCreated) {
      modalCreated.setAttribute("datetime", this.dataset.projectCreated);
      modalCreated.innerHTML = formatDate(this.dataset.projectCreated);
    }

    if (modalUpdated) {
      modalUpdated.setAttribute("datetime", this.dataset.projectUpdated);
      modalUpdated.innerHTML = formatDate(this.dataset.projectUpdated);
    }

    if (modalText) modalText.innerHTML = `<p>${this.dataset.projectDesc}</p>`;
    if (modalGithub) modalGithub.setAttribute("href", this.dataset.projectGithub);
    if (modalDemo) modalDemo.setAttribute("href", this.dataset.projectDemo);

    toggleModal();
  });
});

if (modalCloseBtn) modalCloseBtn.addEventListener("click", toggleModal);
if (overlayElement) overlayElement.addEventListener("click", toggleModal);

/* ===== COMPACT HORIZONTAL SLIDE SCROLLBAR TRACKING ===== */
const projectsList = document.querySelector("[data-projects-list]");
const paginationContainer = document.querySelector("[data-projects-pagination]");

if (projectsList && paginationContainer) {
  const items = Array.from(projectsList.querySelectorAll(".projects-item"));
  paginationContainer.innerHTML = ""; // Clear out existing setup

  items.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.classList.add("pagination-dot");
    if (index === 0) dot.classList.add("active");
    dot.setAttribute("aria-label", `Go to project ${index + 1}`);
    dot.addEventListener("click", () => {
      items[index].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    });
    paginationContainer.appendChild(dot);
  });

  const dots = paginationContainer.querySelectorAll(".pagination-dot");
  let scrollTimeout;

  projectsList.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      let closestIndex = 0;
      let closestDistance = Infinity;
      items.forEach((item, index) => {
        const distance = Math.abs(item.offsetLeft - projectsList.scrollLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      dots.forEach((dot, index) => dot.classList.toggle("active", index === closestIndex));
    }, 80);
  });
}