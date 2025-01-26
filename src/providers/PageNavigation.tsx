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
      id: "introduction",
      name: "Introduction",
      subheaders: [],
    },
    {
      id: "problem-domain",
      name: "Problem Domain",
      subheaders: [
        {
          id: "problem-domain-0",
          name: "CI/CD and DevOps",
        },
        {
          id: "problem-domain-1",
          name: "Workflow Automation",
        },
        {
          id: "problem-domain-2",
          name: "GHA and CI/CD Automation",
        },
        {
          id: "problem-domain-3",
          name: "Unpacking GHA’s Original Design",
        },
        {
          id: "problem-domain-4",
          name: "Limitations of GHA Cache Action",
        },
        {
          id: "problem-domain-5",
          name: "Implementation Options for Self-hosted Runners",
        },
        {
          id: "problem-domain-6",
          name: "Opportunity for 3rd-Party-Supported DIY",
        },
      ],
    },
    {
      id: "design",
      name: "Design",
      subheaders: [
        {
          id: "design-0",
          name: "Isolated Runner Environment in User’s Cloud",
        },
        { id: "design-1", name: "Warm-Pool of Self-Hosted Runners" },
        {
          id: "design-2",
          name: "Connect Runners with Specific Workflow Jobs",
        },
        { id: "design-3", name: "Termination of Ephemeral Runner" },
        { id: "design-4", name: "Dedicated Persistent Cache Store" },
        {
          id: "design-5",
          name: "Out-of-the-Box Cache Management of Dependencies",
        },
        { id: "design-6", name: "Workflow-Driven Start and Stop of Runners" },
        { id: "design-7", name: "Minimal Workflow Modification" },
      ],
    },
    {
      id: "implementation",
      name: "Implementation",
      subheaders: [
        {
          id: "implementation-0",
          name: "Isolated VPC in User's AWS Account",
        },
        {
          id: "implementation-1",
          name: "Fleet of EC2 Runners Placed in Standby",
        },
        {
          id: "implementation-2",
          name: "Just-In-Time Token Registration of Runner",
        },
        { id: "implementation-3", name: "Termination of EC2 Runners" },
        { id: "implementation-4", name: "S3 Bucket Cache Store" },
        { id: "implementation-5", name: "Node Modules Cache" },
        { id: "implementation-6", name: "API Platform Integration" },
        { id: "implementation-7", name: "Minimal Workflow Modification" },
        { id: "implementation-8", name: "Overall Architecture" },
        // { id: "implementation-10", name: "Deployment" },
        // { id: "implementation-11", name: "Performance benchmarks" },
        { id: "implementation-12", name: "Sources" },
      ],
    },
    {
      id: "future-work",
      name: "Future Work",
      subheaders: [
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
