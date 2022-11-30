import React, {useState, useEffect} from 'react';
import './App.css';
import { cardImages } from './components/images';

function App () {
//need to pass through cards and turns state variables later in my return
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
    <div>
      Hello, World!
    </div>
  );
}

export default App;