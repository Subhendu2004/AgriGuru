import React from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function PriceChart({ data }) {
  const chartData = [...data]
    .map(item => ({
      date: item.Date,
      modal: parseInt(item["Modal Price"]),
    }))
    .sort((a, b) => {
      const parseDate = (str) => new Date(str.split("-").reverse().join("-"));
      return parseDate(a.date) - parseDate(b.date);
    });

  return (
    <div style={{ width: "100%", height: 400, marginTop: "0rem" }}>
      <h3 style={{
        textAlign: "center",
        marginBottom: "1rem",
        color: "#222"
      }}>
        Modal Price Trend (Bar + Line)
      </h3>
      <ResponsiveContainer>
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={(v) => `₹${v}`} />
          <Tooltip formatter={(v) => `₹${v}`} />
          <Legend />
          <Bar
            dataKey="modal"
            barSize={30}
            fill="url(#gradientBar)"
            name="Modal Price (Bar)"
          />
          <defs>
            <linearGradient id="gradientBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00b894" />
              <stop offset="100%" stopColor="#006266" />
            </linearGradient>
          </defs>
          <Line
            type="monotone"
            dataKey="modal"
            stroke="#ff7300"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
            name="Modal Price (Line)"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
