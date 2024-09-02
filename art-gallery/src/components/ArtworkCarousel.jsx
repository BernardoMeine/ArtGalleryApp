/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import styles from './ArtworkCarousel.module.css';

function ArtworkCarousel({ artworks }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!artworks || artworks.length === 0) {
    return <p>Nenhuma obra encontrada.</p>;
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === artworks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? artworks.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.carouselContainer}>
      <button onClick={goToPrevious} className={styles.navButton}>&lt;</button>
      <div className={styles.artworkCard}>
        <h3>{artworks[currentIndex].title}</h3>
        <img
          src={`http://localhost:5175/${artworks[currentIndex].imageUrl}`}
          alt={artworks[currentIndex].title}
          className={styles.image}
        />
        <p>Artista: {artworks[currentIndex].artist}</p>
        <p>Técnica: {artworks[currentIndex].technique}</p>
        <p>Preço: R$ {artworks[currentIndex].price}</p>
      </div>
      <button onClick={goToNext} className={styles.navButton}>&gt;</button>
    </div>
  );
}

export default ArtworkCarousel;
