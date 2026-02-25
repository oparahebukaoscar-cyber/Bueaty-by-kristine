// Supabase disabled: createBooking is a no-op for local development
export const createBooking = async (booking) => {
  console.warn("Supabase disabled: createBooking is a no-op");
  return null;
};
