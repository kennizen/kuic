"use client";

import { Fragment, useState } from "react";

type Usertype = "sender" | "receiver";

const UserType = () => {
  // states
  const [userType, setUserType] = useState<Usertype>("sender");

  // handlers
  function changeUserType(type: Usertype) {
    setUserType(type);
  }

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
              <div className="border-2 border-slate-600 rounded-md w-[12rem] h-[8rem] p-2 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-xs text-slate-400">No offer</p>
                </div>
              </div>
              <button className="px-4 py-2 rounded-md outline outline-2 outline-slate-600 hover:bg-slate-600 transition-colors active:bg-slate-700">
                Generate offer
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <textarea
                name="data"
                id="data"
                placeholder="paste answer here..."
                className="border-2 border-slate-600 rounded-md w-[12rem] h-[8rem] p-2 overflow-hidden bg-slate-900 resize-none text-xs focus-visible:outline-none"
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
                className="border-2 border-slate-600 rounded-md w-[12rem] h-[8rem] p-2 overflow-hidden bg-slate-900 resize-none text-xs focus-visible:outline-none"
              />
              <button className="px-4 py-2 rounded-md outline outline-2 outline-slate-600 hover:bg-slate-600 transition-colors active:bg-slate-700">
                Accept offer
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="border-2 border-slate-600 rounded-md w-[12rem] h-[8rem] p-2 overflow-hidden">
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
