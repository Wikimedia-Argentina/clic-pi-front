import React,{ useState } from "react";
import Form from "../Form";
import Image from "next/image";

function UnknowStatus(){
    const [componentToShow, setComponentToShow] = useState<JSX.Element | null>(null);
    
    function ShowForm(){
        setComponentToShow(<Form/>)
    }
    return(
        <div>
            {componentToShow ?(
                 <div> {componentToShow}</div>
                     
                
            ): ( 
                <div  className=" w-[90%] flex md:w-[100%] md: rounded-lg mx-auto text-center text-gray-900 shadow-2xl ">
                <div className="p-5"> <h1 className="text-xl font-bold my-5 border-b-2 pb-2 border-b-gray-500">No se pudo determinar el estado de la obra</h1>
                <div className="text-start my-6 pl-4">
                <p>La obra <b>Lorem ipsum dolor sit.</b></p>
                 <p>Realizada por el autor : <b>Lorem ipsum dolor sit.</b></p>
                </div>
            
                 <p>Puedes buscar mas informacion acerca de la obra en el siguiente<a href=""><b> Enlace </b></a> </p>
                 <button onClick={ShowForm} className="bg-gray-500  rounded-lg text-white p-3 mt-5">
                     Volver a verificar
                 </button></div>
                 <div><Image src="/obra.jpg" alt="obra" height={300} width={300} className="hidden md:block bg-gray-700" /></div>
             </div>

              
               
            )}
        </div>
      
    )
}

export default UnknowStatus