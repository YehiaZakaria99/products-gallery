import React, { useEffect } from "react";
import { cn } from "../../lib/utils";
import { NavLink } from "react-router";

export default function NavbarMobile({ navItems, isMenuOpen, setIsMenuOpen }) {
  return (
    <>
      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden ease-in-out  text-green-800 px-5 rounded-md",
          isMenuOpen
            ? "max-h-[1000px] opacity-100 py-4 pointer-events-auto"
            : "max-h-0 opacity-0 py-0 pointer-events-none",
          "transition-all duration-300"
        )}
      >
        <div className=" text-center text-lg font-bold text-primary">
          {navItems.map((item, index) => (
            <div className="relative" key={index}>
              <NavLink
                aria-label={item.name}
                key={index}
                to={item.to}
                className="hover:text-hover transition duration-300 py-4 inline-flex"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
