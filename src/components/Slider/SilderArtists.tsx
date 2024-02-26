import Slider from 'react-slick';
import Image from "next/image";

type Colaborador = {
  nombre: string,
  productor: string,
  director: string,
  compositor: string,
  aliveValue: string,
  deathDate: string
}

type WorkArt = {
  nombre: string,
  type: string,
  date: string,

}
interface Props {
  autor: Colaborador[]
  artworks: WorkArt
  edit: (index: number) => void,
  deleteItem: (index: number) => void
}
function SliderArtist({ artworks, autor, edit, deleteItem }: Props) {
  const colaboradores = autor;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {colaboradores.map((colaborador, index) => (
        <div key={index} className="">
          <div className="bg-white rounded-lg shadow-lg p-4 min-h-[130px] flex border border-gray-500 text-sm">
            <div className="flex justify-start flex-initial w-[90%] items-center text-gray-600  ">
              {artworks.type === "audiovisual" ? (
                <div  ><p >Autor: {colaborador.nombre != '' ? colaborador.nombre : 'Autor desconocido'}</p>
                  <p >Productor: {colaborador.productor}</p>
                  <p >Director: {colaborador.director}</p>
                  <p >compositor: {colaborador.compositor !== "" ? `${colaborador.compositor} ` : 'Desconocido'}</p>
                  {colaborador.deathDate !== "" && (<p >Fecha : {colaborador.deathDate}</p>)}</div>
              ) : artworks.type === "institucional" ? (
                <div><p className="text-gray-600 mb-1">Institución / Organización: {colaborador.nombre !== "" ? colaborador.nombre : 'Desconocido'}</p>
                </div>
              ) : (<div >
                <p >Nombre: {colaborador.nombre != '' ? colaborador.nombre : 'Autor desconocido'}</p>
                <p>Estado: {colaborador.aliveValue === "si" ? 'fallecido' : 'Desconocido'} </p>
                {colaborador.deathDate !== "" && (<p >Fecha : {colaborador.deathDate}</p>)}</div>)}
            </div>
            <div className="flex justify-end flex-initial w-[15%]" >
              <div className="p-1  text-sm cursor-pointer" onClick={() => edit(index)}  >
                <Image className="" src="../edit_icon.svg" alt="" width={15} height={15} /></div>
              {artworks.type !== "institucional" && artworks.type !== "audiovisual" && (
                <div className="p-1 text-sm cursor-pointer" onClick={() => deleteItem(index)}>
                  <Image src="../delete.svg" alt="" width={15} height={15} /></div>
              )}
            </div>
          </div>
        </div>
      ))}
    </Slider>
  )
}
export default SliderArtist;