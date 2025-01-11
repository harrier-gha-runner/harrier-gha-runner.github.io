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
        {
          id: "problem-domain-2-1",
          name: "GitHub Actions: A Powerful CI/CD Tool",
        },
        {
          id: "problem-domain-2-2",
          name: "Slower than desirable GHA Automation",
        },
        {
          id: "problem-domain-2-3",
          name: "Accelerate GHA Workflows with Cache",
        },
      ],
    },
    {
      id: "design",
      name: "Design",
      subheaders: [
        { id: "design-0", name: "3. Harrier Design" },
        {
          id: "design-1",
          name: "3.1 Isolated Runner Environment in User’s Cloud",
        },
        { id: "design-2", name: "3.2 Warm-pool of self-hosted runners" },
        {
          id: "design-3",
          name: "3.3 Connect Runners with Specific Workflow Jobs",
        },
        { id: "design-4", name: "3.4 Termination of ephemeral runner" },
        { id: "design-5", name: "3.5 Dedicated Persistent Cache Store" },
        {
          id: "design-6",
          name: "3.6 Out-of-the-box cache management of dependencies",
        },
        { id: "design-7", name: "3.7 Workflow-driven start/stop of runners" },
        { id: "design-8", name: "3.8 Minimal workflow modification" },
      ],
    },
    {
      id: "implementation",
      name: "Implementation",
      subheaders: [
        {
          id: "implementation-0",
          name: "Harrier Implementation",
        },
        {
          id: "implementation-1",
          name: "Isolated VPC in User's AWS Account",
        },
        {
          id: "implementation-2",
          name: "Fleet of EC2 runners placed in standby",
        },
        {
          id: "implementation-3",
          name: "Just-In-Time Token Registration of Runner",
        },
        { id: "implementation-4", name: "Termination of EC2 runners" },
        { id: "implementation-5", name: "S3 Bucket Cache Store" },
        { id: "implementation-6", name: "Node modules cache" },
        { id: "implementation-7", name: "API Platform Integration" },
        { id: "implementation-8", name: "Minimal Workflow Modification" },
        { id: "implementation-9", name: "Overall Architecture" },
        { id: "implementation-10", name: "Deployment" },
        { id: "implementation-11", name: "Performance benchmarks" },
        { id: "implementation-12", name: "Sources" },
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
