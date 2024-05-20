import MainWrapper from "@/app/MainWrapper";
import ThemeProvider from "./ThemeProvider";
import { ToastContainer } from "react-toastify";
import { ReactNode } from "react";
import "react-toastify/dist/ReactToastify.css";

interface IProps {
  children: JSX.Element | JSX.Element[] | ReactNode;
}

const Provider = ({ children }: IProps) => {
  return (
    <ThemeProvider>
      <MainWrapper>{children}</MainWrapper>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default Provider;
