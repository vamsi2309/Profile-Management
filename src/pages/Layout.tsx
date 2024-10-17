import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useNavigation } from "react-router-dom";
import { ReactNode } from "react";
import Loader from "@/components/Loader";

interface Props {
  children: ReactNode;
}
const HomeLayout = ({ children }: Props) => {
  const navigate = useNavigation();
  const isLoading = navigate.state === "loading";
  return (
    <>
      <Navbar />
      <section className="align-element out-item">
        {isLoading ? <Loader /> : <div>{children}</div>}
      </section>
    </>
  );
};
export default HomeLayout;
