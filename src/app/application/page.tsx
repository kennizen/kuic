"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import ConnectionStatus from "./ConnectionStatus";
import UserType from "./UserType";
import WillNotWork from "./WillNotWork";
import FilePicker from "./FilePicker";
import FileCard from "./FileCard";
import ProgressBar from "./ProgressBar";
import ReceivedFiles from "./ReceivedFiles";
import ResetConnection from "./ResetConnection";

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
  userType: Usertype;
  connectionStatus: RTCIceConnectionState;
  handleDeleteFile: (idx: number) => void;
  changeUserType: (type: Usertype) => void;
  handleResetConn: () => void;
  init: () => void;
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

  // hooks
  const remoteDataChan = useRef<null | RTCDataChannel>(null);

  // methods
  const handleDeleteFile = useCallback(
    (idx: number) => {
      const tmpFiles = structuredClone(files);
      tmpFiles.splice(idx, 1);
      setFiles(tmpFiles);
    },
    [files]
  );

  const changeUserType = useCallback((type: Usertype) => {
    setUserType(type);
  }, []);

  function handleResetConn() {
    if (!peerConnection || !dataChannel) return;

    dataChannel.close();
    peerConnection.close();

    setPeerConnection(null);
    setDataChannel(null);
    setConnectionStatus("new");
  }

  function init() {
    const con = new RTCPeerConnection(servers);
    const chan = con.createDataChannel("dataChan");

    setPeerConnection(con);
    setDataChannel(chan);
  }

  function handleDataChannelOpen(ev: Event) {
    console.log("channel open", ev);
  }

  function handleDataChannelClose(ev: Event) {
    console.log("channel close", ev);
  }

  function handleDataChannelError(ev: Event) {
    console.log("channel error", ev);
  }

  async function handleDataChannelMsg(ev: MessageEvent<any>) {}

  function handleOnDataChannel(ev: RTCDataChannelEvent) {
    remoteDataChan.current = ev.channel;
    remoteDataChan.current.onopen = handleDataChannelOpen;
    remoteDataChan.current.onclose = handleDataChannelClose;
    remoteDataChan.current.onerror = handleDataChannelError;
    remoteDataChan.current.onmessage = handleDataChannelMsg;
  }

  function handleRequestToSendFile(idx: number) {
    if (peerConnection === null || dataChannel === null || remoteDataChan.current === null) return;
    console.log(files[idx]);
  }

  // effects
  useEffect(() => {
    // @ts-expect-error
    if (window.showSaveFilePicker !== undefined) {
      setIsSupported(true);
      init();
    }
  }, []);

  useEffect(() => {
    if (!peerConnection) return;
    peerConnection.oniceconnectionstatechange = () => {
      setConnectionStatus(peerConnection.iceConnectionState);
    };
    peerConnection.ondatachannel = handleOnDataChannel;
  }, [peerConnection]);

  if (!isSupported) return <WillNotWork />;

  console.log("files", files);
  console.log({ peerConnection, dataChannel });

  return (
    <rtcCTx.Provider
      value={{
        peerConnection,
        dataChannel,
        handleDeleteFile,
        userType,
        changeUserType,
        connectionStatus,
        handleResetConn,
        init,
      }}
    >
      <div className="h-[calc(100dvh-var(--navbar-height))] text-slate-100 flex justify-center">
        <div className="max-w-[60rem] w-full py-8 flex justify-between flex-wrap gap-4 p-4 h-full">
          <div className="flex flex-col justify-between gap-8">
            <UserType />
            <ProgressBar />
            <ResetConnection />
          </div>
          <div className="flex flex-col gap-10 items-end h-full">
            <ConnectionStatus />
            {userType === "sender" ? (
              <FilePicker onFiles={(files) => setFiles((prev) => [...files, ...prev])}>
                {files.map((file, i) => (
                  <FileCard
                    key={file.name + i}
                    name={file.name}
                    size={file.size}
                    type={file.type}
                    idx={i}
                    handleRequestToSendFile={handleRequestToSendFile}
                  />
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
