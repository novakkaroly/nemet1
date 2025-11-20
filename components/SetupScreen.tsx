import React, { useState } from 'react';
import { GameConfig, ExerciseType, LanguageLevel } from '../types';

interface SetupScreenProps {
  onStart: (config: GameConfig) => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStart }) => {
  const [selectedType, setSelectedType] = useState<ExerciseType | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<LanguageLevel | null>(null);

  const exerciseOptions = [
    { value: 'PRES_REG' as ExerciseType, label: '1. igeragozás (jelen, szabályos)' },
    { value: 'PRES_STEM_CHANGE' as ExerciseType, label: '2. igeragozás (jelen, tőhangváltós)' },
    { value: 'PRES_MODAL' as ExerciseType, label: '3. igeragozás (jelen, módbeli s.)' },
    { value: 'PAST_REG' as ExerciseType, label: '4. igeragozás (múlt, szabályos)' },
    { value: 'PAST_IRREG' as ExerciseType, label: '5. igeragozás (múlt, rendhagyó)' },
    { value: 'PAST_AUX' as ExerciseType, label: '6. igeragozás (múlt, haben/sein)' },
  ];

  const levelOptions = [
    { value: 'A1' as LanguageLevel, label: 'Kezdő' },
    { value: 'A2' as LanguageLevel, label: 'Haladóbb' },
  ];

  const handleStart = () => {
    if (selectedType && selectedLevel) {
      onStart({
        exerciseType: selectedType,
        level: selectedLevel,
        durationSeconds: 60,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-yellow-300 rounded-lg p-8 mb-6 shadow-lg">
          <h1 className="text-4xl font-bold text-center mb-2">Német Gyakorló</h1>
          <p className="text-center text-lg">Gyakorold a német igeragozást játékosan!</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-8">
            <label className="block text-2xl font-bold mb-4">Milyen feladatokat szeretnél?</label>
            <div className="space-y-2">
              {exerciseOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedType(option.value)}
                  className={`w-full text-left p-3 border-2 rounded-lg transition ${
                    selectedType === option.value
                      ? 'border-yellow-400 bg-yellow-100'
                      : 'border-gray-300 bg-white hover:border-yellow-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <label className="block text-2xl font-bold mb-4">Milyen nehéz legyen?</label>
            <div className="grid grid-cols-2 gap-4">
              {levelOptions.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setSelectedLevel(level.value)}
                  className={`p-4 border-2 rounded-lg transition text-center ${
                    selectedLevel === level.value
                      ? 'border-green-400 bg-green-100'
                      : 'border-gray-300 bg-white hover:border-green-300'
                  }`}
                >
                  <div className="font-bold text-lg">{level.value} szint</div>
                  <div className="text-sm text-gray-600">{level.label}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg mb-6">
            <p className="text-sm">💡 Tipp: A feladatlap kitöltése közben a TAB billentyűvel gyorsan ugrálhatsz a következő mezőre! A német karaktereket (ä, ö, ü, ß) is használd!</p>
          </div>
          <button
            onClick={handleStart}
            disabled={!selectedType || !selectedLevel}
            className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-400 text-black font-bold py-3 rounded-lg transition"
          >
            Kezdjük!
          </button>
        </div>
        <div className="text-center text-sm text-gray-600 mt-8">
          <p>© 2025 Német Gyakorló | Viel Erfolg!</p>
        </div>
      </div>
    </div>
  );
};

export default SetupScreen;
