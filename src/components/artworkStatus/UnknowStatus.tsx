import React, { useState } from "react";
import Form from "../Form";
import Image from "next/image";

interface Props {
    title: string,
    autor: string,
    lastname: string
}

function UnknowStatus({ title, autor, lastname }: Props) {
    const [componentToShow, setComponentToShow] = useState<JSX.Element | null>(null);

    function ShowForm() {
        setComponentToShow(<Form />)
    }
    return (
        <div>
            {componentToShow ? (
                <div> {componentToShow}</div>


            ) : (
                <div className=" w-[90%] flex md:w-[100%] md: rounded-lg mx-auto text-center text-gray-900 shadow-2xl ">
                    <div className="p-5 flex flex-col gap-10"> <h1 className="text-xl font-bold my-5 border-b-2 pb-2 border-b-gray-500">No se pudo determinar el estado de la obra</h1>
                        <div className="text-start  pl-4">
                            <p>La obra <b>{title}</b></p>
                            <p>Realizada por el autor : <b>{autor} {lastname}</b></p>
                        </div>
                        <div>
                            <p>Puedes buscar mas informacion acerca de la obra en el siguiente<a href=""><b> Enlace </b></a> </p>
                            <button onClick={ShowForm} className="bg-gray-500  rounded-lg text-white p-3 mt-5">
                                Volver a verificar
                            </button>
                        </div></div>
                    <div className="flex justify-center"><Image src="/obra.jpg" alt="obra" height={300} width={300} className="hidden md:block bg-gray-700" /></div>
                </div>



            )}
        </div>

    )
}

export default UnknowStatus