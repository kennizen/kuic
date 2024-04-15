"use client";

import Navbar from "@/components/navbar/Navbar";
import { useThemeContext } from "@/providers/ThemeProvider";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const MainWrapper = ({ children }: IProps) => {
  // hooks
  const { mode } = useThemeContext();

  return (
    <div className={`${mode} bg-slate-900 h-[100dvh] overflow-auto`}>
      <Navbar />
      {children}
    </div>
  );
};

export default MainWrapper;
