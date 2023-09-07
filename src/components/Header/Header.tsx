import { useEffect, useState } from "react";
import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";

function Header() {
  const scrolling = useScrollDetection();
  const headerClass = scrolling ? "mix-blend-difference" : "";

  return (
    <div className={`text-white ${headerClass}`}>
      <div className="block md:hidden">
        <HeaderMobile />
      </div>
      <div className="hidden md:block">
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
