import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import { cardImages } from './components/Images';
import Grid from "./components/Grid";
import './App.css';


function App () {
  const [ cards, setCards ] = useState ([]);
  const [ turns, setTurns ] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [winner, setWinner] = useState(null);
  const [exceeds, setExceeds] = useState(null);

  //Shuffle Function
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random ()
    }));

    setCards(shuffledCards);
    setTurns(0);
    setExceeds(false);
    setWinner(false);
    setDisabled(false);
    setChoiceOne(null);
    setChoiceTwo(null);
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

  useEffect(() => {
    setTimeout(() => {
        const isTrue = cards.every((card) => card.matched === true);
        if (turns >= 10) {
            if (isTrue && turns === 10) {
               setWinner(true)
            } 
            else {
               setExceeds(true)
               // Disbaled user from clicking on cards
               setDisabled(true);
            }
        }
        else if (isTrue && cards.length > 0) {
            setWinner(true);
        }
    }, 500);
}, [turns, cards, winner]);

  return (
    <div className="App">
      <Header
        turns={turns}
        onShuffle={shuffleCards}
      />

        {
          winner ? <div className='result'>Congratulations! You've won this battle!</div> : <div></div>
        }
        {
           exceeds ? <div className='result'>Uh Oh, You're out of Turns! Try again, trainer!</div> : <div></div>
        }

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