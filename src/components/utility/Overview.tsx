import { Separator } from "@/components/ui/separator";

type OverviewProps = {
  title: string;
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
        <h3 className="m-0">{title}</h3>
        {children}
      </div>
      <Separator
        orientation="horizontal"
        className="my-2 w-full border-b border-harrierPINK/90"
      />
    </section>
  );
};
