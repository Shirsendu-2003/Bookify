import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export default function DashboardScrollButton() {
  const [visible, setVisible] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const container = document.getElementById("dashboard-scroll");

    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = container;

      setVisible(scrollTop > 200);

      setAtBottom(
        scrollTop + clientHeight >= scrollHeight - 20
      );
    };

    handleScroll();

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    const container = document.getElementById("dashboard-scroll");

    if (!container) return;

    if (atBottom) {
      container.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      container.scrollBy({
        top: container.clientHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label={atBottom ? "Scroll to Top" : "Scroll Down"}
      className={`
        fixed
        bottom-6
        right-6
        z-50

        flex
        items-center
        justify-center

        w-14
        h-14

        rounded-full

        bg-gradient-to-r
        from-blue-600
        via-indigo-600
        to-purple-600

        text-white

        shadow-2xl
        shadow-blue-500/30

        border
        border-white/20

        backdrop-blur-md

        transition-all
        duration-300

        ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }

        hover:scale-110
        hover:shadow-blue-500/50

        active:scale-95
      `}
    >
      {atBottom ? (
        <FaArrowUp className="text-lg animate-bounce" />
      ) : (
        <FaArrowDown className="text-lg animate-bounce" />
      )}
    </button>
  );
}