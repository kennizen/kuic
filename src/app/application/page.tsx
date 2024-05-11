"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import ConnectionStatus from "./ConnectionStatus";
import UserType from "./UserType";
import WillNotWork from "./WillNotWork";
import FilePicker from "./FilePicker";
import FileCard from "./FileCard";
import ProgressBar from "./ProgressBar";
import ReceivedFiles from "./ReceivedFiles";

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
  handleDeleteFile(idx: number): void;
  userType: Usertype;
  changeUserType(type: Usertype): void;
  connectionStatus: RTCIceConnectionState;
};

type Usertype = "sender" | "receiver";

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
  const [connectionStatus, setConnectionStatus] = useState<RTCIceConnectionState>("new");
  const [dataChannel, setDataChannel] = useState<RTCDataChannel | null>(null);
  const [userType, setUserType] = useState<Usertype>("sender");

  // methods
  function handleDeleteFile(idx: number) {
    const tmpFiles = structuredClone(files);
    tmpFiles.splice(idx, 1);
    setFiles(tmpFiles);
  }

  function changeUserType(type: Usertype) {
    setUserType(type);
  }

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

  // effect
  useEffect(() => {
    if (!peerConnection) return;
    peerConnection.oniceconnectionstatechange = () => {
      setConnectionStatus(peerConnection.iceConnectionState);
    };
  }, [peerConnection]);

  if (!isSupported) return <WillNotWork />;

  return (
    <rtcCTx.Provider
      value={{ peerConnection, dataChannel, handleDeleteFile, userType, changeUserType, connectionStatus }}
    >
      <div className="h-[calc(100dvh-var(--navbar-height))] text-slate-100 flex justify-center">
        <div className="max-w-[60rem] w-full py-8 flex justify-between flex-wrap gap-4 p-4 h-full">
          <div className="flex flex-col gap-24">
            <UserType />
            <ProgressBar />
          </div>
          <div className="flex flex-col gap-10 items-end h-full">
            <ConnectionStatus />
            {userType === "sender" ? (
              <FilePicker onFiles={(files) => setFiles((prev) => [...files, ...prev])}>
                {files.map((file, i) => (
                  <FileCard key={file.name + i} name={file.name} size={file.size} type={file.type} idx={i} />
                ))}
              </FilePicker>
            ) : (
              <ReceivedFiles>
                {files.map((file, i) => (
                  <FileCard key={file.name + i} name={file.name} size={file.size} type={file.type} idx={i} />
                ))}
              </ReceivedFiles>
            )}
          </div>
        </div>
      </div>
    </rtcCTx.Provider>
  );
};

export default Application;
