import React, { useState } from "react";
import CalendarPicker from "./CalendarPicker";
import TimeSlots from "./TimeSlots";

const BookingForm = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", service: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Booking Confirmed 🎉");
  };

  return (
    <form className="booking-form-grid" onSubmit={handleSubmit}>
      <div className="booking-header">
        <h2 className="booking-title">Book Your Luxury Experience</h2>
        <p className="booking-sub">Choose your preferred date and service. Our stylists will confirm availability.</p>
      </div>

      <div className="fields-grid">
        <div className="field">
          <label className="label">Full Name</label>
          <input
            className="input"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="field">
          <label className="label">Email</label>
          <input
            className="input"
            placeholder="Email Address"
            type="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="field">
          <label className="label">Phone</label>
          <input
            className="input"
            placeholder="Phone Number"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <div className="field">
          <label className="label">Service</label>
          <select
            className="input select"
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
          >
            <option value="">Select Service</option>
            <option>Wig Installation</option>
            <option>Hair Revamp</option>
            <option>Frontal Styling</option>
          </select>
        </div>

        <div className="field">
          <label className="label">Preferred Date</label>
          <CalendarPicker setDate={setDate} />
        </div>

        <div className="field">
          <label className="label">Preferred Time</label>
          <TimeSlots setTime={setTime} />
        </div>

        <div className="field full">
          <label className="label">Notes</label>
          <textarea
            className="input textarea"
            placeholder="Any preferences or notes for your stylist"
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </div>
      </div>

      <div className="form-actions">
        <button className="btn-book" type="submit">Confirm Booking</button>
      </div>
    </form>
  );
};

export default BookingForm;
