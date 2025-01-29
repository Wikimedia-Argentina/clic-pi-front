import React from "react";

const modalData = [
  {
    title: "Literaria",
    description:
      "Es una creación escrita, como una novela, poema, cuento o drama, generalmente impresa.",
    example: "“Martín Fierro”, de José Hernández.",
  },
  {
    title: "Artística",
    description:
      "Es una creación que se enfoca en la expresión creativa y estética, como pinturas, esculturas o composiciones musicales, que se encuentran plasmadas en un soporte físico o digital.",
    example: "Partitura del Himno Nacional Argentino.",
  },
  {
    title: "Científica",
    description:
      "Es una obra producto de la investigación de una o más personas sobre un tema, en forma de monografías, artículos de revista, obras de divulgación, etc.",
    example: "“Viaje a la Patagonia Austral”, de Francisco P. Moreno.",
  },
  {
    title: "Fotografía",
    description:
      "No se diferencia entre analógica o digital, o si la misma tiene fines meramente informativos o artísticos.",
    clarification:
      "Al fotografiar otra obra (artística, audiovisual, etc.), aplican los plazos de protección de la misma.",
    example: "Foto de la fachada de la Casa Histórica de la Independencia.",
  },
  {
    title: "Audiovisual",
    description:
      "Es una creación que incluye medios visuales y auditivos, como películas, videos o documentales.",
    clarification:
      "Si el género de la obra audiovisual es musical, se debe considerar al compositor musical como coautor de la obra.",
    example:
      "“Juan Moreira” de Leonardo Favio (dirección y guion), Tito Hurovich (dirección), Pocho Leyes y Luis María Serra (música) y Jorge Zuhair Jury (guion).",
  },
  {
    title: "Emisión Radiofónica",
    description:
      "Es una obra transmitida a través de la radio, que puede incluir programas, entrevistas y música.",
    clarification:
      "Cada obra que conforma la emisión tiene sus propios plazos de protección individuales.",
    example:
      "Entrevista de LR 11 (Radio Universidad Nacional de La Plata) a Alfredo Palacios.",
  },
  {
    title: "Institucional",
    description:
      "Se refiere a documentación o publicaciones creadas por organizaciones o instituciones, como informes, manuales, folletos, etc., que no poseen la firma de un autor en particular.",
    example:
      "Resolución por la que se reincorpora personal docente cesanteado durante la dictadura.",
  },
  {
    title: "Colaboración",
    description:
      "Involucra la contribución de múltiples autores o artistas para crear una obra conjunta.",
    example: "Álbum musical con varias colaboraciones.",
  },
  {
    title: "Carta",
    description:
      "Es una obra escrita personal que comunica mensajes o sentimientos a destinatarios específicos.",
    example:
      "Carta a Juan Manuel Ortiz de Rosas reclamando no ir a un colegio pupilo.",
  },
  {
    title: "Interpretación Artística",
    description:
      "Implica la representación creativa de una obra existente, como una obra de teatro o una adaptación cinematográfica de un libro.",
    example: "Interpretación teatral de “La Nona”, de Roberto Cossa.",
  },
];

type Props = {
  handleCloseTypeArt: () => void;
};

const DescriptionModal = ({ handleCloseTypeArt }: Props) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === "modal-backdrop") {
      handleCloseTypeArt();
    }
  };

  return (
    <div
      id="modal-backdrop"
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9998,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="max-w-[900px] max-h-[84%] bg-white border-slate-800 border-[1px] rounded-xl p-5"
        style={{
          position: "relative",
          zIndex: 9999,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            textAlign: "start",
            wordBreak: "break-word",
            overflowWrap: "anywhere",
          }}
          className="px-5"
        >
          {modalData.map((item, index) => (
            <div
              key={index}
              style={{
                fontSize: "17px",
                marginBottom: "20px",
              }}
            >
              <strong>{item.title}:</strong> {item.description}
              <br />
              {item.clarification && (
                <p>
                  <span style={{ fontWeight: 500 }}>Aclaración: </span>
                  {""}
                  {item.clarification}
                </p>
              )}
              <p style={{ fontSize: "15px" }}>Ej: {item.example}</p>
            </div>
          ))}
          <p style={{ fontSize: 14 }}>
            Fuente{" "}
            <a
              style={{ color: "blue" }}
              href="https://www.derechodeautor.org.ar/recursos/abc-sobre-derechos-de-autor/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.derechodeautor.org.ar/recursos/abc-sobre-derechos-de-autor/
            </a>
          </p>
        </div>
        <button
          className="bg-black text-white rounded-md relative left-[45%] mt-4"
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
          onClick={handleCloseTypeArt}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default DescriptionModal;
