/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import ArtworkCard from "./ArtworkCard";
import styles from "./ArtworkList.module.css";

function ArtworkList() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    axios
      .get("api/Artworks")
      .then((response) => {
        setArtworks(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar as obras de arte:", error);
      });
  }, []);

  const handleDelete = (deletedId) => {
    setArtworks(artworks.filter(artwork => artwork.id !== deletedId));
  };

  return (
    <div className={styles.artworkListContainer}>
      <h2>Galeria de Arte</h2>
      <div className={styles.artworkGrid}>
        {Array.isArray(artworks) && artworks.length > 0 ? (
          artworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} onDelete={handleDelete} />
          ))
        ) : (
          <p>Nenhuma obra encontrada.</p>
        )}
      </div>
    </div>
  );
}

export default ArtworkList;