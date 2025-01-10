import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { FaLinkedin, FaGithub, FaRegFilePdf } from "react-icons/fa";
import { Member } from "@/components/pages/LandingPage";

const TeamMember = ({ member }: { member: Member }) => {
  return (
    <Card className="mx-auto my-4 max-w-xl transform rounded-lg border bg-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-harrierBLACK/30">
      <CardHeader className="flex flex-col items-center space-y-2 rounded-t-lg p-6">
        <img
          src={member.photoUrl}
          alt={member.name}
          className="h-48 w-48 rounded-full object-cover"
        />
        <CardTitle className="text-center text-xl font-semibold">
          {member.name}
        </CardTitle>
        <CardDescription className="text-center text-sm text-gray-600">
          {member.role}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center p-4 pb-6 pt-0">
        <CardFooter className="flex space-x-4">
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
          <a>
            <FaRegFilePdf size="24px" />
          </a>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default TeamMember;
