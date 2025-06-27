# Weather App

This is a small TypeScript application that displays the current weather for your location using the [Open-Meteo](https://open-meteo.com/) API.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Build the TypeScript source:
   ```bash
   npm run build
   ```
3. Start a local web server (required for geolocation):
   ```bash
   npm start
   ```
4. Open [http://localhost:8080](http://localhost:8080) in your browser.

> **Note**: The Geolocation API only works in secure contexts (HTTPS or `localhost`). Opening `index.html` directly from the file system will not allow the app to access your location.
