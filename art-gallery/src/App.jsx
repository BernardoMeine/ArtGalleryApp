// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "./axiosConfig";
import ArtworkForm from "./components/ArtworkForm";
import ArtworkCarousel from "./components/ArtworkCarousel";
import ArtworkList from "./components/ArtworkList";

function App() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    axios.get("/api/Artworks")
      .then(response => {
        setArtworks(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar as obras de arte:", error);
      });
  }, []);

  return (
    <div>
      <h1>Galeria de Arte Virtual</h1>
      <ArtworkForm />
      <ArtworkCarousel artworks={artworks} /> {/* Passando as obras como prop */}
      <ArtworkList />
    </div>
  );
}

export default App;
