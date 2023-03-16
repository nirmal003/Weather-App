import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import {
  Button,
  Data,
  Degree,
  From,
  Grid,
  Header,
  Icon,
  Input,
  Report,
  Temp,
  Time,
  Wrapper,
} from "./App.style";

function App() {
  type WeatherData = {
    name: string;
    Country: string;
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
    visibility: number;
    speed: number;
    deg: number;
    sunrise: number;
    sunset: number;
    description: string;
    main: string;
    icon: string;
    time: number;
  };

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
        )
        .then((res) => {
          const data = res.data;

          const weatherData: WeatherData = {
            name: data.name,
            Country: data.sys.country,
            temp: data.main.temp,
            temp_min: data.main.temp_min,
            temp_max: data.main.temp_max,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            visibility: data.visibility,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            speed: data.wind.speed,
            deg: data.wind.deg,
            description: data.weather[0].description,
            main: data.weather[0].main,
            icon: data.weather[0].icon,
            time: data.dt,
          };
          setWeatherData(weatherData);
        })
        .catch((err) => {
          console.log("user must be give a loction allow");
        });
    });
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${process.env.REACT_APP_API_KEY}`
      );

      const data = res.data;

      const weatherData: WeatherData = {
        name: data.name,
        Country: data.sys.country,
        temp: data.main.temp,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        visibility: data.visibility,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        speed: data.wind.speed,
        deg: data.wind.deg,
        description: data.weather[0].description,
        main: data.weather[0].main,
        icon: data.weather[0].icon,
        time: data.dt,
      };

      setWeatherData(weatherData);
    } catch (err) {
      console.log("hello err");
      setError(true);
    }
    setCity("");
    setCountry("");
  };

  return (
    <Wrapper>
      <Header>Weather App</Header>

      <From onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value.trim())}
        />
        <Input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value.trim())}
        />
        <Button type="submit">Submit</Button>
      </From>

      <Report>
        <div>
          {weatherData?.name} , {weatherData?.Country}. Weather
        </div>
        <Time>
          As of{" "}
          {weatherData && new Date(weatherData.time * 1000).getHours() < 12
            ? weatherData &&
              `${Math.abs(
                new Date(weatherData.time * 1000).getHours()
              )}:${new Date(weatherData.time * 1000).getMinutes()}:${new Date(
                weatherData.time * 1000
              ).getSeconds()} AM`
            : weatherData &&
              `${Math.abs(
                24 - 12 - new Date(weatherData.time * 1000).getHours()
              )}:${new Date(weatherData.time * 1000).getMinutes()}:${new Date(
                weatherData.time * 1000
              ).getSeconds()} PM`}
        </Time>

        <Temp>
          <Degree>
            {weatherData && `${(weatherData?.temp - 273.15).toFixed(0)}°`}
          </Degree>
          <Icon>
            {weatherData && (
              <img
                style={{ width: 38 }}
                src={`http://openweathermap.org/img/wn/${weatherData?.icon}@2x.png`}
                alt={`${weatherData?.main}`}
              />
            )}
            <span style={{ fontSize: 14 }}>{weatherData?.main}</span>
          </Icon>
        </Temp>
        <span style={{ fontSize: 17 }}>{weatherData?.main.toLowerCase()}</span>
      </Report>

      {weatherData && (
        <Data>
          <Grid>
            <b>High/Low </b>
            <span>
              {(weatherData.temp_max - 273.15).toFixed(0)}/
              {(weatherData.temp_min - 273.15).toFixed(0)}
            </span>
          </Grid>
          <Grid>
            <b>Wind</b>
            <span>{weatherData.speed} Km/hr</span>
          </Grid>
          <Grid>
            <b>Humidity</b>
            <span>{weatherData.humidity} %</span>
          </Grid>
          <Grid>
            <b>Wind Direction</b>
            <span>{weatherData.deg} ° deg</span>
          </Grid>
          <Grid>
            <b>Pressure</b>
            <span>{weatherData.pressure} hpa</span>
          </Grid>
          <Grid>
            <b>Sunrise</b>
            <span>
              {`${new Date(weatherData.sunrise * 1000).getHours()}:${new Date(
                weatherData.sunrise * 1000
              ).getMinutes()}:${new Date(
                weatherData.sunrise * 1000
              ).getSeconds()}`}{" "}
              AM
            </span>
          </Grid>
          <Grid>
            <b>Visibility</b>
            <span>{weatherData.visibility / 1000} Km</span>
          </Grid>
          <Grid>
            <b>Sunset</b>
            <span>
              {`${Math.abs(
                24 - 12 - new Date(weatherData.sunset * 1000).getHours()
              )}:${new Date(weatherData.sunset * 1000).getMinutes()}:${new Date(
                weatherData.sunset * 1000
              ).getSeconds()}`}{" "}
              PM
            </span>
          </Grid>
        </Data>
      )}
    </Wrapper>
  );
}

export default App;
