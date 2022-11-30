const Header = (turn, onShuffle) => {
    return (
        <>
       
        <h1 className="header">Can you match the Pokémon❔</h1>
        <button onClick={onShuffle}>Reset</button>
        <div>
            <p>Turns: {turn}/10</p>
        </div>
        </>
    );
};

export default Header;