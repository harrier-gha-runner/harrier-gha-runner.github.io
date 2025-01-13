import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PageNavigationContext } from "@/providers/PageNavigation";
import { Button } from "@/components/ui/button";
// import FloatingBirds from "@/components/FloatingBirds";
import HarrierColor from "@/assets/harrier-big-blue-shadow.svg";
import HarrierSetupAltInfra from "@/assets/3.harrier-setup-alternative-infrastructure.png";

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
      <div className="flex h-[24rem] flex-col items-center justify-center bg-harrierBLACK text-center">
        {/* <FloatingBirds /> */}
        <h1 className="text-center text-7xl font-semibold text-harrierWHITE">
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
      <div className="flex h-auto flex-col gap-8 bg-harrierWHITE p-8 md:h-[36rem] md:flex-row">
        <div className="flex w-full items-center justify-center md:w-1/2">
          <img
            src={HarrierSetupAltInfra}
            alt="Harrier Setup alternative infrastructure"
            className="h-[60%] w-auto md:h-[80%]"
          />
        </div>

        <div className="flex w-full items-center justify-start md:w-1/2 lg:w-1/3">
          <div className="max-w-full space-y-4 text-left">
            <h2 className="text-2xl font-bold md:text-3xl">
              Automated Deployment of Runners and Persistent Cache Storage
            </h2>
            <p className="text-base leading-relaxed md:text-lg">
              Harrier is an open-source infrastructure deployment agent designed
              to accelerate automated workflow runtimes in GitHub Actions (GHA)
              through optimized caching mechanisms made possible by using
              GitHub’s very own self-hosted runner feature.
            </p>
          </div>
        </div>
      </div>

      <div className="flex h-auto flex-col gap-8 bg-harrierOFFWHITE p-8 md:h-[36rem] md:flex-row">
        {/* Text Div */}
        <div className="flex w-full items-center justify-center md:w-3/5">
          <div className="max-w-full space-y-4 text-left md:max-w-[90%]">
            <h2 className="text-2xl font-bold md:text-3xl">
              Go Faster with Harrier
            </h2>
            <ul className="list-inside list-disc space-y-2">
              <li>
                Supports faster GitHub Actions workflows with self-hosted
                runners
              </li>
              <li>
                Reduces build times by up to 90% through S3-backed caching
              </li>
              <li>Seamlessly provisions ephemeral runners in a secure VPC</li>
              <li>
                Automates warm-pool management for instant workflow execution
              </li>
              <li>Enables dependency and Docker layer reuse across branches</li>
              <li>
                Transparent setup process via a public GitHub Action repository
              </li>
              <li>Minimal workflow changes with drop-in caching actions</li>
            </ul>
          </div>
        </div>

        {/* Image Div */}
        <div className="justify-left flex w-full items-center md:w-2/5">
          <img
            src={HarrierColor}
            alt="Harrier Blue Logo"
            className="h-40 w-auto"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-harrierWHITE pb-8 pt-16">
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
