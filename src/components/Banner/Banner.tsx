import Image from "next/image";
function Banner() {
    return (
        <div className="xl:h-[300px] xl:px-[100px] px-4 py-10 w-full flex items-center  bg-violet-600 text-white text-start">
            <div className="w-[70%]">
                <h1 className="text-xl">Recursos sobre <span className="font-bold">Divulgación y acceso</span></h1>
                
                <p className="my-10">Recursos relacionados a la visibilización y socialización de diversos materiales (textos, fotografías, documentos) pertenecientes a museos, archivos y bibliotecas en el marco de la cultura libre.</p>
            </div>
            <div className="w-[30%] md:block hidden pl-5 xl:pl-[10%]">
               
                <Image src="/divulgacion-y-acceso.png" alt="IMG " height={200} width={200}/>

              
            </div>
        </div>
    )
}
export default Banner;