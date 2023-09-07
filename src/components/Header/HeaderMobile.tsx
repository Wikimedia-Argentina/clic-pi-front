import { useState } from "react";
import Link from "next/link";

function HeaderMobile() {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <nav className="h-16 lg:hidden w-full flex items-center justify-between font-serif text-white">
        <div className="lg:ml-4 mx-2 text-xl font-bold">Corvus</div>

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
        <div className="lg:hidden bg-white bg-opacity-50 text-white text-center py-2">
          <ul className="space-y-2">
            <li className=" hover:text-gray-600">
              <Link href="#">Home</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default HeaderMobile;
