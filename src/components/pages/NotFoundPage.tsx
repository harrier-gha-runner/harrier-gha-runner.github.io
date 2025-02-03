import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
export const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen justify-center">
      <div className="flex flex-col items-center justify-center font-extrabold">
        <h3 className="mb-6 mt-28 text-9xl font-extrabold text-harrierGRAY/15">
          404
        </h3>
        <div className="mb-8 flex flex-row items-center justify-center text-4xl">
          <div className="text-harrierGRAY/35">
            <span className="border-l-4 border-t-2 border-harrierGRAY/35 pl-2 font-normal">
              page
            </span>{" "}
            <span className="border-b-2 border-r-4 border-harrierGRAY/35 pr-2">
              not found!
            </span>
          </div>
        </div>
        <Button variant="ghost" className="hover:border-harrierLINKBLUE">
          <Link
            to="/case-study"
            className="text-lg italic text-harrierLINKBLUE/75 no-underline underline-offset-1 hover:underline"
          >
            put it in reverse, Terry!
          </Link>
        </Button>
      </div>
    </div>
  );
};
