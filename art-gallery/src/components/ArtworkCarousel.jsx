/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import styles from './ArtworkCarousel.module.css';

function ArtworkCarousel({ artworkProps }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!artworkProps || artworkProps.length === 0) {
    return <p>Nenhuma obra encontrada.</p>;
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === artworkProps.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? artworkProps.length - 1 : prevIndex - 1
    );
  };

  console.log("Obras recebidas no ArtworkList:", artworkProps);

  return (
    <div className={styles.carouselContainer}>
      <button onClick={goToPrevious} className={styles.navButton}>&lt;</button>
      <div className={styles.artworkCard}>
        <h3>{artworkProps[currentIndex].title}</h3>
        <img
          src={`http://localhost:5175/${artworkProps[currentIndex].imageUrl}`}
          alt={artworkProps[currentIndex].title}
          className={styles.image}
        />
        <p>Artista: {artworkProps[currentIndex].artist}</p>
        <p>Técnica: {artworkProps[currentIndex].technique}</p>
        <p>Preço: R$ {artworkProps[currentIndex].price}</p>
      </div>
      <button onClick={goToNext} className={styles.navButton}>&gt;</button>
    </div>
  );
}

export default ArtworkCarousel;
