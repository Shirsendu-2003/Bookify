import { LuLoaderCircle } from "react-icons/lu";

export default function Loader({
  text = "Please wait...",
  fullScreen = true,
}) {
  const content = (
    <div
      className="
        relative
        flex
        flex-col
        items-center
        justify-center
        gap-5

        rounded-3xl
        bg-white/80
        backdrop-blur-xl

        px-10
        py-8

        shadow-[0_20px_60px_rgba(0,0,0,0.15)]

        border
        border-white/40
      "
    >
      {/* Outer Ring */}
      <div
        className="
          absolute
          w-28
          h-28
          rounded-full
          border-4
          border-blue-200
          animate-ping
          opacity-20
        "
      />

      {/* Rotating Ring */}
      <div
        className="
          relative
          flex
          items-center
          justify-center

          w-20
          h-20
          rounded-full

          border-[5px]
          border-slate-200
          border-t-blue-600

          animate-spin
        "
      >
        {/* Center Circle */}
        <div
          className="
            absolute

            flex
            items-center
            justify-center

            w-12
            h-12

            rounded-full

            bg-gradient-to-br
            from-blue-600
            to-indigo-600

            text-white

            shadow-lg

            animate-pulse
          "
        >
          <LuLoaderCircle className="text-xl" />
        </div>
      </div>

      {/* Loading Text */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-slate-800">
          Loading...
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {text}
        </p>
      </div>

      {/* Animated Dots */}
      <div className="flex gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></span>
        <span
          className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"
          style={{ animationDelay: "0.15s" }}
        ></span>
        <span
          className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"
          style={{ animationDelay: "0.3s" }}
        ></span>
      </div>
    </div>
  );

  if (!fullScreen) {
    return (
      <div className="flex items-center justify-center py-10">
        {content}
      </div>
    );
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]

        flex
        items-center
        justify-center

        bg-slate-900/25
        backdrop-blur-md

        animate-in
        fade-in
        duration-300
      "
    >
      {content}
    </div>
  );
}