"use client"

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

interface IProps {
  children: ReactNode;
}

type Theme = {
  mode: "dark" | "light";
  setMode: Dispatch<SetStateAction<Theme["mode"]>>;
};

const theme = createContext<Theme | null>(null);

export function useThemeContext() {
  const ctx = useContext(theme);

  if (ctx === null) throw new Error("Theme context must me used within theme provider");

  return ctx;
}

const ThemeProvider = ({ children }: IProps) => {
  const [mode, setMode] = useState<Theme["mode"]>("dark");

  return <theme.Provider value={{ mode, setMode }}>{children}</theme.Provider>;
};

export default ThemeProvider;
