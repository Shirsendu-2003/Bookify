import { forwardRef } from "react";
import { LuLoaderCircle } from "react-icons/lu";

const variants = {

  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400",

  secondary:
    "bg-slate-200 text-slate-900 hover:bg-slate-300 focus:ring-slate-400",

  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-400",

  success:
    "bg-green-600 text-white hover:bg-green-700 focus:ring-green-400",

  outline:
    "border border-slate-300 bg-white text-slate-800 hover:bg-slate-100",

};

const sizes = {

  sm:
    "px-3 py-2 text-sm",

  md:
    "px-4 py-2.5 text-base",

  lg:
    "px-6 py-3 text-lg",

};

const Button = forwardRef(

(

{

  children,

  variant = "primary",

  size = "md",

  loading = false,

  disabled = false,

  fullWidth = false,

  className = "",

  ...props

},

ref

)=>{

  return(

    <button

      ref={ref}

      disabled={
        disabled || loading
      }

      className={`

inline-flex
items-center
justify-center
gap-2
rounded-xl
font-medium
transition-all
duration-200
focus:outline-none
focus:ring-2
disabled:opacity-50
disabled:cursor-not-allowed

${variants[variant]}
${sizes[size]}

${fullWidth
  ? "w-full"
  : ""}

${className}

`}

      {...props}

    >

      {

        loading && (

          <LuLoaderCircle
            className="
              w-4
              h-4
              animate-spin
            "
          />

        )

      }

      {children}

    </button>

  );

}

);

Button.displayName =
  "Button";

export default Button;