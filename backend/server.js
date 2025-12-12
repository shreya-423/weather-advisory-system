require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const weatherRoutes = require('./routes/weather');
const searchesRoutes = require('./routes/searches'); // optional

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/weather', weatherRoutes);
app.use('/api/searches', searchesRoutes);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB (optional)
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Error:", err));
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
