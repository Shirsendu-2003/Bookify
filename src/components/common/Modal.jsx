import { motion, AnimatePresence } from "framer-motion";
import { X } from "react-icons/lu";

export default function Modal({

open,
onClose,
title,
children

}){

return(

<AnimatePresence>

{open && (

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
exit={{opacity:0}}
className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
>

<motion.div
initial={{scale:.9}}
animate={{scale:1}}
exit={{scale:.9}}
className="bg-white rounded-2xl p-6 w-full max-w-lg"
>

<div className="flex justify-between mb-5">

<h2 className="font-bold text-xl">

{title}

</h2>

<button onClick={onClose}>

<X size={24}/>

</button>

</div>

{children}

</motion.div>

</motion.div>

)}

</AnimatePresence>

);

}