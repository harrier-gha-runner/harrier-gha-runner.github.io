import { NavLink } from "react-router-dom";
import { FaGithub, FaReadme } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="flex w-full items-center justify-center bg-harrierBLACK">
      <div className="flex flex-row space-x-8 px-5 py-5 text-harrierWHITE">
        <NavLink to="/case-study/introduction" className="">
          <FaReadme size="30" />
        </NavLink>
        {/* <NavLink to="/team">
          <FaUsers size={36} />
        </NavLink> */}
        <a
          href="https://github.com/harrier-gha-runner/harrier-self-hosted-runner?tab=readme-ov-file#harrier-deployment-guide"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size="30" />
        </a>
      </div>
    </footer>
  );
};
