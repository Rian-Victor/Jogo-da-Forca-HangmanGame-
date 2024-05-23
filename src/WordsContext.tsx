
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface WordsContextProps {
  words: string[];
  addWord: (word: string) => void;
}

const WordsContext = createContext<WordsContextProps | undefined>(undefined);

export const WordsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [words, setWords] = useState<string[]>(['amor', 'boca', 'sorriso', 'escola', 'caneta']);

  const addWord = (word: string) => {
    setWords((prevWords) => [...prevWords, word]);
  };

  return (
    <WordsContext.Provider value={{ words, addWord }}>
      {children}
    </WordsContext.Provider>
  );
};

export const useWords = (): WordsContextProps => {
  const context = useContext(WordsContext);
  if (!context) {
    throw new Error('useWords must be used within a WordsProvider');
  }
  return context;
};
