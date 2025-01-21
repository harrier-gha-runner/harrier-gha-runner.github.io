import React from "react";

export const BoldText = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <span className={`font-semibold ${className}`}>{children}</span>;
