import { useState, useEffect } from "react";
import IsPublicDomain from "../artworkStatus/IsPublicDomain";
import NotPublicDomain from "../artworkStatus/NotPublicDomain";
import React, { Component } from "react";
import Swal from "sweetalert2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import DescriptionModal from "../Modal";
import SliderArtist from "../Slider";
import Label from "./Label";
import ModalWarning from "../Modal/ModalWarning";

function Form() {
  var text =
    "Esta obra es huérfana. Sin embargo, por su fecha de publicación, se considera que el autor ha fallecido hace más de 70 años y, por ende, se encuentra en dominio público";
  const [componentToShow, setComponentToShow] = useState<JSX.Element | null>(
    null,
  );
  const [addAutor, setAddAutor] = useState(true);
  const [Texto, setTexto] = useState(false);
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [index, setIndex] = useState<number | null>(null);
  const [PublicationDate, setPublicationDate] = useState("");
  const [colaboradorActual, setColaboradorActual] = useState<Colaborador>({
    nombre: "",
    aliveValue: "",
    deathDate: "",
    compositor: "",
    director: "",
    productor: "",
  });
  const [workArt, setWorkArt] = useState<WorkArt>({
    nombre: "",
    type: "",
    date: "",
    visualFormat: false,
  });

  type Colaborador = {
    nombre: string;
    productor: string;
    director: string;
    compositor: string;
    aliveValue: string;
    deathDate: string;
  };
  type WorkArt = {
    nombre: string;
    type: string;
    date: string;
    visualFormat: boolean;
  };

  const handlePublicationDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPublicationDate(e.target.value);
  };
  const handleAddAutor = () => {
    if (workArt.type != "") {
      return setAddAutor(!addAutor);
    } else {
      Swal.fire({
        text: "Por favor, Selecciona un tipo de obra.",
        padding: "1em",
      });
    }
  };
  const mostrarTexto = () => {
    return setTexto(!Texto);
  };

  const addColaborador = () => {
    if (
      colaboradorActual.aliveValue === "si" &&
      colaboradorActual.deathDate === ""
    ) {
      Swal.fire({
        text: "Por favor, ingresa la fecha de fallecimiento del colaborador.",
        padding: "1em",
      });
      return;
    }
    if (
      (colaboradorActual.aliveValue === "si" &&
        colaboradorActual.nombre === "") ||
      (workArt.type === "audiovisual" &&
        (colaboradorActual.productor === "" ||
          colaboradorActual.director === "" ||
          colaboradorActual.nombre === ""))
    ) {
      Swal.fire({
        text: "Por favor, llena los datos",
        padding: "1em",
      });
      return;
    }
    if (
      workArt.type !== "institucional" &&
      colaboradorActual.aliveValue === ""
    ) {
      Swal.fire({
        text: "Por favor, elige una opción.",
        padding: "1em",
      });
      return;
    }

    if (workArt.type != "") {
      setColaboradores([...colaboradores, colaboradorActual]);
    }
    setColaboradorActual({
      nombre: "",
      aliveValue: "",
      deathDate: "",
      compositor: "",
      director: "",
      productor: "",
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
      colaboradorActual.aliveValue === "si" &&
      colaboradorActual.deathDate === ""
    ) {
      Swal.fire({
        text: "Por favor, ingresa la fecha de fallecimiento del colaborador.",
        padding: "1em",
      });
      return;
    }

    const newColaboradores = [...colaboradores];
    newColaboradores[index] = colaboradorActual;
    setColaboradores(newColaboradores);
    setColaboradorActual({
      nombre: "",
      aliveValue: "",
      deathDate: "",
      compositor: "",
      director: "",
      productor: "",
    });
    setIndex(null);
    handleAddAutor();
  };
  const edit = (index: number) => {
    const selectedColaborador = colaboradores[index];
    let updatedColaborador = { ...selectedColaborador, aliveValue: "" };
    setColaboradorActual(updatedColaborador);

    setIndex(index);
    handleAddAutor();
  };
  const cancel = () => {
    handleAddAutor();
    setColaboradorActual({
      nombre: "",
      aliveValue: "",
      deathDate: "",
      compositor: "",
      director: "",
      productor: "",
    });
  };
  const [showTypeArt, setShowTypeArt] = useState(false);

  const handleShowTypeArt = () => {
    setShowTypeArt(true);
  };

  const handleCloseTypeArt = () => {
    setShowTypeArt(false);
  };

  function convertirFechas(stringsFechas: string[]): Date[] {
    const fechasConvertidas: Date[] = stringsFechas.map((fecha) => {
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
      let minDifference: number = Math.abs(
        closestDate.getTime() - today.getTime(),
      );

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
  function name() {
    return colaboradores.find((colaborador) => colaborador.nombre === "");
  }
  function determineDomain(number: number) {
    const today = new Date();
    if (
      name() &&
      workArt.type !== "fotografía" &&
      workArt.type !== "institucional" &&
      parseInt(workArt.date.split("-")[0]) < 1900
    ) {
      return setComponentToShow(
        <IsPublicDomain autor={colaboradores} artworks={workArt} text={text} />,
      );
    }
    if (colaboradores.length > 0) {
      const lastDate = findClosestDate(
        colaboradores.map((item) => item.deathDate),
      );
      if (lastDate) {
        const yearsDifference = today.getFullYear() - lastDate.getFullYear();
        if (yearsDifference >= number) {
          setComponentToShow(
            <IsPublicDomain autor={colaboradores} artworks={workArt} />,
          );
        } else {
          setComponentToShow(
            <NotPublicDomain autor={colaboradores} artworks={workArt} />,
          );
        }
      } else {
        setComponentToShow(
          <NotPublicDomain autor={colaboradores} artworks={workArt} />,
        );
      }
    }
  }

  function determinePublication(number: number) {
    if (
      name() &&
      workArt.type !== "fotografía" &&
      workArt.type !== "institucional" &&
      parseInt(workArt.date.split("-")[0]) < 1900
    ) {
      return setComponentToShow(
        <IsPublicDomain autor={colaboradores} artworks={workArt} text={text} />,
      );
    }
    const today = new Date();
    const emisionDate: string[] = workArt.date.split("-");
    const year = parseInt(emisionDate[0]);
    const yearsDifference = today.getFullYear() - year;
    if (yearsDifference >= number) {
      setComponentToShow(
        <IsPublicDomain autor={colaboradores} artworks={workArt} />,
      );
    } else {
      setComponentToShow(
        <NotPublicDomain autor={colaboradores} artworks={workArt} />,
      );
    }
  }

  const handleButtonClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (colaboradores.length === 0) {
      Swal.fire({
        text: "Por favor, ingresa al menos un autor",
        padding: "1em",
      });
    } else {
      const type = workArt.type;
      if (
        type === "científica" ||
        type === "literaria" ||
        type === "artística" ||
        type === "colaboraciones"
      ) {
        determineDomain(70);
      } else if (type === "emisiones" || type === "institucional") {
        determinePublication(50);
      } else if (type === "cartas") {
        determineDomain(20);
      } else if (type === "audiovisual") {
        determineDomain(50);
      } else if (type === "fotografía") {
        determinePublication(20);
      } else if (type === "interpretacionArtistica") {
        if (workArt.visualFormat) {
          determinePublication(70);
        } else {
          <NotPublicDomain autor={colaboradores} artworks={workArt} />;
        }
      }
    }
  };

  const handleTypeChange = (e: any) => {
    if (workArt.type === "") {
      setWorkArt({
        ...workArt,
        type: e.target.value,
      });
    } else {
      Swal.fire({
        title: "Cambio de tipo",
        text: "Deberás volver a llenar todos los campos",
        icon: "warning",
        showCloseButton: true,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Continuar',
      });
      setWorkArt({
        nombre: "",
        type: e.target.value,
        date: "",
        visualFormat: false,
      });
      setColaboradorActual({
        nombre: "",
        aliveValue: "",
        deathDate: "",
        compositor: "",
        director: "",
        productor: "",
      });
      setAddAutor(true);
      setColaboradores([]);
      setPublicationDate("");
    }
  };

  return (
    <div className=" ">
      {componentToShow ? (
        <div>{componentToShow}</div>
      ) : (
        <div className="px-5">
          <h3 className=" font-bold text-center mb-5 text-xl border-b-gray-500 border-b-2 pb-2 text-gray-900">
            Verifica si la obra es de dominio publico
          </h3>

          <form
            className="block  rounded-lg bg-white text-gray-900 border-2 border-gray-400 p-10"
            onSubmit={handleButtonClick}
          >
            <div className="flex gap-2 justify-center">
              <div className="flex flex-col mb-6 gap-3 w-[50%] ">
                <label className="text-center text-md  font-bold">
                  Nombre de la obra
                </label>
                <input
                  type="text"
                  className="bg-transparent border border-gray-500 rounded-lg p-2"
                  required
                  name="nameObra"
                  value={workArt.nombre}
                  onChange={(e) =>
                    setWorkArt({
                      ...workArt,
                      nombre: e.target.value,
                    })
                  }
                />
              </div>
              {showTypeArt && (
                <DescriptionModal handleCloseTypeArt={handleCloseTypeArt} />
              )}
              <div className="flex flex-col mb-6 gap-3 w-[50%] ">
                <div className="flex justify-center">
                  {" "}
                  <label className="text-center text-md font-bold w-[80%]">
                    Tipo{" "}
                  </label>{" "}
                  <Image
                    className=" cursor-pointer"
                    src="../question.svg"
                    alt="question.svg"
                    height={22}
                    width={22}
                    onClick={handleShowTypeArt}
                  />
                </div>
                <select
                  required
                  className="bg-gray-50 text-center border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  value={workArt.type}
                  onChange={handleTypeChange}
                >
                  <option value="">Tipo de obra: </option>
                  <option value="literaria">Literaria </option>
                  <option value="científica">Científica</option>
                  <option value="artística">Artística </option>
                  <option value="fotografía">Fotografía </option>
                  <option value="audiovisual">Audiovisual</option>
                  <option value="emisiones">Emision radiofónica</option>
                  <option value="institucional">Institucional </option>
                  <option value="colaboraciones">Colaboración </option>
                  <option value="cartas">Carta </option>
                  <option value="interpretacionArtistica">
                    {" "}
                    interpretación artística{" "}
                  </option>
                </select>
              </div>
            </div>
            {workArt.type === "interpretacionArtistica" && (
              <div>
                {" "}
                <p className="text-center">
                  ¿La obra está en un formato sonoro o audiovisual?
                </p>
                <div className="flex justify-center gap-6 my-4">
                  <label>
                    <input
                      className="m-2"
                      type="radio"
                      name="formato"
                      value="si"
                      checked={workArt.visualFormat === true}
                      onChange={(e) =>
                        setWorkArt({
                          ...workArt,
                          visualFormat: true,
                        })
                      }
                    />{" "}
                    Sí
                  </label>
                  <label>
                    <input
                      className="m-2"
                      type="radio"
                      name="formato"
                      value="no"
                      checked={workArt.visualFormat === false}
                      onChange={(e) =>
                        setWorkArt({
                          ...workArt,
                          visualFormat: false,
                        })
                      }
                    />{" "}
                    No
                  </label>
                </div>
              </div>
            )}

            {PublicationDate === "" && (
              <div className="mb-2">
                <p className="text-center ">¿Sabes la fecha de publicación? </p>
                <fieldset className="flex justify-center gap-6 my-3">
                  <div className="">
                    <input
                      type="radio"
                      id="Si"
                      name="respuesta"
                      value="Si"
                      onChange={handlePublicationDate}
                    />
                    <label className="p-2" htmlFor="Si">
                      Si
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="No"
                      name="respuesta"
                      value="No"
                      onChange={handlePublicationDate}
                    />
                    <label className="p-2" htmlFor="No">
                      No
                    </label>
                  </div>
                </fieldset>
              </div>
            )}
            {PublicationDate === "Si" && (
              <div className="flex flex-col mb-6 gap-3 w-[100%]">
                <label className="text-center text-md font-bold">
                  Fecha publicación
                </label>
                <div
                  className="relative "
                  data-te-datepicker-init
                  data-te-inline="true"
                  data-te-input-wrapper-init
                >
                  <input
                    type="date"
                    name="Date"
                    value={workArt.date}
                    onChange={(e) =>
                      setWorkArt({
                        ...workArt,
                        date: e.target.value,
                      })
                    }
                    className="text-center border border-gray-500 peer block min-h-[auto] w-full rounded-lg bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    placeholder="Selecciona una fecha"
                  />
                </div>
              </div>
            )}

            {addAutor ? (
              <div>
                <div className="font-bold text-center mt-6">
                  {workArt.type == "colaboraciones"
                    ? "Datos del colaborador"
                    : "Datos del autor"}
                </div>
                {workArt.type === "institucional" ? (
                  <div className="mt-5 gap-3 ">
                    <Label
                      setColaboradorActual={setColaboradorActual}
                      colaborador={colaboradorActual}
                      labelTitle={"Nombre institución"}
                      type={"nombre"}
                    />
                  </div>
                ) : workArt.type === "audiovisual" ? (
                  <div>
                    <div className="flex gap-3 mt-5">
                      <Label
                        setColaboradorActual={setColaboradorActual}
                        colaborador={colaboradorActual}
                        labelTitle={"Autor del Argumento"}
                        type={"nombre"}
                      />
                      <Label
                        setColaboradorActual={setColaboradorActual}
                        colaborador={colaboradorActual}
                        labelTitle={"Productor"}
                        type={"productor"}
                      />
                    </div>

                    <div className="flex gap-3 mt-5">
                      <Label
                        setColaboradorActual={setColaboradorActual}
                        colaborador={colaboradorActual}
                        labelTitle={"Director"}
                        type={"director"}
                      />
                      <Label
                        setColaboradorActual={setColaboradorActual}
                        colaborador={colaboradorActual}
                        labelTitle={"Compositor"}
                        type={"compositor"}
                      />
                    </div>
                  </div>
                ) : (
                  <div className=" mt-3">
                    <Label
                      setColaboradorActual={setColaboradorActual}
                      colaborador={colaboradorActual}
                      labelTitle={"Nombre y Apellido"}
                      type={"nombre"}
                    />
                  </div>
                )}
                {colaboradorActual.aliveValue === "" &&
                  workArt.type !== "institucional" && (
                    <div className="my-6">
                      <label className="text-center justify-center flex ">
                        {workArt.type == "audiovisual"
                          ? "¿Autor del argumento fallecido?"
                          : "¿Autor Fallecido?"}
                      </label>
                      <div className="flex justify-center gap-5 m-3">
                        <div className="">
                          <input
                            type="radio"
                            id="FallecidoSi"
                            name="aliveValue"
                            value="si"
                            onChange={(e) =>
                              setColaboradorActual({
                                ...colaboradorActual,
                                aliveValue: e.target.value,
                              })
                            }
                          />
                          <label className="p-3" htmlFor="Si">
                            Si
                          </label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="FallecidoNo"
                            name="aliveValue"
                            value="no"
                            onChange={(e) =>
                              setColaboradorActual({
                                ...colaboradorActual,
                                aliveValue: e.target.value,
                              })
                            }
                          />
                          <label className="p-3" htmlFor="No">
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                {colaboradorActual.aliveValue === "si" && (
                  <div className="flex flex-col my-6  w-[100%]">
                    <label className="text-center p-1">Fecha deceso</label>
                    <div
                      className="relative mb-3"
                      data-te-datepicker-init
                      data-te-inline="true"
                      data-te-input-wrapper-init
                    >
                      <input
                        type="date"
                        required
                        name="deathDate"
                        value={colaboradorActual.deathDate}
                        onChange={(e) =>
                          setColaboradorActual({
                            ...colaboradorActual,
                            deathDate: e.target.value,
                          })
                        }
                        className=" border text-center border-gray-500 peer block min-h-[auto] w-full rounded-lg bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        placeholder="Selecciona una fecha"
                      />
                    </div>
                  </div>
                )}
                <div className="flex justify-center gap-2 my-9">
                  {index !== null ? (
                    <div
                      className="p-2 cursor-pointer rounded-lg border text-sm border-gray-500"
                      onClick={() => saveChanges(index)}
                    >
                      confirmar
                    </div>
                  ) : (
                    <div
                      className="p-2 cursor-pointer rounded-lg border text-sm border-gray-500"
                      onClick={addColaborador}
                    >
                      confirmar
                    </div>
                  )}
                  <div
                    className="p-2 cursor-pointer rounded-lg border text-sm border-gray-500"
                    onClick={colaboradores.length > 0 ? cancel : undefined}
                  >
                    cancelar
                  </div>
                </div>
              </div>
            ) : (
              <div className="mx-auto w-[350px] my-8">
                {Texto && <ModalWarning mostrarTexto={mostrarTexto} />}
                <div className="flex mb-4 relative mt-4">
                  {workArt.type == "colaboraciones" ? (
                    <div className="flex">
                      <label className=" text-center flex-auto w-80 font-bold ">
                        Añadir colaborador
                      </label>

                      <div className="absolute flex right-0  gap-3">
                        <Image
                          className=" cursor-pointer"
                          src="../add.svg"
                          alt="add.svg"
                          height={20}
                          width={19}
                          onClick={handleAddAutor}
                        />
                        <Image
                          className=" cursor-pointer"
                          src="../question.svg"
                          alt="question.svg"
                          height={22}
                          width={22}
                          onClick={mostrarTexto}
                        />
                      </div>
                    </div>
                  ) : (
                    <label className=" text-center w-[100%] font-bold ">
                      Datos autor
                    </label>
                  )}
                </div>
                <SliderArtist
                  edit={edit}
                  deleteItem={deleteItem}
                  artworks={workArt}
                  autor={colaboradores}
                />
              </div>
            )}
            <div className="mb-6 flex min-h-[1.5rem] items-center justify-center pl-[1.5rem]">
              <input
                required
                className="relative float-left -ml-[1.5rem] mr-[6px] h-[1.125rem] "
                type="checkbox"
              />
              <label className="inline-block pl-[0.15rem] hover:cursor-pointer ">
                Acepto las condiciones de uso
              </label>
            </div>

            <button
              type="submit"
              className="inline-block w-full rounded-2xl bg-gray-900
             text-white px-6 pb-2 pt-2.5 text-lg font-bold"
            >
              Verificar{" "}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Form;
