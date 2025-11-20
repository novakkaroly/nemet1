import React, { useState } from 'react';
import { GameConfig } from '../types';

interface Question {
  id: number;
  subject: string;
  blank: string;
  hint: string;
  correctAnswer: string;
}

interface GameSheetProps {
  config: GameConfig;
  onFinish: (score: number, total: number) => void;
  timeLeft: number;
}

const GameSheet: React.FC<GameSheetProps> = ({ config, onFinish }) => {
  const allQuestions: Question[] = [
    { id: 1, subject: 'Es', blank: '...', hint: '(spielen)', correctAnswer: 'spielt' },
    { id: 2, subject: 'Wir', blank: '... heute.', hint: '(lernen)', correctAnswer: 'lernen' },
    { id: 3, subject: 'Sie', blank: '... gern.', hint: '(kaufen)', correctAnswer: 'kaufen' },
    { id: 4, subject: 'Sie', blank: '...', hint: '(spielen)', correctAnswer: 'spielen' },
    { id: 5, subject: 'Wir', blank: '...', hint: '(lernen)', correctAnswer: 'lernen' },
    { id: 6, subject: 'Ihr', blank: '... heute.', hint: '(lernen)', correctAnswer: 'lernt' },
    { id: 7, subject: 'Sie', blank: '... gern.', hint: '(spielen)', correctAnswer: 'spielt' },
    { id: 8, subject: 'Ich', blank: '...', hint: '(machen)', correctAnswer: 'mache' },
    { id: 9, subject: 'sie', blank: '...', hint: '(lernen)', correctAnswer: 'lernen' },
    { id: 10, subject: 'Es', blank: '... gern.', hint: '(machen)', correctAnswer: 'macht' },
    { id: 11, subject: 'Wir', blank: '...', hint: '(kaufen)', correctAnswer: 'kaufen' },
    { id: 12, subject: 'Sie', blank: '...', hint: '(spielen)', correctAnswer: 'spielen' },
    { id: 13, subject: 'Sie', blank: '...', hint: '(machen)', correctAnswer: 'macht' },
    { id: 14, subject: 'sie', blank: '... gern.', hint: '(lernen)', correctAnswer: 'lernen' },
    { id: 15, subject: 'Ihr', blank: '... heute.', hint: '(wohnen)', correctAnswer: 'wohnt' },
    { id: 16, subject: 'Sie', blank: '...', hint: '(wohnen)', correctAnswer: 'wohnen' },
    { id: 17, subject: 'Ihr', blank: '...', hint: '(lernen)', correctAnswer: 'lernt' },
    { id: 18, subject: 'Ich', blank: '... gern.', hint: '(kaufen)', correctAnswer: 'kaufe' },
    { id: 19, subject: 'Sie', blank: '...', hint: '(machen)', correctAnswer: 'machen' },
    { id: 20, subject: 'Es', blank: '... gern.', hint: '(lernen)', correctAnswer: 'lernt' },
  ];

  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const handleInputChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const calculateScore = () => {
    let score = 0;
    allQuestions.forEach((q) => {
      const userAnswer = (answers[q.id] || '').trim().toLowerCase();
      const correctAnswer = q.correctAnswer.toLowerCase();
      if (userAnswer === correctAnswer) score++;
    });
    return score;
  };

  const handleFinish = () => {
    const score = calculateScore();
    onFinish(score, allQuestions.length);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-2 gap-6 bg-white rounded-lg p-6">
        {allQuestions.map((q) => (
          <div key={q.id}>
            <div className="flex gap-2 items-center">
              <span className="font-bold">{q.subject}</span>
              <input
                type="text"
                value={answers[q.id] || ''}
                onChange={(e) => handleInputChange(q.id, e.target.value)}
                className="flex-1 border-b px-2 py-1"
              />
              <span className="text-xs text-gray-500">{q.blank} {q.hint}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameSheet;
