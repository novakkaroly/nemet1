import React from 'react';

interface ResultsScreenProps {
  score: number;
  total: number;
  onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ score, total, onRestart }) => {
  const percentage = Math.round((score / total) * 100);
  
  let message = '';
  let color = '';
  
  if (percentage === 100) {
    message = 'Kiváló! Minden válasz helyes!';
    color = 'green';
  } else if (percentage >= 80) {
    message = 'Nagyon jó! Szinte tökéletes!';
    color = 'green';
  } else if (percentage >= 60) {
    message = 'Jó munka! Van még hova fejlődni.';
    color = 'blue';
  } else {
    message = 'Még gyakorlatra van szükséged.';
    color = 'red';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-4 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4">Eredmények</h1>
        
        <div className={`text-6xl font-bold mb-4 text-${color}-600`}>
          {score}/{total}
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
          <div
            className={`bg-${color}-600 h-4 rounded-full`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <p className="text-2xl font-bold mb-6">{percentage}%</p>
        <p className="text-xl mb-8">{message}</p>
        
        <button
          onClick={onRestart}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition"
        >
          Újra gyakorolni
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;
