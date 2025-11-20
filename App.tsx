import React, { useState } from 'react';
import SetupScreen from './components/SetupScreen';
import Worksheet from './components/Worksheet';
import ResultsScreen from './components/ResultsScreen';
import { GameConfig } from './types';

type GameState = 'SETUP' | 'PLAYING' | 'RESULTS';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('SETUP');
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [config, setConfig] = useState<GameConfig | null>(null);

  const handleStart = (newConfig: GameConfig) => {
    setConfig(newConfig);
    setGameState('PLAYING');
  };

  const handleComplete = (finalScore: number, finalTotal: number) => {
    setScore(finalScore);
    setTotal(finalTotal);
    setGameState('RESULTS');
  };

  const handleRestart = () => {
    setGameState('SETUP');
    setScore(0);
    setTotal(0);
    setConfig(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {gameState === 'SETUP' && (
        <SetupScreen onStart={handleStart} />
      )}
      {gameState === 'PLAYING' && config && (
        <Worksheet config={config} onComplete={handleComplete} />
      )}
      {gameState === 'RESULTS' && (
        <ResultsScreen score={score} total={total} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default App;
