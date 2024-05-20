"use client";

import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useRtcCtx } from "./page";
import { jsonthrow } from "jsonthrow";
import { intoResult } from "@/utils/funtions";
import { toast } from "react-toastify";

type Sdp = {
  iceCan: RTCIceCandidate[];
  sdp: RTCSessionDescriptionInit | null;
  remoteSdp: RTCSessionDescriptionInit | null;
  remoteIceCan: RTCIceCandidate[];
};

const UserType = () => {
  // states
  const [session, setSession] = useState<Sdp>({
    iceCan: [],
    sdp: null,
    remoteSdp: null,
    remoteIceCan: [],
  });

  // hooks
  const { peerConnection, changeUserType, userType, connectionStatus } = useRtcCtx();

  // methods
  async function generateOffer() {
    if (peerConnection === null) return;
    if (peerConnection.localDescription !== null) return;

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    setSession((prev) => ({ ...prev, sdp: offer }));
  }

  async function handleOnIceCan(event: RTCPeerConnectionIceEvent) {
    if (event.candidate) {
      setSession((prev) => ({ ...prev, iceCan: [...prev.iceCan, event.candidate!] }));
    }
  }

  function handleGenerateDisplaySdp() {
    const [sdp, err] = jsonthrow.stringify(session.sdp);

    if (err) {
      console.error("Error is stringifying");
      return;
    }

    return btoa(sdp);
  }

  async function handleCopySdp() {
    let text = "";

    if (session.iceCan.length > 0 && session.sdp !== null) {
      const [sdp, err] = jsonthrow.stringify(session);

      if (err) {
        console.error("Error is stringifying");
        return;
      }

      text = sdp;
    }

    await navigator.clipboard.writeText(text ? btoa(text) : "");
  }

  function handleAcceptRemoteSdpChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const [data, err] = intoResult(atob, e.target.value);

    if (err) {
      toast.error("Invalid offer");
      return;
    }

    const [res, error] = jsonthrow.parse<Sdp>(data);

    if (error || res.sdp === undefined) {
      toast.error("Invalid offer");
      return;
    }

    setSession((prev) => ({ ...prev, remoteSdp: res.sdp, remoteIceCan: res.iceCan }));
  }

  async function handleAcceptOffer() {
    if (!peerConnection || !session.remoteSdp) return;
    if (peerConnection.remoteDescription !== null) return;

    await peerConnection.setRemoteDescription(session.remoteSdp);

    for (let i = 0; i < session.remoteIceCan.length; i++) {
      await peerConnection.addIceCandidate(session.remoteIceCan[i]);
    }

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    setSession((prev) => ({ ...prev, sdp: answer }));
  }

  async function handleAcceptAnswer() {
    if (!peerConnection || !session.remoteSdp) return;
    if (peerConnection.remoteDescription !== null) return;

    await peerConnection.setRemoteDescription(session.remoteSdp);

    for (let i = 0; i < session.remoteIceCan.length; i++) {
      await peerConnection.addIceCandidate(session.remoteIceCan[i]);
    }
  }

  // effects
  useEffect(() => {
    if (!peerConnection) return;
    peerConnection.onicecandidate = handleOnIceCan;
    // peerConnection.oniceconnectionstatechange
  }, [peerConnection]);

  console.log("session", session);
  console.log("state", connectionStatus, userType);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <button
          disabled={connectionStatus === "connected" && userType === "receiver"}
          onClick={() => changeUserType("sender")}
          className={`${
            userType === "sender" ? "bg-blue-600" : ""
          } px-4 py-2 rounded-md outline outline-2 outline-blue-800 hover:bg-blue-600 transition-colors`}
        >
          Sender
        </button>
        <div className="h-[20px] w-[2px] bg-slate-400"></div>
        <button
          disabled={connectionStatus === "connected" && userType === "sender"}
          onClick={() => changeUserType("receiver")}
          className={`${
            userType === "receiver" ? "bg-green-600" : ""
          } px-4 py-2 rounded-md outline outline-2 outline-green-800 hover:bg-green-600 transition-colors`}
        >
          Receiver
        </button>
      </div>
      <div className="flex gap-8">
        {userType === "sender" ? (
          <Fragment key="sender">
            <div className="flex flex-col gap-4">
              <div className="border-2 border-slate-600 rounded-md w-[13rem] h-[8rem] p-2">
                {session.iceCan.length <= 0 && session.sdp === null ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-xs text-slate-400">No offer</p>
                  </div>
                ) : (
                  <div className="group relative overflow-hidden h-full" onClick={handleCopySdp}>
                    <p className="text-xs text-slate-400 break-words group-hover:blur-sm cursor-pointer transition-all select-none">
                      {handleGenerateDisplaySdp()}
                    </p>
                    <i className="ri-clipboard-line absolute top-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-50%] translate-y-[-50%] pointer-events-none text-xl"></i>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={generateOffer}
                  className="px-4 py-2 rounded-md outline outline-2 outline-slate-600 hover:bg-slate-600 transition-colors active:bg-slate-700 flex-1"
                >
                  Generate offer
                </button>
                <button
                  onClick={handleCopySdp}
                  className="px-4 py-2 rounded-md outline outline-2 outline-slate-600 hover:bg-slate-600 transition-colors active:bg-slate-700"
                >
                  <i className="ri-clipboard-line"></i>
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <textarea
                name="data"
                id="data"
                placeholder="paste answer here..."
                className="border-2 border-slate-600 rounded-md w-[13rem] h-[8rem] p-2 overflow-hidden bg-slate-900 resize-none text-xs focus-visible:outline-none text-slate-400"
                onChange={handleAcceptRemoteSdpChange}
              />
              <button
                onClick={handleAcceptAnswer}
                className="px-4 py-2 rounded-md outline outline-2 outline-slate-600 hover:bg-slate-600 transition-colors active:bg-slate-700"
              >
                Accept answer
              </button>
            </div>
          </Fragment>
        ) : (
          <Fragment key="receiver">
            <div className="flex flex-col gap-4">
              <textarea
                name="data"
                id="data"
                placeholder="paste offer here..."
                className="border-2 border-slate-600 rounded-md w-[13rem] h-[8rem] p-2 overflow-hidden bg-slate-900 resize-none text-xs focus-visible:outline-none text-slate-400"
                onChange={handleAcceptRemoteSdpChange}
              />
              <button
                onClick={handleAcceptOffer}
                className="px-4 py-2 rounded-md outline outline-2 outline-slate-600 hover:bg-slate-600 transition-colors active:bg-slate-700"
              >
                Accept offer
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="border-2 border-slate-600 rounded-md w-[13rem] h-[8rem] p-2 overflow-hidden">
                {session.iceCan.length <= 0 && session.sdp === null ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-xs text-slate-400">No answer</p>
                  </div>
                ) : (
                  <div className="group relative overflow-hidden h-full" onClick={handleCopySdp}>
                    <p className="text-xs text-slate-400 break-words group-hover:blur-sm cursor-pointer transition-all select-none">
                      {handleGenerateDisplaySdp()}
                    </p>
                    <i className="ri-clipboard-line absolute top-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-50%] translate-y-[-50%] pointer-events-none text-xl"></i>
                  </div>
                )}
              </div>
              <button
                onClick={handleCopySdp}
                className="px-4 py-2 rounded-md outline outline-2 outline-slate-600 hover:bg-slate-600 transition-colors active:bg-slate-700"
              >
                Copy answer
              </button>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default UserType;
