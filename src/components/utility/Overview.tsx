import { Separator } from "@/components/ui/separator";

type OverviewProps = {
  children: React.ReactNode;
};
export const Overview = ({ children }: OverviewProps) => {
  return (
    <section>
      <Separator
        orientation="horizontal"
        className="my-2 w-full border-b border-harrierBLACK/10"
      />
      <div className="my-4">
        {/* <h4 className="m-0">Overview</h4> */}
        {children}
      </div>
      <Separator
        orientation="horizontal"
        className="my-2 w-full border-b border-harrierBLACK/10"
      />
    </section>
  );
};
