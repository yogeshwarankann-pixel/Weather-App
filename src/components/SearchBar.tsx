import React, { useState } from 'react';
import { Search, MapPin, Loader2, Compass } from 'lucide-react';
import { CityData } from '../types';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onSelectCity: (city: CityData) => void;
  isLoading: boolean;
  currentCityName: string;
}

const PRESET_CITIES: CityData[] = [
  { name: 'Tokyo', latitude: 35.6762, longitude: 139.6503, country: 'Japan' },
  { name: 'New York', latitude: 40.7128, longitude: -74.0060, country: 'United States', admin1: 'New York' },
  { name: 'London', latitude: 51.5074, longitude: -0.1278, country: 'United Kingdom' },
  { name: 'Sydney', latitude: -33.8688, longitude: 151.2093, country: 'Australia' },
  { name: 'Paris', latitude: 48.8566, longitude: 2.3522, country: 'France' },
  { name: 'Cairo', latitude: 30.0444, longitude: 31.2357, country: 'Egypt' },
  { name: 'Rio de Janeiro', latitude: -22.9068, longitude: -43.1729, country: 'Brazil' },
];

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onSelectCity,
  isLoading,
  currentCityName,
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div id="search-section" className="w-full bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
      <form onSubmit={handleSubmit} className="relative flex gap-3 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
          <input
            id="city-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city (e.g., London, Tokyo, Vancouver...)"
            className="w-full pl-12 pr-4 py-3 bg-slate-100 border-none rounded-full text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
            disabled={isLoading}
          />
        </div>
        <button
          id="search-button"
          type="submit"
          disabled={isLoading || !query.trim()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white font-semibold rounded-full text-sm transition-all flex items-center gap-2 shadow-sm cursor-pointer disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Compass className="w-4 h-4" />
          )}
          <span>{isLoading ? 'Searching...' : 'Explore'}</span>
        </button>
      </form>

      {/* Preset Pills */}
      <div id="preset-cities-container" className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-slate-400" /> Quick Travel:
        </span>
        {PRESET_CITIES.map((city) => {
          const isSelected = currentCityName.toLowerCase() === city.name.toLowerCase();
          return (
            <button
              id={`preset-${city.name.toLowerCase().replace(/\s+/g, '-')}`}
              key={city.name}
              type="button"
              onClick={() => {
                setQuery('');
                onSelectCity(city);
              }}
              disabled={isLoading}
              className={`text-xs px-4 py-1.5 rounded-full border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-blue-50 text-blue-600 border-blue-200 font-semibold'
                  : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
              }`}
            >
              {city.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
