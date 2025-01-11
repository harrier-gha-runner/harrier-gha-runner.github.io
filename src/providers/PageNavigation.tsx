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
          name: "Slower than Desirable GHA Automation",
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
        {
          id: "design-0",
          name: "Design",
        },
        {
          id: "design-1",
          name: "Isolated Runner Environment in User’s Cloud",
        },
        { id: "design-2", name: "Warm-Pool of Self-Hosted Runners" },
        {
          id: "design-3",
          name: "Connect Runners with Specific Workflow Jobs",
        },
        { id: "design-4", name: "Termination of Ephemeral Runner" },
        { id: "design-5", name: "Dedicated Persistent Cache Store" },
        {
          id: "design-6",
          name: "Out-of-the-Box Cache Management of Dependencies",
        },
        { id: "design-7", name: "Workflow-Driven Start and Stop of Runners" },
        { id: "design-8", name: "Minimal Workflow Modification" },
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
          name: "Fleet of EC2 Runners Placed in Standby",
        },
        {
          id: "implementation-3",
          name: "Just-In-Time Token Registration of Runner",
        },
        { id: "implementation-4", name: "Termination of EC2 Runners" },
        { id: "implementation-5", name: "S3 Bucket Cache Store" },
        { id: "implementation-6", name: "Node Modules Cache" },
        { id: "implementation-7", name: "API Platform Integration" },
        { id: "implementation-8", name: "Minimal Workflow Modification" },
        { id: "implementation-9", name: "Overall Architecture" },
        { id: "implementation-10", name: "Deployment" },
        { id: "implementation-11", name: "Performance Benchmarks" },
        { id: "implementation-12", name: "Sources" },
      ],
    },
    {
      id: "future-work",
      name: "Future Work",
      subheaders: [
        { id: "future-work-0", name: "Future Work" },
        { id: "future-work-1", name: "Caching" },
        { id: "future-work-2", name: "Provisioning Self-Hosted Runners" },
        { id: "future-work-3", name: "Executing Workflows" },
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
