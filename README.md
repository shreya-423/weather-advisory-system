🌦️ Farmer Weather Advisory System (MERN Stack)

A full-stack Weather Advisory System built using the MERN stack that provides real-time weather data, 5-day forecast, and AI-like farmer advisories using agricultural weather logic.
It also allows PDF report download, search history, and beautiful responsive UI.

🚀 Features
🔹 Weather Forecasting

Current temperature, humidity, rainfall probability, wind speed

5-day / 3-hour interval forecast graph (Recharts)

🔹 Farmer Advisory Engine

Automatically generates crop-friendly advisories based on:

High temperature

High humidity

High wind speed

Rain probability

Pesticide spraying window

🔹 PDF Download

Download a complete weather + advisory report using jsPDF.

🔹 Search History

Keeps last 5 searched locations (stored in MongoDB).

🔹 Beautiful UI

Fully responsive

Gradient backgrounds

Professional card design

Animated hover effects

🛠️ Tech Stack
Frontend

React.js

Axios

Recharts

jsPDF

React-icons

CSS

Backend

Node.js

Express.js

MongoDB + Mongoose

Axios

OpenWeather API

📁 Project Structure
weather-advisory-system/
│
├── backend/
│   ├── routes/
│   │   └── weather.js
│   ├── server.js
│   ├── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/WeatherDashboard.jsx
│   │   ├── WeatherDashboard.css
│   │   └── App.js
│   ├── package.json
│
└── README.md

🔧 Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/your-username/weather-advisory-system.git

⬅️ Backend Setup (/backend)
Install dependencies:
cd backend
npm install

Create .env file:
OPENWEATHER_API_KEY=your_api_key_here
MONGO_URI=your_mongo_connection_string

Start backend:
npm start


Backend runs at:

http://localhost:5000

➡️ Frontend Setup (/frontend)
Install dependencies:
cd frontend
npm install

Start frontend:
npm start


Frontend runs at:

http://localhost:3000

🌩️ API Used

Weather data is fetched from:

OpenWeatherMap API
https://openweathermap.org/api

🤝 Contributing

Pull requests are welcome.
Feel free to open issues for suggestions or bugs.

📜 License

This project is for learning and development. Free to use.
