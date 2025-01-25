import { NavLink } from "react-router-dom";
import { FaUsers, FaLinkedin, FaGithub, FaReadme } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="flex h-[140px] w-full flex-col items-center justify-center">
      {/* <span>{time} Harrier Contributors</span> */}
      <div className="flex flex-row space-x-8 rounded-full bg-harrierBLACK px-5 py-2 text-harrierWHITE">
        <NavLink to="/case-study/introduction">
          <FaReadme size="36" />
        </NavLink>
        <a
          href="https://www.linkedin.com/company/harrier-gha-runner/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size="36" />
        </a>
        <a
          href="https://github.com/harrier-gha-runner/harrier-self-hosted-runner"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size="36" />
        </a>
        <NavLink to="/team">
          <FaUsers size={36} />
        </NavLink>
      </div>
      {/* <NavLink to="/team">Team</NavLink> */}
    </footer>
  );
};
