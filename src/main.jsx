import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/playfair-display";
import "@fontsource/inter";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { BookingProvider } from "./context/BookingContext";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
			<CartProvider>
				<BookingProvider>
					<App />
				</BookingProvider>
			</CartProvider>
		</AuthProvider>
	</React.StrictMode>
);
