import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DailyForecast, TempUnit } from '../types';
import { getDayAbbr, formatDate, celsiusToFahrenheit } from '../utils/weatherUtils';
import { Calendar, TrendingUp } from 'lucide-react';

interface WeatherChartProps {
  daily: DailyForecast;
  unit: TempUnit;
}

export const WeatherChart: React.FC<WeatherChartProps> = ({ daily, unit }) => {
  // Format daily data for Recharts
  const chartData = daily.time.map((timeStr, idx) => {
    const rawMax = daily.temperature_2m_max[idx];
    const rawMin = daily.temperature_2m_min[idx];
    
    const maxTemp = unit === 'C' ? Math.round(rawMax) : celsiusToFahrenheit(rawMax);
    const minTemp = unit === 'C' ? Math.round(rawMin) : celsiusToFahrenheit(rawMin);
    const precip = daily.precipitation_probability_mean[idx] || 0;

    return {
      day: getDayAbbr(timeStr),
      fullDate: formatDate(timeStr),
      'Max Temp': maxTemp,
      'Min Temp': minTemp,
      'Rain Probability': precip,
    };
  });

  // Dynamic tooltip style
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 border border-slate-200 p-3.5 rounded-xl shadow-md backdrop-blur-sm text-xs font-semibold">
          <p className="text-slate-500 mb-1.5 flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {payload[0].payload.fullDate}
          </p>
          <div className="space-y-1">
            <p className="text-amber-600 flex justify-between gap-4">
              <span>Max Temp:</span>
              <span className="font-bold">{payload[0].value}°{unit}</span>
            </p>
            <p className="text-sky-600 flex justify-between gap-4">
              <span>Min Temp:</span>
              <span className="font-bold">{payload[1].value}°{unit}</span>
            </p>
            <p className="text-indigo-600 flex justify-between gap-4">
              <span>Rain Probability:</span>
              <span className="font-bold">{payload[2]?.value}%</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div id="temperature-trends-card" className="w-full bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-slate-500 font-semibold text-xs uppercase tracking-widest">
            <TrendingUp className="w-4 h-4 text-sky-600" />
            <span>Analytical Insights</span>
          </div>
          <h2 className="text-lg md:text-xl font-extrabold text-slate-900 mt-1">Temperature Trends</h2>
        </div>
        
        {/* Simple Legend Indicator */}
        <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span>Max (°{unit})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-sky-500 inline-block" />
            <span>Min (°{unit})</span>
          </div>
        </div>
      </div>

      <div className="h-[280px] w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
              </linearGradient>
              <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            
            <XAxis 
              dataKey="day" 
              stroke="#94a3b8" 
              fontSize={11} 
              fontWeight={600} 
              tickLine={false} 
              axisLine={false} 
            />
            
            <YAxis 
              stroke="#94a3b8" 
              fontSize={11} 
              fontWeight={600} 
              tickLine={false} 
              axisLine={false} 
              domain={['auto', 'auto']}
            />
            
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }} />
            
            <Area 
              type="monotone" 
              dataKey="Max Temp" 
              stroke="#f59e0b" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorMax)" 
            />
            
            <Area 
              type="monotone" 
              dataKey="Min Temp" 
              stroke="#0ea5e9" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorMin)" 
            />
            
            {/* Transparent layer just to carry the data key in tooltip */}
            <Area 
              type="monotone" 
              dataKey="Rain Probability" 
              stroke="transparent" 
              fill="transparent" 
              activeDot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
