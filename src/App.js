import React from 'react'; // React her zaman en üstte olmalı
import Weather from './components/Weather'; // Weather bileşeni
import './App.css'; // Stil dosyası
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap stil dosyası

function App() {
  return (
    <div className="App">
      <Weather />
    </div>
  );
}

export default App;
