import React from "react";
import { Star } from "lucide-react";

const StarRating = ({ rating }) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
      {stars.map((s) => {
        const filled = rating >= s;
        const half = rating >= s - 0.5 && rating < s;
        return (
          <Star
            key={s}
            size={14}
            fill={filled || half ? "#FFD166" : "none"}
            stroke={filled || half ? "#FFD166" : "#C4C4C4"}
            style={{ filter: filled || half ? "drop-shadow(0 1px 4px rgba(255,209,102,0.12))" : "none" }}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
