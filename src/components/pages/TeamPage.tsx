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
const TeamPage = () => {
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

      {/* <img src={HarrierBW} alt="GitHub Actions" className="m-4 h-64 w-auto" /> */}
    </div>
  );
};

export default TeamPage;
