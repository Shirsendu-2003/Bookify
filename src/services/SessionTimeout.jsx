import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import authService from "../services/authService";

const SESSION_TIMEOUT = 30 * 60 * 1000;

export default function SessionTimeout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Don't run if user isn't logged in
    if (!authService.isAuthenticated()) return;

    // Don't run on public pages
    if (
      location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/forgot-password"
    ) {
      return;
    }

    let timer;

    const logout = () => {
      alert("Session expired due to inactivity.");

      authService.logout();
      navigate("/login", { replace: true });
    };

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(logout, SESSION_TIMEOUT);
    };

    ["mousemove", "keydown", "click", "scroll", "touchstart"].forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer();

    return () => {
      clearTimeout(timer);

      ["mousemove", "keydown", "click", "scroll", "touchstart"].forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, [navigate, location.pathname]);

  return null;
}
