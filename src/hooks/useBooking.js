import { useState } from "react";
import { createBooking } from "../services/bookingService";

const useBooking = () => {
  const [loading, setLoading] = useState(false);

  const bookService = async (bookingData) => {
    setLoading(true);

    await createBooking(bookingData);

    setLoading(false);
  };

  return { bookService, loading };
};

export default useBooking;
