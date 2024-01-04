import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

function HeaderMobile() {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <nav className="h-16 lg:hidden w-full flex items-center justify-between font-serif bg-white text-gray-700">
        <a href="https://clic.wikimedia.org.ar/" className="min-w-[150px]" rel="home">
          <Image src="https://clic.wikimedia.org.ar/wp-content/themes/clic/build/img/clic-logo.svg" alt="Clic - Cultura Libre Conectada" height={0} width={250} />
        </a>

        <div className="md:mr-4 mx-2">
          <button
            onClick={handleMenuToggle}
            className="focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              {showMenu ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>
      {showMenu && (
        <div className="lg:hidden bg-white  text-black text-center py-2">
          <ul className="">
            <li className="py-4 ">
              <a href="" className=" justify-center flex items-center gap-2 "><Image src="/divulgacion-y-acceso.png" alt="IMG" height={60} width={60} /><div className=" "> <em className="  font-bold">Sobre nosotros</em></div> </a>
            </li>
            <li className="py-4">
              <a href="" className=" justify-center flex items-center gap-2 "><Image src="/divulgacion-y-acceso.png" alt="IMG" height={60} width={60} /><div className=" "><em className="  font-bold">Acceso a la cultura</em></div> </a>
            </li>
            <li className="py-4">
              <a href="" className=" justify-center flex items-center gap-2 "><Image src="/divulgacion-y-acceso.png" alt="IMG" height={60} width={60} /><div className=" "> <em className="  font-bold">Proyectos Wikimedia</em></div> </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default HeaderMobile;
