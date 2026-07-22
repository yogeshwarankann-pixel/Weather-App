import React from 'react';
import { Calendar, Droplets } from 'lucide-react';
import { DailyForecast, TempUnit } from '../types';
import { getDayAbbr, formatDate, getWeatherCondition, celsiusToFahrenheit } from '../utils/weatherUtils';
import { WeatherIcon } from './CurrentWeather';

interface ForecastGridProps {
  daily: DailyForecast;
  unit: TempUnit;
  selectedDayIndex: number;
  onSelectDayIndex: (index: number) => void;
}

export const ForecastGrid: React.FC<ForecastGridProps> = ({
  daily,
  unit,
  selectedDayIndex,
  onSelectDayIndex,
}) => {
  return (
    <div id="forecast-section" className="w-full bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-slate-500 font-semibold text-xs uppercase tracking-widest">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>Weekly Outlook</span>
          </div>
          <h2 className="text-lg md:text-xl font-extrabold text-slate-900 mt-1">7-Day Forecast</h2>
        </div>
        <p className="text-xs text-slate-400 font-semibold">
          Select a day to target smart travel and outdoor clothing suggestions.
        </p>
      </div>

      {/* Grid container with horizontal scroll on mobile */}
      <div 
        id="forecast-cards-container" 
        className="flex flex-row md:grid md:grid-cols-7 gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-thin"
      >
        {daily.time.map((timeStr, idx) => {
          const isSelected = selectedDayIndex === idx;
          const code = daily.weathercode[idx];
          const rawMax = daily.temperature_2m_max[idx];
          const rawMin = daily.temperature_2m_min[idx];
          const precip = daily.precipitation_probability_mean[idx] || 0;

          const condition = getWeatherCondition(code);
          const maxTemp = unit === 'C' ? Math.round(rawMax) : celsiusToFahrenheit(rawMax);
          const minTemp = unit === 'C' ? Math.round(rawMin) : celsiusToFahrenheit(rawMin);
          const dayLabel = getDayAbbr(timeStr);
          const dateLabel = formatDate(timeStr);

          return (
            <button
              id={`forecast-card-${idx}`}
              key={timeStr}
              type="button"
              onClick={() => onSelectDayIndex(idx)}
              className={`flex-shrink-0 w-[110px] md:w-auto p-4 rounded-2xl border transition-all duration-200 text-center flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-blue-50/60 border-blue-300 shadow-sm text-blue-900'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <div>
                <p className={`text-xs font-bold ${isSelected ? 'text-blue-800' : 'text-slate-500'}`}>
                  {dayLabel}
                </p>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                  {dateLabel}
                </p>
              </div>

              <div className="my-3 flex justify-center">
                <WeatherIcon name={condition.iconName} className="w-8 h-8" />
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-700 truncate px-1" title={condition.label}>
                  {condition.label}
                </p>
                
                <div className="flex items-center justify-center gap-1.5 mt-2">
                  <span className="text-xs font-extrabold text-slate-900">{maxTemp}°</span>
                  <span className="text-xs font-medium text-slate-400">{minTemp}°</span>
                </div>

                {/* Rain Probability Badge */}
                <div className={`flex items-center justify-center gap-0.5 mt-2.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${
                  isSelected 
                    ? 'text-blue-600 bg-blue-100/40 border-blue-200/30' 
                    : 'text-slate-500 bg-slate-100/50 border-slate-200/30'
                }`}>
                  <Droplets className="w-2.5 h-2.5 text-blue-500" />
                  <span>{precip}%</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
