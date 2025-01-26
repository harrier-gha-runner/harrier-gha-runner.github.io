import { useContext } from "react";
import { PageNavigationContext } from "@/providers/PageNavigation";
import { TeamContext } from "@/providers/Team";
import GHAPlusCache from "@/assets/landingpage-GHA-plus-cache.png";
import { Separator } from "@/components/ui/separator";
// import HarrierColor from "@/assets/harrier-big-blue-shadow.svg";
import Snippet from "@/assets/landingpage-minimal-mod.png";

import TeamMember from "@/components/TeamMember";

// import FloatingBirds from "@/components/FloatingBirds";

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
      <div
        id="landing-panel-0"
        className="flex h-[40rem] flex-col items-center justify-center bg-harrierBLACK text-center text-white"
      >
        <h1 className="flex flex-col text-5xl text-white">
          Accelerate GitHub Actions
        </h1>
        <div className="mt-10 flex flex-wrap space-x-2">
          <p className="">Custom configured self-hosted runners.</p>

          <p className="">Secure within your own AWS account.</p>
        </div>
        <div className="mt-10 flex flex-row space-x-8">
          <button className="border bg-harrierPINK">Read More</button>

          <button className="border border-harrierPINK">Try Harrier</button>
        </div>
      </div>
      
      <div
        id="landing-panel-1"
        className="m-14 grid h-[44rem] grid-cols-1 gap-14 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
      >
        <div className="prose flex w-full justify-center bg-harrierBLACK p-4">
          <div className="">
            <h3 className="flex flex-wrap justify-start text-2xl font-semibold text-harrierWHITE">
              <div className="flex">
                Dedicated&nbsp;
                <div className="text-harrierPINK">Persistent Cache</div>&nbsp;
              </div>
              <div className="flex">
                for&nbsp;
                <div className="text-harrierGHABLUE">GitHub Actions</div>
              </div>
            </h3>
            <div className="flex flex-wrap justify-center text-xl text-harrierWHITE">
              <p>
                Create your own GitHub Actions self-hosted runner infrastructure
                with a built-in cache to speed up your CI builds and more.
              </p>
            </div>
          </div>
        </div>
        <div className="align-center flex w-full items-center justify-center p-4">
          <img src={GHAPlusCache} alt="GHA Plus Cache" className="" />
        </div>

        <div className="align-center flex w-full items-center justify-center p-4">
          <img src={Snippet} alt="Snippet" />
        </div>
        <div className="prose flex w-full justify-center bg-harrierBLACK p-4">
          <div className="">
            <h3 className="flex flex-wrap justify-start text-2xl font-semibold text-harrierWHITE">
              Minimal Impact to Existing Workflows
            </h3>
            <div className="flex flex-wrap justify-center text-xl text-harrierWHITE">
              <p>
                Continue using your proven workflows with minimal modification
                to take advantage of your new runners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

{
  /* 
      <div
        id="landing-panel-2"
        className="flex h-[36rem] flex-row gap-8 bg-harrierOFFWHITE p-8"
      ></div> */
}
{
  /* <div className="text-black">MINIMAL DISRUPTION/SETUP/LOW FRICTION</div> */
}
{
  /* <div>where does it do it?</div> */
}
{
  /* <h1 className="text-center text-7xl font-semibold text-harrierWHITE">
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
        </div> */
}
{
  /* <div className="flex w-full items-center justify-center md:w-1/2">
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
        </div> */
}
{
  /* <div className="flex w-full items-center justify-center md:w-3/5">
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
        </div> */
}
{
  /* <div
        id="landing-panel-3"
        className="flex flex-col items-center justify-center bg-harrierWHITE pb-8 pt-16"
      >
        <h2 className="mb-8 text-3xl font-semibold text-harrierBLACK">
          Meet the Team
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {team.map((member) => (
            <TeamMember member={member} key={member.name} />
          ))}
        </div>
      </div> */
}
