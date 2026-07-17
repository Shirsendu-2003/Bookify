const colors={

success:"bg-green-100 text-green-700",

danger:"bg-red-100 text-red-700",

warning:"bg-yellow-100 text-yellow-700",

info:"bg-blue-100 text-blue-700"

};

export default function Badge({

children,
variant="info"

}){

return(

<span
className={`

inline-flex
rounded-full
px-3
py-1
text-xs
font-semibold

${colors[variant]}

`}
>

{children}

</span>

);

}