import React from 'react';
import { TempUnit } from '../types';

interface UnitToggleProps {
  unit: TempUnit;
  onChange: (unit: TempUnit) => void;
}

export const UnitToggle: React.FC<UnitToggleProps> = ({ unit, onChange }) => {
  return (
    <div id="unit-toggle-wrapper" className="inline-flex bg-slate-100 rounded-full p-1 border border-slate-200">
      <button
        id="toggle-unit-c"
        type="button"
        onClick={() => onChange('C')}
        className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
          unit === 'C'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        °C
      </button>
      <button
        id="toggle-unit-f"
        type="button"
        onClick={() => onChange('F')}
        className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
          unit === 'F'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        °F
      </button>
    </div>
  );
};
