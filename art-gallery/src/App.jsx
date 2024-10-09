// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import api from "./axiosConfig";
import ArtworkForm from "./components/ArtworkForm";
import ArtworkList from "./components/ArtworkList";
import ArtworkCarousel from "./components/ArtworkCarousel";
import styles from "./App.module.css";

function App() {
  const [artworkProps, setArtworkProps] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await api.get("/api/artworks");
        setArtworkProps(response.data);
      } catch (error) {
        console.error("Erro ao buscar as obras de arte:", error);
      }
    };

    fetchArtworks();
  }, []);

  const addArtwork = (newArtwork) => {
    setArtworkProps((prevArtworks) => [...prevArtworks, newArtwork]);
  };

  const deleteArtwork = (deletedId) => {
    setArtworkProps((prevArtworks) =>
      prevArtworks.filter((artwork) => artwork.id !== deletedId)
    );
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Galeria de Arte Virtual</h1>
      <ArtworkForm addArtwork={addArtwork} />
      <ArtworkCarousel artworkProps={artworkProps} />
      <ArtworkList artworkProps={artworkProps} onDelete={deleteArtwork} />
    </div>
  );
}

export default App;
