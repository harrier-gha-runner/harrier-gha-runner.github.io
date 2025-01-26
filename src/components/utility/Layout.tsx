import { Outlet } from "react-router-dom";
import { Footer } from "../Footer";
import { Header } from "../Header";

export const Layout = () => {
  return (
    <>
      <div className="flex flex-grow flex-col">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};
