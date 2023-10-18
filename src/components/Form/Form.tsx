import countries from "i18n-iso-countries";
import { useState } from "react";
import UnknowStatus from "../artworkStatus/UnknowStatus";
import IsPublicDomain from "../artworkStatus/IsPublicDomain";
import NotPublicDomain from "../artworkStatus/NotPublicDomain";
import React, { Component } from "react";
import Slider from 'react-slick';
import Swal from 'sweetalert2'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { constants } from "buffer";



countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/es.json"));

function Form() {
  const [componentToShow, setComponentToShow] = useState<JSX.Element | null>(null);
  const [addAutor, setAddAutor] = useState(true)
  const [Texto, setTexto] = useState(false);
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [colaboradorActual, setColaboradorActual] = useState<Colaborador>({
    nombre: "",
    apellido: "",
    aliveValue: "no",
    deathDate: "",
    birthday: "",
  });
  const [index, setIndex] = useState<number | null>(null);


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

  };
  const handleAddAutor = () => {
    return (setAddAutor(!addAutor))
  }
  const mostrarTexto = () => {
    return (setTexto(!Texto))
  }
  const [workArt, setWorkArt] = useState<WorkArt>({
    nombre: "",
    type: "cientifica",
    date: "",
    country: ""
  });

  type Colaborador = {
    nombre: string,
    apellido: string,
    aliveValue: string,
    deathDate: string,
    birthday: string
  }
  type WorkArt = {
    nombre: string,
    type: string,
    date: string,
    country: string
  }
  const addColaborador = () => {
    if (
      colaboradorActual.nombre.trim() === "" ||
      colaboradorActual.apellido.trim() === ""
    ) {
      Swal.fire({
        text: 'Por favor, ingresa el nombre y el apellido del colaborador.',
        padding: '1em',
      })
      return;
    }

    if (colaboradorActual.aliveValue === "si" && colaboradorActual.deathDate === "") {
      Swal.fire({
        text: 'Por favor, ingresa la fecha de fallecimiento del colaborador.',
        padding: '1em',
      })
      return;
    }

    if (colaboradorActual.aliveValue === "no" && colaboradorActual.birthday === "") {
      Swal.fire({
        text: 'Por favor, ingresa la fecha de nacimiento del colaborador.',
        padding: '1em',
      })
      return;
    }

    setColaboradores([...colaboradores, colaboradorActual]);
    setColaboradorActual({
      nombre: "",
      apellido: "",
      aliveValue: "no",
      deathDate: "",
      birthday: "",
    });

    handleAddAutor();
  };
  const deleteItem = (index: number) => {

    const newColaboradores = [...colaboradores];
    newColaboradores.splice(index, 1);

    setColaboradores(newColaboradores);
  };
  const saveChanges = (index: number) => {
    if (
      colaboradorActual.nombre.trim() === "" ||
      colaboradorActual.apellido.trim() === ""
    ) {
      Swal.fire({
        text: 'Por favor, ingresa el nombre y el apellido del colaborador.',
        padding: '1em',
      })
      return;
    }

    if (colaboradorActual.aliveValue === "si" && colaboradorActual.deathDate === "") {
      Swal.fire({
        text: 'Por favor, ingresa la fecha de fallecimiento del colaborador.',
        padding: '1em',
      })
      return;
    }

    if (colaboradorActual.aliveValue === "no" && colaboradorActual.birthday === "") {
      Swal.fire({
        text: 'Por favor, ingresa la fecha de nacimiento del colaborador.',
        padding: '1em',
      })
      return;
    }
    const newColaboradores = [...colaboradores];
    newColaboradores[index] = colaboradorActual;
    setColaboradores(newColaboradores)
    setColaboradorActual({
      nombre: "",
      apellido: "",
      aliveValue: "no",
      deathDate: "yyyy-dd-mm",
      birthday: "yyyy-dd-mm",
    });
    setIndex(null)
    handleAddAutor()
  }
  const edit = (index: number) => {
    const selectedColaborador = colaboradores[index];
    setColaboradorActual(selectedColaborador);
    setIndex(index)
    handleAddAutor();

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

  function convertirFechas(stringsFechas: string[]): Date[] {
    const fechasConvertidas: Date[] = stringsFechas.map(fecha => {
      const fechaUTC = new Date(fecha + "T00:00:00Z");
      const offset = fechaUTC.getTimezoneOffset();
      return new Date(fechaUTC.getTime() + offset * 60 * 1000);
    });
    return fechasConvertidas;
  }


  function findClosestDate(dates: string[]): Date | null {
    if (dates.length !== 0) {
      const today: Date = new Date();
      const convertedDates: Date[] = convertirFechas(dates);

      const validDates: Date[] = convertedDates.filter((date) => {
        const parsedDate: Date = new Date(date);
        return !isNaN(parsedDate.getTime());
      });

      if (validDates.length === 0) {
        return null;
      }

      let closestDate: Date = validDates[0];
      let minDifference: number = Math.abs(closestDate.getTime() - today.getTime());

      for (const date of validDates) {
        const difference: number = Math.abs(date.getTime() - today.getTime());
        if (difference < minDifference) {
          closestDate = date;
          minDifference = difference;
        }
      }

      return closestDate;
    }

    return null;
  }

  function determineDomain(number: number) {
    const today = new Date();
    if (colaboradores.length > 0) {
      const lastDate = findClosestDate(colaboradores.map(item => item.deathDate))
      if (lastDate) {
        const yearsDifference = (today.getFullYear() - lastDate.getFullYear())
        if (yearsDifference >= number) {
          setComponentToShow(<IsPublicDomain title={workArt.nombre} autor={colaboradores} />);
        } else {
          setComponentToShow(<NotPublicDomain title={workArt.nombre} autor={colaboradores}/>);
        }
      } else {
        setComponentToShow(<NotPublicDomain title={workArt.nombre} autor={colaboradores} />);
      }
    }
  }
  function determinePublication(number: number) {
    const today = new Date();
    const emisionDate: string[] = workArt.date.split("-")
    const year = parseInt(emisionDate[0])
    const yearsDifference = today.getFullYear() - year
    if (yearsDifference >= number) {
      setComponentToShow(<IsPublicDomain title={workArt.nombre} autor={colaboradores}/>)
    } else {
      setComponentToShow(<NotPublicDomain title={workArt.nombre} autor={colaboradores} />);
    }
  }


  const handleButtonClick  = (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Previene la recarga de la página
    if (colaboradores.length === 0) {
      Swal.fire({
        text: 'Por favor, ingresa al menos un autor',
        padding: '1em',
      });
    } else {
      const type = workArt.type
    if (workArt.country == "Argentina") {
      if (type === "cientifica" || type === "literaria" || type === "artistica" || type === "colaboraciones") {
        determineDomain(70);
      } else if (type === "emisiones" || type === "anonimas") {
        determinePublication(50)
      } else if (type === "cartas") {
        determineDomain(20)
      } else if (type === "audiovisual") {
        determineDomain(50)
      } else if (type === "fotografia") {
        determinePublication(20)
      }
    } else {
      setComponentToShow(<UnknowStatus title={workArt.nombre} autor={colaboradores}  />);

    }
    
    }
  }

  return (
    <div>

      {componentToShow ? (
        <div>{componentToShow}</div>
      ) : (
        <div className="">
          <h3 className="font-bold text-center mb-5 text-xl border-b-gray-500 border-b-2 pb-2 text-gray-900">Verifica si la obra es de dominio publico</h3>

          <form className="block max-w-md rounded-lg bg-white text-gray-900 border-2 border-gray-400 p-10" onSubmit={handleButtonClick}  >
            <div className="flex gap-2">
              <div className="flex flex-col mb-6 gap-3 w-[50%]" >
                <label className="text-center text-md  font-bold">Nombre de la obra</label>
                <input
                  type="text"
                  className="bg-transparent border border-gray-500 rounded-lg p-2" required name="nameObra" value={workArt.nombre}
                  onChange={(e) => setWorkArt({
                    ...workArt,
                    nombre: e.target.value
                  })} />
              </div>
              <div className="flex flex-col mb-6 gap-3 w-[50%] ">
                <label className="text-center text-md font-bold">Tipo : </label>
                <select required className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " value={workArt.type}
                  onChange={(e) => setWorkArt({
                    ...workArt,
                    type: e.target.value
                  })}>
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

            <div className="flex gap-2">
              <div className="flex flex-col mb-6 gap-3 w-[50%]" >
                <label className="text-center text-md font-bold">Fecha publicación</label>

                <div
                  className="relative "
                  data-te-datepicker-init
                  data-te-inline="true"
                  data-te-input-wrapper-init>
                  <input
                    type="date" required name="Date" value={workArt.date}
                    onChange={(e) => setWorkArt({
                      ...workArt,
                      date: e.target.value
                    })}
                    className="text-center border border-gray-500 peer block min-h-[auto] w-full rounded-lg bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    placeholder="Selecciona una fecha" />

                </div>
              </div>


              <div className="flex flex-col  gap-3 w-[50%]" >

                <label className="text-center font-bold">Pais</label>

                <select required className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full " value={workArt.country}
                  onChange={(e) => setWorkArt({
                    ...workArt,
                    country: e.target.value
                  })}>
                  <option selected>Selecciona un pais</option>
                  {Object.values(countries.getNames('es', { select: 'official' })).map((item, index) => (

                    <option value={item} className="" key={index}>{item} </option>
                  ))}

                </select>

              </div>

            </div>

         
            {addAutor ? (
              
              <div className="slide">
            <div className=" text-center m-4"> 
            <label className="  font-bold " htmlFor="">Datos del autor  </label>
            </div>
                <div className="flex gap-3 mt-3">
                  <div className="flex flex-col mb-6 gap-3 w-[50%]"  >
                    <label className="text-center " >Nombre </label>
                    <input
                      onChange={(e) =>
                        setColaboradorActual({
                          ...colaboradorActual,
                          nombre: e.target.value,
                        })
                      }
                      className="bg-transparent border border-gray-500 rounded-lg p-2"
                      required
                      value={colaboradorActual.nombre} />
                  </div>
                  <div className="flex flex-col mb-6 gap-3 w-[50%]"  >
                    <label className="text-center " >Apellido </label>
                    <input
                      onChange={(e) =>
                        setColaboradorActual({
                          ...colaboradorActual,
                          apellido: e.target.value,
                        })
                      }
                      className="bg-transparent border border-gray-500 rounded-lg p-2"
                      required
                      value={colaboradorActual.apellido} />
                  </div>

                </div>

                <div className="flex gap-3 ">
                  <div className="flex flex-col mb-6 gap-3 w-[50%]" >
                    <label className="text-center " >Fallecido</label>
                    <select required className="bg-gray-50 border text-center border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={colaboradorActual.aliveValue} onChange={(e) => setColaboradorActual({
                      ...colaboradorActual,
                      aliveValue: e.target.value,
                    })
                    } >
                      <option selected value="no">no</option>
                      <option value="si">si</option>
                    </select>
                  </div>
                  {colaboradorActual.aliveValue === "si" ? (

                    <div className="flex flex-col mb-6 gap-3 w-[50%]" >
                      <label className="text-center " >Fecha deceso</label>
                      <div
                        className="relative mb-3"
                        data-te-datepicker-init
                        data-te-inline="true"
                        data-te-input-wrapper-init>
                        <input
                          type="date" required name="deathDate" value={colaboradorActual.deathDate} onChange={(e) => setColaboradorActual({
                            ...colaboradorActual,
                            deathDate: e.target.value,
                          })}
                          className=" border text-center border-gray-500 peer block min-h-[auto] w-full rounded-lg bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                          placeholder="Selecciona una fecha" />
                      </div>
                    </div>

                  ) : (
                    <div className="flex flex-col mb-6 gap-3 w-[50%]" >
                      <label className="text-center " >Fecha nacimiento</label>
                      <div
                        className="relative mb-3"
                        data-te-datepicker-init
                        data-te-inline="true"
                        data-te-input-wrapper-init>
                        <input
                          type="date" required value={colaboradorActual.birthday} onChange={(e) => setColaboradorActual({
                            ...colaboradorActual,
                            birthday: e.target.value,
                          })}
                          className="text-center border border-gray-500 peer block min-h-[auto] w-full rounded-lg bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                          placeholder="Selecciona una fecha" />
                      </div>
                    </div>
                  )}

                </div>
                <div className="flex justify-center mb-10 gap-2" >
                  {index !== null ? (
                    <div className="p-2 cursor-pointer rounded-lg border text-sm border-gray-500" onClick={() => saveChanges(index)}>confirmar</div>
                  ) : (
                    <div className="p-2 cursor-pointer rounded-lg border text-sm border-gray-500" onClick={addColaborador}>confirmar</div>
                  )}
                    <div className="p-2 cursor-pointer rounded-lg border text-sm border-gray-500" onClick={colaboradores.length > 0 ? handleAddAutor : undefined}>cancelar</div>
                </div>
              </div>
            ) : (

              <div className="mx-auto w-[350px] mb-10">
                   <div className="flex mb-4 relative mt-4"> {Texto && (
              <div onClick={mostrarTexto} className="absolute  top-0 left-[15%] z-50 text-center p-3 cursor-pointer  bg-white text-sm w-[270px] rounded-2xl border border-gray-500 shadow">
                Se considerará al colaborador con fecha más reciente.

              </div>
            )}<label className=" text-center flex-initial w-[100%]  font-bold " htmlFor="">Datos del autor  </label>
             <div className="flex flex-initial w-[5%]">
             <div className="cursor-pointer pr-2 font-bold text-md" onClick={handleAddAutor} >+</div>

                <div
                  className="cursor-pointer inline-block font-bold "
                  onClick={mostrarTexto}
                >
                  ?
                </div>
             </div>
            </div>
                <Slider {...settings}>
                  {colaboradores.map((colaborador, index) => (
                    <div key={index} className="">
                      <div className="bg-white rounded-lg shadow-lg p-4 min-h-[150px] border border-gray-500 text-sm">
                        <div className="flex mb-1"> <h2 className="text-lg flex-initial w-[80%] text-gray-800 ">Nombre: {colaborador.nombre} </h2> <div className="flex justify-center  flex-initial min-w-[60px]" >

                          <div className="p-1  text-sm cursor-pointer" onClick={() => edit(index)}  ><img className="" src="../edit_icon.svg" alt="" width={15} /></div>
                          <div className="p-1 text-sm cursor-pointer" onClick={() => deleteItem(index)}><img src="../delete.svg" alt="" width={15} /></div>
                        </div></div>
                        <h3 className="text-gray-600 mb-1">Apellido: {colaborador.apellido}</h3>
                        <p className="text-gray-600 mb-1 ">Estado: {colaborador.aliveValue === "si" ? 'fallecido' : 'vivo'} </p>
                        <p className="text-gray-600 mb-1">Fecha : {colaborador.deathDate !== "" ? colaborador.deathDate : colaborador.birthday}</p>

                      </div>

                    </div>
                  ))}
                </Slider>
              </div>

            )}











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
