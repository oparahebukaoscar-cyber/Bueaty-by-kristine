import React from "react";
import "./Services.css";

const ServiceCard = ({ service, onView }) => {
  return (
    <div className="service-card">
      <div className="service-image-wrap">
        <img className="service-image" src={service.image} alt={service.title} />
      </div>

      <h3>{service.title}</h3>

      <p>{service.short}</p>

      <button onClick={() => onView(service)}>
        View Details
      </button>
    </div>
  );
};

export default ServiceCard;
