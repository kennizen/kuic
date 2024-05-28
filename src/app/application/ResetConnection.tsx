import { useRtcCtx } from "./page";

const ResetConnection = () => {
  // hooks
  const { peerConnection, handleResetConn, init } = useRtcCtx();

  return (
    <>
      {peerConnection === null ? (
        <button
          title="Can be used to reset the connection once connected."
          className="flex gap-2 bg-green-900 w-fit px-3 py-1 rounded-md border border-green-500 text-green-500 bg-opacity-40 disabled:text-slate-500 disabled:border-slate-500 disabled:bg-slate-900 disabled:cursor-not-allowed hover:bg-opacity-60 transition-all"
          onClick={init}
        >
          <i className="ri-refresh-line"></i>
          <span>Create Connection</span>
        </button>
      ) : (
        <button
          title="Can be used to reset the connection once connected."
          disabled={peerConnection === null}
          className="flex gap-2 bg-red-900 w-min px-3 py-1 rounded-md border border-red-500 text-red-500 bg-opacity-40 disabled:text-slate-500 disabled:border-slate-500 disabled:bg-slate-900 disabled:cursor-not-allowed hover:bg-opacity-60 transition-all"
          onClick={handleResetConn}
        >
          <i className="ri-refresh-line"></i> Reset
        </button>
      )}
    </>
  );
};

export default ResetConnection;
