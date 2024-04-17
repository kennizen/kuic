"use client";

import { useEffect, useState } from "react";
import ConnectionStatus from "./ConnectionStatus";
import UserType from "./UserType";
import WillNotWork from "./WillNotWork";
import FilePicker from "./FilePicker";

const Application = () => {
  // states
  const [isSupported, setIsSupported] = useState(false);

  // lifecycles
  useEffect(() => {
    // @ts-expect-error
    if (window.showSaveFilePicker !== undefined) setIsSupported(true);
  }, []);

  if (!isSupported) return <WillNotWork />;

  return (
    <div className="h-[calc(100vh-var(--navbar-height))] text-slate-100 flex justify-center">
      <div className="max-w-[60rem] w-full py-8 flex justify-between flex-wrap gap-4 p-4">
        <UserType />
        <div className="flex flex-col gap-10 items-end">
          <ConnectionStatus type="checking" />
          <FilePicker onFiles={(files) => console.log(files)}>
            <div>xcd</div>
          </FilePicker>
        </div>
      </div>
    </div>
  );
};

export default Application;
