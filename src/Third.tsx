import React, { useEffect, useState } from 'react';
import {useNavigate}  from 'react-router-dom';
import Alura from '../src/assets/alura.png';
import './Third.css';
import { useWords } from './WordsContext';


const Third: React.FC = () => {
  let navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [newWord, setNewWord] = useState('');
  const { addWord } = useWords(); // Usa a função addWord do contexto

  const toggleAddSection = () => {
    setIsVisible(!isVisible);
  };

  const addNewWord = () => {
    if (newWord.length >= 4 && newWord.length <= 8) {
      console.log('Word added:', newWord);
      addWord(newWord); // Adiciona a nova palavra ao contexto
      setNewWord('');

      navigate("/segunda"); // Redireciona para a página './segunda'
    } else {
      console.log('Invalid word input');
    }
  };

  const cancel = () => {
    navigate("/");
  };

  useEffect(() => {
    const addBtn = document.getElementById('add-btn');
    const addWordBtn = document.getElementById('add-word-btn');
    const cancelBtn = document.getElementById('cancel-btn');

    if (addBtn && addWordBtn && cancelBtn) {
      addBtn.addEventListener('click', toggleAddSection);
      addWordBtn.addEventListener('click', addNewWord);
      cancelBtn.addEventListener('click', cancel);

      return () => {
        addBtn.removeEventListener('click', toggleAddSection);
        addWordBtn.removeEventListener('click', addNewWord);
        cancelBtn.removeEventListener('click', cancel);
      };
    }
  }, []);

  return (
    <>
    <div className="pagethree">
      <header className='header'>
          <img className='logo' src={Alura} />
        </header>
        <section id="add-section" className={isVisible ? '' : 'hide'}>
          <div>
            <input
              id="new-word"
              type="text"
              placeholder="Digite uma palavra"
              autoFocus
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
            />
            <p id="notice">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zM232 152C232 138.8 242.8 128 256 128s24 10.75 24 24v128c0 13.25-10.75 24-24 24S232 293.3 232 280V152zM256 400c-17.36 0-31.44-14.08-31.44-31.44 0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z" />
              </svg>
              Permitido palavras de 4 a 8 letras
            </p>
            <div className="buttons-container">
              <button className='button-third' id="add-word-btn" onClick={addNewWord}>Salvar e iniciar jogo</button>
              <button className='button-third' id="cancel-btn" onClick={cancel}>Cancelar</button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Third;
