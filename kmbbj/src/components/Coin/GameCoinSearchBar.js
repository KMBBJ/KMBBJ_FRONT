import React, { useState } from 'react';
import "../../assets/styles/GameCharts/GameCoinSearchBar.css";

const GameCoinSearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        onSearch(searchQuery);
    };

    return (
        <div className='game-searchbar'>
            <div className="game-input-wrapper">
                <form onSubmit={handleSearch} className='form'>
                    <div className="search-bar-container">
                    <input type="text"
                        required=""
                        className="input"
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        placeholder="🔍Search Coinname"/>      
                    </div>   
                </form>
            </div>
        </div>
    );
};

export default GameCoinSearchBar;