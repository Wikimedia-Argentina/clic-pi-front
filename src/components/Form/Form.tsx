
function Form() {
  return (
    <div>
     <div
  className="block max-w-md rounded-lg bg-white text-gray-500 border-2 border-gray-400 p-10">
  <form>
      <div className="flex flex-col mb-6 gap-3" >
    <label className="text-center text-lg  font-bold">Nombre de la obra</label>
      <input
        type="text"
        className="bg-transparent border-2 border-gray-500 rounded-lg p-2" />  
    </div>
    

    <div className="flex flex-col mb-6 gap-3" >
    <label className="text-center text-lg font-bold">Nombre del autor</label>
      <input
        type="text"
        className="bg-transparent border-2 border-gray-500 rounded-lg p-2"/>
    </div>


    <div className="flex flex-col mb-6 gap-3" >
    <label className="text-center text-lg font-bold">Pais</label>
      <input
        type="text"
        className="bg-transparent border-2 border-gray-500 rounded-lg p-2"/>
    </div>

  
    <div
      className="mb-6 flex min-h-[1.5rem] items-center justify-center pl-[1.5rem]">
      <input
        className="relative float-left -ml-[1.5rem] mr-[6px] h-[1.125rem] "
        type="checkbox"
         />
      <label
        className="inline-block pl-[0.15rem] hover:cursor-pointer ">
        Acepto las condiciones de uso
      </label>
    </div>

   
    <button
      type="submit"
      className="inline-block w-full rounded  bg-gray-700 text-white px-6 pb-2 pt-2.5 text-lg font-bold"
      >
      Verificar
    </button>
  </form>
</div>
    </div>
  );
}

export default Form;
