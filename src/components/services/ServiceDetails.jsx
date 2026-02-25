import React from "react";
import "./Services.css";

const ServiceDetails = ({ service, onClose }) => {
  if (!service) return null;

  return (
    <div className="modal-overlay">

      <div className="modal">

        <div className="service-image-wrap modal-image-wrap">
          <img className="service-image" src={service.image} alt={service.title} />
        </div>

        <div className="modal-info">
          <h2>{service.title}</h2>

          <p>{service.description}</p>

          <h3>Price: ₦{service.price}</h3>

          <button>Book Appointment</button>

          <button onClick={onClose} className="close-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
