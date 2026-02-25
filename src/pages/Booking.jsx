import { useState } from "react";
import { supabase } from "../supabaseClient";
import "./Booking.css";

export default function Booking() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    service: "",
    booking_date: "",
    booking_time: "",
    notes: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("bookings").insert([
      {
        ...form,
        status: "pending"
      }
    ]);

    if (!error) {
      setSuccess(true);
      setForm({
        full_name: "",
        email: "",
        phone: "",
        service: "",
        booking_date: "",
        booking_time: "",
        notes: ""
      });
    }

    setLoading(false);
  }

  return (
    <section className="booking-section">
      <div className="booking-container">
        <div className="booking-header">
          <h1>Book an Appointment</h1>
          <p>
            Schedule your wig consultation or apartment revamp session with us.
          </p>
        </div>

        {success && (
          <div className="success-message">
            ✅ Your booking has been submitted successfully!
          </div>
        )}

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={form.full_name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              required
            >
              <option value="">Select Service</option>
              <option value="wig-consultation">Wig Consultation</option>
              <option value="wig-installation">Wig Installation</option>
              <option value="apartment-revamp">Apartment Revamp Session</option>
            </select>

            <input
              type="date"
              name="booking_date"
              value={form.booking_date}
              onChange={handleChange}
              required
            />

            <input
              type="time"
              name="booking_time"
              value={form.booking_time}
              onChange={handleChange}
              required
            />
          </div>

          <textarea
            name="notes"
            placeholder="Additional Notes (Optional)"
            value={form.notes}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </section>
  );
}
