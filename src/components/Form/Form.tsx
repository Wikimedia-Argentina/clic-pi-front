import countries from "i18n-iso-countries";
import { useState } from "react";
import UnknowStatus from "../artworkStatus/UnknowStatus";
import IsPublicDomain from "../artworkStatus/IsPublicDomain";
import NotPublicDomain from "../artworkStatus/NotPublicDomain";
const fecha: Date = new Date();

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/es.json"));

function Form() {
  const [componentToShow, setComponentToShow] = useState<JSX.Element | null>(null);
  const [aliveValue, setAliveValue] = useState('no');
  const [nameAutor, setNameAutor] = useState('');
  const [lastname, setlastname] = useState('');
  const [type, setType] = useState('cientifica');
  const [Country, setCountry] = useState('');
  const [deathDate, setdeathDate] = useState('');
  const [Date, setDate] = useState('');
  const [nameObra, setNameObra] = useState('');
  const [mostrarDiv, setMostrarDiv] = useState(false);

  const toggleDiv = () => {
    setMostrarDiv(!mostrarDiv);
  };

  // cientifica  70 despues de la muerte del autor
  // literaria    70 despues de la muerte del autor
  // artistica   70 despues de la muerte del autor

  //   cartas              20 despues del fallecimiento del autor
  // audiovisual     50 despues de muerte del ultimo colaborador 
  //   colaboraciones      70 despues de la muerte del ultimo colaborador

  //  fotografia     20 de publicacion Wikimedia
  //  Emisiones radiofónicas   50 despues de la emision 
  //   anonimas               50 despues de la emision

  const handleButtonClick = () => {
    //fecha actual
    let year: number = fecha.getFullYear()
    //fecha muerte
    const dateDeath: string[] = deathDate.split('-')
    let dYear: number = parseInt(dateDeath[0], 10)
    //fecha de publicacion/emision
    const dateEmision: string[] = Date.split("-")
    let emisionDate: number = parseInt(dateEmision[0], 10)


    let param1 = (type === "cientifica" || type === "literaria" || type === "artistica" || type === "colaboracion") && (year - dYear >= 70)
    let typeCarta = (type === "cartas") && (year - dYear >= 20)
    let typeEmision = ((type === "anonimas" || type === "emisiones") && (year - emisionDate >= 50)) || type === "fotografia" && year - emisionDate >= 20

    if (Country === "Argentina" && aliveValue == "si" && ((param1) || (typeCarta) || ((type === "audiovisual") && (year - dYear >= 50)) || typeEmision)) {
      setComponentToShow(<IsPublicDomain title={nameObra} autor={nameAutor} lastname={lastname} />);
    } else if (Country !== "Argentina") {
      setComponentToShow(<UnknowStatus title={nameObra} autor={nameAutor} lastname={lastname} />);
    } else {
      setComponentToShow(<NotPublicDomain title={nameObra} autor={nameAutor} lastname={lastname} />);
    }
  };

  return (
    <div>

      {componentToShow ? (

        <div>{componentToShow}</div>
      ) : (
        <div className="">
          <h3 className="font-bold text-center mb-5 text-xl border-b-gray-500 border-b-2 pb-2 text-gray-900">Verifica si la obra es de dominio publico</h3>
        
          <form className="block max-w-md rounded-lg bg-white text-gray-900 border-2 border-gray-400 p-10" onSubmit={handleButtonClick}  >
            <div className="flex gap-3">
              <div className="flex flex-col mb-6 gap-3 w-[60%]" >
                <label className="text-center text-md  font-bold">Nombre de la obra</label>
                <input
                  type="text"
                  className="bg-transparent border border-gray-500 rounded-lg p-2" required name="nameObra" onChange={(e) => setNameObra(e.target.value)} />
              </div>
              <div className="flex flex-col mb-6 gap-3 ">
                <label className="text-center text-md font-bold">Tipo : </label>
                <select required className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " onChange={(e) => setType(e.target.value)}>
                  <option value="cientifica" selected>Cientifica</option>
                  <option value="literaria">Literaria </option>
                  <option value="artistica">Artística  </option>
                  <option value="fotografia">Fotografia </option>
                  <option value="audiovisual">Audiovisual</option>
                  <option value="emisiones">Emision radiofónica</option>
                  <option value="anonimas">Anónima </option>
                  <option value="colaboraciones">Colaboracion </option>
                  <option value="cartas">Carta </option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-3">
              <div className="flex flex-col mb-6 gap-3 w-[50%]"  >
                <label className="text-center text-md font-bold" >Nombre del autor</label>
                <input
                  type="text" onChange={(e) => setNameAutor(e.target.value)}
                  className="bg-transparent border border-gray-500 rounded-lg p-2" required name="nameAutor" value={nameAutor} />
              </div>
              <div className="flex flex-col mb-6 gap-3 w-[50%]"  >
                <label className="text-center text-md font-bold" >Apellido del autor </label>
                <input
                  type="text" onChange={(e) => setlastname(e.target.value)}
                  className="bg-transparent border border-gray-500 rounded-lg p-2" required name="lastname" value={lastname} />
              </div>

            </div>

            {mostrarDiv && (
              <div className="flex gap-3 ">

                <div className="flex flex-col mb-6 gap-3 w-[50%]"  >
                  <label className="text-center text-md font-bold" >Nombre </label>
                  <input
                    type="text" onChange={(e) => setNameAutor(e.target.value)}
                    className="bg-transparent border border-gray-500 rounded-lg p-2" required name="nameAutor" value={nameAutor} />
                </div>
                <div className="flex flex-col mb-6 gap-3 w-[50%]"  >
                  <label className="text-center text-md font-bold" >Apellido</label>
                  <input
                    type="text" //onChange={(e) => setNameAutor(e.target.value)}
                    className="bg-transparent border border-gray-500 rounded-lg p-2" required name="nameAutor" value={nameAutor} />
                </div>

              </div>
            )}

            <div className="flex justify-center items-center ">
              <div className={`text-sm border p-2 cursor-pointer rounded-lg  border-gray-400 ${mostrarDiv ? 'block' : ''}`} onClick={toggleDiv} >
                {mostrarDiv ? '- quitar colaborador' : '+ Añadir colaborador'}
              </div>

            </div>


            <div className="flex gap-3 mt-6">
              <div className="flex flex-col mb-6 gap-3 w-[50%]" >
                <label className="text-center text-md font-bold" >Fallecido</label>
                <select required name="alive" className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => setAliveValue(e.target.value)} >
                  <option selected value="no">no</option>
                  <option value="si">si</option>
                </select>
              </div>
              {aliveValue === "si" ? (

                <div className="flex flex-col mb-6 gap-3 w-[50%]" >
                  <label className="text-center text-md font-bold" >Fecha deceso</label>
                  <div
                    className="relative mb-3"
                    data-te-datepicker-init
                    data-te-inline="true"
                    data-te-input-wrapper-init>
                    <input
                      type="date" required name="deathDate" value={deathDate} onChange={(e) => setdeathDate(e.target.value)}
                      className=" border border-gray-500 peer block min-h-[auto] w-full rounded-lg bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      placeholder="Selecciona una fecha" />
                  </div>
                </div>

              ) : (
                <div className="flex flex-col mb-6 gap-3 w-[50%]" >
                  <label className="text-center text-md font-bold" >Fecha nacimiento</label>
                  <div
                    className="relative mb-3"
                    data-te-datepicker-init
                    data-te-inline="true"
                    data-te-input-wrapper-init>
                    <input
                      type="date" required name="birthday" // value={deathDate} onChange={(e) => setdeathDate(e.target.value)}
                      className=" border border-gray-500 peer block min-h-[auto] w-full rounded-lg bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      placeholder="Selecciona una fecha" />
                  </div>
                </div>
              )}

            </div>

            <div className="flex gap-2">
              <div className="flex flex-col mb-6 gap-3 w-[50%]" >
                <label className="text-center text-md font-bold">Fecha publicación</label>

                <div
                  className="relative mb-3"
                  data-te-datepicker-init
                  data-te-inline="true"
                  data-te-input-wrapper-init>
                  <input
                    type="date" required name="Date" value={Date} onChange={(e) => setDate(e.target.value)}
                    className=" border border-gray-500 peer block min-h-[auto] w-full rounded-lg bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    placeholder="Selecciona una fecha" />

                </div>
              </div>


              <div className="flex flex-col mb-6 gap-3 w-[50%]" >

                <label className="text-center text-md font-bold">Pais</label>

                <select required className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => setCountry(e.target.value)}>
                  <option selected>Selecciona un pais</option>
                  {Object.values(countries.getNames('es', {select: 'official'})).map((item, index) => (

                    <option value={item} className="" key={index}>{item} </option>
                  ))}

                </select>

              </div>

            </div>

            <div
              className="mb-6 flex min-h-[1.5rem] items-center justify-center pl-[1.5rem]">
              <input required
                className="relative float-left -ml-[1.5rem] mr-[6px] h-[1.125rem] "
                type="checkbox"
              />
              <label
                className="inline-block pl-[0.15rem] hover:cursor-pointer ">
                Acepto las condiciones de uso
              </label>
            </div>

            <button type="submit" className="inline-block w-full rounded-2xl bg-gray-900
             text-white px-6 pb-2 pt-2.5 text-lg font-bold"
            >Verificar </button>
          </form>

        </div>
      )}
    </div>
  );
}

export default Form;
