import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { PageNavigationContext } from "@/providers/PageNavigation";
import { Separator } from "@/components/ui/separator";

import HisHoliness from "@/assets/harrier-big-blue-shadow.svg";

interface NavItemProps {
  to: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string; // Allow custom classes
}

const NavItem: React.FC<NavItemProps> = ({
  to,
  onClick,
  children,
  className,
}) => {
  const isExternal = typeof to === "string" && to.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={`hover:text-harrierPINK ${className}`}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={`transition-colors hover:text-harrierPINK ${className}`}
    >
      {children}
    </NavLink>
  );
};

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pageContext = useContext(PageNavigationContext);

  if (!pageContext) {
    throw new Error(
      "Make sure the component you want to use the context in is wrapped in the provider component",
    );
  }

  const { setActivePage } = pageContext;

  return (
    <header
      className="sticky top-0 z-50 w-full bg-harrierBLACK text-harrierWHITE shadow-md"
      id="header-nav"
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-7">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <NavItem to="/">
            <img
              src={HisHoliness}
              alt="Harrier Runner Logo"
              className="h-10 w-auto"
            />
          </NavItem>
          <NavItem to="/">
            <h1 className="text-2xl font-semibold md:text-4xl">Harrier</h1>
          </NavItem>
        </div>

        {/* Hamburger Menu Toggle for Mobile */}
        <button
          className="ml-auto block text-white md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute right-4 top-full mt-2 w-48 bg-harrierBLACK text-right shadow-lg md:static md:flex md:w-auto md:items-center md:space-x-4 md:bg-transparent md:shadow-none`}
        >
          <NavItem
            to="/case-study/problem-domain"
            onClick={() => {
              setActivePage(0);
              setIsMenuOpen(false);
            }}
            className="block px-4 py-2 text-lg hover:bg-harrierGRAY md:inline md:px-0 md:py-0"
          >
            Case Study
          </NavItem>
          <Separator
            orientation="vertical"
            className="hidden h-6 border-l border-harrierGRAY md:block"
          />
          <NavItem
            to="/team"
            onClick={() => setIsMenuOpen(false)}
            className="block px-4 py-2 text-lg hover:bg-harrierGRAY md:inline md:px-0 md:py-0"
          >
            Team
          </NavItem>
          <Separator
            orientation="vertical"
            className="hidden h-6 border-l border-harrierGRAY md:block"
          />
          <NavItem
            to="/try-harrier"
            onClick={() => setIsMenuOpen(false)}
            className="block px-4 py-2 text-lg hover:bg-harrierGRAY md:inline md:px-0 md:py-0"
          >
            Try Harrier
          </NavItem>
        </div>
      </div>
    </header>
  );
};
