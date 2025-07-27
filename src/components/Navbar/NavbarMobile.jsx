import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";
import { NavLink } from "react-router";

export default function NavbarMobile({ navItems, isMenuOpen, setIsMenuOpen }) {
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) {
      document.addEventListener("pointerdown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [isMenuOpen, setIsMenuOpen]);

  return (
    <div
      ref={menuRef}
      role="menu"
      // aria-hidden={!isMenuOpen}
      className={cn(
        "fixed top-0 left-0 w-full h-screen bg-navbar lg:hidden flex flex-col items-center justify-center transition-transform duration-300 ease-in-out z-40",
        isMenuOpen
          ? "translate-x-0 opacity-100"
          : "-translate-x-100 opacity-0 pointer-events-none",
          "text-center text-xl font-bold text-primary space-y-8"
      )}
    >
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            aria-label={item.name}
            to={item.to}
            className="hover:text-hover transition duration-300 text-textColor"
            onClick={() => setIsMenuOpen(false)}
          >
            {item.name}
          </NavLink>
        ))}
    </div>
  );
}
