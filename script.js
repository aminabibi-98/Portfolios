(function () {
  "use strict";

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------------------------------------------------------
     Nav toggle (mobile)
  --------------------------------------------------------- */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  navToggle.addEventListener("click", function () {
    var open = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  navLinks.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------------------------------------------------------
     Preloaded projects (edit this list, or use "Add a project")
  --------------------------------------------------------- */
  var PRELOADED_PROJECTS = [
    {
      id: "preload-1",
      title: "Forest Cover Change in Luxembourg, 2000\u20132020",
      period: "Winter Semester 2025\u201326",
      category: "remote-sensing",
      summary:
        "Mapped land-cover and forest-extent change across Luxembourg using the GLAD GLCLU Landsat archive. Built a pixel-trajectory change map, ran an area-adjusted accuracy assessment, and found a net forest loss of roughly 7,281 ha between 2000 and 2020.",
      tools: ["Google Earth Engine", "QGIS", "R", "Landsat", "Accuracy assessment"],
      link: "assets/Forest_Change_Luxembourg.pdf",
      linkLabel: "Read the paper (PDF)",
      preloaded: true
    },
    {
      id: "preload-2",
      title: "40 Years of Vegetation Trends Across Europe",
      period: "Summer Semester 2025",
      category: "remote-sensing",
      summary:
        "Trend-tested four decades of GIMMS NDVI data (1982\u20132022) with the Seasonal Mann-Kendall test to evaluate the \u201cgreening trend\u201d hypothesis, compare summer-only vegetation response, and link results back to CORINE land-cover classes.",
      tools: ["GIMMS NDVI", "R", "Mann-Kendall", "CORINE", "Sen's slope"],
      link: "assets/Pattern_Recognition_Portfolio.pdf",
      linkLabel: "Read the portfolio (PDF)",
      preloaded: true
    },
    {
      id: "preload-3",
      title: "Land-Change Syndrome Mapping for Europe",
      period: "Summer Semester 2025",
      category: "spatial-stats",
      summary:
        "Implemented the syndrome-mapping approach (Stellmes et al., 2013) over Europe: fitted Fourier phenology models to NDVI time series and combined trend significance with CORINE land use to classify six land-change syndromes.",
      tools: ["Fourier models", "R", "CORINE", "Phenology metrics"],
      link: "assets/Pattern_Recognition_Portfolio.pdf",
      linkLabel: "Read the portfolio (PDF)",
      preloaded: true
    },
    {
      id: "preload-4",
      title: "Rainfall\u2013Biomass Interactions in Botswana",
      period: "Summer Semester 2025",
      category: "spatial-stats",
      summary:
        "Fit distributed lag models between CHIRPS rainfall and MODIS NDVI anomalies to quantify delayed vegetation response, then trained a Random Forest on topo-climatic variables to explain spatial patterns in model fit.",
      tools: ["Distributed lag models", "Random Forest", "CHIRPS", "MODIS NDVI"],
      link: "assets/Pattern_Recognition_Portfolio.pdf",
      linkLabel: "Read the portfolio (PDF)",
      preloaded: true
    },
    {
      id: "preload-5",
      title: "Geospatial Crime, Venue & Air-Quality Hotspots",
      period: "M.Sc. coursework",
      category: "spatial-stats",
      summary:
        "Used point pattern analysis, Moran's I, LISA and Getis\u2013Ord Gi* to identify spatial hotspots, then modelled PM2.5 concentrations with OLS, spatial regression and geostatistical interpolation.",
      tools: ["Point pattern analysis", "Moran's I", "Getis\u2013Ord Gi*", "Spatial regression"],
      link: "",
      linkLabel: "",
      preloaded: true
    },
    {
      id: "preload-6",
      title: "Interactive Web-GIS for Geodata Visualisation",
      period: "M.Sc. coursework",
      category: "web-gis",
      summary:
        "Built an interactive Web-GIS from scratch with map layers, markers, pop-ups, search and GeoJSON processing \u2014 the same lineage of tools behind this very site.",
      tools: ["JavaScript", "OpenLayers", "HTML", "CSS", "GeoJSON"],
      link: "",
      linkLabel: "",
      preloaded: true
    },
    {
      id: "preload-7",
      title: "Hyperspectral & UAV Vegetation Analysis",
      period: "M.Sc. coursework",
      category: "fieldwork",
      summary:
        "Processed Landsat-8, HySpex and UAV imagery for classification and vegetation analysis, applying empirical line correction, vegetation indices and photogrammetric UAV workflows.",
      tools: ["ENVI", "HySpex", "UAV photogrammetry", "Vegetation indices"],
      link: "",
      linkLabel: "",
      preloaded: true
    },
    {
      id: "preload-8",
      title: "Pattern Recognition: Time Series Analysis",
      period: "",
      category: "remote-sensing",
      summary:
        "A closer look at time-series pattern recognition methods applied to long-term satellite archives.",
      tools: [],
      link: "assets/Pattern_Recognition_Time_Series.pdf",
      linkLabel: "Read the paper (PDF)",
      preloaded: true
    },
    {
      id: "preload-9",
      title: "Remote Sensing of Global Change",
      period: "",
      category: "remote-sensing",
      summary:
        "Term paper examining global change processes through remote sensing observation.",
      tools: [],
      link: "assets/RS_Global_Change_Term_Paper.pdf",
      linkLabel: "Read the paper (PDF)",
      preloaded: true
    },
    {
      id: "preload-10",
      title: "Advanced Remote Sensing",
      period: "",
      category: "remote-sensing",
      summary:
        "Advanced term paper in remote sensing methods and applications.",
      tools: [],
      link: "assets/Advanced_RS_Term_Paper.pdf",
      linkLabel: "Read the paper (PDF)",
      preloaded: true
    }
  ];

  var CATEGORY_LABELS = {
    "remote-sensing": "Remote sensing",
    "spatial-stats": "Spatial statistics",
    "web-gis": "Web-GIS",
    "fieldwork": "Fieldwork",
    "other": "Other"
  };

  var STORAGE_KEY = "portfolio:projects";

  /* ---------------------------------------------------------
     Local storage helpers
  --------------------------------------------------------- */
  function loadUserProjects() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn("Could not read saved projects:", e);
      return [];
    }
  }

  function saveUserProjects(list) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn("Could not save projects:", e);
      alert("Your browser blocked local storage, so this project won't persist after you reload.");
    }
  }

  var userProjects = loadUserProjects();

  /* ---------------------------------------------------------
     Rendering
  --------------------------------------------------------- */
  var grid = document.getElementById("projectsGrid");
  var filterBar = document.getElementById("projectFilter");
  var activeFilter = "all";

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
  }

  function allProjects() {
    return PRELOADED_PROJECTS.concat(userProjects);
  }

  function buildFilters() {
    var categories = {};
    allProjects().forEach(function (p) {
      categories[p.category] = true;
    });
    Object.keys(categories).forEach(function (cat) {
      if (!filterBar.querySelector('[data-filter="' + cat + '"]')) {
        var btn = document.createElement("button");
        btn.className = "filter-chip";
        btn.dataset.filter = cat;
        btn.textContent = CATEGORY_LABELS[cat] || cat;
        filterBar.appendChild(btn);
      }
    });
  }

  function cardHtml(p, index) {
    var toolsHtml = (p.tools || [])
      .map(function (t) {
        return "<li>" + escapeHtml(t) + "</li>";
      })
      .join("");

    var linkHtml = "";
    if (p.link) {
      linkHtml =
        '<a class="project-card__link" href="' +
        escapeHtml(p.link) +
        '" target="_blank" rel="noopener">' +
        escapeHtml(p.linkLabel || "View project") +
        " \u2192</a>";
    }

    var removeHtml = p.preloaded
      ? ""
      : '<button class="project-card__remove" data-remove="' + escapeHtml(p.id) + '" aria-label="Remove this project">remove</button>';

    return (
      '<article class="project-card" data-category="' +
      escapeHtml(p.category) +
      '">' +
      '<span class="project-card__corner">FIG. ' + String(index + 1).padStart(2, "0") + "</span>" +
      '<p class="project-card__cat">' + escapeHtml(CATEGORY_LABELS[p.category] || p.category) + "</p>" +
      "<h3>" + escapeHtml(p.title) + "</h3>" +
      (p.period ? '<p class="project-card__period">' + escapeHtml(p.period) + "</p>" : "") +
      '<p class="project-card__summary">' + escapeHtml(p.summary) + "</p>" +
      (toolsHtml ? '<ul class="project-card__tools">' + toolsHtml + "</ul>" : "") +
      linkHtml +
      removeHtml +
      "</article>"
    );
  }

  function render() {
    var list = allProjects().filter(function (p) {
      return activeFilter === "all" || p.category === activeFilter;
    });

    grid.innerHTML = list.length
      ? list.map(cardHtml).join("")
      : '<p style="opacity:.65;font-family:var(--font-mono);font-size:13.5px;">No projects in this category yet.</p>';

    grid.querySelectorAll("[data-remove]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-remove");
        if (!confirm("Remove this project from your saved list?")) return;
        userProjects = userProjects.filter(function (p) {
          return p.id !== id;
        });
        saveUserProjects(userProjects);
        render();
      });
    });
  }

  filterBar.addEventListener("click", function (e) {
    var btn = e.target.closest(".filter-chip");
    if (!btn) return;
    activeFilter = btn.dataset.filter;
    filterBar.querySelectorAll(".filter-chip").forEach(function (c) {
      c.classList.toggle("is-active", c === btn);
    });
    render();
  });

  buildFilters();
  render();

  /* ---------------------------------------------------------
     Add project form
  --------------------------------------------------------- */
  var toggleBtn = document.getElementById("addProjectToggle");
  var form = document.getElementById("addProjectForm");
  var cancelBtn = document.getElementById("cancelAddProject");

  function openForm() {
    form.hidden = false;
    toggleBtn.setAttribute("aria-expanded", "true");
    document.getElementById("p-title").focus();
  }
  function closeForm() {
    form.hidden = true;
    toggleBtn.setAttribute("aria-expanded", "false");
    form.reset();
  }

  toggleBtn.addEventListener("click", function () {
    form.hidden ? openForm() : closeForm();
  });
  cancelBtn.addEventListener("click", closeForm);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = new FormData(form);
    var toolsRaw = (data.get("tools") || "").toString();
    var project = {
      id: "user-" + Date.now(),
      title: (data.get("title") || "").toString().trim(),
      period: (data.get("period") || "").toString().trim(),
      category: (data.get("category") || "other").toString(),
      summary: (data.get("summary") || "").toString().trim(),
      tools: toolsRaw
        ? toolsRaw.split(",").map(function (t) { return t.trim(); }).filter(Boolean)
        : [],
      link: (data.get("link") || "").toString().trim(),
      linkLabel: "View project",
      preloaded: false
    };
    if (!project.title || !project.summary) return;

    userProjects.push(project);
    saveUserProjects(userProjects);
    buildFilters();
    closeForm();
    activeFilter = "all";
    filterBar.querySelectorAll(".filter-chip").forEach(function (c) {
      c.classList.toggle("is-active", c.dataset.filter === "all");
    });
    render();
    document.getElementById("projectsGrid").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* ---------------------------------------------------------
     Export / import
  --------------------------------------------------------- */
  document.getElementById("exportProjects").addEventListener("click", function () {
    var blob = new Blob([JSON.stringify(userProjects, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "my-projects.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  document.getElementById("importProjects").addEventListener("change", function (e) {
    var file = e.target.files && e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var incoming = JSON.parse(reader.result);
        if (!Array.isArray(incoming)) throw new Error("File must contain a JSON array.");
        incoming.forEach(function (p) {
          if (!p.id) p.id = "user-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7);
          p.preloaded = false;
        });
        userProjects = userProjects.concat(incoming);
        saveUserProjects(userProjects);
        buildFilters();
        render();
        alert("Imported " + incoming.length + " project(s).");
      } catch (err) {
        alert("Could not import that file: " + err.message);
      }
      e.target.value = "";
    };
    reader.readAsText(file);
  });
})();
