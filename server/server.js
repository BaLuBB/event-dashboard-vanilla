const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// Mock-Datenbank (In-Memory)
// Später durch echte DB (SQLite/MongoDB) ersetzen
let events = [
  {
    id: 1,
    title: 'Sommerfest 2026',
    startDate: '2026-07-15',
    endDate: '2026-07-17',
    location: 'Berlin',
    status: 'confirmed',
    description: 'Großes Sommerfest mit Live-Musik'
  },
  {
    id: 2,
    title: 'Wintergala',
    startDate: '2026-12-20',
    endDate: '2026-12-20',
    location: 'München',
    status: 'planned',
    description: 'Elegante Gala-Veranstaltung'
  },
  {
    id: 3,
    title: 'Frühlingsfest',
    startDate: '2026-04-10',
    endDate: '2026-04-12',
    location: 'Hamburg',
    status: 'confirmed',
    description: 'Festival zum Frühlingsanfang'
  },
  {
    id: 4,
    title: 'Oktoberfest',
    startDate: '2026-10-01',
    endDate: '2026-10-05',
    location: 'Stuttgart',
    status: 'planned',
    description: 'Traditionelles Volksfest'
  }
];

let nextId = 5;

// ===== API ROUTES =====

// GET alle Events
app.get('/api/events', (req, res) => {
  res.json(events);
});

// GET einzelnes Event
app.get('/api/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const event = events.find(e => e.id === id);
  
  if (!event) {
    return res.status(404).json({ error: 'Event nicht gefunden' });
  }
  
  res.json(event);
});

// POST neues Event erstellen
app.post('/api/events', (req, res) => {
  const { title, startDate, endDate, location, status, description } = req.body;
  
  // Validierung
  if (!title || !startDate || !endDate || !location) {
    return res.status(400).json({ error: 'Pflichtfelder fehlen' });
  }
  
  const newEvent = {
    id: nextId++,
    title,
    startDate,
    endDate,
    location,
    status: status || 'planned',
    description: description || ''
  };
  
  events.push(newEvent);
  res.status(201).json(newEvent);
});

// PUT Event aktualisieren
app.put('/api/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = events.findIndex(e => e.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Event nicht gefunden' });
  }
  
  // Merge alte und neue Daten
  events[index] = {
    ...events[index],
    ...req.body,
    id // ID darf nicht überschrieben werden
  };
  
  res.json(events[index]);
});

// DELETE Event löschen
app.delete('/api/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = events.findIndex(e => e.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Event nicht gefunden' });
  }
  
  events.splice(index, 1);
  res.status(204).send();
});

// Statistics API
app.get('/api/stats', (req, res) => {
  const stats = {
    total: events.length,
    planned: events.filter(e => e.status === 'planned').length,
    confirmed: events.filter(e => e.status === 'confirmed').length,
    cancelled: events.filter(e => e.status === 'cancelled').length
  };
  res.json(stats);
});

// Fallback für SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Server starten
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\u{1F680} Server läuft auf http://localhost:${PORT}`);
  console.log(`\u{1F30D} Netzwerk-Zugriff: http://<raspberry-pi-ip>:${PORT}`);
});
