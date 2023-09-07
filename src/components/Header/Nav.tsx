import React, { useState, useEffect } from "react";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarClass = scrolled ? "bg-gray-500" : "bg-transparent";

  return (
    <nav className={`fixed top-0 left-0 right-0 p-4 transition ${navbarClass}`}>
      <div className="container mx-auto">
        <a href="#" className="text-white font-bold text-xl">
          Logo
        </a>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Home
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
