import React, { useState, useEffect } from 'react';
import SetupScreen from './components/SetupScreen';
import GameSheet from './components/GameSheet';
import ResultsScreen from './components/ResultsScreen';
import { GameConfig } from './types';

type GameState = 'SETUP' | 'PLAYING' | 'RESULTS';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('SETUP');
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [config, setConfig] = useState<GameConfig | null>(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (gameState !== 'PLAYING' || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState('RESULTS');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const handleStart = (newConfig: GameConfig) => {
    setConfig(newConfig);
    setGameState('PLAYING');
    setScore(0);
    setTotal(0);
    setTimeLeft(300);
  };

  const handleFinish = (finalScore: number, totalQuestions: number) => {
    setScore(finalScore);
    setTotal(totalQuestions);
    setGameState('RESULTS');
  };

  const handleRestart = () => {
    setGameState('SETUP');
    setScore(0);
    setTotal(0);
    setConfig(null);
    setTimeLeft(300);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
      {gameState === 'SETUP' && (
        <SetupScreen onStart={handleStart} />
      )}
      {gameState === 'PLAYING' && config && (
        <>
          <div className="sticky top-0 z-50 bg-yellow-50 border-b-4 border-yellow-400 p-4 flex justify-between items-center shadow-md">
            <div className="text-sm text-gray-600 font-semibold">... Vissza</div>
            <div className="text-2xl font-bold text-blue-600">⏱ {formatTime(timeLeft)}</div>
            <button
              onClick={() => handleFinish(score, total || 1)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              ✓ Kész!
            </button>
          </div>
          <GameSheet
            config={config}
            onFinish={handleFinish}
            timeLeft={timeLeft}
          />
        </>
      )}
      {gameState === 'RESULTS' && (
        <ResultsScreen
          score={score}
          total={total}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default App;
