import { useEffect, useState } from "react";
import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";

function Header() {
  // const scrolling = useScrollDetection();
  // const headerClass = scrolling ? "mix-blend-difference" : "" ${headerClass};

  return (
    <div className={`text-white `}>
      <div className="block  lg:hidden">
        <HeaderMobile />
      </div>
      <div className="hidden lg:block">
        <HeaderDesktop />
      </div>
    </div>
  );
}

export default Header;

function useScrollDetection() {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrolling;
}
