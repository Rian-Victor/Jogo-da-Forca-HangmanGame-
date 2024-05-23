// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import First from './First';
import Second from './Second';
import Third from './Third';
import { WordsProvider } from './WordsContext';

const App: React.FC = () => {
  return (
    <>
      <WordsProvider>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<First />} />
              <Route path="/segunda" element={<Second />} />
              <Route path="/terceira" element={<Third/>} />
            </Routes>
          </div>
        </Router>
      </WordsProvider>
    </>
  );
};

export default App;
