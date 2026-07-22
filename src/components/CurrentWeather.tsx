import React from 'react';
import {
  Sun,
  SunDim,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  Snowflake,
  CloudLightning,
  Wind,
  Droplets,
  Thermometer,
  Compass,
} from 'lucide-react';
import { CityData, CurrentWeather as CurrentWeatherType, TempUnit } from '../types';
import { getWeatherCondition, celsiusToFahrenheit } from '../utils/weatherUtils';

interface CurrentWeatherProps {
  city: CityData;
  weather: CurrentWeatherType;
  tempMax: number;
  tempMin: number;
  precipitationProb: number;
  unit: TempUnit;
}

// Icon mapper to resolve strings from weatherUtils into beautiful Lucide icons
export const WeatherIcon: React.FC<{ name: string; className?: string }> = ({ name, className = 'w-12 h-12' }) => {
  switch (name) {
    case 'Sun':
      return <Sun className={`${className} text-amber-500 animate-pulse`} />;
    case 'SunDim':
      return <SunDim className={`${className} text-amber-400`} />;
    case 'CloudSun':
      return <CloudSun className={`${className} text-sky-400`} />;
    case 'Cloud':
      return <Cloud className={`${className} text-slate-400`} />;
    case 'CloudFog':
      return <CloudFog className={`${className} text-slate-400`} />;
    case 'CloudDrizzle':
      return <CloudDrizzle className={`${className} text-indigo-400`} />;
    case 'CloudRain':
      return <CloudRain className={`${className} text-blue-500`} />;
    case 'CloudRainWind':
      return <CloudRainWind className={`${className} text-indigo-500`} />;
    case 'Snowflake':
      return <Snowflake className={`${className} text-cyan-300 animate-spin-slow`} />;
    case 'CloudLightning':
      return <CloudLightning className={`${className} text-slate-600 animate-bounce`} />;
    default:
      return <CloudSun className={`${className} text-slate-400`} />;
  }
};

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  city,
  weather,
  tempMax,
  tempMin,
  precipitationProb,
  unit,
}) => {
  const condition = getWeatherCondition(weather.weathercode);
  const currentTemp = unit === 'C' ? Math.round(weather.temperature) : celsiusToFahrenheit(weather.temperature);
  const highTemp = unit === 'C' ? Math.round(tempMax) : celsiusToFahrenheit(tempMax);
  const lowTemp = unit === 'C' ? Math.round(tempMin) : celsiusToFahrenheit(tempMin);

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      id="current-weather-card"
      className="relative overflow-hidden rounded-3xl border-none bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-xl transition-all duration-300 flex flex-col justify-between"
    >
      {/* Decorative glass elements */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-10 top-10 w-24 h-24 bg-yellow-400/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6">
        {/* Left column: City & Temperature */}
        <div className="flex flex-col justify-between">
          <div>
            <p id="current-city-header" className="text-xl font-semibold tracking-tight">
              {city.name}
            </p>
            <p id="current-city-details" className="text-xs font-normal opacity-70 mt-1">
              {city.admin1 ? `${city.admin1}, ` : ''}
              {city.country || ''} • {formattedDate}
            </p>
          </div>

          <div className="flex items-baseline gap-2 mt-8">
            <span id="current-temp-display" className="text-7xl md:text-8xl font-light tracking-tighter leading-none">
              {currentTemp}°
            </span>
            <span className="text-xl font-medium opacity-80">
              {unit}
            </span>
          </div>
        </div>

        {/* Right column: Weather illustration & status description */}
        <div className="flex flex-col justify-between items-start md:items-end md:text-right min-w-[180px]">
          <div className="flex items-center md:flex-col md:items-end gap-4 md:gap-2">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl shadow-sm border border-white/10">
              <WeatherIcon name={condition.iconName} className="w-12 h-12 text-white" />
            </div>
            <div>
              <h3 id="weather-status-label" className="text-lg font-bold">
                {condition.label}
              </h3>
              <p className="text-xs font-normal opacity-70 md:max-w-[200px] mt-1 leading-relaxed">
                {condition.description}
              </p>
            </div>
          </div>

          <div className="mt-6 md:mt-8 w-full">
            <div className="flex items-center justify-between md:justify-end gap-2 text-xs">
              <span className="opacity-75 font-medium">Daily extremes:</span>
              <span id="current-extremes-display" className="font-semibold text-white bg-white/10 px-2 py-0.5 rounded-md">
                H: {highTemp}° / L: {lowTemp}°
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Atmospheric secondary stats block: Sleek glass widgets */}
      <div id="weather-stats-grid" className="relative z-10 grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-white/10">
        {/* Stat 1: Wind Speed */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 flex flex-col justify-between">
          <p className="text-[9px] uppercase tracking-wider opacity-60 font-semibold mb-1">Wind Speed</p>
          <p id="current-wind-speed" className="text-sm font-bold">{weather.windspeed} km/h</p>
        </div>

        {/* Stat 2: Rain chance */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 flex flex-col justify-between">
          <p className="text-[9px] uppercase tracking-wider opacity-60 font-semibold mb-1">Precipitation</p>
          <p id="current-precipitation" className="text-sm font-bold">{precipitationProb}% avg</p>
        </div>

        {/* Stat 3: Wind Direction */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 flex flex-col justify-between">
          <p className="text-[9px] uppercase tracking-wider opacity-60 font-semibold mb-1">Wind Direction</p>
          <p id="current-wind-direction" className="text-sm font-bold">{weather.winddirection}°</p>
        </div>
      </div>
    </div>
  );
};
