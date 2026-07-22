import React, { useState, useEffect, useCallback } from 'react';
import { 
  CloudSun, 
  WifiOff, 
  AlertCircle, 
  RefreshCw, 
  HelpCircle,
  TrendingUp,
  BrainCircuit,
  Settings,
  Sparkles
} from 'lucide-react';
import { CityData, WeatherResponse, TempUnit } from './types';
import { SearchBar } from './components/SearchBar';
import { UnitToggle } from './components/UnitToggle';
import { CurrentWeather } from './components/CurrentWeather';
import { WeatherChart } from './components/WeatherChart';
import { ForecastGrid } from './components/ForecastGrid';
import { Recommendations } from './components/Recommendations';

const DEFAULT_CITY: CityData = {
  name: 'San Francisco',
  latitude: 37.7749,
  longitude: -122.4194,
  country: 'United States',
  admin1: 'California',
};

export default function App() {
  const [selectedCity, setSelectedCity] = useState<CityData>(DEFAULT_CITY);
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [unit, setUnit] = useState<TempUnit>('C');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  // Monitor network connection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Fetch forecast data for coordinates
  const fetchWeather = useCallback(async (city: CityData) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_mean&timezone=auto`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to retrieve forecast coordinates.');
      }
      
      const data: WeatherResponse = await response.json();
      if (!data.current_weather || !data.daily) {
        throw new Error('Weather forecast payload is incomplete.');
      }

      setWeatherData(data);
      setSelectedDayIndex(0); // Reset index focus to today on new city
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred while loading weather forecasts.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle manual city queries (geocoding)
  const handleCitySearch = async (cityName: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
      
      const response = await fetch(geoUrl);
      if (!response.ok) {
        throw new Error('Geocoding service unavailable.');
      }

      const data = await response.json();
      if (!data.results || data.results.length === 0) {
        throw new Error(`Location matching "${cityName}" could not be resolved. Please try another city.`);
      }

      const topResult = data.results[0];
      const resolvedCity: CityData = {
        name: topResult.name,
        latitude: topResult.latitude,
        longitude: topResult.longitude,
        country: topResult.country,
        admin1: topResult.admin1,
      };

      setSelectedCity(resolvedCity);
      await fetchWeather(resolvedCity);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while matching coordinates.');
      setIsLoading(false);
    }
  };

  // Quick reset to default city
  const handleResetToDefault = () => {
    setSelectedCity(DEFAULT_CITY);
    fetchWeather(DEFAULT_CITY);
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchWeather(DEFAULT_CITY);
  }, [fetchWeather]);

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-800 flex flex-col font-sans">
      {/* Network Alert Banner */}
      {!isOnline && (
        <div id="offline-banner" className="bg-rose-600 text-white text-xs font-bold py-2 px-4 text-center flex items-center justify-center gap-2 sticky top-0 z-50">
          <WifiOff className="w-4 h-4 animate-bounce" />
          <span>You are currently offline. Displayed metrics may be cached or outdated.</span>
        </div>
      )}

      {/* Modern High-End Nav Header */}
      <header id="app-header" className="bg-white/85 border-b border-slate-200 py-5 px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-40 shadow-xs backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-xs">
            <CloudSun className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-extrabold tracking-widest text-blue-600 uppercase">Aether</span>
              <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-blue-100">Vite/Pages</span>
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">Weather Intelligence</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <UnitToggle unit={unit} onChange={setUnit} />
          
          <button
            id="refresh-button"
            onClick={() => fetchWeather(selectedCity)}
            disabled={isLoading}
            className="p-2.5 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 rounded-full transition-all cursor-pointer border border-slate-200"
            title="Refresh current weather data"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-blue-600' : ''}`} />
          </button>
        </div>
      </header>

      {/* Main Content Stage */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 space-y-6">
        
        {/* Module 1: Search & Presets */}
        <SearchBar
          onSearch={handleCitySearch}
          onSelectCity={(city) => {
            setSelectedCity(city);
            fetchWeather(city);
          }}
          isLoading={isLoading}
          currentCityName={selectedCity.name}
        />

        {/* State 2: Error alert overlay */}
        {error && (
          <div id="error-alert" className="p-5 rounded-3xl bg-rose-50/50 border border-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-rose-100 text-rose-800 rounded-xl mt-0.5">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-rose-900">Search Resolution Error</h4>
                <p className="text-xs font-medium text-rose-700 mt-0.5 leading-relaxed">{error}</p>
              </div>
            </div>
            <button
              id="error-reset-button"
              onClick={handleResetToDefault}
              className="text-xs font-bold text-rose-800 bg-rose-100 hover:bg-rose-200/80 px-4 py-2 rounded-full transition-all flex-shrink-0 cursor-pointer border border-rose-200"
            >
              Reset to default
            </button>
          </div>
        )}

        {/* State 3: Main dashboard modules */}
        {isLoading && !weatherData ? (
          /* High quality loading skeleton panels */
          <div id="dashboard-skeleton" className="space-y-6 animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-[280px] bg-white rounded-3xl border border-slate-200" />
              <div className="h-[280px] bg-white rounded-3xl border border-slate-200" />
            </div>
            <div className="h-[180px] bg-white rounded-3xl border border-slate-200" />
            <div className="h-[200px] bg-white rounded-3xl border border-slate-200" />
          </div>
        ) : weatherData ? (
          <div id="dashboard-ready" className="space-y-6">
            {/* Split layout: Current summary card & interactive line analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CurrentWeather
                city={selectedCity}
                weather={weatherData.current_weather}
                tempMax={weatherData.daily.temperature_2m_max[0]}
                tempMin={weatherData.daily.temperature_2m_min[0]}
                precipitationProb={weatherData.daily.precipitation_probability_mean[0]}
                unit={unit}
              />
              
              <WeatherChart
                daily={weatherData.daily}
                unit={unit}
              />
            </div>

            {/* 7-Day interactive cards carousel */}
            <ForecastGrid
              daily={weatherData.daily}
              unit={unit}
              selectedDayIndex={selectedDayIndex}
              onSelectDayIndex={setSelectedDayIndex}
            />

            {/* Smart planning recommendations engine outputs */}
            <Recommendations
              daily={weatherData.daily}
              selectedDayIndex={selectedDayIndex}
              unit={unit}
            />
          </div>
        ) : (
          /* Empty backup state */
          <div id="empty-state" className="text-center py-12 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 max-w-md mx-auto">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800">No telemetry loaded</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">Search for a location above or click below to trigger forecasting updates.</p>
            <button
              id="empty-reset-button"
              onClick={handleResetToDefault}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-full transition-all cursor-pointer"
            >
              Load default telemetry
            </button>
          </div>
        )}
      </main>

      {/* Dynamic atmospheric footer */}
      <footer id="app-footer" className="bg-white border-t border-slate-200 mt-12 py-8 px-6 text-center text-slate-400 font-semibold text-xs leading-relaxed">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-4.5 h-4.5 text-blue-500" />
            <span className="text-slate-600">Aether Weather Intelligence Engine</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 font-semibold">
            <span>Powered by <a href="https://open-meteo.com" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Open-Meteo</a> API</span>
            <span className="text-slate-200">|</span>
            <span>Refined with <span className="text-slate-700 font-semibold">Recharts</span></span>
            <span className="text-slate-200">|</span>
            <span>Ready for <span className="text-blue-600 font-semibold">Cloudflare Pages</span></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
