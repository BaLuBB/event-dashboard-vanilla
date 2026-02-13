# 🎪 Event Dashboard - Vanilla JavaScript

**Moderne Event-Verwaltung ohne Framework** - Optimiert für Raspberry Pi 3

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![Vanilla JS](https://img.shields.io/badge/vanilla-javascript-yellow.svg)

---

## ✨ Features

✅ **Kein Framework** - Pure Vanilla JavaScript (ES6+)  
✅ **Mehrsprachig** - Deutsch & Englisch mit localStorage  
✅ **Responsive Design** - Mobile-First Ansatz  
✅ **CRUD Operations** - Create, Read, Update, Delete  
✅ **REST API** - Node.js + Express Backend  
✅ **Modern UI** - Gradient Design, Animationen, Modal  
✅ **Pi-optimiert** - Keine Build-Tools, minimale Dependencies  

---

## 📦 Installation

### Voraussetzungen

- Node.js >= 14.x
- npm oder yarn
- Git

### Schnellstart

```bash
# Repository klonen
git clone https://github.com/BaLuBB/event-dashboard-vanilla.git
cd event-dashboard-vanilla

# Backend installieren
cd server
npm install

# Server starten
npm start

# Browser öffnen:
# http://localhost:3000
```

### Auf Raspberry Pi 3

```bash
# SSH-Verbindung zum Pi
ssh pi@raspberrypi.local

# Projekt klonen
git clone https://github.com/BaLuBB/event-dashboard-vanilla.git
cd event-dashboard-vanilla/server

# Dependencies installieren
npm install

# Server im Hintergrund starten
nohup npm start &

# IP-Adresse herausfinden
ifconfig | grep inet

# Im Browser öffnen:
# http://<pi-ip-adresse>:3000
```

---

## 📁 Projektstruktur

```
event-dashboard-vanilla/
├── server/
│   ├── server.js           # Express Backend
│   └── package.json
│
└── client/
    ├── index.html          # Haupt-HTML
    ├── css/
    │   └── styles.css      # Komplettes Styling
    └── js/
        ├── translations.js # Sprachverwaltung
        ├── api.js          # API Wrapper
        └── app.js          # Haupt-Logik
```

---

## 🛠️ API Endpunkte

| Methode | Endpunkt | Beschreibung |
|---------|----------|-------------|
| `GET` | `/api/events` | Alle Events abrufen |
| `GET` | `/api/events/:id` | Einzelnes Event abrufen |
| `POST` | `/api/events` | Neues Event erstellen |
| `PUT` | `/api/events/:id` | Event aktualisieren |
| `DELETE` | `/api/events/:id` | Event löschen |
| `GET` | `/api/stats` | Statistiken abrufen |

### Beispiel Request

```javascript
// Event erstellen
fetch('http://localhost:3000/api/events', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Mein Event',
    startDate: '2026-07-15',
    endDate: '2026-07-17',
    location: 'Berlin',
    status: 'planned'
  })
});
```

---

## 🌐 Mehrsprachigkeit

**Unterstützte Sprachen:**
- 🇩🇪 Deutsch (Standard)
- 🇬🇧 English

Die Spracheinstellung wird in `localStorage` gespeichert und bleibt beim Neuladen erhalten.

**Neue Sprache hinzufügen:**

Bearbeite `client/js/translations.js`:

```javascript
const translations = {
  de: { /* Deutsche Übersetzungen */ },
  en: { /* Englische Übersetzungen */ },
  fr: { /* Französische Übersetzungen */ }  // NEU
};
```

---

## 💻 Entwicklung

### Backend mit Nodemon

```bash
cd server
npm install --save-dev nodemon
npm run dev
```

### Port ändern

```bash
# In server/server.js:
const PORT = process.env.PORT || 3000;  // Ändere 3000

# Oder als Umgebungsvariable:
PORT=8080 npm start
```

### Datenbank einbinden

Das Backend nutzt aktuell In-Memory-Daten. Für Produktion:

**SQLite (empfohlen für Pi):**
```bash
npm install sqlite3
```

**MongoDB:**
```bash
npm install mongodb
```

---

## 📡 Netzwerk-Zugriff

Standardmäßig läuft der Server auf `0.0.0.0` und ist im Netzwerk erreichbar.

**Von anderen Geräten:**

1. Raspberry Pi IP-Adresse herausfinden:
   ```bash
   hostname -I
   ```

2. Im Browser öffnen:
   ```
   http://192.168.x.x:3000
   ```

**Firewall-Regel (falls nötig):**
```bash
sudo ufw allow 3000/tcp
```

---

## 🐛 Troubleshooting

### Port bereits belegt
```bash
# Prozess finden:
lsof -i :3000

# Prozess beenden:
kill -9 <PID>
```

### Server startet nicht
```bash
# Node.js Version prüfen:
node --version  # Sollte >= 14.x sein

# Dependencies neu installieren:
rm -rf node_modules package-lock.json
npm install
```

### CORS Fehler

Der Server nutzt bereits `cors()` Middleware. Falls Probleme auftreten:

```javascript
// In server/server.js:
app.use(cors({
  origin: 'http://your-domain.com',
  credentials: true
}));
```

---

## 🚀 Deployment

### Systemd Service (Autostart auf Pi)

```bash
# Service erstellen:
sudo nano /etc/systemd/system/event-dashboard.service
```

```ini
[Unit]
Description=Event Dashboard Server
After=network.target

[Service]
Type=simple
User=pi
WorkingDirectory=/home/pi/event-dashboard-vanilla/server
ExecStart=/usr/bin/node server.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

```bash
# Service aktivieren:
sudo systemctl enable event-dashboard
sudo systemctl start event-dashboard

# Status prüfen:
sudo systemctl status event-dashboard
```

---

## 📝 Lizenz

MIT License - Siehe [LICENSE](LICENSE)

---

## 👤 Autor

**BaLuBB** - [GitHub](https://github.com/BaLuBB) | [Website](https://www.balubb.de)

---

## 💬 Support

Probleme oder Fragen? Öffne ein [Issue](https://github.com/BaLuBB/event-dashboard-vanilla/issues)

---

**Made with ❤️ and Vanilla JavaScript**
