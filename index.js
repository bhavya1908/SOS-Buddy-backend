// lifetrail-backend/server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(cors()); // Allow requests from all origins

app.get("/reverse", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Missing lat or lon parameter" });
  }

  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Reverse geocode failed:", err);
    res.status(500).json({ error: "Failed to fetch location" });
  }
});

app.listen(PORT, () => {
  console.log(`🌍 Proxy server running at http://localhost:${PORT}`);
});
