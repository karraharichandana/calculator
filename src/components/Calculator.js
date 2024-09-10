import React, { useState } from 'react';
import Button from './Button';
import Display from './Display';
import './Calculator.css'; // Create a CSS file for styling

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleButtonClick = (label) => {
    if (label === "=") {
      try {
        // eslint-disable-next-line
        setResult(eval(input)); 
      } catch (error) {
        setResult("Error");
      }
      setInput("");
    } else if (label === "C") {
      setInput("");
      setResult("");
    } else if (label === "DEL") {
      setInput(input.slice(0, -1)); // Remove the last character
    } else {
      setInput(input + label);
    }
  };

  return (
    <div className="calculator">
      <Display value={input || result} />
      <div className="button-grid">
        {["7", "8", "9", "/"].map((label) => (
          <Button key={label} label={label} onClick={handleButtonClick} />
        ))}
        {["4", "5", "6", "*"].map((label) => (
          <Button key={label} label={label} onClick={handleButtonClick} />
        ))}
        {["1", "2", "3", "-"].map((label) => (
          <Button key={label} label={label} onClick={handleButtonClick} />
        ))}
        {["0", ".", "C", "+"].map((label) => (
          <Button key={label} label={label} onClick={handleButtonClick} />
        ))}
        <Button label="(" onClick={handleButtonClick} />
        <Button label=")" onClick={handleButtonClick} />
        <Button label="DEL" onClick={handleButtonClick} />
        <Button label="=" onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default Calculator;
