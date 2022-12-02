import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import { cardImages } from './components/Images';
import './App.css';


function App () {
//need to pass through cards state variable later in my return
  const [ cards, setCards ] = useState ([]);
  const [ turns, setTurns ] = useState(0);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random ()
    }));

    setCards(shuffledCards);
    setTurns(0);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className='App'>
      <Header turns={turns} onShuffle={shuffleCards} />
    </div>
  );
};

export default App;