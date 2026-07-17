import { BrowserRouter } from "react-router-dom";

import { QueryClientProvider } from "@tanstack/react-query";

import queryClient from "./queryClient";

import { AuthProvider } from "../context/AuthContext";
import { UserProvider } from "../context/UserContext";
import { ThemeProvider } from "../context/ThemeContext";

export default function Providers({ children }) {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <UserProvider>{children}</UserProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}