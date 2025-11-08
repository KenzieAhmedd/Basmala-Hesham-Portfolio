/* ============================
   Futuristic Portfolio Script
   ============================ */

/* === 1. PARTICLE BACKGROUND === */
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createParticles() {
  particles = [];
  const count = Math.floor((canvas.width * canvas.height) / 12000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.4,
      dx: (Math.random() - 0.5) * 0.6,
      dy: (Math.random() - 0.5) * 0.6,
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,240,255,0.8)";
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  // connections
  ctx.strokeStyle = "rgba(0,240,255,0.15)";
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.lineWidth = 0.3;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function updateParticles() {
  particles.forEach((p) => {
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
}

function animate() {
  drawParticles();
  updateParticles();
  requestAnimationFrame(animate);
}
createParticles();
animate();

/* === 2. NAV ACTIVE LINK HIGHLIGHT === */
const navLinks = document.querySelectorAll(".nav-link");
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY + 200;
  navLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (
      section.offsetTop <= scrollY &&
      section.offsetTop + section.offsetHeight > scrollY
    ) {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
});

/* === 3. SECTION REVEAL ON SCROLL === */
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);
reveals.forEach((r) => observer.observe(r));

/* === 4. SKILL BAR ANIMATION === */
const skillBars = document.querySelectorAll(".skill-bar");
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target.querySelector("div");
        const percent = entry.target.getAttribute("data-percent");
        bar.style.width = percent + "%";
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);
skillBars.forEach((bar) => skillObserver.observe(bar));

/* === 5. TYPING EFFECT === */
const typedText = [
  "AI & Data Science Learner",
  "Problem Solver",
  "C++ / Python Developer",
  "Creative Thinker",
];
let i = 0,
  j = 0,
  current = "",
  isDeleting = false;

function typeLoop() {
  const element = document.getElementById("typed");
  if (!element) return;

  if (i < typedText.length) {
    const full = typedText[i];
    if (isDeleting) {
      current = full.substring(0, j--);
    } else {
      current = full.substring(0, j++);
    }
    element.textContent = current;

    if (!isDeleting && j === full.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1200);
      return;
    } else if (isDeleting && j === 0) {
      isDeleting = false;
      i = (i + 1) % typedText.length;
    }
    setTimeout(typeLoop, isDeleting ? 60 : 100);
  }
}
typeLoop();

/* === 6. CONTACT FORM FEEDBACK === */
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const feedback = document.getElementById("formFeedback");
    feedback.textContent = "✅ Message sent successfully!";
    setTimeout(() => (feedback.textContent = ""), 4000);
    form.reset();
  });
}

/* === 7. MOBILE NAV TOGGLE === */
const toggle = document.querySelector(".nav-toggle");
const navRight = document.querySelector(".nav-right");
if (toggle) {
  toggle.addEventListener("click", () => {
    navRight.classList.toggle("open");
    navRight.style.display = navRight.classList.contains("open")
      ? "flex"
      : "none";
  });
}
