import React from "react";
import "./MarqueeRibbon.css";

const MarqueeRibbon = ({
  backgroundColor = "#5a0f1c",
  phrases = null,
  speedSeconds = 20,
  className = "",
  style: styleProp = {},
}) => {
  const defaultPhrases = [
    "✨ LUXURY HAIR COLLECTIONS ✨",
    "🚚 FREE SHIPPING ON ORDERS OVER ₦500k",
    "✨ NEW ARRIVALS JUST DROPPED ✨",
  ];

  const items = Array.isArray(phrases) && phrases.length ? phrases : defaultPhrases;

  return (
    <div
      className={`marquee-ribbon ${className}`.trim()}
      style={{ backgroundColor: backgroundColor, ...styleProp }}
      role="region"
      aria-label="Promotional ribbon"
    >
      <div
        className="marquee-content"
        style={{ animationDuration: `${Number(speedSeconds) || 20}s` }}
      >
        {items.concat(items).map((text, i) => (
          <span className="marquee-item" key={i}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeRibbon;
