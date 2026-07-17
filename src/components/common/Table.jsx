export default function Table({

columns=[],
data=[]

}){

return(

<div className="overflow-x-auto rounded-xl border">

<table className="w-full">

<thead className="bg-slate-100">

<tr>

{columns.map((col)=>(

<th
key={col.key}
className="px-4 py-3 text-left"
>

{col.title}

</th>

))}

</tr>

</thead>

<tbody>

{data.map((row,index)=>(

<tr
key={index}
className="border-t"
>

{columns.map((col)=>(

<td
key={col.key}
className="px-4 py-3"
>

{row[col.key]}

</td>

))}

</tr>

))}

</tbody>

</table>

</div>

);

}