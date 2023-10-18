import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <div>
      <footer className="w-full bg-white text-blue-950 p-10 text-center">
        
        {/* <Image src="https://clic.wikimedia.org.ar/wp-content/themes/clic/build/img/logo-wikimedia-argentina-h.svg" alt="Wikimedia Argentina"
          height={200}
          width={200}/> */}
        <p className=" mt-5 text-sm">Esta obra está bajo una Licencia Creative Commons Atribución 4.0 Internacional.</p>
       
      </footer>
    </div>
  );
}

export default Footer;

