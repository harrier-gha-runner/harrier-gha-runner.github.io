import { useContext, useEffect, useCallback } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useViewportWidth } from "@/hooks/useViewportWidth";
import { PageNavigationContext } from "@/providers/PageNavigation";

type Page = {
  id: string;
  name: string;
  subheaders?: { id: string; name: string }[];
};

type CaseStudyNavProps = {
  pages: Page[];
  setActivePage: (index: number) => void;
  setActiveSubheader: (index: number | null) => void;
  activePage: number;
};

const CaseStudyNav = ({
  pages,
  setActivePage,
  setActiveSubheader,
  activePage,
}: CaseStudyNavProps) => {
  const viewportWideEnough = useViewportWidth();

  return (
    <div id="case-study-nav-container" className="sticky top-[88px] z-10">
      <nav
        id="case-study-nav"
        className={`mx-auto flex w-fit justify-center py-2 ${viewportWideEnough ? "" : "hidden"} `}
      >
        <div className="flex flex-row gap-4 rounded-md bg-harrierWHITE p-0.5 drop-shadow-md">
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
                className={`overflow-hidden whitespace-nowrap rounded-md p-2 text-xl font-medium ${pageIdx === activePage ? "bg-harrierBLACK text-harrierWHITE/85" : "bg-quaternary/85 text-harrierBLACK"}`}
              >
                {page.name}
              </div>
            </NavLink>
          ))}
        </div>
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

const CaseStudyOnThisPageNav = ({
  pages,
  activePage,
  activeSubheader,
}: {
  pages: Page[];
  activePage: number;
  activeSubheader: number | null;
}) => {
  const viewportWideEnough = useViewportWidth();
  return (
    <div
      id="on-this-page-container"
      className={`w-[250px] ${viewportWideEnough ? "" : "hidden"} mr-4`}
    >
      <nav className="sticky top-[170px]" id="on-this-page">
        <h3 className="mb-6 text-xl font-semibold text-harrierBLACK">
          On this page
        </h3>
        <ul>
          {pages[activePage]?.subheaders?.map((subheader, subheaderIdx) => {
            return (
              <li
                key={subheader.id}
                onClick={() => scrollToElement(subheader.id)}
                className={`relative inline-block rounded-r-sm border-l-4 py-2 pl-6 pr-4 ${activeSubheader === subheaderIdx ? "border-harrierBLUE bg-harrierBLUE/50 text-harrierBLACK" : "text-harrierGRAY hover:bg-harrierGRAY/10 hover:text-harrierBLACK"}`}
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

export default function CaseStudyHomePage() {
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
      <CaseStudyNav
        pages={pages}
        setActivePage={setActivePage}
        setActiveSubheader={setActiveSubheader}
        activePage={activePage}
      />

      <div id="page-content-container" className="flex flex-wrap">
        <main
          id="case-study-content"
          //   className="prose w-full max-w-4xl flex-1 flex-row p-10 pt-12"
          className="prose mx-auto w-full max-w-screen-md p-10 pt-12"
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
}
