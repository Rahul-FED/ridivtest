import React, { useState } from 'react';

function FavoriteComponent({ favorites, onAddFavorite, onRemoveFavorite, onCitySelect }) {
  const [newFavorite, setNewFavorite] = useState('');

  const handleAddFavorite = () => {
    if (newFavorite.trim()) {
      onAddFavorite(newFavorite);
      setNewFavorite('');
    }
  };

  return (
    <div className="favorite-component fadeIn">
      <h3 className='my-3'>Favorite Cities</h3>
      <ul>
        {favorites.map((fav, index) => (
          <li key={index} className="fadeIn">
            <span onClick={() => onCitySelect(fav.city)}>{fav.city}</span>
            <button className='btn btn-danger' onClick={() => onRemoveFavorite(fav.city)}>Remove</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newFavorite}
        onChange={(e) => setNewFavorite(e.target.value)}
        placeholder="Add new favorite"
        className="favorite-input"
      />
      <button className="favorite-button btn btn-success" onClick={handleAddFavorite}>Add</button>
    </div>
  );
}

export default FavoriteComponent;
