
import React from 'react';
import { Link } from 'react-router-dom';
import Alura from '../src/assets/alura.png';
import './First.css';

const First: React.FC = () => {
  return (
    <>
    <section className="pageone">
      <header className='header'>
        <img className='logo'src={Alura} />
      </header>
      <div className="button-wrap">
        <h1>Jogo da Forca</h1>
        <div className='button-container'>
          
          <Link to="/segunda" className='button'>
            <button>Começar a Jogar</button>
          </Link>

          <Link to="/terceira"  className='button'>
            <button id='add-btn'>Adicionar nova palavra</button>
          </Link>
        </div>
        </div>
    </section>
    </>
  );
};

export default First;
