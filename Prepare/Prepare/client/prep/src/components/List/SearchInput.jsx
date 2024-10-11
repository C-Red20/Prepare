import React from 'react';

const SearchInput = ({ onSearch }) => {
    return (
        <input 
            type="text" 
            placeholder="Search items..." 
            onChange={(e) => onSearch(e.target.value)} 
        />
    );
};

export default SearchInput;
