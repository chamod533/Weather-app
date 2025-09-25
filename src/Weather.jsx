import React, { useState } from "react";
import axios from "axios";
import { db } from "./firebase";   
import { collection, addDoc } from "firebase/firestore";

function Weather() {
  const [city, setCity] = useState("");
  const [user] = useState({
    name: "Chamod",
    age: "20",
    address: { line_1: "Kandy", line_2: "maligaththane" },
  });

  const [weather, setWeather] = useState(null);

  const API_KEY = "33e6f0852371ac45ac42baebf4a2f14c";

  const getWeather = async () => {
    if (city === "") {
      return alert("Enter a city");
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      const data = response.data;
      setWeather(data);

      //  to Firebase
      await addDoc(collection(db, "weatherHistory"), {
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        condition: data.weather[0].description,
        wind: data.wind.speed,
        timestamp: new Date(),
      });

    } catch (error) {
      alert("City not found or error fetching weather!");
    }
  };

  return (
    <div className="container">
      <h1 className="title">
        Welcome <span className="highlight">{user.name}</span>, you are from{" "}
        <span className="highlight">{user.address.line_2}</span>
      </h1>

      <h2 className="subtitle">🌤 Real-Time Weather App</h2>

      <div className="search-box">
      
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {weather && (
        <div className="weather-card">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p>🌡 Temperature: <b>{weather.main.temp}°C</b></p>
          <p>☁ Condition: {weather.weather[0].description}</p>
          <p>💨 Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
