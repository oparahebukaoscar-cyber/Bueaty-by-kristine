import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchBookings() {
      const { data } = await supabase.from("bookings").select("*");
      setBookings(data);
    }

    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Bookings</h2>
      {bookings?.map((b) => (
        <div key={b.id}>
          <p>{b.full_name} - {b.appointment_date}</p>
        </div>
      ))}
    </div>
  );
}
