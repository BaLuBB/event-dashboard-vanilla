const translations = {
  de: {
    // Header
    headerTitle: 'Event Dashboard',
    
    // Navigation
    navEvents: 'Veranstaltungen',
    navDashboard: 'Dashboard',
    
    // Common
    loading: 'Lädt...',
    save: 'Speichern',
    cancel: 'Abbrechen',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    create: '+ Erstellen',
    
    // Events
    eventsTitle: 'Veranstaltungen',
    noEvents: 'Keine Veranstaltungen gefunden',
    createEvent: 'Event erstellen',
    editEvent: 'Event bearbeiten',
    
    // Dashboard
    dashboardTitle: 'Dashboard',
    statTotal: 'Gesamt Events',
    statPlanned: 'Geplant',
    statConfirmed: 'Bestätigt',
    
    // Form
    labelTitle: 'Titel',
    labelStart: 'Startdatum',
    labelEnd: 'Enddatum',
    labelLocation: 'Ort',
    labelStatus: 'Status',
    statusPlanned: 'Geplant',
    statusConfirmed: 'Bestätigt',
    statusCancelled: 'Abgesagt',
    
    // Messages
    confirmDelete: 'Event wirklich löschen?',
    errorLoad: 'Fehler beim Laden der Events',
    errorSave: 'Fehler beim Speichern',
    errorDelete: 'Fehler beim Löschen'
  },
  
  en: {
    // Header
    headerTitle: 'Event Dashboard',
    
    // Navigation
    navEvents: 'Events',
    navDashboard: 'Dashboard',
    
    // Common
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    create: '+ Create',
    
    // Events
    eventsTitle: 'Events',
    noEvents: 'No events found',
    createEvent: 'Create Event',
    editEvent: 'Edit Event',
    
    // Dashboard
    dashboardTitle: 'Dashboard',
    statTotal: 'Total Events',
    statPlanned: 'Planned',
    statConfirmed: 'Confirmed',
    
    // Form
    labelTitle: 'Title',
    labelStart: 'Start Date',
    labelEnd: 'End Date',
    labelLocation: 'Location',
    labelStatus: 'Status',
    statusPlanned: 'Planned',
    statusConfirmed: 'Confirmed',
    statusCancelled: 'Cancelled',
    
    // Messages
    confirmDelete: 'Really delete event?',
    errorLoad: 'Error loading events',
    errorSave: 'Error saving',
    errorDelete: 'Error deleting'
  }
};

// Sprachen-Manager
const LanguageManager = {
  currentLang: localStorage.getItem('language') || 'de',
  
  get t() {
    return translations[this.currentLang];
  },
  
  switch(lang) {
    if (translations[lang]) {
      this.currentLang = lang;
      localStorage.setItem('language', lang);
      document.documentElement.lang = lang;
      this.updateUI();
    }
  },
  
  updateUI() {
    // Header
    this.setText('header-title', this.t.headerTitle);
    
    // Navigation
    this.setText('nav-events', this.t.navEvents);
    this.setText('nav-dashboard', this.t.navDashboard);
    
    // Loading
    this.setText('loading-text', this.t.loading);
    
    // Events
    this.setText('events-title', this.t.eventsTitle);
    this.setText('no-events', this.t.noEvents);
    this.setText('btn-create-text', this.t.create);
    
    // Dashboard
    this.setText('dashboard-title', this.t.dashboardTitle);
    this.setText('stat-total-label', this.t.statTotal);
    this.setText('stat-planned-label', this.t.statPlanned);
    this.setText('stat-confirmed-label', this.t.statConfirmed);
    
    // Form
    this.setText('label-title', this.t.labelTitle);
    this.setText('label-start', this.t.labelStart);
    this.setText('label-end', this.t.labelEnd);
    this.setText('label-location', this.t.labelLocation);
    this.setText('label-status', this.t.labelStatus);
    this.setText('status-planned', this.t.statusPlanned);
    this.setText('status-confirmed', this.t.statusConfirmed);
    this.setText('status-cancelled', this.t.statusCancelled);
    this.setText('btn-cancel', this.t.cancel);
    this.setText('btn-save', this.t.save);
  },
  
  setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }
};
