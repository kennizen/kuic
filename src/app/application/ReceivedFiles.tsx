import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const ReceivedFiles = ({ children }: IProps) => {
  return (
    <div className="w-[22rem] border-2 border-slate-600 flex-1 rounded-md overflow-auto p-4 flex flex-col gap-4">
      <p className="px-2 py-1 rounded-md bg-blue-600 text-sm w-fit">Received Files</p>
      {children}
    </div>
  );
};

export default ReceivedFiles;
