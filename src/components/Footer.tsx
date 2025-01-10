import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
export const Footer = () => {
  const [time] = useState(new Date().getFullYear());

  return (
    <footer className="mt-0 flex h-[88px] flex-row justify-between bg-harrierBLACK text-white">
      <span>{time} Harrier Contributors</span>

      <NavLink to="try-harrier">Try Now</NavLink>

      <NavLink
        to={"https://github.com/2408-capstone-team5/harrier-self-hosted-runner"}
      >
        <FaGithub className="text-harrierBLUE" size="36" />
      </NavLink>
    </footer>
  );
};
