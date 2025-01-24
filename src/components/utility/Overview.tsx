import { Separator } from "@/components/ui/separator";
import { FaChevronRight } from "react-icons/fa6";
type OverviewProps = {
  title?: string;
  children: React.ReactNode;
};
export const Overview = ({ title, children }: OverviewProps) => {
  return (
    <section>
      <Separator
        orientation="horizontal"
        className="my-2 w-full border-b border-harrierPINK/90"
      />
      <div className="my-4">
        {title && title.length !== 0 ? (
          <h3 className="m-0 flex flex-row items-center space-x-2">
            <FaChevronRight size="20" />
            <span>{title}</span>
          </h3>
        ) : null}
        {children}
      </div>
      <Separator
        orientation="horizontal"
        className="my-2 w-full border-b border-harrierPINK/90"
      />
    </section>
  );
};
