import { FaChevronRight } from "react-icons/fa";

export const Callout = ({
  title,
  message,
  children,
}: {
  title: string;
  message?: string;
  children?: React.ReactNode;
}) => {
  return (
    <aside
      className={`mx-10 mt-4 rounded border-l-4 border-harrierYELLOW bg-harrierYELLOW/15 p-4`}
    >
      <div className="flex items-center">
        <FaChevronRight size="16" className="mr-2" />
        <span className="font-bold">{title}</span> {message}
      </div>
      {children}
    </aside>
  );
};
