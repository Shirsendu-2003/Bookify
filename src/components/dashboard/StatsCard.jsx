import {
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

export default function StatsCard({

  title,

  value,

  icon,

  trend = 0,

  subtitle = "",

  color = "blue",

}) {

  const positive =
    trend >= 0;

  const themes = {

    blue:{

      gradient:
        "from-blue-600 to-cyan-500",

      soft:
        "bg-blue-50",

      text:
        "text-blue-700",

    },

    emerald:{

      gradient:
        "from-emerald-600 to-green-500",

      soft:
        "bg-emerald-50",

      text:
        "text-emerald-700",

    },

    violet:{

      gradient:
        "from-violet-600 to-purple-500",

      soft:
        "bg-violet-50",

      text:
        "text-violet-700",

    },

    rose:{

      gradient:
        "from-rose-600 to-pink-500",

      soft:
        "bg-rose-50",

      text:
        "text-rose-700",

    },

    amber:{

      gradient:
        "from-amber-500 to-orange-500",

      soft:
        "bg-amber-50",

      text:
        "text-amber-700",

    },

  };

  const theme =
    themes[color] ||
    themes.blue;

  return (

    <div
      className="

relative
overflow-hidden

rounded-3xl
border
border-slate-200

bg-white
p-7

shadow-sm

transition-all
duration-300

hover:-translate-y-1
hover:shadow-xl

"
    >

      {/* TOP */}

      <div
        className="

flex
justify-between
items-start
gap-5

"
      >

        <div className="flex-1">

          <p
            className="

text-sm
font-medium
text-slate-500

"
          >

            {title}

          </p>

          <h2
            className="

mt-4
text-4xl
font-extrabold
text-slate-900

"
          >

            {value}

          </h2>

          {subtitle && (

            <p
              className="

mt-3
text-sm
text-slate-500

"
            >

              {subtitle}

            </p>

          )}

        </div>

        {/* ICON */}

        <div
          className={`

w-16
h-16

rounded-2xl

bg-gradient-to-r
${theme.gradient}

text-white

flex
items-center
justify-center

text-2xl
shadow-lg

`}
        >

          {icon}

        </div>

      </div>

      {/* FOOTER */}

      <div
        className="

mt-8
pt-6
border-t
border-slate-200

flex
justify-between
items-center

"
      >

        <div
          className={`

inline-flex
items-center
gap-2

rounded-full

px-4
py-2

font-semibold
text-sm

${
positive
? "bg-emerald-100 text-emerald-700"
: "bg-red-100 text-red-700"
}

`}
        >

          {positive
            ? <FaArrowUp/>
            : <FaArrowDown/>
          }

          {Math.abs(trend)}%

        </div>

        <span
          className="

text-sm
text-slate-400

"
        >

          vs last month

        </span>

      </div>

      {/* DECORATION */}

      <div
        className={`

absolute
-top-10
-right-10

w-36
h-36

rounded-full

${theme.soft}

opacity-50

`}
      />

    </div>

  );

}