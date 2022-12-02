import React from "react";

const Header = ({turn, onShuffle}) => {
    return (
        <>
       
        <h1 className="header">Can you match the Pokémon?</h1>
        <button onClick={onShuffle}>Reset</button>
        <div>
            <p className="turns">Turns: {turn}/10</p>
        </div>
        </>
    );
};

export default Header;