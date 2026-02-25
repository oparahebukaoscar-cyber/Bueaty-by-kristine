import { supabase } from "../supabaseClient";

export const getProducts = async () => {
  const { data, error } = await supabase.from("products").select("*");
  if (error) {
    // eslint-disable-next-line no-console
    console.warn("getProducts error:", error);
    return [];
  }
  return data || [];
};
