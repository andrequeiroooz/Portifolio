/**
 * André Queiroz — Portfolio Script (100% Vanilla JS)
 */

const PROJECTS_DATA = {
  psyerp: {
    title: "PsyERP — Gestão para Psicólogos",
    subtitle:
      "SaaS completo de gestão clínica, agenda de sessões e controle financeiro",
    category: "Desenvolvido do Zero",
    role: "Desenvolvedor Full-Stack (Python, Django, JS)",
    url: "https://afternoon-senorita-overcome.ngrok-free.dev",
    image: "images/psi.jpeg",
    problem:
      "Psicólogos perdem horas gerenciando prontuários em papel e lidando com desorganização em agendas e finanças.",
    solution:
      "Desenvolvi um sistema web ERP com autenticação, prontuário clínico criptografado e calendário interativo.",
    technologies: ["Python", "Django", "PostgreSQL", "HTML/CSS/JS"],
    impact:
      "Gestão administrativa simplificada, centralizada e redução de faltas de pacientes.",
  },
  aelsolar: {
    title: "AelSolar — Plataforma Solar",
    subtitle: "Landing page institucional interativa",
    category: "Desenvolvido do Zero",
    role: "Desenvolvedor Front-end",
    url: "https://andrequeiroooz.github.io/aelsolar/",
    image: "images/energia.jpeg",
    problem:
      "Necessidade de apresentação clara de serviços de energia solar e payback na web.",
    solution:
      "Criação de página responsiva e visualmente atrativa com simulador.",
    technologies: ["HTML5", "CSS3", "JavaScript Moderno"],
    impact: "Aumento na presença digital e engajamento do usuário final.",
  },
  ibjordao: {
    title: "IB Jordão — Portal Comunitário",
    subtitle: "Portal web responsivo",
    category: "Desenvolvido do Zero",
    role: "Desenvolvedor Web",
    url: "https://ibjordao.vercel.app/",
    image: "images/jordao.jpeg",
    problem:
      "Comunicação dependente apenas de redes sociais, sofrendo com algoritmos.",
    solution: "Implementação de portal rápido, acessível e mobile-first.",
    technologies: ["HTML", "CSS", "JS", "Vercel Deployment"],
    impact:
      "Canal oficial centralizado com carregamento ultrarrápido para avisos e eventos.",
  },
};

const DEFAULT_PHOTO_PATH =
  "https://avatars.githubusercontent.com/u/286477017?v=4";
const STORAGE_KEY = "andre_queiroz_portfolio_photo";

// INICIALIZA TUDO AO CARREGAR A PÁGINA
document.addEventListener("DOMContentLoaded", () => {
  initPhotoPersistence();
  initCopyEmailButtons();
  initPhotoModals();
  initParticles(); // <- Inicia o canvas animado
});

// Canvas Particle Animation
function initParticles() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let particles = [];
  let w, h;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = Math.random() * 2;
      this.alpha = Math.random() * 0.5 + 0.1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > w) this.vx *= -1;
      if (this.y < 0 || this.y > h) this.vy *= -1;
    }

    draw() {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const particleCount = window.innerWidth > 768 ? 90 : 40;
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = dx * dx + dy * dy;

        if (dist < 10000) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / 10000)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// Troca de Tabs
function switchWorkTab(tab) {
  const tabFeatured = document.getElementById("tabFeatured");
  const tabMaintenance = document.getElementById("tabMaintenance");
  const viewFeatured = document.getElementById("viewFeatured");
  const viewMaintenance = document.getElementById("viewMaintenance");

  if (tab === "featured") {
    tabFeatured.classList.add("active");
    tabMaintenance.classList.remove("active");
    viewFeatured.style.display = "grid";
    viewMaintenance.style.display = "none";
  } else {
    tabMaintenance.classList.add("active");
    tabFeatured.classList.remove("active");
    viewFeatured.style.display = "none";
    viewMaintenance.style.display = "block";
  }
}

// Lógica de Modais
function openCaseStudy(projectId) {
  const data = PROJECTS_DATA[projectId];
  if (!data) return;

  document.getElementById("csCategory").textContent = data.category;
  document.getElementById("csTitle").textContent = data.title;
  document.getElementById("csSubtitle").textContent = data.subtitle;

  const img = document.getElementById("csImage");
  img.src = data.image;
  img.onerror = () => {
    img.src = `https://placehold.co/600x400/f1f5f9/a0aec0?text=${data.title.split(" ")[0]}`;
  };

  document.getElementById("csRoleInfo").textContent = `Papel: ${data.role}`;
  document.getElementById("csLiveLink").href = data.url;
  document.getElementById("csProblem").textContent = data.problem;
  document.getElementById("csSolution").textContent = data.solution;
  document.getElementById("csImpact").textContent = data.impact;

  const techContainer = document.getElementById("csTechList");
  techContainer.innerHTML = "";
  data.technologies.forEach((tech) => {
    const span = document.createElement("span");
    span.className = "tech-tag";
    span.textContent = tech;
    techContainer.appendChild(span);
  });

  const modal = document.getElementById("caseStudyModal");
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeCaseStudy() {
  const modal = document.getElementById("caseStudyModal");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

function initPhotoPersistence() {
  const savedPhoto = localStorage.getItem(STORAGE_KEY);
  if (savedPhoto) {
    applyPhoto(savedPhoto);
  }
}

function applyPhoto(url) {
  document.getElementById("navAvatar").src = url;
  document.getElementById("heroAvatar").src = url;
  document.getElementById("modalPreviewPhoto").src = url;
}

function initPhotoModals() {
  const headerBtn = document.getElementById("headerPhotoBtn");
  const heroBtn = document.getElementById("heroPhotoBtn");
  const photoModal = document.getElementById("photoModal");
  const fileInput = document.getElementById("photoFileInput");
  const urlForm = document.getElementById("urlPhotoForm");
  const urlInput = document.getElementById("photoUrlInput");

  const openModal = () => {
    photoModal.style.display = "flex";
    document.body.style.overflow = "hidden";
  };

  headerBtn?.addEventListener("click", openModal);
  heroBtn?.addEventListener("click", openModal);

  fileInput?.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          applyPhoto(reader.result);
          try {
            localStorage.setItem(STORAGE_KEY, reader.result);
          } catch (err) {}
          closePhotoModal();
        }
      };
      reader.readAsDataURL(file);
    }
  });

  urlForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const url = urlInput.value.trim();
    if (url) {
      applyPhoto(url);
      try {
        localStorage.setItem(STORAGE_KEY, url);
      } catch (err) {}
      urlInput.value = "";
      closePhotoModal();
    }
  });
}

function closePhotoModal() {
  const modal = document.getElementById("photoModal");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

function resetDefaultPhoto() {
  applyPhoto(DEFAULT_PHOTO_PATH);
  localStorage.removeItem(STORAGE_KEY);
  closePhotoModal();
}

function initCopyEmailButtons() {
  const heroBtn = document.getElementById("copyEmailBtn");
  const contactBtn = document.getElementById("copyContactEmailBtn");

  const copyEmail = () => {
    const email = "andrequeiroooz@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      showToast("E-mail copiado! ✓");
    });
  };

  heroBtn?.addEventListener("click", copyEmail);
  contactBtn?.addEventListener("click", copyEmail);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 2500);
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeCaseStudy();
    closePhotoModal();
  }
});

window.addEventListener("click", (e) => {
  const csModal = document.getElementById("caseStudyModal");
  const pModal = document.getElementById("photoModal");
  if (e.target === csModal) closeCaseStudy();
  if (e.target === pModal) closePhotoModal();
});
