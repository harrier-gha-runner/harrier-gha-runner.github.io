import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExternalLink } from "@/components/utility/ExternalLink";

type CiteProps = {
  num: number;
  href: string;
  label: string;
};

export const Cite = ({ num, href, label }: CiteProps) => {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <sup className="relative mr-1 inline-block cursor-pointer align-super text-xs">
              <a
                className="text-harrierPINK no-underline"
                target="_blank"
                rel="noopener noreferrer"
                href={href}
              >
                {num}
              </a>
            </sup>
          </TooltipTrigger>
          <TooltipContent className="border-1 bg-harrierWHITE font-bold">
            <ExternalLink href={href} children={label} />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};
