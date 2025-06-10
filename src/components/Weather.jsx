import React, { useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Sun, CloudRain, CloudSnow, CloudLightning, Cloud, Wind, Haze, CloudDrizzle, Waves, CloudSunRain, CloudSun, CloudFog, MoonStar, CloudMoon, CloudMoonRain } from "lucide-react";
import { useState } from "react";

export const Weather = () => {

    const inputRef = useRef(null);
    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": <Sun className="text-yellow-300" size={64} />,
        "01n": <MoonStar className="text-yellow-300" size={64} />,
        "02d": <CloudSun className="text-gray-300" size={64} />,
        "02n": <CloudMoon className="text-gray-300" size={64} />,
        "03d": <Cloud className="text-gray-400" size={64} />,
        "03n": <Cloud className="text-gray-400" size={64} />,
        "04d": <Cloud className="text-gray-500" size={64} />,
        "04n": <Cloud className="text-gray-500" size={64} />,
        "09d": <CloudDrizzle className="text-blue-400" size={64} />,
        "09n": <CloudDrizzle className="text-blue-400" size={64} />,
        "10d": <CloudRain className="text-blue-500" size={64} />,
        "10n": <CloudRain className="text-blue-500" size={64} />,
        "11d": <CloudLightning className="text-yellow-500" size={64} />,
        "11n": <CloudLightning className="text-yellow-500" size={64} />,
        "13d": <CloudSnow className="text-white" size={64} />,
        "13n": <CloudSnow className="text-white" size={64} />,
        "50d": <Haze className="text-gray-300" size={64} />,
        "50n": <Haze className="text-gray-300" size={64} />,


    }

    const search = async (city) => {
        if (city === "") {
            alert("Please enter a city name.");
            return;
        }
        console.log("API Key:", import.meta.env.VITE_APP_ID); // Sprawdź czy się ładuje
        console.log("API Key length:", import.meta.env.VITE_APP_ID?.length); // Sprawdź długość

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            console.log("Full URL:", url); // Sprawdź pełny URL

            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            console.log(data);
            const icon = allIcons[data.weather[0].icon] || <Sun className="text-yellow-300" size={64} />; // Default icon if not found
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            });
        } catch (error) {
            setWeatherData(false);
            console.error("Error fetching weather data:", error);
        }
    };

    useEffect(() => {
        search("Piekary Śląskie");
    }, []);


    return (
        <div className="place-self-center p-8 h-96 w-86 bg-gradient-to-r from-blue-400 to-blue-700 text-white rounded-lg shadow-lg flex flex-col items-center justify-center gap-4">
            <div className="search-bar flex items-center gap-2 mt-4">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search for a city..."
                    className="h-8 border-0 outline-none rounded-lg pl-10 text-gray-500 bg-cyan-50 text-lg"
                />
                <div
                    className="flex items-center justify-center h-8 w-8 bg-white rounded-full"
                    onClick={() => { search(inputRef.current.value) }}>
                    <Search className="text-gray-500 cursor-pointer" size={16} />
                </div>
            </div>
            {weatherData ? <>
                <div className="flex flex-col items-center gap-2">
                    {weatherData.icon}
                    <div>
                        <p className="text-2xl font-bold">{weatherData.temperature}°C</p>
                        <p className="text-1xl font-semibold">{weatherData.location}</p>
                    </div>
                </div>
                <div className="flex items-center justify-around w-full px-4 mb-4">
                    <div className="flex flex-col items-center gap-2">
                        <Waves className="text-white" size={32} />
                        <span className="text-sm">{weatherData.humidity}%</span>
                        <p className="text-sm font-semibold">Humidity</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Wind className="text-white" size={32} />
                        <span className="text-sm">{weatherData.windSpeed}km/h</span>
                        <p className="text-sm font-semibold">Wind Speed</p>
                    </div>
                </div>
            </> : <></>}


        </div>
    );
}