import React, { useState, useEffect } from 'react';

function ShowCardValues() {
  const [showCards, setShowCards] = useState([]);

  useEffect(() => {
    const fetchShowCards = async () => {
      try {
        const response = await fetch('http://localhost:3000/getShowcards');
        if (!response.ok) {
          throw new Error('Failed to fetch show cards');
        }
        const data = await response.json();
        setShowCards(data);
      } catch (error) {
        console.error('Error fetching show cards:', error);
      }
    };

    fetchShowCards();
  }, []);

  return showCards;
}

export default ShowCardValues;
