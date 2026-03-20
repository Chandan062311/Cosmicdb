# 🕹️ Cinematic Observer (Retro Edition)

Welcome to the **Cinematic Observer**, a high-fidelity space data hub styled as a premium retro arcade console! Built with React, Vite, and Tailwind CSS, this terminal interface hooks into **7 real-time astronomical APIs** to bring you the latest telemetry across the solar system—all wrapped in the stunning 16-bit **"Cathode Prestige"** aesthetic (deep CRT blacks, block shadows, pixel fonts, and 0px corner radiuses).

![Deep Space Scanner Setup](public/favicon.png)

---

## 📡 Live API Integrations

The station pulls from a massive network of orbital data, completely free of API keys:

1. **NASA Exoplanet Archive**: Scanning for habitable worlds (Deep Space Scanner).
2. **Spaceflight News API**: Broadcasting the latest mission reports and aerospace journalism.
3. **NASA APOD**: Archiving the Astronomy Picture of the Day in high-res grayscale format.
4. **ISS Tracker**: Plotting real-time coordinates, velocity, and altitude for the International Space Station.
5. **SpaceX API v4**: Tracking the latest rocket launches and vehicle statistics.
6. **Open Notify**: Maintaining a live Crew Manifest for all humans currently in orbit (ISS, Tiangong).
7. **Launch Library 2**: Monitoring the global upcoming schedule for orbital launches.

*(Additionally features fallback data protocols if heavily rate-limited APIs go down).*

---

## 🚀 Features

- **Dynamic HUD Score**: Interacting with terminal buttons (like *START UPLINK*, *INITIATE_SHIELD*, and *ACKNOWLEDGE*) naturally increases your Gamified Score metric.
- **Deep Space Scanner**: Custom retro 8-bit trading cards representing famous star constellations (Orion, Pegasus, Draco), generated exclusively for this application.
- **Responsive Layout**: Designed "Desktop-first" to mimic a physical hardware command center, but smoothly adapts to mobile data pads.
- **CRT Phosphor Glow**: Global CSS scanning lines, inner-glow panels, and mechanical button press mechanics.

---

## 🛠️ Installation & Setup

Ensure you have Node.js 18+ installed on your command line terminal.

```bash
# Clone the repository
git clone https://github.com/Chandan062311/Cosmicdb.git

# Enter the command center
cd Cosmicdb/space-retro

# Install dependencies
npm install

# Initialize the Uplink (Start Dev Server)
npm run dev
```

---

## ☁️ Cloudflare Deployment

The application falls back gracefully with a standard `_redirects` file mapped for Cloudflare Pages SPA (Single Page Application) routing. 

It is 100% plug-and-play ready for **Cloudflare**. You can auto-deploy by linking this repository directly in the Cloudflare Dashboard, or using the pre-configured [Wrangler](https://developers.cloudflare.com/workers/wrangler/) CLI:

```bash
# Authenticate your terminal
npx wrangler login

# Build & Deploy
npm run build
npx wrangler pages deploy dist
```

---

***"The deep space scanner is fully operational. All anomaly feeds are active. Proceed with caution, Commander."***  — *ASTRONOMER_BETA [LVL 42]*
