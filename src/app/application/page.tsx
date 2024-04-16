"use client";

import { useEffect, useState } from "react";
import ConnectionStatus from "./ConnectionStatus";
import UserType from "./UserType";
import WillNotWork from "./WillNotWork";

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
      <div className="min-w-[400px] w-[50%] py-8 flex justify-between flex-wrap gap-4">
        <UserType />
        <ConnectionStatus type="checking" />
      </div>
    </div>
  );
};

export default Application;
