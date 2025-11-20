import React from 'react';
import { GameConfig } from '../types';

interface WorksheetProps {
  config: GameConfig;
  onComplete: (score: number, total: number) => void;
}

const Worksheet: React.FC<WorksheetProps> = ({ config, onComplete }) => {
  const [answers, setAnswers] = React.useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questions = [
    { q: 'ich gehe', answer: 'I go' },
    { q: 'du gehst', answer: 'You go' },
    { q: 'er geht', answer: 'He goes' },
  ];

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const score = newAnswers.filter((a, i) => a === questions[i].answer).length;
      onComplete(score, questions.length);
    }
  };

  if (currentQuestion >= questions.length) {
    return <div></div>;
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Question {currentQuestion + 1} of {questions.length}</h2>
        <div className="bg-blue-100 p-6 rounded-lg mb-6">
          <p className="text-2xl font-bold">{questions[currentQuestion].q}</p>
        </div>
        <input
          type="text"
          placeholder="Your answer"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleAnswer((e.target as HTMLInputElement).value);
            }
          }}
          className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4"
          autoFocus
        />
      </div>
    </div>
  );
};

export default Worksheet;
