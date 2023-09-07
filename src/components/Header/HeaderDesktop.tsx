import Link from "next/link";

function HeaderDesktop() {
  return (
    <nav className="h-20 lg:pl-60 w-full flex items-center justify-between font-serif z-50 border-blue-500 border-2">
      <div className="lg:ml-4 mx-2 text-xl font-bold">
        <Link href="/">Corvus</Link>
      </div>

      <div className="md:mr-24 mx-2">
        <ul className="flex space-x-14">
          <li className=" hover:text-gray-300">
            <Link href="/">Home</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default HeaderDesktop;
