import React, { useState } from 'react';
import "../../assets/styles/Charts/SearchBar.css";

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        onSearch(searchQuery);
    };

    return (
        <div className='searchbar'>
            <div className="input-wrapper">
                <form onSubmit={handleSearch} className='form'>
                    <input type="text"
                        required=""
                        className="input"
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        placeholder="🔍Search by Coinname"/>         
                </form>
            </div>
        </div>
    );
};

export default SearchBar;