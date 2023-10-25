import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <Converter />
    </div>
  );
}

export function Converter() {
  const [price, setPrice] = useState("");
  const [fromValue, setFromValue] = useState("USD");
  const [toValue, setToValue] = useState("INR");
  const [output, setOutput] = useState("");

  useEffect(
    function () {
      async function getCoversionRates() {
        const host = "api.frankfurter.app";
        try {
          const res = await fetch(
            `https://${host}/latest?amount=${price}&from=${fromValue}&to=${toValue}`
          );
          if (!res.ok) {
            throw new Error(
              "Conversion failed, cannot have same currency to convert"
            );
          }
          const data = await res.json();
          if (!data.rates) {
            setOutput("");
            return;
          }
          setOutput(Object.values(data.rates));
        } catch (error) {
          setOutput("");
        }
      }
      if (fromValue === toValue) return setOutput(price);
      getCoversionRates();
    },
    [price, fromValue, toValue]
  );

  return (
    <div>
      <label htmlFor="number">Value </label>
      <input
        value={price}
        type="text"
        id="number"
        name="number"
        placeholder="Input value"
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <br />
      <label htmlFor="from">From </label>
      <select
        value={fromValue}
        id="from"
        onChange={(e) => setFromValue(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
      </select>
      <label htmlFor="to">To </label>
      <select
        value={toValue}
        id="to"
        onChange={(e) => setToValue(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
      </select>

      <h2>Output</h2>
      <span id="output" name="output">
        {output} {toValue}
      </span>
    </div>
  );
}
