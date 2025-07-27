import { useEffect, useState, useCallback } from "react";
import { cn } from "../../lib/utils";
import { NavLink } from "react-router";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import NavbarMobile from "./NavbarMobile";
import logo from "../../assets/navbar/logo.webp";
import ThemeToggle from "./../ThemeToggle/ThemToggle";

const navItems = [
  { name: "Home", to: "" },
  { name: "Products", to: "products" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-[9999] transition-all duration-300",
        "bg-navbar",
        isScrolled ? "backdrop-blur-md shadow-md py-3" : "py-5 shadow-xl"
      )}
    >
      <div className="container flex items-center justify-between flex-wrap px-10">
        {/* Logo */}
        <NavLink to="/" className="flex items-center z-50">
          <img
            src={logo}
            alt="Company Logo"
            className="h-[60px] object-contain rounded-full"
          />
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-8 text-lg">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                "text-textColor font-bold",
                "dark:text-white",
                "transition-colors duration-300 hover:text-main"
              )}
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="lg:hidden z-50 text-primary cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <XIcon size={30} color="#EF4823" />
            ) : (
              <ListIcon size={30} color="#EF4823" />
            )}
          </button>
          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
        {/* Mobile Menu */}
        <NavbarMobile
          navItems={navItems}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      </div>
    </nav>
  );
}
