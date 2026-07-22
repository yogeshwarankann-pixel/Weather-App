import { WeatherCondition, DailyForecast, SmartRecommendations } from '../types';

/**
 * Maps WMO Weather Code to weather metadata including friendly text, icons, gradients, and chart colors.
 */
export function getWeatherCondition(code: number): WeatherCondition {
  switch (code) {
    case 0:
      return {
        label: 'Clear Sky',
        description: 'Bright and sunny conditions. Enjoy the sunshine!',
        iconName: 'Sun',
        bgGradient: 'from-amber-50 to-orange-100',
        textColor: 'text-amber-800',
        themeColor: '#f59e0b',
      };
    case 1:
      return {
        label: 'Mainly Clear',
        description: 'Mostly clear skies with gentle sun.',
        iconName: 'SunDim',
        bgGradient: 'from-amber-50 to-sky-100',
        textColor: 'text-amber-900',
        themeColor: '#fbbf24',
      };
    case 2:
      return {
        label: 'Partly Cloudy',
        description: 'A beautiful blend of sun and passing clouds.',
        iconName: 'CloudSun',
        bgGradient: 'from-sky-50 to-blue-100',
        textColor: 'text-blue-900',
        themeColor: '#38bdf8',
      };
    case 3:
      return {
        label: 'Overcast',
        description: 'Gray skies. Solid cloud cover blanket.',
        iconName: 'Cloud',
        bgGradient: 'from-slate-100 to-slate-200',
        textColor: 'text-slate-800',
        themeColor: '#64748b',
      };
    case 45:
    case 48:
      return {
        label: 'Foggy',
        description: 'Misty conditions with reduced visibility.',
        iconName: 'CloudFog',
        bgGradient: 'from-gray-100 to-zinc-200',
        textColor: 'text-gray-800',
        themeColor: '#94a3b8',
      };
    case 51:
    case 53:
    case 55:
      return {
        label: 'Drizzle',
        description: 'Light, misty rain sprinkles.',
        iconName: 'CloudDrizzle',
        bgGradient: 'from-blue-50 to-indigo-100',
        textColor: 'text-indigo-800',
        themeColor: '#818cf8',
      };
    case 56:
    case 57:
      return {
        label: 'Freezing Drizzle',
        description: 'Ice-cold light rain that may freeze on contact.',
        iconName: 'CloudSnow',
        bgGradient: 'from-blue-100 to-slate-300',
        textColor: 'text-blue-950',
        themeColor: '#38bdf8',
      };
    case 61:
    case 63:
    case 65:
      return {
        label: 'Rainy',
        description: 'Steady rain fall. Splish-splash outdoor weather.',
        iconName: 'CloudRain',
        bgGradient: 'from-blue-100 to-blue-200',
        textColor: 'text-blue-900',
        themeColor: '#0284c7',
      };
    case 66:
    case 67:
      return {
        label: 'Freezing Rain',
        description: 'Chilly rain that freezes instantly on surfaces.',
        iconName: 'CloudSnow',
        bgGradient: 'from-indigo-100 to-slate-300',
        textColor: 'text-indigo-950',
        themeColor: '#6366f1',
      };
    case 71:
    case 73:
    case 75:
      return {
        label: 'Snowy',
        description: 'Flurries or heavy snowfall. Winter wonderland!',
        iconName: 'Snowflake',
        bgGradient: 'from-sky-50 to-slate-100',
        textColor: 'text-slate-800',
        themeColor: '#a5f3fc',
      };
    case 77:
      return {
        label: 'Snow Grains',
        description: 'Tiny, hard granules of snow falling softly.',
        iconName: 'Snowflake',
        bgGradient: 'from-cyan-50 to-blue-100',
        textColor: 'text-blue-800',
        themeColor: '#22d3ee',
      };
    case 80:
    case 81:
    case 82:
      return {
        label: 'Rain Showers',
        description: 'Sudden, heavy downpours with intermittent breaks.',
        iconName: 'CloudRainWind',
        bgGradient: 'from-sky-100 to-indigo-200',
        textColor: 'text-indigo-950',
        themeColor: '#4f46e5',
      };
    case 85:
    case 86:
      return {
        label: 'Snow Showers',
        description: 'Brief, heavy snow bursts creating rapid accumulation.',
        iconName: 'Snowflake',
        bgGradient: 'from-blue-50 to-cyan-100',
        textColor: 'text-cyan-900',
        themeColor: '#06b6d4',
      };
    case 95:
    case 96:
    case 99:
      return {
        label: 'Thunderstorm',
        description: 'Lightning, thunder rumbles, and heavy rainfall.',
        iconName: 'CloudLightning',
        bgGradient: 'from-slate-300 to-zinc-400',
        textColor: 'text-zinc-950',
        themeColor: '#1e293b',
      };
    default:
      return {
        label: 'Variable Clouds',
        description: 'Varying sky conditions throughout the day.',
        iconName: 'CloudSun',
        bgGradient: 'from-slate-50 to-zinc-100',
        textColor: 'text-zinc-800',
        themeColor: '#71717a',
      };
  }
}

/**
 * Formats a raw date string (e.g. "2026-07-21") into "July 21".
 */
export function formatDate(dateStr: string): string {
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const date = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    return dateStr;
  } catch {
    return dateStr;
  }
}

/**
 * Gets abbreviation of day name (e.g. "Mon").
 */
export function getDayAbbr(dateStr: string): string {
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const date = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
    return dateStr;
  } catch {
    return dateStr;
  }
}

/**
 * Gets full day name (e.g. "Monday").
 */
export function getDayName(dateStr: string): string {
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const date = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    }
    return dateStr;
  } catch {
    return dateStr;
  }
}

/**
 * Converts Celsius to Fahrenheit.
 */
export function celsiusToFahrenheit(c: number): number {
  return Math.round((c * 9) / 5 + 32);
}

/**
 * Generates custom, intelligent recommendations based on weekly forecast telemetry.
 */
export function generateSmartRecommendations(daily: DailyForecast): SmartRecommendations {
  const { weathercode, temperature_2m_max, temperature_2m_min, precipitation_probability_mean } = daily;
  
  // Calculate average values
  const avgMaxTemp = temperature_2m_max.reduce((a, b) => a + b, 0) / temperature_2m_max.length;
  const avgPrecip = precipitation_probability_mean.reduce((a, b) => a + b, 0) / precipitation_probability_mean.length;
  
  // Find extreme days
  let maxPrecipIndex = 0;
  let highestPrecip = -1;
  let maxTempIndex = 0;
  let highestTemp = -100;
  let bestScoreIndex = 0;
  let highestScore = -1000;

  for (let i = 0; i < weathercode.length; i++) {
    const code = weathercode[i];
    const maxT = temperature_2m_max[i];
    const minT = temperature_2m_min[i];
    const precip = precipitation_probability_mean[i];

    if (precip > highestPrecip) {
      highestPrecip = precip;
      maxPrecipIndex = i;
    }

    if (maxT > highestTemp) {
      highestTemp = maxT;
      maxTempIndex = i;
    }

    // Heuristics for a "Great Day"
    // Ideal temp is 20-25 C. Penalty for precipitation. Penalty for rain/storm codes.
    let score = 100;
    
    // Temp penalty
    const diffFromIdeal = Math.abs(maxT - 22);
    score -= diffFromIdeal * 2;
    
    // Precip penalty
    score -= precip * 1.5;

    // Weathercode penalty
    if (code >= 95) score -= 50; // Thunderstorm
    else if (code >= 61) score -= 30; // Heavy Rain
    else if (code >= 51) score -= 15; // Drizzle
    else if (code === 0) score += 10; // Extra points for gorgeous sun

    if (score > highestScore) {
      highestScore = score;
      bestScoreIndex = i;
    }
  }

  // Find worst day (either highest precipitation or coldest/stormiest)
  let worstScoreIndex = 0;
  let lowestScore = 1000;
  for (let i = 0; i < weathercode.length; i++) {
    const code = weathercode[i];
    const maxT = temperature_2m_max[i];
    const precip = precipitation_probability_mean[i];
    
    let score = 100;
    const diffFromIdeal = Math.abs(maxT - 22);
    score -= diffFromIdeal * 2;
    score -= precip * 1.5;
    if (code >= 95) score -= 50;
    else if (code >= 61) score -= 30;

    if (score < lowestScore) {
      lowestScore = score;
      worstScoreIndex = i;
    }
  }

  // Determine overall weekly rating
  let overallRating: 'Excellent' | 'Good' | 'Fair' | 'Poor' = 'Good';
  if (avgPrecip < 20 && avgMaxTemp >= 18 && avgMaxTemp <= 28) {
    overallRating = 'Excellent';
  } else if (avgPrecip > 50 || avgMaxTemp < 10) {
    overallRating = 'Poor';
  } else if (avgPrecip > 30 || avgMaxTemp < 15 || avgMaxTemp > 32) {
    overallRating = 'Fair';
  }

  // Construct structured detailed advice
  const bestDayName = getDayName(daily.time[bestScoreIndex]);
  const worstDayName = getDayName(daily.time[worstScoreIndex]);
  
  let overallSummary = `Expect a mostly pleasant week ahead with excellent weather peaking on ${bestDayName}.`;
  if (overallRating === 'Poor') {
    overallSummary = `Expect challenging weather this week, with active precipitation or low temperatures peaking on ${worstDayName}. plan indoor activities where possible.`;
  } else if (overallRating === 'Fair') {
    overallSummary = `A mixed bag of weather is ahead. While some days offer decent conditions, expect sporadic precipitation or cooler temperatures, especially on ${worstDayName}.`;
  }

  // Clothing advice
  let clothing = "Standard comfortable casuals. A light layer is recommended for breezy evenings.";
  if (avgMaxTemp < 12) {
    clothing = "Winter clothing is essential. Wear heavy jackets, thermal layers, and insulated boots.";
  } else if (avgMaxTemp < 18) {
    clothing = "Cooler weather. Layer up with light jackets, cozy sweaters, and long pants.";
  } else if (avgMaxTemp > 30) {
    clothing = "High heat conditions. Loose-fitting, lightweight cotton fabrics are recommended, with sunglasses and a wide-brimmed hat.";
  }
  if (highestPrecip > 50) {
    clothing += ` Be sure to pack an umbrella or waterproof outerwear for ${getDayName(daily.time[maxPrecipIndex])}.`;
  }

  // Outdoor Sports Advice
  let outdoorSports = "Excellent conditions for outdoor running, bicycling, hiking, and team activities.";
  if (highestPrecip > 60) {
    outdoorSports = `Outdoor activities are optimal earlier in the week, but postpone outdoor sports on ${getDayName(daily.time[maxPrecipIndex])} due to wet conditions.`;
  } else if (avgMaxTemp < 8) {
    outdoorSports = "Cold weather suggests indoor exercises or highly active, insulated jogging. Watch out for icy surfaces.";
  } else if (avgMaxTemp > 33) {
    outdoorSports = "Limit outdoor athletics to early mornings or late evenings to prevent dehydration and sunstroke. Drink plenty of water.";
  }

  // Travel Advice
  let travelAdvice = `Great week for road trips and local sightseeing. We recommend planning major travel on ${bestDayName}.`;
  if (highestPrecip > 70) {
    travelAdvice = `Drive carefully on ${getDayName(daily.time[maxPrecipIndex])} as wet roads will reduce traction. Local sightseeing is best reserved for ${bestDayName}.`;
  } else if (avgMaxTemp > 35) {
    travelAdvice = "Air-conditioned indoor sightseeing is preferred during midday hours. Stay hydrated.";
  }

  return {
    overallRating,
    overallSummary,
    clothing,
    outdoorSports,
    travelAdvice,
    bestDayIndex: bestScoreIndex,
    worstDayIndex: worstScoreIndex,
  };
}
