import TeamMember from "@/components/TeamMember";
import { TeamContext } from "@/providers/Team";
import { useContext } from "react";

export const TeamPage = () => {
  const team = useContext(TeamContext);

  return (
    <div className="flex flex-col items-center justify-center bg-harrierWHITE pb-8 pt-16">
      <h3 className="mb-3 text-3xl font-semibold text-harrierBLACK">
        Our Team
      </h3>
      <p className="mb-4 text-center text-base text-gray-600">
        Harrier was created by a remote team of engineers in three different
        time zones
      </p>

      <div className="mt-2 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
        {team.map((member) => (
          <TeamMember member={member} key={member.name} />
        ))}
      </div>
    </div>
  );
};
