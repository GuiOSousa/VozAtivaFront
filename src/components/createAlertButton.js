import React from "react";
import { FaPlus } from "react-icons/fa";

export const AddButton = () => {
    return (
        <button className="floating-button" onClick={() => alert("Botão clicado!")}>
          <FaPlus size={24} />
        </button>
    );
  };