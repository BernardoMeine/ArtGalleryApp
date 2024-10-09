/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable-next-line no-unused-vars */
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
        const response = await api.post("/api/artworks", artworkData);
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
    <form className={styles.artworkForm} onSubmit={handleSubmit}>
      <label htmlFor="title">Título da Obra</label>
      <input
        id="title"
        type="text"
        value={title || ''}  // Evitar undefined
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nome da Obra"
        className={styles.inputField}
      />

      <label htmlFor="artist">Artista</label>
      <input
        id="artist"
        type="text"
        value={artist || ''}  // Evitar undefined
        onChange={(e) => setArtist(e.target.value)}
        placeholder="Nome do Artista"
        className={styles.inputField}
      />

      <label htmlFor="price">Preço</label>
      <input
        id="price"
        type="number"
        value={price || ''}  // Evitar undefined
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Preço em R$"
        className={styles.inputField}
      />

      <label htmlFor="date">Data de criação</label>
      <input
        id="date"
        type="date"
        placeholder="Data de Criação"
        value={creationDate}
        onChange={(e) => setCreationDate(e.target.value)}
        required
        className={styles.inputField}
      />

      <label htmlFor="image">Imagem da Obra</label>
      <input
        id="image"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className={styles.fileInput}
      />

      <button type="submit" className={styles.submitButton}>Cadastrar Obra</button>
    </form>

  );
}

export default ArtworkForm;


