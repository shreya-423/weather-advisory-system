const express = require("express");
const axios = require("axios");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();

// MongoDB model for search history
const SearchHistorySchema = new mongoose.Schema({
  location: { type: String, required: true },
  searchedAt: { type: Date, default: Date.now },
});
const SearchHistory = mongoose.model("SearchHistory", SearchHistorySchema);

// 〽️ Farmer Advisory Logic
function generateAdvisories(current, forecast) {
  const advisories = [];

  if (current.rainProbability > 60) {
    advisories.push(
      "Avoid irrigation and pesticide spraying today due to high chance of rain."
    );
  }

  if (current.temperature > 35) {
    advisories.push(
      "High temperature detected. Increase irrigation for heat-sensitive crops."
    );
  }

  if (current.windSpeed > 15) {
    advisories.push(
      "Wind speed is high. Do not spray pesticides to prevent drift."
    );
  }

  if (current.humidity > 80) {
    advisories.push(
      "High humidity detected. Monitor for possible fungal infections."
    );
  }

  const next6Hours = forecast.slice(0, 2);
  const rainNext6Hrs = next6Hours.some((f) => f.rainProbability > 20);
  if (current.windSpeed < 10 && !rainNext6Hrs) {
    advisories.push("Good window for spraying pesticides in the next 6 hours.");
  }

  // Default advisory if none of the rules apply
  if (advisories.length === 0) {
    advisories.push("🌿 Weather looks normal. No special actions needed today.");
  }

  return advisories;
}

router.get("/", async (req, res) => {
  const location = req.query.location;
  if (!location) {
    return res.status(400).json({ error: "Location required" });
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    // 1️⃣ CURRENT WEATHER
    const currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    const currentRes = await axios.get(currentURL);
    const current = currentRes.data;

    // 2️⃣ FORECAST
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;
    const forecastRes = await axios.get(forecastURL);
    const forecastList = forecastRes.data.list;

    const forecastData = forecastList.map((item) => ({
      time: item.dt_txt,
      temperature: item.main.temp,
      rainProbability: item.pop ? item.pop * 100 : 0,
    }));

    const data = {
      location: current.name,
      temperature: current.main.temp,
      humidity: current.main.humidity,
      rainProbability: current.rain?.["1h"] ? 80 : 20,
      windSpeed: current.wind.speed,
      forecast: forecastData,
    };

    // 🔔 Generate advisories
    const advisories = generateAdvisories(data, forecastData);

    // 🔹 Save search history only if DB is connected (optional feature)
    let lastSearches = [];
    try {
      if (mongoose.connection && mongoose.connection.readyState === 1) {
        const lastEntry = await SearchHistory.findOne().sort({ searchedAt: -1 });
        if (!lastEntry || lastEntry.location !== current.name) {
          const historyEntry = new SearchHistory({ location: current.name });
          await historyEntry.save();
        }

        lastSearches = await SearchHistory.find()
          .sort({ searchedAt: -1 })
          .limit(5)
          .select("location -_id");
      }
    } catch (dbErr) {
      console.warn("SearchHistory DB operation skipped:", dbErr.message || dbErr);
      lastSearches = [];
    }

    res.json({ ...data, advisories, lastSearches });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Weather fetch failed" });
  }
});

module.exports = router;
