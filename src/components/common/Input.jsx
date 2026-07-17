import { forwardRef } from "react";

const Input = forwardRef(
(
{
label,
error,
icon,
className="",
required=false,
...props
},
ref
)=>{

return(

<div className="w-full">

{label && (

<label className="mb-2 block font-medium text-slate-700">

{label}

{required && (
<span className="ml-1 text-red-500">*</span>
)}

</label>

)}

<div className="relative">

{icon && (

<div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">

{icon}

</div>

)}

<input
ref={ref}
className={`

w-full
rounded-xl
border
border-slate-300
bg-white
px-4
py-3
outline-none
transition
focus:border-blue-500
focus:ring-2
focus:ring-blue-200

${icon ? "pl-10" : ""}

${error ? "border-red-500" : ""}

${className}

`}
{...props}
/>

</div>

{error && (

<p className="mt-1 text-sm text-red-500">

{error}

</p>

)}

</div>

);

}
);

export default Input;