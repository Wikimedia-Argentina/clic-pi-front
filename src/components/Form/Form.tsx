

function Form() {
  return (
    <div>
        <h3 className="font-bold text-center mb-5 text-xl border-b-gray-500 border-b-2 pb-2 text-gray-900">Verifica si la obra es de dominio publico</h3>
     <div
  className="block max-w-md rounded-lg bg-white text-gray-900 border-2 border-gray-400 p-10">
  
  <form className="">
      <div className="flex flex-col mb-6 gap-3" >
    <label className="text-center text-lg  font-bold">Nombre de la obra</label>
      <input
        type="text"
        className="bg-transparent border border-gray-500 rounded-lg p-2" />  
    </div>
    

    <div className="flex flex-col mb-6 gap-3" >
    <label className="text-center text-lg font-bold">Nombre del autor</label>
      <input
        type="text"
        className="bg-transparent border border-gray-500 rounded-lg p-2"/>
    </div>


   <div className="flex gap-2">
   <div className="flex flex-col mb-6 gap-3 w-[50%]" >
    <label className="text-center text-lg font-bold">Fecha creacion</label>

    <div
        className="relative mb-3"
        data-te-datepicker-init
        data-te-inline="true"
        data-te-input-wrapper-init>
    <input
      type="date"
      className=" border border-gray-500 peer block min-h-[auto] w-full rounded-lg bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
      placeholder="Select a date" />
 
</div>
</div>


    <div className="flex flex-col mb-6 gap-3 w-[50%]" >
    <label className="text-center text-lg font-bold">Pais</label>
    <select  className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
      <option selected>Selecciona un pais</option>
      <option value="FR">France</option>
      <option value="US">United States</option>
      <option value="CA">Canada</option>
      <option value="DE">Germany</option>
    </select>
     
    </div>

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
      className="inline-block w-full rounded-2xl  bg-gray-900 text-white px-6 pb-2 pt-2.5 text-lg font-bold"
      >
      Verificar
    </button>
  </form>
</div>
    </div>
  );
}

export default Form;
