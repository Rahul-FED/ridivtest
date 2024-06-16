import React, { useState } from 'react';

function SearchComponent({ onSearch }) {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <div className="search-component fadeIn">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="search-input"
      />
      <button className="search-button btn btn-primary p-2" onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchComponent;
