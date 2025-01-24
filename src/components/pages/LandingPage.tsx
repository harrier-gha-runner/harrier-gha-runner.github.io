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
      name: "Shane Ziegler",
      role: "Software Engineer",
      photoUrl: "https://avatars.githubusercontent.com/u/56492231?v=4",
      location: "Minneapolis, MN.",
      linkedinProfile: "https://www.linkedin.com/in/shane-ziegler-b1647b11/",
      githubProfile: "https://github.com/shaneziegler",
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
      name: "Joel Barton",
      role: "Software Engineer",
      photoUrl: "https://avatars.githubusercontent.com/u/86934356?v=4",
      location: "Seattle, WA.",
      linkedinProfile: "https://www.linkedin.com/in/joel-barton1/",
      githubProfile: "https://github.com/joelbarton406",
    },
  ];

  return (
    <>
      {/* hero section */}
      <div className="0text-center flex flex-col items-center justify-center bg-harrierBLACK px-6 pb-16 pt-16">
        <h1 className="text-3xl font-semibold text-harrierWHITE md:text-5xl lg:text-6xl">
          Harrier
        </h1>
        <p className="mb-6 mt-4 text-base text-white md:text-lg lg:text-xl">
          an automated{" "}
          <span className="font-semibold text-harrierPINK">
            self-hosted runner
          </span>{" "}
          setup tool for{" "}
          <a
            href="https://github.com/features/actions"
            className="underline hover:text-harrierPINK"
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
          className="inline-flex items-center px-4 py-2 text-white md:px-6 md:py-3"
          variant="secondary"
        >
          <span className="text-sm md:text-lg">Read the Case Study</span>
        </Button>
      </div>

      {/* Feature Section */}
      <div className="flex flex-col gap-8 bg-harrierWHITE px-4 py-6 md:flex-row md:gap-12 md:px-12">
        <div className="flex w-full items-center justify-center md:w-1/2">
          <img
            src={HarrierSetupAltInfra}
            alt="Harrier Setup alternative infrastructure"
            className="max-h-72 w-auto md:max-h-96"
          />
        </div>
        <div className="flex w-full items-center justify-center md:w-1/2 lg:w-1/3">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-xl font-bold md:text-2xl lg:text-3xl">
              Automated Deployment of Runners and Persistent Cache Storage
            </h2>
            <p className="text-sm leading-relaxed md:text-base lg:text-lg">
              Harrier is an open-source infrastructure deployment agent designed
              to accelerate automated workflow runtimes in GitHub Actions (GHA)
              through optimized caching mechanisms made possible by using
              GitHub’s very own self-hosted runner feature.
            </p>
          </div>
        </div>
      </div>

      {/* benefits section */}
      <div className="flex flex-col gap-8 bg-harrierOFFWHITE px-4 py-6 md:flex-row md:gap-12 md:px-12">
        <div className="w-full md:w-3/5">
          <h2 className="text-xl font-bold md:text-2xl lg:text-3xl">
            Go Faster with Harrier
          </h2>
          <ul className="list-inside list-disc space-y-2 text-sm md:text-base lg:text-lg">
            <li>
              Supports faster GitHub Actions workflows with self-hosted runners
            </li>
            <li>Reduces build times by up to 90% through S3-backed caching</li>
            <li>Seamlessly provisions ephemeral runners in a secure VPC</li>
            <li>
              Automates warm-pool management for instant workflow execution
            </li>
            <li>
              Enables dependency and build artifact cache and reuse across
              branches
            </li>
            <li>
              Transparent setup process via a public GitHub Action repository
            </li>
            <li>Minimal workflow changes with drop-in caching actions</li>
          </ul>
        </div>
        <div className="flex w-full items-center justify-center md:w-2/5">
          <img
            src={HarrierColor}
            alt="Harrier Blue Logo"
            className="max-h-32 md:max-h-40"
          />
        </div>
      </div>

      {/* team section */}
      <div className="flex flex-col items-center justify-center bg-harrierWHITE px-4 py-8">
        <h3 className="mb-8 text-2xl font-semibold text-harrierBLACK md:text-3xl">
          Meet the Team
        </h3>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {team.map((member) => (
            <TeamMember member={member} key={member.name} />
          ))}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
