import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { PageNavigationContext } from "@/providers/PageNavigation";
import { useViewportWidth } from "@/hooks/useViewportWidth";
import { FaExternalLinkAlt } from "react-icons/fa";
import HisHoliness from "@/assets/harrier-big-blue-shadow.svg";
// import { useViewportWidth } from "@/hooks/useViewportWidth";

const HeaderNav = () => {
  const pageContext = useContext(PageNavigationContext);
  if (!pageContext) {
    throw new Error(
      "Make sure the component you want to use the context in is wrapped in the provider component",
    );
  }

  const { setActivePage } = pageContext;

  return (
    <div className="absolute right-0 top-0 mr-6 mt-6 flex h-12 w-auto items-center justify-center space-x-4 text-lg font-semibold">
      <NavLink
        to="/case-study/introduction"
        onClick={() => {
          setActivePage(0);
        }}
      >
        about
      </NavLink>
      <NavLink to="/try-harrier">setup</NavLink>
      <NavLink to="/team">team</NavLink>
      <a
        href="https://github.com/harrier-gha-runner/harrier-self-hosted-runner?tab=readme-ov-file#harrier-deployment-guide"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-row items-center justify-center"
      >
        github <FaExternalLinkAlt className="ml-1" size={10} />
      </a>
    </div>
  );
};

const HeaderHome = () => {
  const wideEnough = useViewportWidth(600);
  return (
    <div className="absolute left-0 top-0 ml-6 mt-6 flex flex-row">
      <NavLink to="/">
        <img
          src={HisHoliness}
          alt="Harrier Logo"
          className="mr-5 h-14 w-auto"
        />{" "}
      </NavLink>
      {wideEnough ? (
        <div className="mb-2 mt-0 flex items-center justify-center">
          <NavLink to="/">
            <h1 className="text-2xl font-semibold">Harrier</h1>
          </NavLink>
        </div>
      ) : null}
    </div>
  );
};

export const Header = () => {
  return (
    <header
      className={`sticky top-0 z-50 h-[100px] w-full bg-harrierBLACK text-harrierWHITE`}
      id="header-nav"
    >
      <HeaderHome />
      <HeaderNav />
    </header>
  );
};
