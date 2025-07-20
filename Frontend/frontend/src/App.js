// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
 // adjust path if needed
// import "./App.css";
import Prediction from "./Components/Prediction/Prediction";
import Weather from "./Components/Weather/Weather";
import Home from "./Components/Home/Home";
import { StateContextProvider } from "./Context";
import Chatbot from "./Components/AI Chatbot/Chatbot";
import Price from "./Components/Price/Price";

const App = () => {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<StateContextProvider>
          <Weather />
        </StateContextProvider>
        
      } />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/price" element={<Price />} />
         <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
};

export default App;
