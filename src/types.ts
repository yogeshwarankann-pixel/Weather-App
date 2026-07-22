export interface CityData {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string; // State/Province
}

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day: number;
  time: string;
}

export interface DailyForecast {
  time: string[];
  weathercode: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_mean: number[];
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current_weather: CurrentWeather;
  daily: DailyForecast;
}

export interface WeatherCondition {
  label: string;
  description: string;
  iconName: string;
  bgGradient: string; // Tailwind class for background gradient
  textColor: string;  // Tailwind text color
  themeColor: string; // CSS color or hex for chart
}

export interface DayForecastDetail {
  date: string;
  dayName: string;
  weathercode: number;
  tempMax: number;
  tempMin: number;
  precipitationProb: number;
  condition: WeatherCondition;
}

export type TempUnit = 'C' | 'F';

export interface SmartRecommendations {
  overallRating: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  overallSummary: string;
  clothing: string;
  outdoorSports: string;
  travelAdvice: string;
  bestDayIndex: number;
  worstDayIndex: number;
}
