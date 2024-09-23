import React from 'react'
import { BsJustify } from 'react-icons/bs'
import {ClipLoader} from "react-spinners"
const Spinner = () => {
   return(
    <section style={{ height:"100vh",display: "flex",justifyContent: "center", alignItems: "center" }}>
    {/* Use the 'size' and 'color' props directly */}
    <ClipLoader size={150} color="skyblue" ariaLabel='loading spinner'/>
    </section>
  );
  
}

export default Spinner