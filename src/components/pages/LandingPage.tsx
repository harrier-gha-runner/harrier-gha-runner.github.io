import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PageNavigationContext } from "@/providers/PageNavigation";
import { Button } from "@/components/ui/button";
// import FloatingBirds from "@/components/FloatingBirds";
import HarrierColor from "@/assets/harrier-big-blue-shadow.svg";
import GHALogo from "@/assets/GitHub Actions.png";

import TeamMember from "@/components/TeamMember";

export type Member = {
  name: string;
  role: string;
  photoUrl: string;
  location: string;
  linkedinProfile: string;
  githubProfile: string;
  emailAddress?: string;
  personalSiteUrl?: string;
};

const LandingPage = () => {
  const navigate = useNavigate();
  const pageContext = useContext(PageNavigationContext);
  if (!pageContext) {
    throw new Error(
      "Make sure the component you want to use the context in is wrapped within the provider component",
    );
  }

  const { setActivePage, setActiveSubheader } = pageContext;
  const team = [
    {
      name: "Wook Kim",
      role: "Software Engineer",
      photoUrl: "https://avatars.githubusercontent.com/u/68617800?v=4",
      location: "Los Angeles, CA.",
      linkedinProfile: "https://www.linkedin.com/in/wook-kim/",
      githubProfile: "https://github.com/wook2000",
    },
    {
      name: "Jesse Kercheval",
      role: "Software Engineer",
      photoUrl: "https://avatars.githubusercontent.com/u/56614846?v=4",
      location: "Los Angeles, CA.",
      linkedinProfile: "https://www.linkedin.com/in/jessekercheval/",
      githubProfile: "https://github.com/jessekerch",
    },
    {
      name: "Shane Ziegler",
      role: "Software Engineer",
      photoUrl: "https://avatars.githubusercontent.com/u/56492231?v=4",
      location: "Minneapolis, MN.",
      linkedinProfile: "https://www.linkedin.com/in/shane-ziegler-b1647b11/",
      githubProfile: "https://github.com/shaneziegler",
    },
    {
      name: "Joel Barton",
      role: "Software Engineer",
      photoUrl: "https://avatars.githubusercontent.com/u/86934356?v=4",
      location: "Seattle, WA.",
      linkedinProfile: "https://www.linkedin.com/in/joel-barton1/",
      githubProfile: "https://github.com/joelbarton-io",
    },
  ];
  return (
    <>
      <div className="flex h-[36rem] flex-col bg-harrierBLACK text-center">
        {/* <FloatingBirds /> */}
        <h1 className="mt-44 text-center text-7xl font-semibold text-harrierWHITE">
          Harrier
        </h1>
        <div>
          <p className="mb-9 mt-7 text-2xl text-white">
            an automated{" "}
            <span className="font-semibold text-harrierPINK">
              self-hosted runner
            </span>{" "}
            setup tool for{" "}
            <a
              href="https://github.com/features/actions"
              className="hover:bg-teriary"
            >
              GitHub Actions
            </a>
          </p>
          <Button
            onClick={() => {
              navigate("/case-study/problem-domain");
              setActivePage(0);
              setActiveSubheader(null);
            }}
            className="inline-flex items-center p-6 text-white"
            variant="secondary"
          >
            <span className="text-lg">Read the Case Study</span>
          </Button>
        </div>
      </div>
      <div className="flex h-[36rem] items-center justify-around bg-harrierWHITE">
        <img src={GHALogo} alt="GitHub Actions Logo" className="h-80 w-auto" />
        <img
          src={HarrierColor}
          alt="Harrier Blue Logo"
          className="h-40 w-auto"
        />
      </div>
      <div className="flex flex-col items-center justify-center bg-harrierWHITE pb-8">
        <h3 className="mb-8 text-3xl font-semibold text-harrierBLACK">
          Meet the Team
        </h3>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {team.map((member) => (
            <TeamMember member={member} key={member.name} />
          ))}
        </div>

        {/* <img src={HarrierBW} alt="GitHub Actions" className="m-4 h-64 w-auto" /> */}
      </div>
    </>
  );
};

export default LandingPage;
