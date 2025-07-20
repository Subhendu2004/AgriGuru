import React, { useState } from "react";
import PriceChart from "./PriceChart";
import bgImage from "../../assets/price.jpg";

const states = [
  "West Bengal",
  "Karnataka",
  "Maharashtra",
  "Gujarat",
  "Tamil Nadu",
  "Uttar Pradesh",
];

const markets = {
  "West Bengal": ["Kolkata", "Howrah", "Siliguri"],
  Karnataka: ["Bangalore", "Mysore"],
  Maharashtra: ["Pune", "Nagpur"],
  Gujarat: ["Ahmedabad", "Surat"],
  "Tamil Nadu": ["Chennai", "Coimbatore"],
  "Uttar Pradesh": ["Lucknow", "Varanasi"],
};

const commodities = [
  "Potato", "Tomato", "Onion", "Rice", "Wheat", "Maize",
  "Apple", "Banana", "Orange", "Mango", "Grapes", "Watermelon",
  "Coconut", "Sugarcane", "Cotton", "Jute", "Coffee", "Tea",
  "Milk", "Egg", "Fish", "Chicken", "Mutton", "Beef", "Pork",
];

export default function AgriPriceChecker() {
  const [state, setState] = useState("Karnataka");
  const [market, setMarket] = useState("Bangalore");
  const [commodity, setCommodity] = useState("Potato");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPrices = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://agmarket-api-2mu0.onrender.com/request?commodity=${commodity}&state=${encodeURIComponent(state)}&market=${encodeURIComponent(market)}`
      );
      if (!res.ok) throw new Error("Failed to fetch data");
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError("Could not fetch data. Please check your inputs.");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "2rem",
        fontFamily: "Arial",
        boxSizing: "border-box",
      }}
    >
      <style>
        {`
        ::-webkit-scrollbar { display: none; }
        .spinner {
          margin: 10px auto;
          width: 40px;
          height: 40px;
          border: 4px solid rgba(255, 255, 255, 0.2);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        `}
      </style>

      {/* Title */}
      <h2
        style={{
          textAlign: "center",
          color: "white",
          fontSize: "2.5rem",
          marginBottom: "1rem",
          textShadow: "2px 2px 4px #000",
        }}
      >
        Agri Price Checker
      </h2>

      {/* Dropdowns & Button */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "2rem",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
          padding: "1rem 2rem",
          borderRadius: "12px",
          flexWrap: "wrap",
        }}
      >
        <select
          style={dropdownStyle}
          value={state}
          onChange={(e) => {
            setState(e.target.value);
            setMarket(markets[e.target.value][0]);
          }}
        >
          {states.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select
          style={dropdownStyle}
          value={market}
          onChange={(e) => setMarket(e.target.value)}
        >
          {markets[state].map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <select
          style={dropdownStyle}
          value={commodity}
          onChange={(e) => setCommodity(e.target.value)}
        >
          {commodities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <button onClick={fetchPrices} style={buttonStyle}>Get Prices</button>
      </div>

      {/* Error */}
      {error && (
        <p style={{ color: "red", textAlign: "center", marginTop: "1rem" }}>
          {error}
        </p>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div style={{ textAlign: "center", color: "white", marginTop: "1rem" }}>
          <p style={{ fontSize: "1.2rem" }}>Fetching market prices...</p>
          <div className="spinner"></div>
        </div>
      )}

      {/* Table & Chart */}
      {!loading && data.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          {/* Price Table */}
          <div style={cardStyle}>
            <table
              border="1"
              cellPadding="8"
              style={{ borderCollapse: "collapse", width: "100%" }}
            >
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Min Price</th>
                  <th>Max Price</th>
                  <th>Modal Price</th>
                </tr>
              </thead>
              <tbody>
                {data.map((entry, idx) => (
                  <tr key={idx}>
                    <td>{entry.Date}</td>
                    <td>₹{entry["Min Price"]}</td>
                    <td>₹{entry["Max Price"]}</td>
                    <td>₹{entry["Modal Price"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Price Chart */}
          <div style={cardStyle}>
            <PriceChart data={data} />
          </div>
        </div>
      )}
    </div>
  );
}

// Styles
const dropdownStyle = {
  padding: "0.6rem 1rem",
  borderRadius: "4px",
  backgroundColor: "#333",
  color: "white",
  border: "none",
  fontWeight: "bold",
  fontSize: "1rem",
};

const buttonStyle = {
  height: "45px",
  width: "120px",
  padding: "0.4rem",
  backgroundColor: "#000",
  color: "white",
  fontWeight: "bold",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "0.9rem",
  textAlign: "center",
};

const cardStyle = {
  flex: "1",
  minWidth: "300px",
  maxWidth: "40%",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(10px)",
  padding: "1rem",
  borderRadius: "10px",
};
