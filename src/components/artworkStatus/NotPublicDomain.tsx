import React, { useState } from "react";
import Form from "../Form";
import Image from "next/image";

type Colaborador = {
    nombre: string,
    apellido: string,
    aliveValue: string,
    deathDate: string,
    birthday: string
  }
interface Props {
    title: string,
    autor: Colaborador[]
}
function NotPublicDomain({ title, autor }: Props) {
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
                    <div className="p-5 flex flex-col gap-14  xl:gap-15"> <h1 className="text-xl font-bold my-5 border-b-2 pb-2 border-b-red-500">La obra no se encuentra en el dominio publico</h1>
                        <div className="text-start pl-4">
                        <p>La obra : <b>{title}</b></p>
                            
                            {Array.isArray(autor) ? (
                                <div className="flex mt-5">
                                    <p className="min-w-[150px]">Realizada por:</p>
                                    <div className="flex px-4 flex-wrap w-full">
                                    {autor.map((item, index) => (
                                    <p className="w-1/3 min-w-[100px]" key={index}> {item.nombre} {item.apellido} </p>
                                ))}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                <p>Realizada por el autor: <b>{autor} </b></p>
                                </div>
                            )}
                        </div>
                        <div>
                            <p>No se encuentra en el dominio publico debido a : <span>Plazo de proteccion</span></p>

                            <button onClick={ShowForm} className="bg-red-500  rounded-lg text-white p-3 mt-5">
                                Volver a verificar
                            </button>
                        </div></div>


                    <div className="flex justify-center">
                        <Image src="/obra.jpg" alt="obra" height={300} width={300} className="hidden md:block blur-[3px]" />

                    </div>
                </div>
            )}
        </div>

    )
}

export default NotPublicDomain