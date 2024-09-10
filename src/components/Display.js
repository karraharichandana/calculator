import React from 'react';
import './Display.css'; // Create a CSS file for styling

const Display = ({ value }) => {
  return (
    <div className="display">
      {value}
    </div>
  );
};

export default Display;
