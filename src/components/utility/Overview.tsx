import { Separator } from "@/components/ui/separator";
import { FaMapSigns } from "react-icons/fa";
import React from "react";
import { useViewportWidth } from "@/hooks/useViewportWidth";
type OverviewProps = {
  title?: string;
  children: React.ReactNode;
};

export const Overview = ({ title, children }: OverviewProps) => {
  const wideEnough = useViewportWidth();
  return (
    <div className="mx-2">
      <div className="my-4">
        {title && title.length !== 0 ? (
          <h3 className="m-0 flex flex-row items-center space-x-2">
            <FaMapSigns size="22" className={`${wideEnough ? "" : "hidden"}`} />
            <span>{title}</span>
          </h3>
        ) : null}
        <Separator
          orientation="horizontal"
          className="my-2 w-full border-b border-harrierPINK/90"
        />
        <div className="custom-list">{children}</div>
        <Separator
          orientation="horizontal"
          className="my-2 w-full border-b border-harrierPINK/90"
        />
      </div>
    </div>
  );
};
