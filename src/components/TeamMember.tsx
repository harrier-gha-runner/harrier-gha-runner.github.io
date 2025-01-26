import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  //   CardFooter,
} from "@/components/ui/card";

import { FaLocationDot } from "react-icons/fa6";
import { Member } from "@/providers/Team";

const TeamMember = ({ member }: { member: Member }) => {
  return (
    <Card className="mx-auto my-4 max-w-xl transform rounded-lg border bg-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-harrierBLACK/30">
      <a
        href={member.linkedinProfile}
        target="_blank"
        rel="noopener noreferrer"
      >
        <CardHeader className="flex flex-col items-center space-y-2 rounded-t-lg p-6">
          <img
            src={member.photoUrl}
            alt={member.name}
            className="h-48 w-48 rounded-full object-cover"
          />
          <CardTitle className="pt-2 text-center text-xl font-semibold">
            {member.name}
          </CardTitle>
          <CardDescription className="flex items-center justify-center text-center text-sm text-gray-600">
            <FaLocationDot className="mr-2" />
            <span>{member.location}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center p-4 pb-6 pt-0">
          {/* <CardFooter className="flex space-x-4">
          <a
            href={member.linkedinProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            <FaLinkedin size="24px" />
          </a>
          <a
            href={member.githubProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-black"
          >
            <FaGithub size="24px" />
          </a>
          {/* <a>
            <FaRegFilePdf size="24px" />
          </a>
        </CardFooter> */}
        </CardContent>
      </a>
    </Card>
  );
};

export default TeamMember;
