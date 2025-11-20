import React from 'react';
import { GameConfig } from '../types';

interface SetupScreenProps {
  onStart: (config: GameConfig) => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStart }) => {
  const [selectedType, setSelectedType] = React.useState<string>('');
  const [selectedLevel, setSelectedLevel] = React.useState<string>('');

  const exerciseTypes = [
    '1. igeragozás (jelen, szabályos)',
    '2. igeragozás (jelen, tőhangváltós)',
    '3. igeragozás (jelen, módbeli s.)',
    '4. igeragozás (múlt, szabályos)',
    '5. igeragozás (múlt, rendhagyó)',
    '6. igeragozás (múlt, haben/sein)',
  ];

  const levels = [
    { id: '1', name: 'A1 szint', label: 'Kezdő' },
    { id: '2', name: 'A2 szint', label: 'Haladóbb' },
  ];

  const handleStart = () => {
    if (selectedType && selectedLevel) {
      onStart({
        exerciseType: selectedType,
        level: selectedLevel,
      } as GameConfig);
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
              {exerciseTypes.map((type, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedType(type)}
                  className={`w-full text-left p-3 border-2 rounded-lg transition ${
                    selectedType === type
                      ? 'border-yellow-400 bg-yellow-100'
                      : 'border-gray-300 bg-white hover:border-yellow-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-2xl font-bold mb-4">Milyen nehéz legyen?</label>
            <div className="grid grid-cols-2 gap-4">
              {levels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className={`p-4 border-2 rounded-lg transition text-center ${
                    selectedLevel === level.id
                      ? 'border-green-400 bg-green-100'
                      : 'border-gray-300 bg-white hover:border-green-300'
                  }`}
                >
                  <div className="font-bold text-lg">{level.name}</div>
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
