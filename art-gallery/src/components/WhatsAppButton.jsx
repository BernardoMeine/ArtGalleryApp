/* eslint-disable no-unused-vars */
import React from "react";
import whatsappIcon from "../assets/whatsapp-logo.svg";
import styles from "./WhatsAppButton.module.css"

const WhatsAppButton = () => {
  const whatsappNumber = "5553984384480";

  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
      <button className={styles.whatsappButton}>
        <img src={whatsappIcon} alt="WhatsApp" className={styles.whatsappIcon} />
        Contate-nos via WhatsApp
      </button>
    </a>
  );
};

export default WhatsAppButton;