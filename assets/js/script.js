'use strict';

/* ===== CORE UTILITIES ===== */
const elementToggleFunc = (elem) => elem.classList.toggle("active");

/* =========================================================================
   FACTORY: Project Card
   Builds one <li class="projects-item"> from a project data object.
   ========================================================================= */
function createProjectCard(project) {
  const li = document.createElement("li");
  li.className = "projects-item";

  const tagsHTML = project.tags
    .map(tag => `<span class="tag tag-${tag.color}">${tag.label}</span>`)
    .join("");

  li.innerHTML = `
    <div class="project-card">
      <figure class="project-thumb project-thumb--${project.thumbColor}">
        <ion-icon name="${project.icon}"></ion-icon>
      </figure>
      <div class="project-content">
        <h4 class="h4 project-item-title">${project.title}</h4>
        <div class="project-tags">${tagsHTML}</div>
        <p class="project-text">${project.description}</p>
        <div class="project-buttons">
          <a href="${project.github}" class="btn-outline" target="_blank" rel="noopener">
            <ion-icon name="logo-github"></ion-icon> GitHub
          </a>
          <a href="${project.demo}" class="btn-fill" target="_blank" rel="noopener">Live Demo</a>
        </div>
      </div>
    </div>
  `;

  return li;
}

/* =========================================================================
   FACTORY: Certificate Card
   Builds one <li class="certificate-card"> from a certificate data object.
   Full details are stashed in the dataset so the panel factory below
   can read them back out on click, without a second data lookup.
   ========================================================================= */
function createCertificateCard(cert) {
  const li = document.createElement("li");
  li.className = "certificate-card";

  Object.assign(li.dataset, {
    title: cert.title,
    org: cert.org,
    date: cert.date,
    id: cert.id,
    issuedTo: cert.issuedTo,
    credentialUrl: cert.credentialUrl,
    description: cert.description,
    skills: cert.skills.join(",")
  });

  li.innerHTML = `
    <img src="${cert.image}" alt="${cert.orgShort} Certificate">
    <div class="certificate-content">
      <h4>${cert.displayTitle}</h4>
      <p>${cert.orgShort}</p>
      <span>Issued: ${cert.issued}</span>
      <button class="certificate-btn">View Credential</button>
    </div>
  `;

  return li;
}

/* =========================================================================
   RENDER — populate the lists from data using the factories above
   ========================================================================= */
function renderProjects() {
  const list = document.querySelector("[data-projects-list]");
  if (!list) return;
  const fragment = document.createDocumentFragment();
  projectsData.forEach(project => fragment.appendChild(createProjectCard(project)));
  list.innerHTML = "";
  list.appendChild(fragment);
}

function renderCertificates() {
  const list = document.querySelector("[data-certificates-list]");
  if (!list) return;
  const fragment = document.createDocumentFragment();
  certificatesData.forEach(cert => fragment.appendChild(createCertificateCard(cert)));
  list.innerHTML = "";
  list.appendChild(fragment);
}

/* ===== SIDEBAR TOGGLE ===== */
function initSidebar() {
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");
  if (sidebarBtn && sidebar) {
    sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));
  }
}

/* ===== PAGE NAV LINKS ===== */
function initPageNav() {
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  navigationLinks.forEach((link, i) => {
    link.addEventListener("click", function () {
      pages.forEach((page, j) => {
        const isMatch = this.innerHTML.toLowerCase() === page.dataset.page;
        page.classList.toggle("active", isMatch);
        navigationLinks[j].classList.toggle("active", isMatch);
        if (isMatch) window.scrollTo(0, 0);
      });
    });
  });
}

/* ===== "UNDER CONSTRUCTION" NAV ITEM ===== */
function initConstructionNotice() {
  const btn = document.querySelector("[data-construction-btn]");
  if (!btn) return;
  btn.addEventListener("click", () => {
    alert("This page is currently under construction. Stay tuned!");
  });
}

/* =========================================================================
   CERTIFICATE DETAIL PANEL
   Uses event delegation on the list container so it keeps working
   no matter how many certificate cards the factory renders.
   ========================================================================= */
function initCertificatePanel() {
  const overlay = document.getElementById("certPanelOverlay");
  const panel = document.getElementById("certPanel");
  const closeBtn = document.getElementById("certPanelClose");
  const list = document.querySelector("[data-certificates-list]");

  const mainContent = document.querySelector("main");

  let activeCard = null;
  let panelOpenedByUs = false;

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
    mainContent?.classList.add("panel-open");
    panel.scrollTop = 0;

    if (!panelOpenedByUs) {
      history.pushState({ certPanel: true }, "");
      panelOpenedByUs = true;
    }
  }

  function closePanel() {
    panel.classList.remove("open");
    overlay.classList.remove("open");
    mainContent?.classList.remove("panel-open");
    if (activeCard) {
      activeCard.classList.remove("active");
      activeCard = null;
    }
    panelOpenedByUs = false;
  }

  function manualClose() {
    if (panelOpenedByUs) {
      history.back(); // triggers popstate -> closePanel()
    } else {
      closePanel();
    }
  }

  window.addEventListener("popstate", () => {
    if (panelOpenedByUs) closePanel();
  });

  // Event delegation: works for every card the factory renders, present or future.
  list?.addEventListener("click", (e) => {
    const card = e.target.closest(".certificate-card");
    if (!card) return;

    if (card === activeCard && panel.classList.contains("open")) {
      manualClose();
    } else {
      openPanel(card);
    }
  });

  closeBtn?.addEventListener("click", manualClose);
  overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) manualClose();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") manualClose();
  });
}

/* =========================================================================
   INIT
   ========================================================================= */
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderCertificates();

  initSidebar();
  initPageNav();
  initConstructionNotice();
  initCertificatePanel();
});