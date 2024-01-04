import React, { useState } from "react";
import Form from "../Form";
import Image from "next/image";

type Colaborador = {
    nombre: string,
    aliveValue: string,
    deathDate: string,
}

type WorkArt = {
    nombre: string,
    type: string,
    date: string,

}
interface Props {
    text: string
    autor: Colaborador[]
    artworks: WorkArt
}
type DataType = {
    [key: string]: {
        image: string;
        autor: string;
        description: string;
    };
};
const dataType: DataType = {
    artística: {
        image: "/artistica.jpg",
        autor: "Francisco de Zurbarán",
        description: "obra artística"
    },
    científica: {
        image: "/Critique_of_the_Theory_of_Evolution.jpg",
        autor: "Thomas Hunt Morgan",
        description: "obra científica"
    },
    cartas: {
        image: "/cartaIrene.jpg",
        autor: "Carta d'Irene",
        description: "Carta d'Irene"
    },
    audiovisual: {
        image: "/Película_barba_azul.jpg",
        autor: "Ernst Lubitsch",
        description: "obra audiovisual"
    },
    institucional: {
        image: "/institucional.jpg",
        autor: "",
        description: "obra institucional"
    },
    literaria: {
        image: "/Miguel_de_Cervantes.png",
        autor: "Miguel de Cervantes",
        description: "obra literaria"
    },
    fotografía: {
        image: "/Fotografia.jpg",
        autor: "",
        description: "Fotografía dell'Emilia "
    },
    emisiones: {
        image: "/emisionradio.jpg",
        autor: "WLS 890 AM Radio",
        description: "WLS 890 AM Radio"
    },
    colaboraciones: {
        image: "/colaboracion.jpg",
        autor: "",
        description: "Claros en el bosque"
    },
    interpretacionArtistica: {
        image: "/interpretacion.jpg",
        autor: "Paramount",
        description: " film The Secret Garden"
    },

}

function data(e: string) {
    return dataType[e];
}

function IsPublicDomain({ artworks, autor, text }: Props) {
    const [componentToShow, setComponentToShow] = useState<JSX.Element | null>(null);

    function publicationDate(e: number, publicationYear: number) {
        if (e && publicationYear === 0) {
            const today = new Date();
            const emisionDate: string[] = artworks.date.split("-")
            const year = parseInt(emisionDate[0])
            const yearsDifference = today.getFullYear() - year
            return yearsDifference > e
        } else {
            return publicationYear < e;
        }
    }

    function ShowForm() {
        setComponentToShow(<Form />)
    }
    return (
        <div>
            {componentToShow ? (
                <div> {componentToShow}</div>


            ) : (<div className=" w-full flex md:w-[100%] rounded-lg mx-auto text-center text-gray-900 shadow-2xl ">
                <div className="p-5 flex flex-col gap-14 lg:10">
                    <h1 className="text-xl font-bold mt-5 border-b-2 pb-2 border-b-green-500">La obra está en el dominio público</h1>
                    <div className="text-start p-5">
                        <p className="mb-3">Obra: {artworks.nombre}</p>
                        <p className="mb-3">realizada por: {autor.map(colab => colab.nombre !== "" ? `${colab.nombre}` : 'Autor Desconocido').join(', ')}</p>
                        {text !== "" && (<p>{text}</p>)}
                        <br />
                        {(artworks.type === "artistica" || artworks.type === "literaria" || artworks.type === "científica") && publicationDate(95, 0) ?
                            (<p>Esta obra, además, puede ser publicada en Wikimedia Commons sin permisos adicionales. </p>
                            ) : artworks.type === "fotografia" && publicationDate(1976, parseInt(artworks.date.split('-')[0])) ? (
                                <p>Esta obra, además, puede ser publicada en Wikimedia Commons sin permisos adicionales. </p>
                            ) : artworks.type === "institucional" && publicationDate(1946, parseInt(artworks.date.split('-')[0])) ? (
                                <p>Esta obra, además, puede ser publicada en Wikimedia Commons sin permisos adicionales. </p>
                            ) : (
                                <p>Esta obra no puede ser publicada en Wikimedia Commons.<br></br> Requiere una licencia compatible. </p>
                            )}
                    </div>
                    <div>
                        <button onClick={ShowForm} className="bg-green-500  rounded-lg text-white p-3 ">
                            Volver a verificar
                        </button>
                    </div>
                </div>
                <div className="relative flex justify-center ">
                    <Image
                        src={data(artworks.type).image}
                        alt={data(artworks.type).description}
                        height={300}
                        width={300}
                        className="hidden lg:block"
                    />
                    <div className=" absolute inset-0 bg-black bg-opacity-5 flex items-end justify-end">
                        <p className="hidden lg:block text-sm m-1  text-black ">{data(artworks.type).autor}</p>
                    </div>
                </div>

            </div>)}

        </div>
    )
}

export default IsPublicDomain