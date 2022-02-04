import {React, useState} from "react"
import location from '../style/images/location.png';
import check from '../style/images/check.png';

export const Search = (props) => {
    
    const {
        setShowSearch,
        setWeatherData,
        setIsLoading,
        metric,
        setLastCoords,
        lastCoords
    } = props
    const [city, setCity] = useState()

    const located = (pos) => {
        setIsLoading(true)
        let crd = pos.coords;
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&units=${metric?"metric":"imperial"}&lang=pl&appid=d7afe106b76bf6155a2c1cae90ecb327`)
        .then(response => response.json())
        .then((data) => {
          setWeatherData(data)
          setIsLoading(false)
        })
        lastCoords.lat = crd.latitude
        lastCoords.lon = crd.longitude
        setLastCoords({...lastCoords})
        // setLastCoords(crd)
        setShowSearch(false)
        setIsLoading(false)
    }

    const findCity = (e) => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&units=${metric?"metric":"imperial"}&lang=pl&appid=d7afe106b76bf6155a2c1cae90ecb327`)       
        .then(response => response.json())
        .then((data) => {
            if(data.cod===200){
                setCity({...data})
                setLastCoords(data.coord)
                console.log(data.coord)
            }
        })
    }
    const handleCityChange = ()=>{
        if(city){
            setWeatherData(city)
            setShowSearch(false)
        }
        else{
            alert("Upewnij się, że nazwa miasta lub kod pocztywy są poprawne.")
        }
    }
    const handleUsersLocation = ()=>{
        setIsLoading(true)
        navigator.geolocation.getCurrentPosition(located)
    }
    return (
        <div id="widget-search">
            <img src={location} onClick={()=>handleUsersLocation()}></img>
            <input type="text" placeholder="miasto/kod" onChange={(e)=>{findCity(e)}}></input>
            <img src={check} onClick={()=>handleCityChange()}></img>
        </div>
    )
}
