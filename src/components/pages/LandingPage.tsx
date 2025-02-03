import { useContext } from "react";
import { PageNavigationContext } from "@/providers/PageNavigation";
import { TeamContext } from "@/providers/Team";
import { NavLink } from "react-router-dom";
import GHAPlusCache from "@/assets/landingpage-GHA-plus-cache.png";
import Snippet from "@/assets/landingpage-minimal-mod.png";
import TeamMember from "../TeamMember";

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
    <div>
      <section
        id="landing-panel-0"
        className="flex h-[40rem] items-center justify-center bg-harrierBLACK"
      >
        <div className="flex flex-col items-center justify-evenly gap-6 px-10 text-center text-harrierWHITE">
          <h1 className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4 text-4xl">
            <div>Accelerate</div>
            <div>GitHub Actions</div>
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-1 text-harrierGRAY">
            <span>Custom configured self-hosted runners.</span>
            <span>Secure within your AWS account.</span>
          </div>
          <div className="flex space-x-8">
            <NavLink to="/case-study">
              <button
                className="bg-harrierPINK/80 hover:bg-harrierPINK"
                type="button"
                onClick={() => {
                  setActivePage(0);
                  setActiveSubheader(null);
                }}
              >
                Learn More
              </button>
            </NavLink>
            <NavLink to="/try-harrier">
              <button className="border hover:border-harrierPINK">
                Try Harrier
              </button>
            </NavLink>
          </div>
        </div>
      </section>
      <section
        id="landing-panel-1"
        className="mx-14 my-16 grid grid-cols-1 gap-8 md:grid-cols-2"
      >
        <div className="flex w-full justify-center bg-harrierWHITE p-4">
          <div className="prose max-w-lg">
            <h3 className="flex flex-wrap justify-start gap-x-1 gap-y-2 text-xl font-bold text-harrierBLACK">
              Dedicated
              <div className="text-harrierPINK">Persistent Cache</div>
              <div>
                for&nbsp;
                <a
                  href="https://github.com/features/actions"
                  className="font-bold text-harrierGHABLUE no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Actions
                </a>
              </div>
            </h3>
            <div className="flex flex-wrap justify-center text-xl text-harrierBLACK">
              Create your own GitHub Actions self-hosted runner infrastructure
              with a built-in cache to speed up CI builds and more.
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-center p-4">
          <img
            src={GHAPlusCache}
            alt="GHA Plus Cache"
            className="w-full max-w-xs md:max-w-md lg:max-w-lg"
          />
        </div>
      </section>

      <section
        id="landing-panel-2"
        className="mx-14 my-16 grid grid-cols-1 gap-8 md:grid-cols-2"
      >
        <div className="align-center order-2 flex w-full items-center justify-center p-4 md:order-1">
          <img
            src={Snippet}
            alt="Snippet"
            className="w-full max-w-xs md:max-w-md lg:max-w-lg"
          />
        </div>
        <div className="order-1 flex w-full justify-center bg-harrierWHITE p-4 md:order-2">
          <div className="prose max-w-lg">
            <h3 className="flex flex-wrap justify-start gap-x-1 gap-y-2 text-xl font-bold text-harrierBLACK">
              <div className="flex flex-wrap justify-start gap-x-1 gap-y-2 text-xl font-bold">
                <div className="text-harrierPINK">Minimal Impact</div>
                <div>to</div>
              </div>
              <div>
                <div className="">Existing Workflows</div>
              </div>
            </h3>
            <div className="flex flex-wrap justify-center text-xl text-harrierBLACK">
              Continue using your proven workflows with minimal modification to
              take advantage of your new runners.
            </div>
          </div>
        </div>
      </section>
      <section
        id="landing-panel-3"
        className="flex flex-col items-center justify-center bg-harrierWHITE pb-8 pt-16"
      >
        <h3 className="mb-8 text-3xl font-semibold text-harrierBLACK">
          Harrier Team
        </h3>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {team.map((member) => (
            <TeamMember member={member} key={member.name} />
          ))}
        </div>
      </section>
    </div>
  );
};
