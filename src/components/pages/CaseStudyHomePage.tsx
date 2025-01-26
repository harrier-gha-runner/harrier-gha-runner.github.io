import { useContext, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useViewportWidth } from "@/hooks/useViewportWidth";
import { PageNavigationContext } from "@/providers/PageNavigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

type Page = {
  id: string;
  name: string;
  subheaders?: { id: string; name: string }[];
};

type CaseStudyMainNavProps = {
  pages: Page[];
  setActivePage: (index: number) => void;
  setActiveSubheader: (index: number | null) => void;
  activePage: number;
};

const CaseStudyMainNav = ({
  pages,
  setActivePage,
  setActiveSubheader,
  activePage,
}: CaseStudyMainNavProps) => {
  const wideEnough = useViewportWidth(915);

  const handleForwardClick = () => {
    setActivePage(activePage + 1);
    setActiveSubheader(null);
    window.scrollTo(0, 0);
  };

  const handleBackwardClick = () => {
    setActivePage(activePage - 1);
    setActiveSubheader(null);
    window.scrollTo(0, 0);
  };

  return (
    <div id="case-study-nav-container" className="sticky top-[100px] z-10">
      <nav
        id="case-study-nav"
        className={`mx-auto flex w-fit justify-center py-2`}
      >
        <div className="flex flex-row gap-4 rounded-md bg-harrierWHITE p-0.5 drop-shadow-md">
          {wideEnough ? (
            <>
              {pages?.map((page, pageIdx) => (
                <NavLink
                  to={`${page.id}`}
                  key={page.id}
                  onClick={() => {
                    setActivePage(pageIdx);
                    setActiveSubheader(null);
                    window.scrollTo(0, 0);
                  }}
                  className="relative"
                >
                  <div
                    className={`flex flex-row items-center overflow-hidden whitespace-nowrap rounded-md p-2 text-xl font-medium ${pageIdx === activePage ? "bg-harrierBLACK text-harrierWHITE/85" : "bg-quaternary/85 text-harrierBLACK"}`}
                  >
                    <div>{page.name}</div>
                    <FaChevronRight size="16" className="ml-2" />
                  </div>
                </NavLink>
              ))}
            </>
          ) : (
            <>
              <NavLink
                to={`${pages[activePage - 1]?.id}`}
                key={`${pages[activePage - 1]?.id}`}
                onClick={
                  activePage === 0
                    ? (e) => e.preventDefault()
                    : handleBackwardClick
                }
                className={`relative ${activePage === 0 ? "pointer-events-none opacity-50" : ""}`}
              >
                <div
                  className={`flex flex-row items-center overflow-hidden whitespace-nowrap rounded-md p-2 text-xl font-medium`}
                >
                  <FaChevronLeft size="16" className="mr-2" />
                  Back {/*  {pages[activePage - 1]?.name} */}
                </div>
              </NavLink>

              <NavLink
                to={`${pages[activePage + 1]?.id}`}
                key={`${pages[activePage + 1]?.id}`}
                onClick={handleForwardClick}
                className={`relative ${activePage === pages.length - 1 ? "pointer-events-none opacity-50" : ""}`}
              >
                <div
                  className={`flex flex-row items-center overflow-hidden whitespace-nowrap rounded-md p-2 text-xl font-medium`}
                >
                  Next
                  <FaChevronRight size="16" className="ml-2" />
                </div>
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

const CaseStudyOnThisPageNav = ({
  pages,
  activePage,
  activeSubheader,
}: {
  pages: Page[];
  activePage: number;
  activeSubheader: number | null;
}) => {
  const wideEnough = useViewportWidth();
  return (
    <div
      id="on-this-page-container"
      className={`w-[250px] ${wideEnough ? "" : "hidden"} mr-4`}
    >
      <nav className="sticky top-[200px]" id="on-this-page">
        <h3 className="mb-6 text-xl font-semibold text-harrierBLACK">
          On this page
        </h3>
        <ul>
          {pages[activePage]?.subheaders?.map((subheader, subheaderIdx) => {
            return (
              <li
                key={subheader.id}
                onClick={() => scrollToElement(subheader.id)}
                className={`relative inline-block rounded-r-sm border-l-4 py-2 pl-6 pr-4 ${activeSubheader === subheaderIdx ? "border-harrierBLUE bg-harrierBLUE/50 font-semibold text-harrierBLACK" : "text-harrierGRAY hover:bg-harrierGRAY/10 hover:text-harrierBLACK"}`}
              >
                <NavLink
                  to={{ hash: `#${subheader.id}` }}
                  className="relative flex flex-row no-underline"
                >
                  {subheader.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

const scrollToElement = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = element.offsetTop - 152;
    window.scrollTo({ top: offset, behavior: "smooth" });
  }
};

export const CaseStudyHomePage = () => {
  const pageContext = useContext(PageNavigationContext);
  const location = useLocation();

  if (!pageContext) {
    throw new Error(
      "make sure to wrap the component in a PageNavigationProvider",
    );
  }

  const {
    pages,
    activePage,
    setActivePage,
    activeSubheader,
    setActiveSubheader,
  } = pageContext;

  useEffect(() => {
    const { pathname, hash } = location;
    const pageId = pathname.split("/").pop();
    const pageIndex = pages.findIndex((page) => page.id === pageId);

    if (pageIndex !== -1) {
      setActivePage(pageIndex);
    }

    if (hash) {
      scrollToElement(hash.substring(1));
    }
  }, [location, pages, setActivePage]);

  return (
    <>
      <CaseStudyMainNav
        pages={pages}
        setActivePage={setActivePage}
        setActiveSubheader={setActiveSubheader}
        activePage={activePage}
      />

      <div id="page-content-container" className="flex flex-wrap">
        <main
          id="case-study-content"
          className="prose mx-auto w-full max-w-screen-md px-10 pb-40 pt-0"
        >
          <Outlet />
        </main>
        {activePage !== 0 && (
          <CaseStudyOnThisPageNav
            pages={pages}
            activePage={activePage}
            activeSubheader={activeSubheader}
          />
        )}
      </div>
    </>
  );
};
