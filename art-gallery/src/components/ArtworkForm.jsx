/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import api from "../axiosConfig";
import styles from "./ArtworkForm.module.css";

function ArtworkForm({ addArtwork }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [technique, setTechnique] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(reader.result.split(",")[1]); // Captura o base64 da imagem
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const artworkData = {
      title,
      artist,
      creationDate,
      technique,
      price: parseFloat(price),
      imageBase64: imageFile,
    };

    try {
      if (window.confirm(`Deseja realmente adicionar a obra"?`)) {
        const response = await api.post("/api/Artworks", artworkData);
        console.log(response.data);
        addArtwork(response.data); // Adiciona a nova obra à lista de obras no estado do App
        // Limpa o formulário
        setTitle("");
        setArtist("");
        setCreationDate("");
        setTechnique("");
        setPrice("");
        setImageFile(null);
      }

    } catch (error) {
      console.error("Erro ao enviar a obra:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Artista"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Data de Criação"
        value={creationDate}
        onChange={(e) => setCreationDate(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Técnica"
        value={technique}
        onChange={(e) => setTechnique(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Preço"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required
      />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default ArtworkForm;


