import React, { useState } from "react";
import Form from "../Form";
import Image from "next/image";

type Colaborador = {
  nombre: string;
  aliveValue: string;
  deathDate: string;
};

type WorkArt = {
  nombre: string;
  type: string;
  date: string;
};
interface Props {
  autor: Colaborador[];
  artworks: WorkArt;
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
    description: "obra artística",
  },
  científica: {
    image: "/Critique_of_the_Theory_of_Evolution.jpg",
    autor: "Thomas Hunt Morgan",
    description: "obra científica",
  },
  cartas: {
    image: "/cartaIrene.jpg",
    autor: "Carta d'Irene",
    description: "Carta d'Irene",
  },
  audiovisual: {
    image: "/Película_barba_azul.jpg",
    autor: "Ernst Lubitsch",
    description: "obra audiovisual",
  },
  institucional: {
    image: "/institucional.jpg",
    autor: "",
    description: "obra institucional",
  },
  literaria: {
    image: "/Miguel_de_Cervantes.png",
    autor: "Miguel de Cervantes",
    description: "obra literaria",
  },
  fotografía: {
    image: "/Fotografia.jpg",
    autor: "",
    description: "Fotografia dell'Emilia ",
  },
  emisiones: {
    image: "/emisionradio.jpg",
    autor: "Radio WWOZ",
    description: "Radio WWOZ",
  },
  colaboraciones: {
    image: "/colaboracion.jpg",
    autor: "",
    description: "Claros en el bosque",
  },
  interpretacionArtistica: {
    image: "/interpretacion.jpg",
    autor: "Paramount",
    description: " film The Secret Garden",
  },
};

function data(e: string) {
  return dataType[e];
}
function NotPublicDomain({ artworks, autor }: Props) {
  console.log("artworks.type:", artworks.type);
  console.log("dataType keys:", Object.keys(dataType));
  const [componentToShow, setComponentToShow] = useState<JSX.Element | null>(
    null,
  );

  function ShowForm() {
    setComponentToShow(<Form />);
  }
  return (
    <div>
      {componentToShow ? (
        <div> {componentToShow}</div>
      ) : (
        <div className="xl:w-[1000px] min-h-[350px]  m-5 flex md:w-[700px] rounded-lg mx-auto text-center text-gray-900 shadow-2xl ">
          <div className="p-2 flex flex-col w-[100%]  xl:w-[80%] ">
            <h1 className="text-xl font-bold mt-5 border-b-2 pb-2 border-b-red-500">
              La obra no se encuentra en el dominio público
            </h1>
            <div className="text-start p-10">
              <p className="mb-3">Obra: {artworks.nombre}</p>
              <p className="mb-3">
                Realizada por:{" "}
                {autor
                  .map((colab) =>
                    colab.nombre !== ""
                      ? `${colab.nombre}`
                      : "Autor Desconocido",
                  )
                  .join(", ")}
              </p>
              <p>
                No se encuentra en dominio público debido al plazo de protección
                de las obras según la Ley 11.723 de propiedad{" "}
                <a target="_blank" href="https://www.derechodeautor.org.ar/">
                  intelectual argentina{" "}
                </a>
              </p>{" "}
              <br />
              <p>
                Sin embargo, si tienes los derechos de autor sobre esta obra,
                puedes publicarla bajo licencias Creative Commons para permitir
                su uso sin restricciones. Recordá que para su carga en{" "}
                <a
                  target="_blank"
                  href="https://commons.wikimedia.org/wiki/Main_Page"
                >
                  Wikimedia Commons
                </a>
                , sólo las licencias{" "}
                <a
                  target="_blank"
                  href="https://creativecommons.org/licenses/by/4.0/deed.es"
                >
                  CC BY{" "}
                </a>
                y{" "}
                <a
                  target="_blank"
                  href=" https://creativecommons.org/licenses/by-sa/4.0/deed.es"
                >
                  CC BY SA
                </a>{" "}
                son compatibles
              </p>
            </div>
            <div>
              <button
                onClick={ShowForm}
                className="bg-red-500  rounded-lg text-white p-3 my-3"
              >
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
              className="hidden xl:block blur-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default NotPublicDomain;
