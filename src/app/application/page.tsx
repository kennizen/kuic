"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import ConnectionStatus from "./ConnectionStatus";
import UserType from "./UserType";
import WillNotWork from "./WillNotWork";
import FilePicker from "./FilePicker";
import FileCard from "./FileCard";
import ProgressBar from "./ProgressBar";

const servers = {
  iceServers: [
    {
      urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"],
    },
  ],
};

type CtxValue = {
  peerConnection: RTCPeerConnection | null;
  dataChannel: RTCDataChannel | null;
};

const rtcCTx = createContext<null | CtxValue>(null);

export function useRtcCtx() {
  const ctx = useContext(rtcCTx);
  if (ctx === null) throw new Error("rtc ctx must be used within rtc provider");
  return ctx;
}

const Application = () => {
  // states
  const [isSupported, setIsSupported] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  const [dataChannel, setDataChannel] = useState<RTCDataChannel | null>(null);

  // lifecycles
  useEffect(() => {
    // @ts-expect-error
    if (window.showSaveFilePicker !== undefined) {
      setIsSupported(true);

      const con = new RTCPeerConnection(servers);
      const chan = con.createDataChannel("dataChan");

      setPeerConnection(con);
      setDataChannel(chan);
    }
  }, []);

  console.log("files", files);

  if (!isSupported) return <WillNotWork />;

  return (
    <rtcCTx.Provider value={{ peerConnection, dataChannel }}>
      <div className="h-[calc(100dvh-var(--navbar-height))] text-slate-100 flex justify-center">
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
    </rtcCTx.Provider>
  );
};

export default Application;
