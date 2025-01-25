import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { PageNavigationContext } from "@/providers/PageNavigation";
import { TeamContext } from "@/providers/Team";

import { ExternalLink } from "@/components/utility/ExternalLink";
import HarrierColor from "@/assets/harrier-big-blue-shadow.svg";
import HarrierSetupAltInfra from "@/assets/3.harrier-setup-alternative-infrastructure.png";
// import FloatingBirds from "@/components/FloatingBirds";
import TeamMember from "@/components/TeamMember";

export const LandingPage = () => {
  const page = useContext(PageNavigationContext);
  const team = useContext(TeamContext);

  if (!page || !team) {
    throw new Error(
      "Make sure the component you want to use the context in is wrapped within the provider component",
    );
  }

  const { setActivePage, setActiveSubheader } = page;
  return (
    <>
      <div className="flex h-[40rem] flex-col items-center justify-center bg-harrierBLACK text-center">
        {/* <FloatingBirds /> */}
        <h1 className="text-center text-7xl font-semibold text-harrierWHITE">
          Harrier
        </h1>
        <div>
          <p className="mb-9 mt-7 text-2xl text-white">
            an automated{" "}
            <span className="font-semibold">
              <ExternalLink
                href="https://github.com/features/actions"
                color="text-harrierBLUE"
              >
                GitHub Actions
              </ExternalLink>{" "}
              self-hosted runner
            </span>{" "}
            deployment tool
          </p>
          <NavLink
            to="/case-study/introduction"
            className="inline-flex items-center p-6"
            onClick={() => {
              setActivePage(0);
              setActiveSubheader(null);
            }}
          >
            <span className="text-lg font-semibold text-white">
              Read the Case Study
            </span>
          </NavLink>
        </div>
      </div>
      <div className="flex h-[36rem] flex-row gap-8 bg-harrierWHITE p-8">
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

      <div className="flex h-[36rem] flex-row gap-8 bg-harrierOFFWHITE p-8">
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

        <div className="justify-left flex w-full items-center md:w-2/5">
          <img
            src={HarrierColor}
            alt="Harrier Blue Logo"
            className="h-40 w-auto"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-harrierWHITE pb-8 pt-16">
        <h2 className="mb-8 text-3xl font-semibold text-harrierBLACK">
          Meet the Team
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {team.map((member) => (
            <TeamMember member={member} key={member.name} />
          ))}
        </div>
      </div>
    </>
  );
};
