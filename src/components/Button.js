import React from 'react';
import './Button.css'; // Create a CSS file for styling

const Button = ({ onClick, label }) => {
  return (
    <button className="button" onClick={() => onClick(label)}>
      {label}
    </button>
  );
};

export default Button;
