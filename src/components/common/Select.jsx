export default function Select({

label,
options=[],
error,
className="",
...props

}){

return(

<div>

{label && (

<label className="mb-2 block font-medium">

{label}

</label>

)}

<select
className={`

w-full
rounded-xl
border
border-slate-300
px-4
py-3
outline-none
focus:border-blue-500
focus:ring-2
focus:ring-blue-200

${className}

`}
{...props}
>

{options.map((option)=>(

<option
key={option.value}
value={option.value}
>

{option.label}

</option>

))}

</select>

{error && (

<p className="mt-1 text-red-500 text-sm">

{error}

</p>

)}

</div>

);

}