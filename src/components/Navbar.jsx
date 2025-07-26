import React, { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { NavLink } from "react-router";
import { ListIcon, XIcon } from "@phosphor-icons/react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", to: "" },
    { name: "Products", to: "products" },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-[9999999999999999999] transition-all duration-300",
          isScrolled
            ? "bg-white backdrop-blur-md shadow-md py-3"
            : "bg-white py-5 shadow-xl"
        )}
      >
        <div className="container flex items-center justify-between flex-wrap px-10">
          {/* Logo */}
          <NavLink to="" className="flex items-center z-50 ">
            {/* <img src={logo} alt="Logo" className="md:h-10 h-6 w-auto" /> */}
            <h3 className="md:h-10 h-6 w-auto">Logo</h3>
          </NavLink>

          {/* Desktop */}
          <div className="hidden lg:flex space-x-8 text-lg">
            {navItems.map((item, index) => (
              <div key={index} className="relative">
                <NavLink
                  aria-label={item.name}
                  to={item.to}
                  className="text-primary font-bold hover:text-hover transition-colors duration-300 flex items-center"
                >
                  {item.name}
                </NavLink>
              </div>
            ))}
          </div>

          {/* Mobile */}
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden z-50 text-primary mx-auto sm:mx-0"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <XIcon size={48} color="#761d9f" /> : <ListIcon size={48} color="#761d9f" />}
          </button>
        </div>


      </nav>
    </>
  );
}
