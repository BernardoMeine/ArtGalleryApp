/* eslint-disable no-unused-vars */
import React from "react";
import whatsappIcon from "../assets/whatsapp-logo.svg";
import styles from "./WhatsAppButton.module.css"

const WhatsAppButton = () => {
  const whatsappNumber = "5553984384480";

  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const handleClick = () => {
    window.open(whatsappLink, "_blank", "noopener,noreferrer");
  };

  return (
    <button className={styles.whatsappButton} onClick={handleClick}>
      <img src={whatsappIcon} alt="WhatsApp" className={styles.whatsappIcon} />
      Contate-nos via WhatsApp
    </button>
  );
};

export default WhatsAppButton;