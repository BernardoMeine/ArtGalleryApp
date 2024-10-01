/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import api from "../axiosConfig"
import ArtworkCard from "./ArtworkCard";
import styles from "./ArtworkList.module.css";

function ArtworkList({ artworkProps, onDelete }) {

  return (
    <div className={styles.artworkListContainer}>
      <h2>Galeria de Arte</h2>
      <div className={styles.artworkGrid}>
        {Array.isArray(artworkProps) && artworkProps.length > 0 ? (
          artworkProps.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p>Nenhuma obra encontrada.</p>
        )}
      </div>
    </div>
  );
}

export default ArtworkList;