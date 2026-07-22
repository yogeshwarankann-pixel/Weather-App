import React from 'react';
import { 
  Sparkles, 
  Shirt, 
  Bike, 
  Map, 
  CheckCircle, 
  AlertTriangle, 
  CalendarDays,
  ThumbsUp,
  CloudSun
} from 'lucide-react';
import { DailyForecast, SmartRecommendations, TempUnit } from '../types';
import { 
  generateSmartRecommendations, 
  getWeatherCondition, 
  getDayName,
  celsiusToFahrenheit
} from '../utils/weatherUtils';

interface RecommendationsProps {
  daily: DailyForecast;
  selectedDayIndex: number;
  unit: TempUnit;
}

export const Recommendations: React.FC<RecommendationsProps> = ({
  daily,
  selectedDayIndex,
  unit,
}) => {
  // Weekly intelligence
  const weeklyRecs = generateSmartRecommendations(daily);

  // Active day intelligence (dynamic based on selection)
  const activeDayDate = daily.time[selectedDayIndex];
  const activeDayName = getDayName(activeDayDate);
  const activeCode = daily.weathercode[selectedDayIndex];
  const activeMax = daily.temperature_2m_max[selectedDayIndex];
  const activeMin = daily.temperature_2m_min[selectedDayIndex];
  const activePrecip = daily.precipitation_probability_mean[selectedDayIndex] || 0;
  
  const activeCondition = getWeatherCondition(activeCode);
  const activeMaxConverted = unit === 'C' ? Math.round(activeMax) : celsiusToFahrenheit(activeMax);
  const activeMinConverted = unit === 'C' ? Math.round(activeMin) : celsiusToFahrenheit(activeMin);

  // Formulate active day specific recommendations
  let dayClothing = '';
  let daySports = '';
  let dayTravel = '';
  let daySuitability: 'Excellent' | 'Good' | 'Fair' | 'Poor' = 'Good';

  // Clothing Heuristics
  if (activeMax < 10) {
    dayClothing = 'Heavy insulated coat, scarf, gloves, and warm thermal layers are required.';
    daySuitability = 'Poor';
  } else if (activeMax < 16) {
    dayClothing = 'Cozy sweater, light jacket or windbreaker, and comfortable pants.';
    daySuitability = 'Fair';
  } else if (activeMax > 32) {
    dayClothing = 'Extremely lightweight clothing, sunglasses, sun hat, and high SPF sunscreen.';
    daySuitability = 'Fair';
  } else {
    dayClothing = 'Comfortable t-shirt and light shorts or jeans. Perfect casual wear weather!';
    daySuitability = 'Excellent';
  }

  if (activePrecip > 40) {
    dayClothing += ' Bring an umbrella or waterproof raincoat to handle precipitation.';
    if (daySuitability === 'Excellent') daySuitability = 'Good';
    if (activePrecip > 70) daySuitability = 'Poor';
  }

  // Sports Heuristics
  if (activePrecip > 60) {
    daySports = 'High risk of rain. Postpone outdoor sports and prefer indoor workouts or cardio.';
  } else if (activeMax < 5) {
    daySports = 'Extremely cold. Move runs indoors if possible, or limit outdoor activities to heavy cardio.';
  } else if (activeMax > 34) {
    daySports = 'High heat hazard. Limit outdoor training to early morning or sunset; stay fully hydrated.';
  } else if (activeCode === 0 || activeCode === 1) {
    daySports = 'Splendid day for tennis, jogging, bicycling, golf, or hiking!';
  } else {
    daySports = 'Decent weather for jogging or outdoor training. Enjoy the fresh air!';
  }

  // Travel Heuristics
  if (activePrecip > 75) {
    dayTravel = 'Heavy rain expected. Drive cautiously, watch out for puddles and hydroplaning, and expect minor delays.';
  } else if (activeCode >= 95) {
    dayTravel = 'Thunderstorms may affect flights or commutes. Secure loose outdoor objects and stay indoors.';
  } else if (activeCode === 45 || activeCode === 48) {
    dayTravel = 'Foggy conditions will severely reduce visibility. Keep high-beams off, use fog lights, and increase braking distance.';
  } else {
    dayTravel = 'Clear skies and favorable visibility. Perfect day for scenic drives, road trips, and commuting.';
  }

  // Best & Challenging Day Highlight Names
  const bestDayName = getDayName(daily.time[weeklyRecs.bestDayIndex]);
  const worstDayName = getDayName(daily.time[weeklyRecs.worstDayIndex]);

  // Color mapping for suitability
  const getRatingStyle = (rating: 'Excellent' | 'Good' | 'Fair' | 'Poor') => {
    switch (rating) {
      case 'Excellent':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Good':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'Fair':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Poor':
        return 'bg-rose-50 text-rose-800 border-rose-200';
    }
  };

  return (
    <div id="recs-section" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Column 1 & 2: Main Selected Day Planning Card */}
      <div id="day-intelligence-card" className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <div>
            <div className="flex items-center gap-1.5 text-slate-500 font-semibold text-xs uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
              <span>Smart Recommendations</span>
            </div>
            <h3 className="text-lg md:text-xl font-extrabold text-slate-900 mt-1">
              Planning for {activeDayName}
            </h3>
          </div>

          <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getRatingStyle(daySuitability)}`}>
            {daySuitability} Outlook
          </div>
        </div>

        {/* Dynamic description banner */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
          <div className="p-2 bg-white rounded-xl shadow-xs border border-slate-200">
            <CloudSun className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-700">
              {activeCondition.label} • {activeMaxConverted}° / {activeMinConverted}°{unit}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5 font-medium leading-relaxed">
              {activeCondition.description} Precipitability index is at <strong className="text-blue-600">{activePrecip}%</strong>.
            </p>
          </div>
        </div>

        {/* Actionable recommendations categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Box 1: Apparel */}
          <div className="p-4 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-2xl transition-all">
            <div className="flex items-center gap-2 text-slate-800 mb-3">
              <div className="p-1.5 bg-blue-100 text-blue-800 rounded-lg">
                <Shirt className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Clothing & Gear</h4>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              {dayClothing}
            </p>
          </div>

          {/* Box 2: Sports */}
          <div className="p-4 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-2xl transition-all">
            <div className="flex items-center gap-2 text-slate-800 mb-3">
              <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
                <Bike className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Outdoor & Athletics</h4>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              {daySports}
            </p>
          </div>

          {/* Box 3: Commutes & Travel */}
          <div className="p-4 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-2xl transition-all">
            <div className="flex items-center gap-2 text-slate-800 mb-3">
              <div className="p-1.5 bg-amber-100 text-amber-800 rounded-lg">
                <Map className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Travel & Commuting</h4>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              {dayTravel}
            </p>
          </div>
        </div>
      </div>

      {/* Column 3: Weekly Summary & Milestones */}
      <div id="weekly-intelligence-card" className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-slate-500 font-semibold text-xs uppercase tracking-widest">
            <CalendarDays className="w-4 h-4 text-blue-600" />
            <span>Weekly Synthesis</span>
          </div>
          
          <div className="flex items-center justify-between mt-3 mb-4">
            <h3 className="text-base font-extrabold text-slate-900">7-Day Synthesis</h3>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getRatingStyle(weeklyRecs.overallRating)}`}>
              {weeklyRecs.overallRating}
            </span>
          </div>

          <p className="text-xs text-slate-600 font-medium leading-relaxed bg-slate-50 border border-slate-200 p-4 rounded-2xl mb-4">
            {weeklyRecs.overallSummary}
          </p>
        </div>

        {/* Milestone Days highlights */}
        <div className="space-y-3 mt-4">
          {/* Best Day Highlight */}
          <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-2xl">
            <div className="flex items-center gap-2.5">
              <ThumbsUp className="w-4 h-4 text-emerald-600" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700/60">Golden Window</p>
                <p className="text-xs font-extrabold text-slate-800">{bestDayName}</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
              Highly Optimal
            </span>
          </div>

          {/* Worst Day Highlight */}
          <div className="flex items-center justify-between p-3 bg-rose-50 border border-rose-200 rounded-2xl">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-rose-700/60">Preparation Alert</p>
                <p className="text-xs font-extrabold text-slate-800">{worstDayName}</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-md">
              Plan Ahead
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
