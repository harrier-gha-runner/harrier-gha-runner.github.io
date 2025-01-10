import { useContext, useEffect, useCallback } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useViewportWidth } from "@/hooks/useViewportWidth";
import { PageNavigationContext } from "@/providers/PageNavigation";

export default function CaseStudyHomePage() {
  const viewportWideEnough = useViewportWidth();
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
  const scrollToElement = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = element.offsetTop - 152;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const { pathname, hash } = location;
    const pageId = pathname.split("/").pop();
    // const subheaderId = hash ? hash.substring(1) : null;
    const pageIndex = pages.findIndex((page) => page.id === pageId);

    if (pageIndex !== -1) {
      setActivePage(pageIndex);
      //   if (subheaderId) {
      //     const subheaderIndex = pages[pageIndex].subheaders?.findIndex(
      //       (subheader) => subheader.id === subheaderId,
      //     );
      //     if (subheaderIndex !== -1) {
      //       setActiveSubheader(subheaderIndex);
      //     }
      //   }
    }

    if (hash) {
      scrollToElement(hash.substring(1));
    }
  }, [location, pages, setActivePage, setActiveSubheader, scrollToElement]);

  return (
    <div className="w-full">
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

      <div id="page-content-container" className="flex flex-wrap">
        {/* <div
          aria-hidden="true"
          className={`w-[210px] ${window.innerWidth > 1000 ? "" : "hidden"} sticky`}
          id="filler"
        ></div> */}

        <main
          id="case-study-content"
          className="prose max-w-none flex-[60] flex-row overflow-y-auto p-10 pt-12"
        >
          <Outlet />
        </main>

        <div
          id="on-this-page-container"
          className={`w-[210px] ${viewportWideEnough ? "" : "hidden"} mr-4`}
        >
          <nav className="sticky top-[152px]" id="on-this-page">
            <h3 className="mb-6 text-xl font-semibold text-harrierBLACK">
              On this page
            </h3>
            <ul>
              {pages[activePage]?.subheaders?.map((subheader, subheaderIdx) => (
                <li
                  key={subheader.id}
                  onClick={() => {
                    // setActiveSubheader(subheaderIdx);
                    scrollToElement(subheader.id);
                  }}
                  className={`relative inline-block rounded-r-sm border-l-4 py-2 pl-6 pr-4 ${activeSubheader === subheaderIdx ? "border-harrierBLUE bg-harrierBLUE/50 font-semibold" : "text-harrierGRAY hover:bg-harrierGRAY/10 hover:text-harrierBLACK"}`}
                >
                  <NavLink
                    to={`#${subheader.id}`}
                    className="relative flex flex-row no-underline"
                  >
                    {subheader.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
