export default function TextArea({

label,
error,
rows=5,
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

<textarea
rows={rows}
className={`

w-full
rounded-xl
border
border-slate-300
px-4
py-3
resize-none
outline-none
focus:border-blue-500
focus:ring-2
focus:ring-blue-200

${className}

`}
{...props}
/>

{error && (

<p className="mt-1 text-sm text-red-500">

{error}

</p>

)}

</div>

);

}