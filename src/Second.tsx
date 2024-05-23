import './App.css';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import GameWord from './Components/game-word';
import { Link } from 'react-router-dom';
import { HangmanDrawing } from './hangmandrawing';
import Alura from '../src/assets/alura.png';
import './Second.css';
import { useWords } from './WordsContext';

type GameHistory = {
  word: string;
  date: string;
  result: string;
};

const Second: React.FC = () => {
  const { words } = useWords();

  function pickRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  const [wordToGuess, setWordToGuess] = useState(pickRandomWord().toUpperCase());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>(() => {
    const savedHistory = localStorage.getItem('gameHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
  }, [gameHistory]);

  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 10;
  const isWinner = wordToGuess
    .split("")
    .every(letter => guessedLetters.includes(letter.toUpperCase()));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (!gameOver && !guessedLetters.includes(letter)) {
        setGuessedLetters(currentLetters => [...currentLetters, letter.toUpperCase()]);
      }
    },
    [guessedLetters, gameOver]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase(); 
      if (!gameOver && key.match(/^[A-Z]$/) && !guessedLetters.includes(key)) {
        addGuessedLetter(key);
      }
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters, addGuessedLetter, gameOver]);

  useEffect(() => {
    if (isWinner || isLoser) {
      setGameOver(true);

      const newHistory: GameHistory = {
        word: wordToGuess,
        date: new Date().toLocaleString(),
        result: isWinner ? 'Ganhou' : 'Perdeu'
      };
      setGameHistory(prevHistory => [...prevHistory, newHistory]);
    }
  }, [isWinner, isLoser, wordToGuess]);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.selectNodeContents(inputRef.current);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };
  

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const inputText = e.currentTarget.innerText.toUpperCase();
    const lastChar = inputText.slice(-1);
    if (!gameOver && lastChar.match(/^[a-z]$/) && !guessedLetters.includes(lastChar)) {
      addGuessedLetter(lastChar);
      e.currentTarget.innerText = ''; // Clear the input field after processing
    }
  };

  const clearGameHistory = () => {
    localStorage.removeItem('gameHistory');
    setGameHistory([]);
  };

  return (
    <div className='pagetwo'>
      <header className='header'>
        <img className='logo' src={Alura} />
      </header>
      <main>
        <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
        <GameWord
          reveal={isLoser}
          wordToGuess={wordToGuess}
          guessedLetters={guessedLetters}
          focusInput={focusInput}
        />

        <div className='erradas'>
          <div id='erradas-span' style={{ display: 'flex', marginTop: '25px', width: '40%', gap: '40px', marginBottom: '25px' }}>
            {incorrectLetters.map((letter, index) => (
              <span key={index} style={{ color: '#495057', fontSize: '20px', flexWrap: 'wrap', opacity: '0.7' }}>
                {letter}
              </span>
            ))}
          </div>
        </div>

        {isLoser && <div className='result'>Você perdeu!</div>}
        {isWinner && <div className='result'>Você ganhou!</div>}

        <div
          ref={inputRef}
          contentEditable
          style={{
            position: 'absolute',
            opacity: 0,
            pointerEvents: 'none',
            height: '0',
            width: '0',
          }}
          onInput={handleInput}
        ></div>

        <div className='button-segunda-container'>
          <button className='button-segunda' onClick={() => {
            setWordToGuess(pickRandomWord().toUpperCase());
            setGuessedLetters([]);
            setGameOver(false);
          }}>Novo Jogo
          </button>
          <Link to='/'>
            <button className='button-segunda' id='btnseg' style={{ textDecoration: 'none' }} onClick={() => {
              setGameOver(true);
              setWordToGuess(pickRandomWord().toUpperCase());
            }}>Desistir</button>
          </Link>
        </div>

        {/* Histórico de Partidas */}
        <div className='historico-wrap'>
          <h3>Histórico de Partidas:</h3>
          <ul>
            {gameHistory.map((game, index) => (
              <li key={index}>
                {game.date} - {game.word} - {game.result}
              </li>
            ))}
          </ul>
          <button className='btn-hist' onClick={clearGameHistory}>Limpar Histórico</button>
        </div>
      </main>
    </div>
  );
}

export default Second;
