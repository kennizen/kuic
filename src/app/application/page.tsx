"use client";

import { useEffect, useState } from "react";
import ConnectionStatus from "./ConnectionStatus";
import UserType from "./UserType";
import WillNotWork from "./WillNotWork";
import FilePicker from "./FilePicker";
import FileCard from "./FileCard";
import ProgressBar from "./ProgressBar";

const Application = () => {
  // states
  const [isSupported, setIsSupported] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  // lifecycles
  useEffect(() => {
    // @ts-expect-error
    if (window.showSaveFilePicker !== undefined) setIsSupported(true);
  }, []);

  console.log("files", files);

  if (!isSupported) return <WillNotWork />;

  return (
    <div className="h-[calc(100vh-var(--navbar-height))] text-slate-100 flex justify-center">
      <div className="max-w-[60rem] w-full py-8 flex justify-between flex-wrap gap-4 p-4 h-full">
        <div className="flex flex-col gap-24">
          <UserType />
          <ProgressBar />
        </div>
        <div className="flex flex-col gap-10 items-end h-full">
          <ConnectionStatus type="checking" />
          <FilePicker onFiles={(files) => setFiles((prev) => [...files, ...prev])}>
            {files.map((file, i) => (
              <FileCard key={file.name + i} name={file.name} size={file.size} type={file.type} />
            ))}
          </FilePicker>
        </div>
      </div>
    </div>
  );
};

export default Application;
