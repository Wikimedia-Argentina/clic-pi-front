import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <div>
      <footer className="w-full bg-white text-blue-950">
        <div className="mx-4 md:mx-8 lg:mx-48 py-6 md:py-10 lg:py-14 flex flex-col md:flex-row justify-around">
          <div className="md:w-1/6 py-10 md:py-3 leading-10">
            <h3 className="flex flex-row text-xl font-bold my-3">Corvus</h3>
            <h4>Corvus</h4>
            <div className="flex flex-row py-3">
              <Image
                src="/icon-linkedin.svg"
                alt=""
                width={32}
                height={32}
              ></Image>
              <Image
                src="/icon-facebook-messenger.svg"
                alt=""
                width={32}
                height={32}
              ></Image>

              <Image
                src="/icon-whatsapp.svg"
                alt=""
                width={32}
                height={32}
              ></Image>
            </div>
          </div>
          <div className="md:w-1/6 flex-col py-10 md:py-3 leading-10">
            <h3 className="text-lg font-bold my-3">Empresa</h3>
            <nav>
              <ol>
                <li>
                  <Link href="/">Sobre nosotros</Link>
                </li>
                <li className="">
                  <Link href="/">Condiciones</Link>
                </li>
                <li className="">
                  <Link href="/">Privacidad</Link>
                </li>
              </ol>
            </nav>
          </div>
          <div className="md:w-2/6 w-4/6 flex flex-col">
            <h3 className="py-5 md:py-3 text-lg font-bold my-2">
              Sumate a nuestro Newsletter
            </h3>
            <div className="flex items-stretch">
              <input
                className="w-4/5 p-3 bg-gray-100 rounded-lg rounded-r-none dark:bg-gray-300 text-base leading-none text-gray-800 dark:text-white border border-transparent focus:outline-none focus:border-gray-500"
                type="email"
                placeholder="Correo"
              />
              <button className="w-32 p-3 rounded-l-none hover:bg-red-400 bg-red-500 rounded text-base font-medium leading-none text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Suscribirse
              </button>
            </div>

            {/* <div className="flex">
							<input
								type="text"
								placeholder="Correo"
								className="flex-grow bg-slate-300 h-10 p-3 text-gray-900 focus:outline-none md:text-base font-bold"
							/>
							<Link className="py-2 h-10 px-6 text-sm bg-red-500 rounded-md text-white" href="/search">
								Suscribirse
							</Link>
						</div> */}
          </div>
        </div>
        <hr className="md:mx-60 mx-2 my-2 border-b-slate-400" />
        <div className="mx-2 py-12 flex content-center justify-center">
          <h3 className="flex-col">
            Copyright @ KhemLabs S.R.L. 2023. All Rights Reserved.
          </h3>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

{
  /* <input type="text" placeholder="Buscar actividad" className="my-1 p-4 w-full" />; */
}
