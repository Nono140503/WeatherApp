import React, { useState } from "react";

import Image from "./assets/Animated-weather-icons-gif--unscreen.gif";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const apiKey = process.env.REACT_APP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
        console.log('API Key:', process.env.REACT_APP_API_KEY); 
      }).catch(error => {
        console.error("Error fetching the weather data:", error);
        console.log('API Key:', process.env.REACT_APP_API_KEY); 
      });
      setLocation("");
    }
  };

  // Convert Kelvin to Celsius
  const toCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  return (
    <div className="App">
      <div className="input">
        <form>
          <label htmlFor="city">Location</label>
          <input
            id="city"
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyDown={searchLocation}
            placeholder="Enter your location"
          />
          <br />
        </form>
      </div>
      <div className="output">
        <h1 id="city">{data.name}</h1>
        <h2 id="country">{data.sys && data.sys.country}</h2>
        <div className="cont">
        <img
          src={Image}
          height={300}
          width={300}
          alt="sun with clouds"
        />
         <div className="desc">
        {data.weather && data.weather.length > 0 && (
          <p id="description">{data.weather[0].description}</p>
        )}
        </div>
        </div>
       
         <div >
          {data.main && <p id="temp">{toCelsius(data.main.temp).toFixed(2)}°C</p>}
          </div>
        <div className="details">
         
       
        
        <div className="content">
        {data.main && (
          <p id="feel"> {toCelsius(data.main.feels_like).toFixed(2)}°C<br></br>Feels like</p>
        )}
        
        </div>
      <div className="content">
      {data.main && <p id="humidity">{data.main.humidity}%<br></br>Humidity</p>}
      
      </div>
        {/* <p>Feels like</p> */}
        <div className="content">
        {data.wind && <p id="wind"> {data.wind.speed} m/s<br></br>Wind</p>}
        
        </div>
        
        
        </div>
       
      </div>
    </div>
  );
}

export default App;
