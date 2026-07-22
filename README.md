# Aether Weather Intelligence Web Application

A modern, responsive Weather Intelligence single-page web application featuring real-time geocoding search, detailed 7-day forecast metrics, interactive trend charts, and automated travel and clothing smart recommendations.

Designed for lightning-fast performance, type safety, and seamless compilation/deployment to platforms like **Cloudflare Pages**, **Netlify**, or **Vercel** with zero-config setup.

---

## 🚀 Key Features

- 🗺️ **Global City Search**: Real-time Geocoding search resolving any city name into precise coordinates worldwide.
- 📊 **Interactive Analytics**: Curve-area trend line mapping weekly maximum/minimum temperatures using `recharts` for interactive telemetry.
- 🌡️ **Atmospheric Conditions**: Auto-updates corresponding gradients, micro-metrics (wind direction, gusts, wind speeds, daily highs/lows) and conditions according to WMO standard codes.
- 🧠 **Dynamic Planning Heuristics**: Automated recommendations mapping apparel suggestions, athletic suitability, and travel logistics depending on selected dates or cumulative weekly forecasts.
- 📱 **Adaptive UI**: Built with a sophisticated, light high-contrast responsive layout.
- 🔌 **Connection Failure Resilience**: Continuous online/offline network detection with state recovery banners.

---

## 🛠️ Local Setup Instructions

Follow these quick steps to get the development server running locally:

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) and `npm` installed.

### 2. Clone and Install Dependencies
Navigate into your project folder and run:
```bash
npm install
```

### 3. Run Development Server
Boot up the local Vite dev server:
```bash
npm run dev
```
Open your browser and visit the local port displayed in your terminal (usually `http://localhost:3000` or `http://localhost:5173`).

### 4. Build for Production
To package the highly optimized static build:
```bash
npm run build
```
This compiles all TypeScript modules, bundles Tailwind styles, and outputs production assets into the `/dist` directory.

---

## ☁️ Deploying to Cloudflare Pages

Deploying the compiled static site to Cloudflare Pages is quick and completely free. 

### Method A: Direct GitHub Integration (Recommended)
1. **Push your code**: Push this project directory to a public or private GitHub repository.
2. **Log into Cloudflare**: Access the [Cloudflare Dashboard](https://dash.cloudflare.com/) and go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. **Select Repository**: Connect your GitHub account and select your Weather Intelligence repository.
4. **Configure Build Settings**:
   - **Framework Preset**: `Vite` (or `None`)
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
5. **Deploy**: Click **Save and Deploy**. Cloudflare will compile and deploy your web app onto a global edge network, creating unique preview URLs for every commit!

### Method B: Manual Deployment via Wrangler CLI
If you prefer deploying via terminal without Git connection:
1. Build the project locally:
   ```bash
   npm run build
   ```
2. Run wrangler (Cloudflare's developer CLI) to publish:
   ```bash
   npx wrangler pages deploy dist
   ```
3. Follow the quick command prompts to create a new project and select your custom `.pages.dev` subdomain.

---

## 📝 Technologies Used
- **Frontend Core**: React 19, TypeScript, Vite 6
- **Data Visuals**: Recharts
- **Styling Framework**: Tailwind CSS
- **Vector Icons**: Lucide React
- **Meteorology Source**: Free Open-Meteo Public APIs (Requires no API keys/credentials)
