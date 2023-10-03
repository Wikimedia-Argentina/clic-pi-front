import React,{ useState } from "react";
import Form from "../Form";
import Image from "next/image";

interface Props{
    title: string,
    autor: string
}
 
function IsPublicDomain({ title,autor}: Props){
    const [componentToShow, setComponentToShow] = useState<JSX.Element | null>(null);
    
    function ShowForm(){
        setComponentToShow(<Form/>)
    }
    return(
            <div>
                {componentToShow ?(
                     <div> {componentToShow}</div>
                         
                    
                ): ( <div  className=" w-[90%] flex md:w-[100%] md: rounded-lg mx-auto text-center text-gray-900 shadow-2xl ">
               <div className="p-5 flex flex-col gap-10">
                 <h1 className="text-xl font-bold my-5 border-b-2 pb-2 border-b-green-500">La obra es de dominio publico</h1>
               <div className="text-start  pl-4">
               <p>La obra <b>{title}</b></p>
                <p>Realizada por el autor : <b>{autor}</b></p>
               </div>
                <div className="">
                <p>Puedes buscar mas informacion acerca de la obra en el siguiente<a href=""><b> Enlace </b></a> </p>
                <button onClick={ShowForm} className="bg-green-600 rounded-lg text-white p-3 mt-5">
                    Volver a verificar
                </button>
                </div></div>

                <div><Image src="/obra.jpg" alt="obra" height={300} width={300} className="hidden md:block" /></div>
            </div> )}
        
    </div>
    )
}

export default IsPublicDomain