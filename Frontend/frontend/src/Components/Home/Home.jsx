import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import bgImage from "../../assets/home3.jpg";
import logo from "../../assets/images/logo.jpeg"; // optional background

export default function Home() {
  const navigate = useNavigate();

  const features = [
    { label: "ASK AI", link: "/chatbot", icon: "💡" },
    { label: "About", link: "/about", icon: "🧬" },
    { label: "Govt Schemes", link: "/govt-scheme", icon: "🧑‍🤝‍🧑" },
    { label: "Market", link: "/price", icon: "🌾" },
    { label: "Weather", link: "/weather", icon: "💧" },
    { label: "Prediction", link: "/prediction", icon: "📊" },

    // { label: "Sensors", link: "/sensors", icon: "📶" },
  ];

  const radius = 160; // instead of 160

  const center = 250;

  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${bgImage})` }}
      
    >
    
      <div className="circle-wrapper">
        {features.map((feature, index) => {
          //   const angle = (2 * Math.PI * index) / features.length;
          const angle = (2 * Math.PI * index) / features.length;

          const top = center + radius * Math.sin(angle) - 45;
          const left = center + radius * Math.cos(angle) - 45;

          return (
            <div
              key={index}
              className="circle-button"
              style={{ top: `${top}px`, left: `${left}px` }}
              onClick={() => navigate(feature.link)}
            >
              <div className="icon">{feature.icon}</div>
              <div className="label">{feature.label}</div>
            </div>
          );
        })}
        <div className="center-circle">
          AgriGuru
          <br />
        </div>
      </div>
    </div>
  );
}
