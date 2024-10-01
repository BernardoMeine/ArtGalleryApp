// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import api from "./axiosConfig";
import ArtworkForm from "./components/ArtworkForm";
import ArtworkList from "./components/ArtworkList";
import ArtworkCarousel from "./components/ArtworkCarousel";

function App() {
  const [artworkProps, setArtworkProps] = useState([]);

  useEffect(() => {
    // Função para buscar as obras de arte
    const fetchArtworks = async () => {
      try {
        const response = await api.get("/api/Artworks");
        setArtworkProps(response.data);
      } catch (error) {
        console.error("Erro ao buscar as obras de arte:", error);
      }
    };

    fetchArtworks();
  }, []);

  // Função para adicionar uma nova obra à lista
  const addArtwork = (newArtwork) => {
    setArtworkProps((prevArtworks) => [...prevArtworks, newArtwork]);
  };

  const deleteArtwork = (deletedId) => {
    setArtworkProps((prevArtworks) =>
      prevArtworks.filter((artwork) => artwork.id !== deletedId)
    );
  };

  return (
    <div>
      <h1>Galeria de Arte Virtual</h1>
      {/* Passa a função addArtwork para o ArtworkForm */}
      <ArtworkForm addArtwork={addArtwork} />
      <ArtworkCarousel artworkProps={artworkProps} />
      {/* Passa a prop artworkProps e a função deleteArtwork para o ArtworkList */}
      <ArtworkList artworkProps={artworkProps} onDelete={deleteArtwork} />
    </div>
  );
}

export default App;
