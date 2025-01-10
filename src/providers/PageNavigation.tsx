import { useState, createContext, ReactNode } from "react";

interface Subheader {
  id: string;
  name: string;
}

interface Page {
  id: string;
  name: string;
  subheaders: Subheader[];
}

interface PageNavigationContextProps {
  pages: Page[];
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  activeSubheader: number | null;
  setActiveSubheader: React.Dispatch<React.SetStateAction<number | null>>;
}

const PageNavigationContext = createContext<PageNavigationContextProps | null>(
  null,
);

const PageNavigationProvider = ({ children }: { children: ReactNode }) => {
  const [pages] = useState([
    {
      id: "problem-domain",
      name: "Problem Domain",
      subheaders: [
        { id: "problem-domain-1", name: "Problem Domain 1" },
        { id: "problem-domain-2", name: "Problem Domain 2" },
        { id: "problem-domain-3", name: "Problem Domain 3" },
      ],
    },
    {
      id: "design",
      name: "Design",
      subheaders: [
        { id: "design-1", name: "Design 1" },
        { id: "design-2", name: "Design 2" },
        { id: "design-3", name: "Design 3" },
        { id: "design-4", name: "Design 4" },
        { id: "design-5", name: "Design 5" },
        { id: "design-6", name: "Design 6" },
        { id: "design-7", name: "Design 7" },
        { id: "design-8", name: "Design 8" },
      ],
    },
    {
      id: "implementation",
      name: "Implementation",
      subheaders: [
        { id: "implementation-1", name: "Implementation 1" },
        { id: "implementation-2", name: "Implementation 2" },
        { id: "implementation-3", name: "Implementation 3" },
        { id: "implementation-4", name: "Implementation 4" },
        { id: "implementation-5", name: "Implementation 5" },
        { id: "implementation-6", name: "Implementation 6" },
        { id: "implementation-7", name: "Implementation 7" },
        { id: "implementation-8", name: "Implementation 8" },
        { id: "implementation-9", name: "Implementation 9" },
        { id: "implementation-10", name: "Implementation 10" },
      ],
    },
    {
      id: "future-work",
      name: "Future Work",
      subheaders: [
        { id: "future-work-1", name: "Future Work 1" },
        { id: "future-work-2", name: "Future Work 2" },
        { id: "future-work-3", name: "Future Work 3" },
        { id: "future-work-4", name: "Future Work 4" },
      ],
    },
  ]);
  const [activePage, setActivePage] = useState<number>(0);
  const [activeSubheader, setActiveSubheader] = useState<null | number>(null);

  return (
    <PageNavigationContext.Provider
      value={{
        pages,
        activePage,
        setActivePage,
        activeSubheader,
        setActiveSubheader,
      }}
    >
      {children}
    </PageNavigationContext.Provider>
  );
};

export { PageNavigationProvider, PageNavigationContext };
