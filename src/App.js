import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import { cardImages } from './components/Images';
import Grid from "./components/Grid";
import './App.css';


function App () {
//need to pass through cards state variable later in my return
  const [ cards, setCards ] = useState ([]);
  const [ turns, setTurns ] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //Shuffle Function
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random ()
    }));

    setCards(shuffledCards);
    setTurns(0);
  };

  //Call the function
  useEffect(() => {
    shuffleCards();
  }, []);

  // Handle Choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Check if cards selected are matching
  useEffect(() => {
    if (choiceOne && choiceTwo) {
        setDisabled(true);
        if (choiceOne.src === choiceTwo.src) {
            setCards((prevCards) => {
                return prevCards.map((card) => {
                    if (card.src === choiceOne.src) {
                        return { ...card, matched: true };
                    } else {
                        return card;
                    }
                });
            });
            backToDefault();
        } else {
            setTimeout(() => backToDefault(), 500);
        }
    }
  }, [choiceOne, choiceTwo]);

  //Reset on every turn
  const backToDefault = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
    setTurns((prevTurns) => prevTurns + 1);
  };

  return (
    <div className="App">
      <Header
        turns={turns}
        onShuffle={shuffleCards}
      />
      <Grid 
        cards={cards}
        choiceOne={choiceOne}
        choiceTwo={choiceTwo}
        disabled={disabled}
        handleChoice={handleChoice} 
      />
    </div>
  );
};

export default App;