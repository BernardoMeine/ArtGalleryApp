/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import axios from "../axiosConfig";
import styles from "./ArtworkCard.module.css";

const ArtworkCard = ({ artwork, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Deseja realmente excluir a obra "${artwork.title}"?`)) {
      axios
        .delete(`api/artworks/${artwork.id}`)
        .then(() => {
          onDelete(artwork.id);
        })
        .catch((error) => {
          console.error("Erro ao excluir a obra de arte:", error);
        });
    }
  };

  return (
    <div className={styles.artworkCard}>
      <img
        src={`http://localhost:5175/${artwork.imageUrl}`}
        alt={artwork.title}
        className={styles.image}
      />
      <h3>{artwork.title}</h3>
      <p>Artista: {artwork.artist}</p>
      <p>Técnica: {artwork.technique}</p>
      <p className={styles.price}>Preço: R$ {artwork.price}</p>
      <button className={styles.deleteButton} onClick={handleDelete}>
        Excluir
      </button>
    </div>
  );
};

export default ArtworkCard;
