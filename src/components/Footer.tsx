import { NavLink } from "react-router-dom";
import { FaGithub, FaReadme, FaUsers } from "react-icons/fa";
import { useState } from "react";
// import { useContext } from "react";
// import { TeamContext } from "@/providers/Team";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import HisHoliness from "@/assets/harrier-big-blue-shadow.svg";
export const Footer = () => {
  //   const team = useContext(TeamContext);
  const [iconSize] = useState(32);
  //   const [isHovered, setIsHovered] = useState(false);

  return (
    <footer className="relative flex w-full items-center justify-center bg-harrierBLACK">
      <div className="flex flex-row space-x-8 px-5 py-5 text-harrierWHITE">
        <div className="relative">
          {/* {isHovered && team && (
            <div
              id="team-avatars"
              className="animate-expand absolute bottom-full left-1/2 mb-5 flex -translate-x-1/2 transform flex-col space-y-2 p-2"
              style={{
                transition: "transform 0.4s ease-out",
                zIndex: 10,
              }}
            >
              {team.map((member, index) => (
                <Avatar
                  key={member.name}
                  className={`avatar-staggered ${isHovered ? "animate-avatar-show" : ""}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <AvatarImage src={member.photoUrl} alt={member.name} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              ))}
            </div>
          )} */}
          <NavLink
            to="/team"
            className={`hover:bg`}
            // onMouseEnter={() => setIsHovered(true)}
            // onMouseLeave={() => setIsHovered(false)}
          >
            <FaUsers size={iconSize} />
          </NavLink>
        </div>

        <NavLink to="/case-study/introduction" className="">
          <FaReadme size={iconSize} />
        </NavLink>
        <a
          href="https://github.com/harrier-gha-runner/harrier-self-hosted-runner?tab=readme-ov-file#harrier-deployment-guide"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={iconSize} />
        </a>
      </div>
    </footer>
  );
};
