import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState(""); // Şehir adı
  const [weatherData, setWeatherData] = useState(null); // Hava durumu bilgisi
  const [error, setError] = useState(""); // Hata mesajı
  const [showInfo, setShowInfo] = useState(false); // Hakkında butonu durumu

  const API_KEY = "aca448e65f02f675c1547734b13f7587"; // OpenWeatherMap API Key

  const fetchWeather = async () => {
    if (!city) {
      setError("Lütfen bir şehir adı girin.");
      setWeatherData(null);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setError(""); // Hata mesajını temizle
    } catch (err) {
      setError("Hava durumu bilgisi alınamadı. Şehir adını kontrol edin.");
      setWeatherData(null);
    }
  };

  // Hava durumu sınıfını belirlemek için bir işlev
  const getWeatherClass = (weather) => {
    if (!weather) return ""; // Hava durumu yoksa boş bırak
    const mainWeather = weather[0].main; // Ana hava durumu
    switch (mainWeather) {
      case "Clear":
        return "Clear"; // Güneşli
      case "Clouds":
        return "Clouds"; // Bulutlu
      case "Rain":
        return "Rain"; // Yağmurlu
      case "Snow":
        return "Snow"; // Karlı
      default:
        return ""; // Diğer durumlar için boş
    }
  };


  return (
    <div className={`weather-container ${getWeatherClass(weatherData?.weather)}`}>
      <h1 className="app-title">Hava Durumu Uygulaması</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Şehir adı girin"
          className="form-control"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn btn-primary" onClick={fetchWeather}>
          Getir
        </button>
      </div>

      {error && <p className="text-danger mt-3">{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <h3>{weatherData.name} için Hava Durumu</h3>
          <p><strong>Sıcaklık:</strong> {weatherData.main.temp}°C</p>
          <p><strong>Nem:</strong> {weatherData.main.humidity}%</p>
          <p><strong>Rüzgar Hızı:</strong> {weatherData.wind.speed} m/s</p>
          <p><strong>Basınç:</strong> {weatherData.main.pressure} hPa</p>
          <p><strong>Görüş Mesafesi:</strong>
          {weatherData.visibility / 1000} km</p>
          <p><strong>Hava Durumu:</strong> {weatherData.weather[0].description}</p>
        </div>
      )}

{/* Hakkında Butonu */}
      <div className="about-button">
        <button
          className="btn btn-info"
          onClick={() => setShowInfo(!showInfo)}
        >
          Hakkında
        </button>
      </div>

      {/* Tasarımcı Bilgileri */}
      {showInfo && (
        <div className="about-section mt-3 p-3 border rounded">
          <h4>Tasarımcı Bilgileri</h4>
          <p><strong>Ad:</strong> Feyza</p>
          <p><strong>Soyad:</strong> Dönmez</p>
          <p><strong>Yaş:</strong> 21</p>
          <p><strong>Okul:</strong> Hacettepe Üniversitesi</p>
          <p><strong>Numara:</strong> 2220780036</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
