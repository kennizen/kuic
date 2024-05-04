"use client";

import { Fragment, useState } from "react";
import { useRtcCtx } from "./page";
import { jsonthrow } from "jsonthrow";

type Sdp = {
  iceCan: RTCIceCandidate[];
  sdp: RTCSessionDescriptionInit | null;
  remoteSdp: RTCSessionDescriptionInit | null;
};

const UserType = () => {
  // states

  const [session, setSession] = useState<Sdp>({
    iceCan: [],
    sdp: null,
    remoteSdp: null,
  });

  // hooks
  const { peerConnection, changeUserType, userType } = useRtcCtx();

  // methods
  async function generateOffer() {
    if (peerConnection === null) return;

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    peerConnection.onicecandidate = handleOnIceCan;
    setSession((prev) => ({ ...prev, sdp: offer }));
  }

  async function handleOnIceCan(event: RTCPeerConnectionIceEvent) {
    if (event.candidate) {
      setSession((prev) => ({ ...prev, iceCan: [...prev.iceCan, event.candidate!] }));
    }
  }

  function handleGenerateDisplayOffer() {
    const [sdp, err] = jsonthrow.stringify(session);

    if (err) {
      console.error("Error is stringifying");
      return "Cannot generate sdp";
    }

    return btoa(sdp);
  }

  async function handleCopySdp() {
    let text = "";

    if (session.iceCan.length > 0 && session.sdp !== null) {
      const [sdp, err] = jsonthrow.stringify(session);

      if (err) {
        console.error("Error is stringifying");
        return "Cannot generate sdp";
      }

      text = sdp;
    }

    await navigator.clipboard.writeText(text ? btoa(text) : "");
  }

  console.log("session", session);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <button
          onClick={() => changeUserType("sender")}
          className={`${
            userType === "sender" ? "bg-blue-600" : ""
          } px-4 py-2 rounded-md outline outline-2 outline-blue-800 hover:bg-blue-600 transition-colors`}
        >
          Sender
        </button>
        <div className="h-[20px] w-[2px] bg-slate-400"></div>
        <button
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
                      {handleGenerateDisplayOffer()}
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
                className="border-2 border-slate-600 rounded-md w-[13rem] h-[8rem] p-2 overflow-hidden bg-slate-900 resize-none text-xs focus-visible:outline-none"
              />
              <button className="px-4 py-2 rounded-md outline outline-2 outline-slate-600 hover:bg-slate-600 transition-colors active:bg-slate-700">
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
                className="border-2 border-slate-600 rounded-md w-[13rem] h-[8rem] p-2 overflow-hidden bg-slate-900 resize-none text-xs focus-visible:outline-none"
              />
              <button className="px-4 py-2 rounded-md outline outline-2 outline-slate-600 hover:bg-slate-600 transition-colors active:bg-slate-700">
                Accept offer
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="border-2 border-slate-600 rounded-md w-[13rem] h-[8rem] p-2 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-xs text-slate-400">No answer</p>
                </div>
              </div>
              <button className="px-4 py-2 rounded-md outline outline-2 outline-slate-600 hover:bg-slate-600 transition-colors active:bg-slate-700">
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
