import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { PageNavigationContext } from "@/providers/PageNavigation";
import { Separator } from "@/components/ui/separator";

import HisHoliness from "@/assets/harrier-big-blue-shadow.svg";

interface NavItemProps {
  to: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ to, onClick, children }) => {
  return (
    <NavLink to={to} onClick={onClick} className="">
      {children}
    </NavLink>
  );
};

export const Header = () => {
  const pageContext = useContext(PageNavigationContext);
  if (!pageContext) {
    throw new Error(
      "Make sure the component you want to use the context in is wrapped in the provider component",
    );
  }

  const { setActivePage } = pageContext;

  return (
    <header
      className={`sticky top-0 z-50 h-[88px] w-full bg-harrierBLACK text-harrierWHITE drop-shadow-sm`}
      id="header-nav"
    >
      <div className="flex items-center justify-between px-7">
        <NavItem to="/">
          <img
            src={HisHoliness}
            alt="Harrier Runner Logo"
            className="mb-5 ml-3 mr-6 mt-5 h-12 w-auto"
          />
        </NavItem>
        <NavItem to="/">
          <h1 className="text-4xl font-semibold">Harrier</h1>
        </NavItem>
        <div className="ml-auto mr-4 flex items-center space-x-4 text-lg font-semibold">
          <NavItem
            to="/case-study/problem-domain"
            onClick={() => {
              setActivePage(0);
            }}
          >
            Case Study
          </NavItem>
          <Separator
            orientation="vertical"
            className="mx-2 h-8 border-l border-harrierGRAY"
          />
          <NavItem to="/team">Team</NavItem>
          <Separator
            orientation="vertical"
            className="mx-2 h-8 border-l border-harrierGRAY"
          />
          <NavItem to="/try-harrier">Try Harrier</NavItem>
        </div>
      </div>
    </header>
  );
};
