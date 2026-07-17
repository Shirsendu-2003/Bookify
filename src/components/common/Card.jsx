export default function Card({

children,
title,
className=""

}){

return(

<div
className={`

rounded-2xl
bg-white
p-6
shadow-sm
border
border-slate-200

${className}

`}
>

{title && (

<h3 className="mb-4 text-lg font-semibold">

{title}

</h3>

)}

{children}

</div>

);

}