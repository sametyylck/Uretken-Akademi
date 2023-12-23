import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const TemperatureConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('celsius');
  const [toUnit, setToUnit] = useState('kelvin');
  const [result, setResult] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFromUnitChange = (event) => {
    setFromUnit(event.target.value);
  };

  const handleToUnitChange = (event) => {
    setToUnit(event.target.value);
  };

  const convertTemperature = () => {
    const inputTemperature = parseFloat(inputValue);

    if (!isNaN(inputTemperature)) {
      let convertedTemperature;

      // Dönüşüm işlemleri
      if (fromUnit === 'celsius' && toUnit === 'kelvin') {
        convertedTemperature = inputTemperature + 273.15;
      } else if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
        convertedTemperature = (inputTemperature * 9/5) + 32;
      } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
        convertedTemperature = inputTemperature - 273.15;
      } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
        convertedTemperature = (inputTemperature - 273.15) * 9/5 + 32;
      } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
        convertedTemperature = (inputTemperature - 32) * 5/9;
      } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
        convertedTemperature = (inputTemperature - 32) * 5/9 + 273.15;
      } else {
        // Aynı birimden dönüşüm yapılmak istendiğinde
        convertedTemperature = inputTemperature;
      }

      setResult(convertedTemperature.toFixed(2)); // Sonucu iki ondalık basamağa yuvarla
    } else {
      setResult('Invalid input');
    }
  };

  return (
    <div>
        <h1 style={{textAlign:"center"}}>Dönüştürücü</h1>
      <label>
        Çevrilecek Değer:
        <br/>
        <input type="text" value={inputValue} onChange={handleInputChange} />
      </label>
      <br />
      <label>
      Hangi Birim
        <Form.Select aria-label="Default select example" value={fromUnit} onChange={handleFromUnitChange}>
      <option>Hangi Birim</option>
      <option value="celsius">Santigrat</option>
      <option value="kelvin">Kelvin</option>
      <option value="fahrenheit">Fahrenhayt</option>
    </Form.Select>
      </label>
      <br />
      <label>
      Hangi Birime
        <Form.Select aria-label="Default select example" value={toUnit} onChange={handleToUnitChange}>
      <option>Hangi Birim</option>
      <option value="celsius">Santigrat</option>
      <option value="kelvin">Kelvin</option>
      <option value="fahrenheit">Fahrenhayt</option>
    </Form.Select>
      </label>
      <br/>
      <br></br>
      <button onClick={convertTemperature}>Convert</button>
      <br />
      <label>
        Result:
        <input type="text" value={result} readOnly />
      </label>
    </div>
  );
};

export default TemperatureConverter;
