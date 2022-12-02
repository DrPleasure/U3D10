import React, { useState } from "react";
import axios from "axios";
import { fromUnixTime } from "date-fns";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=7f4433c828eb3dc6299497071d5b04e9`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  // let dateup = fromUnixTime(data.sys.sunrise);
  // let datedown = fromUnixTime(data.sys.sunset);

  // {dateup.toLocaleTimeString().slice(0, 4)}
  // {datedown.toLocaleTimeString().slice(0, 4)

  return (
    <div className="App">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>

        {data.name != undefined && (
          <div id="animation">
            <div className="row z bold sky">
              <div className="mb-100">
                Sunrise <div>9:44 AM</div>
              </div>

              <div className="mb-100">
                Sundown
                <div>5:22 PM</div>
              </div>
            </div>
            <div class="sky__phase sky__dawn"></div>
            <div class="sky__phase sky__noon"></div>
            <div class="sky__phase sky__dusk"></div>
            <div class="sky__phase sky__midnight">
              <div id="sky__stars"></div>
            </div>
            <div class="orbit">
              <div class="sun"></div>
              <div class="moon"></div>
            </div>
          </div>
        )}

        {/* <div className="middle bold">
          
        </div> */}
        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              <p className="bold">{data.main.feels_like.toFixed()} °C</p>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <p className="bold">{data.main.humidity}%</p>
              <p>Humidity</p>
            </div>
            <div clasName="wind">
              <p className="bold">{data.wind.speed.toFixed()} KMH</p>
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
