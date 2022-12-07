import React from "react";

const Header = ({turns, onShuffle}) => {
    return (
        <>
       
        <h1 className="header">Can you match the Pokémon?</h1>
        <button onClick={onShuffle}>Reset</button>
        <div>
            <p className="turns">Turns: {turns}/10</p>
        </div>
        </>
    );
};

export default Header;