import Link from "next/link";
import Image from "next/image";

function HeaderDesktop() {
  return (
    <nav className="h-[90px] bg-white lg:pl-10 w-full flex items-center   z-50 ">
      
      <a href="https://clic.wikimedia.org.ar/" className="min-w-[150px]" rel="home">
      <Image src="https://clic.wikimedia.org.ar/wp-content/themes/clic/build/img/clic-logo.svg" alt="Clic - Cultura Libre Conectada" height={0} width={250} />
      </a>

        <div className=" h-full lg:pl-10 text-[13px]  " ><ul className="flex text-gray-800 h-full   ">
        <li className="lg:ml-4  border-collapse border border-gray-200 xl:pt-4   py-2 px-4 min-w-[170px] " ><a href="" className="flex items-center gap-2 "><Image src="/divulgacion-y-acceso.png" alt="IMG" height={60} width={60}/><div className=" "><p>Recursos sobre</p> <em className="  font-bold">Divulgación y acceso</em></div> </a></li>
        <li className=" border-collapse border border-gray-200 py-2 px-5 xl:pt-4 min-w-[180px]" ><a href="" className="flex items-center gap-2 "><Image src="/divulgacion-y-acceso.png" alt="IMG" height={60} width={60}/><div className=""><p>Recursos sobre</p> <em className="  font-bold">Organizacion y gestion</em></div> </a></li>
        <li className=" border-collapse border border-gray-200 py-2 px-5 xl:pt-4 min-w-[200px]" ><a href="" className="flex items-center gap-2 "><Image src="/divulgacion-y-acceso.png" alt="IMG" height={50} width={60}/><div className=" "><p>Recursos sobre</p> <em className="  font-bold">Digitalizacion y preservacion</em></div> </a></li>
        <li className=" border-collapse border border-gray-200 pt-5 xl:pt-9 px-1 xl:px-3 min-w-[30px] "  ><a href="" className="" ><em className="text-md ">Proponer recursos</em></a></li>
        <li className=" border-collapse border border-gray-200 py-5 xl:pt-9 px-1 xl:px-3 min-w-[30px]" ><a href="" className="" > <em className="text-md ">Agenda colaborativa</em></a></li>
        <li className=" border-collapse border border-gray-200 py-5 xl:pt-9 px-1 xl:px-3 min-w-[30px] " ><a href="" className="" ><em className="text-md ">Quienes somos</em></a></li>
        </ul></div> 

    </nav>
  );
}

export default HeaderDesktop;
