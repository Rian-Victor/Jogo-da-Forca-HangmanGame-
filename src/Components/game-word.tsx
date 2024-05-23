import React from 'react';
import '../Second.css';

interface GameWordProps {
  wordToGuess: string;
  guessedLetters: string[];
  reveal: boolean;
  focusInput: () => void;
}

const GameWord: React.FC<GameWordProps> = ({ wordToGuess, guessedLetters, reveal, focusInput }) => {
  return (
    <div className='span'>
      {wordToGuess.split('').map((letter, index) => (
        <span
          className='line-span'
          key={index}
          style={{ borderBottom: '4px solid #0A3871', textAlign: 'center', display: 'inline-block', width: '70px', marginRight: '12px', color: '#0A3871', fontFamily: 'Inter', fontSize: '40px', fontWeight: '400' }}
          onClick={focusInput}
        >
          {guessedLetters.includes(letter) || reveal ? letter : ''}
        </span>
      ))}
    </div>
  );
};

export default GameWord;
