import Button from "./Button";

export default function Pagination({

page,
totalPages,
onChange

}){

return(

<div className="flex justify-center gap-3">

<Button
variant="secondary"
disabled={page===1}
onClick={()=>onChange(page-1)}
>

Previous

</Button>

<span className="font-semibold">

{page} / {totalPages}

</span>

<Button
variant="secondary"
disabled={page===totalPages}
onClick={()=>onChange(page+1)}
>

Next

</Button>

</div>

);

}