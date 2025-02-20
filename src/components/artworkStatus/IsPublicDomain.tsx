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
  text?: string;
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
    description: "Fotografía dell'Emilia",
  },
  emisiones: {
    image: "/emisionradio.jpg",
    autor: "WLS 890 AM Radio",
    description: "WLS 890 AM Radio",
  },
  colaboraciones: {
    image: "/colaboracion.jpg",
    autor: "",
    description: "Claros en el bosque",
  },
  interpretacionArtistica: {
    image: "/interpretacion.jpg",
    autor: "Paramount",
    description: "film The Secret Garden",
  },
};

function getData(type: string) {
  return dataType[type] || {};
}

function IsPublicDomain({ artworks, autor, text }: Props) {
  const [componentToShow, setComponentToShow] = useState<JSX.Element | null>(
    null,
  );

  const isPublicDomain = (e: number, publicationYear: number) => {
    if (publicationYear === 0) {
      const today = new Date();
      const year = parseInt(artworks.date.split("-")[0]);
      return today.getFullYear() - year > e;
    }
    return publicationYear < e;
  };

  const showForm = () => setComponentToShow(<Form />);

  const getPublicationMessage = () => {
    const { type, date } = artworks;
    const year = parseInt(date.split("-")[0]);

    if (
      [
        "artística",
        "literaria",
        "científica",
        "interpretacionArtistica",
      ].includes(type) &&
      isPublicDomain(95, 0)
    ) {
      return (
        <p>
          Esta obra, además, puede ser publicada en{" "}
          <a
            target="_blank"
            href="https://commons.wikimedia.org/wiki/Main_Page"
          >
            Wikimedia Commons
          </a>{" "}
          sin permisos adicionales.
        </p>
      );
    }

    if (type === "fotografía" && isPublicDomain(1976, year)) {
      return (
        <p>
          Esta obra, además, puede ser publicada en{" "}
          <a
            target="_blank"
            href="https://commons.wikimedia.org/wiki/Main_Page"
          >
            Wikimedia Commons
          </a>{" "}
          sin permisos adicionales.
        </p>
      );
    }

    if (type === "institucional" && isPublicDomain(1946, year)) {
      return (
        <p>
          Esta obra, además, puede ser publicada en{" "}
          <a
            target="_blank"
            href="https://commons.wikimedia.org/wiki/Main_Page"
          >
            Wikimedia Commons
          </a>{" "}
          sin permisos adicionales.
        </p>
      );
    }

    return (
      <p>
        Esta obra no puede ser publicada en{" "}
        <a target="_blank" href="https://commons.wikimedia.org/wiki/Main_Page">
          Wikimedia Commons
        </a>{" "}
        requiere una licencia compatible.
      </p>
    );
  };

  return (
    <div>
      {componentToShow ? (
        <div>{componentToShow}</div>
      ) : (
        <div className="xl:w-[1000px] min-h-[350px] m-5 flex md:w-[700px] rounded-lg mx-auto text-center text-gray-900 shadow-2xl">
          <div className="p-2 flex flex-col w-[100%] xl:w-[80%]">
            <h1 className="text-xl font-bold mt-5 border-b-2 pb-2 border-b-green-500">
              La obra está en el dominio público
            </h1>
            <div className="text-start p-5">
              <p className="mb-3">Obra: {artworks.nombre}</p>
              <p className="mb-3">
                realizada por:{" "}
                {autor
                  .map((colab) => colab.nombre || "Autor Desconocido")
                  .join(", ")}
              </p>
              <p className="my-5">{text && text}</p>
              {getPublicationMessage()}
            </div>
            <div>
              <button
                onClick={showForm}
                className="bg-green-500 rounded-lg text-white p-3 my-3"
              >
                Volver a verificar
              </button>
            </div>
          </div>
          <div className="relative flex justify-center">
            <Image
              src={getData(artworks.type).image}
              alt={getData(artworks.type).description}
              height={300}
              width={300}
              className="hidden xl:block"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default IsPublicDomain;
