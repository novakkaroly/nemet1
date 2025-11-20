export interface Exercise {
  question: string;
  answer: string;
}

export interface GameConfig {
  exerciseType: string;
  level: string;
}

export function generateWorksheet(config: GameConfig): Exercise[] {
  const exercises: Exercise[] = [
    { question: 'ich bin', answer: 'I am' },
    { question: 'du bist', answer: 'You are' },
    { question: 'er/sie/es ist', answer: 'He/She/It is' },
    { question: 'wir sind', answer: 'We are' },
    { question: 'ihr seid', answer: 'You all are' },
    { question: 'sie/Sie sind', answer: 'They/You formal are' },
  ];
  
  return exercises.slice(0, config.level === '1' ? 3 : 6);
}

export function generateRandomExercise(config: GameConfig): Exercise {
  const exercises = generateWorksheet(config);
  return exercises[Math.floor(Math.random() * exercises.length)];
}
