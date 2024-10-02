import React, { useState, useEffect, useCallback } from 'react';
import Button from './Button';
import Display from './Display';
import './Calculator.css'; // Create a CSS file for styling

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const calculateResult = useCallback(() => {
    try {
      // eslint-disable-next-line
      setResult(eval(input)); 
    } catch (error) {
      setResult("Error");
    }
    setInput("");
  }, [input]); // Added input as a dependency

  const handleButtonClick = useCallback((label) => {
    if (label === "=") {
      calculateResult();
    } else if (label === "C") {
      setInput("");
      setResult("");
    } else if (label === "DEL") {
      setInput(input.slice(0, -1)); // Remove the last character
    } else {
      setInput(input + label);
    }
  }, [input, calculateResult]); // Added input and calculateResult as dependencies

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;

      // Allowing only valid keys (note: escaped dot for decimal point)
      if (/\d|\+|-|\*|\/|\./.test(key)) {
        handleButtonClick(key);
      } else if (key === "Enter") {
        event.preventDefault(); // Prevent form submission if in a form
        calculateResult();
      } else if (key === "Backspace") {
        handleButtonClick("DEL");
      } else if (key === "c" || key === "C") {
        handleButtonClick("C");
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleButtonClick, calculateResult]); // Added handleButtonClick and calculateResult as dependencies

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
