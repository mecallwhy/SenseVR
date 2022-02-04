import {React} from "react"
import { WeatherWidget } from './WeatherWidget';
import { WeatherWidgetMain } from "./WeatherWidgetMain";

export const Widgets = () => {

    const defaultLocations = [
        {"lat":"51.509865", "lon":"-0.118092"},
        {"lat":"25.761681", "lon":"-80.191778"},
        {"lat":"31.2222195", "lon":"121.4580612"}
    ]
    const savedLocations = [
        JSON.parse(window.localStorage.getItem('coords1')),
        JSON.parse(window.localStorage.getItem('coords2')),
        JSON.parse(window.localStorage.getItem('coords3'))
    ]

    return <section id="widgets">
        <div id="widgets-frosty-layer"></div>
        <div id="widgets-content">
            <WeatherWidgetMain />
            <WeatherWidget defaultLocation={savedLocations[0] ? savedLocations[0] : defaultLocations[0]} id="extraWidget-1" localStorageKey={"coords1"}/> 
            <WeatherWidget defaultLocation={savedLocations[1] ? savedLocations[1] : defaultLocations[1]} id="extraWidget-2" localStorageKey={"coords2"}/>
            <WeatherWidget defaultLocation={savedLocations[2] ? savedLocations[2] : defaultLocations[2]} id="extraWidget-3" localStorageKey={"coords3"}/>
        </div>
    </section>
}