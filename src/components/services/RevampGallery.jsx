import React from "react";
import "./Services.css";

const RevampGallery = ({ images }) => {
  return (
    <section className="revamp-gallery">

      <h2>Hair Revamp Transformations</h2>

      <div className="gallery-grid">
        {images.map((img, i) => (
          <img key={i} src={img} alt="revamp" />
        ))}
      </div>
    </section>
  );
};

export default RevampGallery;
