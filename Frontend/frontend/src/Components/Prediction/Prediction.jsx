import React, { useState } from "react";
import "./Prediction.css";
import axios from "axios";

const Prediction = () => {
  const [formData, setFormData] = useState({
    Nitrogen: "",
    Phosporus: "", // Matches backend spelling
    Potassium: "",
    Temperature: "",
    Humidity: "",
    pH: "",
    Rainfall: "",
  });

  const [prediction, setPrediction] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const numericFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, parseFloat(value)])
    );

    try {
      const response = await axios.post("https://agriguru-10mi.onrender.com/predict", numericFormData);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Prediction error:", error);
      setPrediction("Prediction failed. Check the backend.");
    }
  };

  return (
    <div className="prediction-wrapper">
      <div className="glass-form">
        <h1 className="title">Crop Recommendation System</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Nitrogen:</label>
              <input
                type="number"
                name="Nitrogen"
                value={formData.Nitrogen}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phosphorus:</label>
              <input
                type="number"
                name="Phosporus"
                value={formData.Phosporus}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Potassium:</label>
              <input
                type="number"
                name="Potassium"
                value={formData.Potassium}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Temperature:</label>
              <input
                type="number"
                name="Temperature"
                value={formData.Temperature}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Humidity:</label>
              <input
                type="number"
                name="Humidity"
                value={formData.Humidity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>pH:</label>
              <input
                type="number"
                name="pH"
                value={formData.pH}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full">
              <label>Rainfall:</label>
              <input
                type="number"
                name="Rainfall"
                value={formData.Rainfall}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit">Predict Crop</button>
        </form>

        {prediction && (
          <div className="result">
            <h3>Recommended Crop:</h3>
            <p>{prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Prediction;
