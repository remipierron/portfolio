// ── Navbar mobile toggle ──
const toggle = document.querySelector('.nav-toggle');
const nav    = document.querySelector('.navbar-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
  // close on link click
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => nav.classList.remove('open'));
  });
}

// ── Active nav link ──
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar-nav a').forEach(a => {
  const href = a.getAttribute('href').split('/').pop();
  if (href === currentPage) a.classList.add('active');
});

// ── Scroll reveal ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ── Theme toggle ──
const navUl = document.querySelector('.navbar-nav');
if (navUl) {
  const li = document.createElement('li');
  const themeBtn = document.createElement('button');
  themeBtn.id = 'theme-toggle';
  themeBtn.className = 'theme-toggle';
  
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  themeBtn.innerHTML = currentTheme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  themeBtn.setAttribute('aria-label', currentTheme === 'dark' ? 'Passer au mode clair' : 'Passer au mode sombre');
  
  li.appendChild(themeBtn);
  navUl.appendChild(li);

  themeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    themeBtn.innerHTML = newTheme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    themeBtn.setAttribute('aria-label', newTheme === 'dark' ? 'Passer au mode clair' : 'Passer au mode sombre');
  });

  // ── Synchronisation inter-fichiers/onglets ──
  window.addEventListener('storage', (e) => {
    if (e.key === 'theme') {
      const isDark = e.newValue === 'dark';
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
      themeBtn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
      themeBtn.setAttribute('aria-label', isDark ? 'Passer au mode clair' : 'Passer au mode sombre');
    }
  });
}

// ── Animation Carapace ──
(function() {
  const canvas = document.getElementById("canvas-shell");
  if (!canvas) return;
  const context = canvas.getContext("2d");
  
  let container = canvas.parentElement;
  let width, height;
  let ratio = window.devicePixelRatio || 1;
  
  let x = 0,
      r = 40,
      step = 0,
      vx = r * 0.2;

  let sprites = new Image();
  sprites.src = "02-animation/shell.png";
  
  function resize() {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width  = width  * ratio;
      canvas.height = height * ratio;
      context.scale(ratio, ratio);
      context.imageSmoothingEnabled = false;
  }
  
  window.addEventListener('resize', resize);
  resize();
  x = width / 2;
  
  function animate() {
      context.clearRect(0, 0, width, height);
      drawShell(x, height, r, Math.floor(step));
      
      x += vx;
      if (x < r || x > width - r) {
          vx *= -1;
      }
      
      step += 0.3;
      if (step >= 12) step -= 12;
      
      requestAnimationFrame(animate);
  }

  function drawShell(x, y, r, step) {
      let s = r / 12;
      context.drawImage(sprites, 32 * step, 0, 32, 32, x - 16 * s, y - 26 * s, 32 * s, 32 * s);
  }

  sprites.onload = animate;
})();
