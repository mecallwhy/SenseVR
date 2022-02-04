import {React, useEffect, useState} from 'react';
import barometer from '../style/images/barometer.png';
import humidity from '../style/images/humidity.png';
import wind from '../style/images/wind.png';

export const WeatherWidgetMain = () => {
    const [weatherData, setWeatherData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [options, setOptions] = useState({
      units: "metric",
      latitude: 0,
      longitude: 0
    })
    
    const located = (pos) => {
      let crd = pos.coords;
      options.latitude = crd.latitude
      options.longitude = crd.longitude
      setOptions({...options})
    }
    useEffect(()=>{
      navigator.geolocation.getCurrentPosition(located)
    },[])

    useEffect(()=>{
      setIsLoading(true)
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${options.latitude}&lon=${options.longitude}&units=${options.units}&lang=pl&appid=d7afe106b76bf6155a2c1cae90ecb327`)
      .then(response => response.json())
      .then((data) => {
        setWeatherData(data)
        setIsLoading(false)
      })
    },[options])

    const handleUnitChange = () => {
      if(options.units === "metric"){
        options.units = "imperial"
      }
      else{
        options.units = "metric"
      }
      setOptions({...options})
    }

    return (
      <div
        id="widget-weather-main">
          {isLoading ? null :
          <div id="weather-data">
            <span id="weather-cityName">{weatherData.name}</span>
            <div id="weather-temps-container" onClick={()=>handleUnitChange()}>
              <span id="weather-temperature">{Math.round(weatherData.main.temp)}°</span> 
              <span id="weather-feelsLike">{Math.round(weatherData.main.feels_like)}°</span>
              <span id="weather-units">{options.units==="metric"? "Celsius" : "Fahrenheit"}</span>
            </div>
            <span id="weather-description">{weatherData.weather[0].description}</span> 
            <div id="weather-details">
              <p id="weather-pressure"><img src={barometer}></img> {weatherData.main.pressure}hPa</p> 
              <p id="weather-humidity"><img src={humidity}></img> {weatherData.main.humidity}%</p> 
              <p id="weather-windSpeed"><img src={wind}></img> {weatherData.wind.speed}m/s</p>
            </div>
          </div>}
      </div>
    )
}