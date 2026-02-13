// State Management
const AppState = {
  events: [],
  currentView: 'events',
  editingEventId: null
};

// DOM Elements
const DOM = {
  viewEvents: document.getElementById('view-events'),
  viewDashboard: document.getElementById('view-dashboard'),
  navButtons: document.querySelectorAll('.nav-btn'),
  langButtons: document.querySelectorAll('.lang-btn'),
  eventsGrid: document.getElementById('events-grid'),
  noEvents: document.getElementById('no-events'),
  btnCreateEvent: document.getElementById('btn-create-event'),
  statTotal: document.getElementById('stat-total'),
  statPlanned: document.getElementById('stat-planned'),
  statConfirmed: document.getElementById('stat-confirmed'),
  modal: document.getElementById('modal'),
  modalTitle: document.getElementById('modal-title'),
  modalClose: document.getElementById('modal-close'),
  eventForm: document.getElementById('event-form'),
  btnCancel: document.getElementById('btn-cancel'),
  loading: document.getElementById('loading')
};

// Event Handlers
function initEventListeners() {
  DOM.navButtons.forEach(btn => {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  });
  
  DOM.langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      LanguageManager.switch(btn.dataset.lang);
      DOM.langButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadEvents();
    });
  });
  
  DOM.btnCreateEvent.addEventListener('click', openCreateModal);
  DOM.modalClose.addEventListener('click', closeModal);
  DOM.btnCancel.addEventListener('click', closeModal);
  DOM.eventForm.addEventListener('submit', handleFormSubmit);
  
  DOM.modal.addEventListener('click', (e) => {
    if (e.target === DOM.modal) closeModal();
  });
}

// View Switching
function switchView(view) {
  AppState.currentView = view;
  
  DOM.navButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === view);
  });
  
  document.querySelectorAll('.view').forEach(v => {
    v.classList.remove('active');
  });
  document.getElementById(`view-${view}`).classList.add('active');
  
  if (view === 'dashboard') {
    updateDashboard();
  }
}

// Loading State
function setLoading(isLoading) {
  DOM.loading.classList.toggle('hidden', !isLoading);
}

// Load Events
async function loadEvents() {
  setLoading(true);
  
  try {
    AppState.events = await API.getEvents();
    renderEvents();
    updateDashboard();
  } catch (error) {
    alert(LanguageManager.t.errorLoad);
    console.error(error);
  } finally {
    setLoading(false);
  }
}

// Render Events
function renderEvents() {
  DOM.eventsGrid.innerHTML = '';
  
  if (AppState.events.length === 0) {
    DOM.noEvents.classList.remove('hidden');
    return;
  }
  
  DOM.noEvents.classList.add('hidden');
  
  AppState.events.forEach(event => {
    const card = createEventCard(event);
    DOM.eventsGrid.appendChild(card);
  });
}

// Create Event Card
function createEventCard(event) {
  const card = document.createElement('div');
  card.className = 'event-card';
  card.innerHTML = `
    <div class="event-status status-${event.status}"></div>
    <h3>${event.title}</h3>
    <p><strong>${LanguageManager.t.labelStart}:</strong> ${formatDate(event.startDate)}</p>
    <p><strong>${LanguageManager.t.labelEnd}:</strong> ${formatDate(event.endDate)}</p>
    <p><strong>${LanguageManager.t.labelLocation}:</strong> ${event.location}</p>
    <p><strong>${LanguageManager.t.labelStatus}:</strong> ${getStatusText(event.status)}</p>
    <div class="event-actions">
      <button class="btn-secondary btn-edit" data-id="${event.id}">
        ${LanguageManager.t.edit}
      </button>
      <button class="btn-danger btn-delete" data-id="${event.id}">
        ${LanguageManager.t.delete}
      </button>
    </div>
  `;
  
  card.querySelector('.btn-edit').addEventListener('click', () => openEditModal(event.id));
  card.querySelector('.btn-delete').addEventListener('click', () => deleteEvent(event.id));
  
  return card;
}

// Format Date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString(LanguageManager.currentLang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Get Status Text
function getStatusText(status) {
  const statusMap = {
    planned: LanguageManager.t.statusPlanned,
    confirmed: LanguageManager.t.statusConfirmed,
    cancelled: LanguageManager.t.statusCancelled
  };
  return statusMap[status] || status;
}

// Update Dashboard
function updateDashboard() {
  DOM.statTotal.textContent = AppState.events.length;
  DOM.statPlanned.textContent = AppState.events.filter(e => e.status === 'planned').length;
  DOM.statConfirmed.textContent = AppState.events.filter(e => e.status === 'confirmed').length;
}

// Modal Functions
function openCreateModal() {
  AppState.editingEventId = null;
  DOM.modalTitle.textContent = LanguageManager.t.createEvent;
  DOM.eventForm.reset();
  DOM.modal.classList.remove('hidden');
}

function openEditModal(id) {
  AppState.editingEventId = id;
  const event = AppState.events.find(e => e.id === id);
  
  if (!event) return;
  
  DOM.modalTitle.textContent = LanguageManager.t.editEvent;
  document.getElementById('event-title').value = event.title;
  document.getElementById('event-start').value = event.startDate;
  document.getElementById('event-end').value = event.endDate;
  document.getElementById('event-location').value = event.location;
  document.getElementById('event-status').value = event.status;
  
  DOM.modal.classList.remove('hidden');
}

function closeModal() {
  DOM.modal.classList.add('hidden');
  DOM.eventForm.reset();
  AppState.editingEventId = null;
}

// Form Submit
async function handleFormSubmit(e) {
  e.preventDefault();
  
  const formData = {
    title: document.getElementById('event-title').value,
    startDate: document.getElementById('event-start').value,
    endDate: document.getElementById('event-end').value,
    location: document.getElementById('event-location').value,
    status: document.getElementById('event-status').value
  };
  
  try {
    if (AppState.editingEventId) {
      await API.updateEvent(AppState.editingEventId, formData);
    } else {
      await API.createEvent(formData);
    }
    
    closeModal();
    await loadEvents();
  } catch (error) {
    alert(LanguageManager.t.errorSave);
    console.error(error);
  }
}

// Delete Event
async function deleteEvent(id) {
  if (!confirm(LanguageManager.t.confirmDelete)) return;
  
  try {
    await API.deleteEvent(id);
    await loadEvents();
  } catch (error) {
    alert(LanguageManager.t.errorDelete);
    console.error(error);
  }
}

// Initialize App
async function init() {
  LanguageManager.updateUI();
  
  DOM.langButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === LanguageManager.currentLang);
  });
  
  initEventListeners();
  await loadEvents();
}

// Start App
document.addEventListener('DOMContentLoaded', init);
