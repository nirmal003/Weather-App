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
    const cty = "bengaluru";
    const cntry = "india";
    (async () => {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cty},${cntry}&appid=${process.env.REACT_APP_API_KEY}`
        )
        .then((res) => {
          console.log(res.data);

          const data = res.data;
          const name = data.name;
          const Country = data.sys.country;
          const sunrise = data.sys.sunrise;
          const sunset = data.sys.sunset;
          const temp = data.main.temp;
          const temp_min = data.main.temp_min;
          const temp_max = data.main.temp_max;
          const humidity = data.main.humidity;
          const pressure = data.main.pressure;
          const visibility = data.visibility;
          const speed = data.wind.speed;
          const deg = data.wind.deg;
          const description = data.weather[0].description;
          const main = data.weather[0].main;
          const icon = data.weather[0].icon;
          const time = data.dt;

          const weatherData: WeatherData = {
            name,
            Country,
            temp,
            temp_min,
            temp_max,
            humidity,
            pressure,
            visibility,
            sunrise,
            sunset,
            speed,
            deg,
            description,
            main,
            icon,
            time,
          };

          setWeatherData(weatherData);
        })
        .catch((err) => {
          console.log("hello err");
        });
    })();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${process.env.REACT_APP_API_KEY}`
      );

      const data = res.data;
      const name = data.name;
      const Country = data.sys.country;
      const sunrise = data.sys.sunrise;
      const sunset = data.sys.sunset;
      const temp = data.main.temp;
      const temp_min = data.main.temp_min;
      const temp_max = data.main.temp_max;
      const humidity = data.main.humidity;
      const pressure = data.main.pressure;
      const visibility = data.visibility;
      const speed = data.wind.speed;
      const deg = data.wind.deg;
      const description = data.weather[0].description;
      const main = data.weather[0].main;
      const icon = data.weather[0].icon;
      const time = data.dt;

      const weatherData: WeatherData = {
        name,
        Country,
        temp,
        temp_min,
        temp_max,
        humidity,
        pressure,
        visibility,
        sunrise,
        sunset,
        speed,
        deg,
        description,
        main,
        icon,
        time,
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
          onChange={(e) => setCity(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
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
            <img
              style={{ width: 38 }}
              src={`http://openweathermap.org/img/wn/${weatherData?.icon}@2x.png`}
              alt={`${weatherData?.main}`}
            />
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
