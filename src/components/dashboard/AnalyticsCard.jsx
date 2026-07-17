import {
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

export default function AnalyticsCard({

  title,
  value,
  icon,
  growth = 0,
  subtitle = "",
  color = "blue",

}) {

  const positive =
    Number(growth) >= 0;

 const colorMap = {

  blue:{
    bg:"bg-blue-50",
    icon:"bg-blue-600",
    text:"text-blue-600",
    border:"border-blue-100",
  },

  emerald:{
    bg:"bg-emerald-50",
    icon:"bg-emerald-600",
    text:"text-emerald-600",
    border:"border-emerald-100",
  },

  amber:{
    bg:"bg-amber-50",
    icon:"bg-amber-600",
    text:"text-amber-600",
    border:"border-amber-100",
  },

  violet:{
    bg:"bg-violet-50",
    icon:"bg-violet-600",
    text:"text-violet-600",
    border:"border-violet-100",
  },

  rose:{
    bg:"bg-rose-50",
    icon:"bg-rose-600",
    text:"text-rose-600",
    border:"border-rose-100",
  },

};

  const theme =
    colorMap[color] ??
    colorMap.blue;

  return (

    <div
      className={`

rounded-3xl
border
${theme.border}
${theme.bg}

p-7

transition-all
duration-300
ease-out

hover:-translate-y-1
hover:shadow-xl

`}
    >

      <div className="flex justify-between items-start gap-5">

        <div className="flex-1">

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-4 text-4xl font-extrabold text-slate-900">

            {
              typeof value === "number"
                ? value.toLocaleString()
                : value
            }

          </h2>

          {subtitle && (

            <p className="mt-3 text-sm text-slate-500">
              {subtitle}
            </p>

          )}

        </div>

        <div
          className={`

w-16
h-16
rounded-2xl

${theme.icon}

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

      <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">

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

          {
            positive
            ? <FaArrowUp/>
            : <FaArrowDown/>
          }

          {Math.abs(Number(growth))}%

        </div>

        <span className="text-sm text-slate-400">

          vs last month

        </span>

      </div>

    </div>

  );

}