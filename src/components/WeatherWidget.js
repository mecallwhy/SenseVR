import {React, useEffect, useState} from 'react';
import { Search } from './Search';
import barometer from '../style/images/barometer.png';
import humidity from '../style/images/humidity.png';
import wind from '../style/images/wind.png';
import save from '../style/images/save.png';
import unSave from '../style/images/unsave.png';

export const WeatherWidget = (props) => {

    const {defaultLocation, id, localStorageKey} = props
    const [weatherData, setWeatherData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [showSearch, setShowSearch] = useState(false)
    const coords = {
      lat: defaultLocation.lat,
      lon: defaultLocation.lon
    }
    const [metric, setMetric] = useState(true)
    const [lastCoords, setLastCoords] = useState(coords)
    const [saveIcon, setSaveIcon] = useState(()=>{
      if(window.localStorage.getItem(localStorageKey) === JSON.stringify(defaultLocation)){
        return false
      }
      else{
        return true
      }
    })
    
    const handleMetricChange = ()=>{
      setIsLoading(true)
      setMetric(!metric)
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lastCoords.lat}&lon=${lastCoords.lon}&units=${!metric?"metric":"imperial"}&lang=pl&appid=d7afe106b76bf6155a2c1cae90ecb327`)
      .then(response => response.json())
      .then((data) => {
        setWeatherData(data)
        setIsLoading(false)
      })
    }
    useEffect(()=>{
        setIsLoading(true)
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=${metric?"metric":"imperial"}&lang=pl&appid=d7afe106b76bf6155a2c1cae90ecb327`)
        .then(response => response.json())
        .then((data) => {
          setWeatherData(data)
          setIsLoading(false)
         })
         setLastCoords(coords)
      },[])

    const handleSaved = ()=>{
      if(window.localStorage.getItem(localStorageKey) !== JSON.stringify(lastCoords)){
        window.localStorage.setItem(localStorageKey, JSON.stringify(lastCoords));
        setSaveIcon(false)
      }
      else if(window.localStorage.getItem(localStorageKey) === JSON.stringify(lastCoords)){
        window.localStorage.removeItem(localStorageKey);
        setSaveIcon(true)
      }
    }

    return (
      <div
        className="widget-weather-extra"
        id={id} >
          {isLoading ? <h1 id="loading">Loading...</h1> :
          <div id="weather-data">
            <div id="weather-temps-container"
                onClick={()=>{handleMetricChange()
                }}>
              <span id="weather-temperature">{Math.round(weatherData.main.temp)}°</span> 
              <span id="weather-feelsLike">{Math.round(weatherData.main.feels_like)}°</span>
            </div>
            <span id="weather-units"
                onClick={()=>{handleMetricChange()
                }}>{metric?"Celsius":"Fahrenheit"}</span>
            <span id="weather-description">{weatherData.weather[0].description}</span> 
            <div id="weather-details">
              <p id="weather-pressure"><img src={barometer}></img> {weatherData.main.pressure}hPa</p> 
              <p id="weather-humidity"><img src={humidity}></img> {weatherData.main.humidity}%</p> 
              <p id="weather-windSpeed"><img src={wind}></img> {weatherData.wind.speed}m/s</p>
            </div>
            {!showSearch ? 
            <div id="wheather-cityName">
              <span onClick={()=>{setShowSearch(true)}}>{weatherData.name}</span>
              <img onClick={()=>handleSaved()} src={saveIcon ? save : unSave}></img>
            </div>
            :
            <Search
              setShowSearch={setShowSearch}
              setWeatherData={setWeatherData}
              setIsLoading={setIsLoading}
              metric={metric}
              setLastCoords={setLastCoords}
              lastCoords={lastCoords}/>}
          </div>}
      </div>
    )
}
