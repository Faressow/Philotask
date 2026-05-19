/* ═══════════════════════════════════════════════════════════
   PhiloTask — Core Application Logic
   Depends on: quotes.js, coptic.js
   ═══════════════════════════════════════════════════════════ */

// ── STATE ────────────────────────────────────────────────
let tasks = JSON.parse(localStorage.getItem('philotask_tasks') || '[]');
let currentFilter = 'all';
let shownQuoteKeys = JSON.parse(localStorage.getItem('philotask_shown') || '[]');

// ── DOM REFS ─────────────────────────────────────────────
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const overlay       = $('#quote-overlay');
const overlayImg    = $('#quote-overlay-img');
const overlayFB     = $('#quote-overlay-fallback');
const overlayText   = $('#quote-overlay-text');
const overlayAuthor = $('#quote-overlay-author');
const overlaySource = $('#quote-overlay-source');
const overlayCtx    = $('#quote-overlay-context');
const dismissBtn    = $('#quote-overlay-dismiss');
const particlesC    = $('#particles-container');
const app           = $('#app');
const taskForm      = $('#add-task-form');
const taskInput     = $('#task-input');
const taskPriority  = $('#task-priority');
const taskList      = $('#task-list');
const emptyState    = $('#empty-state');
const galleryTrack  = $('#gallery-track');
const filterBtns    = $$('.filter-btn');


// ── HELPERS ──────────────────────────────────────────────
function getPhil(id) { return PHILOSOPHERS.find(p => p.id === id) || PHILOSOPHERS[0]; }
function randFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function saveTasks() { localStorage.setItem('philotask_tasks', JSON.stringify(tasks)); }
function escHTML(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function fmtTime(ts) {
  const diff = Date.now() - ts;
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff/60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff/3600000)}h ago`;
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Pick a non-repeating quote from a category
function pickQuote(category) {
  const pool = QUOTES[category];
  // Filter out recently shown
  let available = pool.filter(q => !shownQuoteKeys.includes(q.text));
  if (available.length === 0) {
    // Reset history for this pool
    shownQuoteKeys = shownQuoteKeys.filter(k => !pool.some(q => q.text === k));
    available = pool;
  }
  const chosen = randFrom(available);
  shownQuoteKeys.push(chosen.text);
  // Keep history manageable (last 40)
  if (shownQuoteKeys.length > 40) shownQuoteKeys = shownQuoteKeys.slice(-40);
  localStorage.setItem('philotask_shown', JSON.stringify(shownQuoteKeys));
  return chosen;
}

// ── PARTICLES ────────────────────────────────────────────
function spawnParticles() {
  particlesC.innerHTML = '';
  const colors = ['#dc2626','#9333ea','#d4a843','#3b82f6','#22c55e','#f59e0b'];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const sz = 4 + Math.random() * 8;
    p.style.cssText = `left:${Math.random()*100}%;width:${sz}px;height:${sz}px;background:${randFrom(colors)};animation-delay:${Math.random()*3}s;animation-duration:${3+Math.random()*3}s;`;
    particlesC.appendChild(p);
  }
}

// ── CONFETTI ─────────────────────────────────────────────
function burstConfetti() {
  const colors = ['#dc2626','#9333ea','#d4a843','#3b82f6','#22c55e','#f59e0b','#7c3aed','#b91c1c'];
  for (let i = 0; i < 40; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    const sz = 6 + Math.random() * 10;
    c.style.cssText = `left:${40+Math.random()*20}%;top:${30+Math.random()*10}%;width:${sz}px;height:${sz}px;background:${randFrom(colors)};border-radius:${randFrom(['50%','2px','0'])};animation-delay:${Math.random()*0.4}s;animation-duration:${1+Math.random()}s;`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 2500);
  }
}

// ── QUOTE OVERLAY ────────────────────────────────────────
function showQuote(category, ctxMsg) {
  const q = pickQuote(category);
  const p = getPhil(q.author);

  if (p.image) {
    overlayImg.src = p.image; overlayImg.alt = p.name;
    overlayImg.style.display = 'block'; overlayFB.style.display = 'none';
    overlayImg.onerror = function() {
      this.style.display = 'none'; overlayFB.style.display = 'flex';
      overlayFB.textContent = p.initials;
      overlayFB.style.background = `linear-gradient(135deg, ${p.color}, ${p.color}aa)`;
    };
  } else {
    overlayImg.style.display = 'none'; overlayFB.style.display = 'flex';
    overlayFB.textContent = p.initials;
    overlayFB.style.background = `linear-gradient(135deg, ${p.color}, ${p.color}aa)`;
  }

  overlayText.textContent = `\u201C${q.text}\u201D`;
  overlayAuthor.textContent = `\u2014 ${p.name}`;
  overlaySource.textContent = q.source || '';
  overlayCtx.textContent = ctxMsg || `${p.origin} ${p.isSaint ? 'Tradition' : 'Philosophy'}`;

  spawnParticles();
  overlay.classList.add('active');
  overlay.setAttribute('aria-hidden', 'false');
}

function hideQuote() {
  overlay.classList.add('closing');
  setTimeout(() => {
    overlay.classList.remove('active', 'closing');
    overlay.setAttribute('aria-hidden', 'true');
    app.style.opacity = '1';
    app.style.transition = 'opacity 0.6s ease';
  }, 500);
}

// ── GALLERY ──────────────────────────────────────────────
function buildGallery() {
  galleryTrack.innerHTML = '';
  PHILOSOPHERS.forEach(phil => {
    const card = document.createElement('div');
    card.className = `philosopher-card${phil.isSaint ? ' philosopher-card--saint' : ''}`;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');

    let av;
    if (phil.image) {
      av = `<img class="philosopher-card__avatar" src="${phil.image}" alt="${phil.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
            <div class="philosopher-card__fallback" style="display:none;background:linear-gradient(135deg,${phil.color},${phil.color}88);color:#fff;">${phil.initials}</div>`;
    } else {
      av = `<div class="philosopher-card__fallback" style="background:linear-gradient(135deg,${phil.color},${phil.color}88);color:#fff;">${phil.initials}</div>`;
    }
    card.innerHTML = `${av}<span class="philosopher-card__name">${phil.cardName || phil.name}</span>`;

    card.addEventListener('click', () => {
      const all = [...QUOTES.welcome, ...QUOTES.taskCreated, ...QUOTES.taskCompleted];
      const pq = all.filter(q => q.author === phil.id);
      if (pq.length) {
        const q = randFrom(pq);
        const p = getPhil(q.author);
        if (p.image) {
          overlayImg.src = p.image; overlayImg.style.display = 'block'; overlayFB.style.display = 'none';
        } else {
          overlayImg.style.display = 'none'; overlayFB.style.display = 'flex';
          overlayFB.textContent = p.initials;
          overlayFB.style.background = `linear-gradient(135deg,${p.color},${p.color}aa)`;
        }
        overlayText.textContent = `\u201C${q.text}\u201D`;
        overlayAuthor.textContent = `\u2014 ${p.name}`;
        overlaySource.textContent = q.source || '';
        overlayCtx.textContent = `${p.origin} ${p.isSaint ? 'Tradition' : 'Philosophy'}`;
        spawnParticles();
        overlay.classList.add('active');
      }
    });
    galleryTrack.appendChild(card);
  });
}

// ── STATS ────────────────────────────────────────────────
function updateStats() {
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  let streak = 0;
  const sorted = [...tasks].sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0));
  for (const t of sorted) { if (t.done) streak++; else break; }
  $('#stat-total-value').textContent = total;
  $('#stat-done-value').textContent = done;
  $('#stat-streak-value').textContent = streak;
}

// ── RENDER TASKS ─────────────────────────────────────────
function renderTasks() {
  taskList.innerHTML = '';
  let filtered = tasks;
  if (currentFilter === 'active') filtered = tasks.filter(t => !t.done);
  if (currentFilter === 'done') filtered = tasks.filter(t => t.done);

  emptyState.style.display = filtered.length === 0 ? 'block' : 'none';
  taskList.style.display = filtered.length === 0 ? 'none' : 'flex';

  filtered.forEach((task, i) => {
    const el = document.createElement('div');
    el.className = `task-item${task.done ? ' task-item--done' : ''}`;
    el.setAttribute('role', 'listitem');
    el.style.animationDelay = `${i * 0.05}s`;
    el.innerHTML = `
      <div class="task-item__priority-bar task-item__priority-bar--${task.priority}"></div>
      <button class="task-item__checkbox" data-id="${task.id}">${task.done ? '✓' : ''}</button>
      <span class="task-item__text">${escHTML(task.text)}</span>
      <span class="task-item__time">${fmtTime(task.createdAt)}</span>
      <button class="task-item__delete" data-id="${task.id}">✕</button>`;
    taskList.appendChild(el);
  });
  updateStats();
}

// ── TASK ACTIONS ─────────────────────────────────────────
function addTask(text, priority) {
  tasks.unshift({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    text, priority, done: false, createdAt: Date.now(), completedAt: null,
  });
  saveTasks(); renderTasks();
  showQuote('taskCreated', 'A new quest begins!');
}

function toggleTask(id) {
  const t = tasks.find(t => t.id === id);
  if (!t) return;
  t.done = !t.done;
  t.completedAt = t.done ? Date.now() : null;
  saveTasks(); renderTasks();
  if (t.done) { burstConfetti(); showQuote('taskCompleted', 'Quest completed!'); }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks(); renderTasks();
}

// ── EVENTS ───────────────────────────────────────────────
taskForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;
  addTask(text, taskPriority.value);
  taskInput.value = ''; taskPriority.value = 'normal';
});

taskList.addEventListener('click', e => {
  const cb = e.target.closest('.task-item__checkbox');
  const del = e.target.closest('.task-item__delete');
  if (cb) toggleTask(cb.dataset.id);
  if (del) deleteTask(del.dataset.id);
});

filterBtns.forEach(btn => btn.addEventListener('click', () => {
  filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
  btn.classList.add('filter-btn--active');
  currentFilter = btn.dataset.filter;
  renderTasks();
}));

dismissBtn.addEventListener('click', hideQuote);
overlay.addEventListener('click', e => {
  if (e.target === overlay || e.target.classList.contains('quote-overlay__backdrop')) hideQuote();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && overlay.classList.contains('active')) hideQuote();
});

// ── INIT ─────────────────────────────────────────────────
function renderGregorianCalendar() {
  const now = new Date();
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  $('#gregorian-date').textContent = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  $('#gregorian-month-badge').textContent = months[now.getMonth()];
}

document.addEventListener('DOMContentLoaded', () => {
  renderCopticCalendar();
  renderGregorianCalendar();
  buildGallery();
  renderTasks();
  setTimeout(() => showQuote('welcome', 'Welcome, seeker of wisdom'), 400);
});
