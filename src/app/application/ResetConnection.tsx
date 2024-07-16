import { useRtcCtx } from "./page";

const ResetConnection = () => {
  // hooks
  const { handleResetConn } = useRtcCtx();

  return (
    <button
      title="Can be used to reset the connection once connected."
      // disabled
      className="flex gap-2 bg-red-900 w-min px-3 py-1 rounded-md border border-red-500 text-red-500 bg-opacity-40 disabled:text-slate-500 disabled:border-slate-500 disabled:bg-slate-900 disabled:cursor-not-allowed hover:bg-opacity-60 transition-all"
      onClick={handleResetConn}
    >
      <i className="ri-refresh-line"></i> Reset
    </button>
  );
};

export default ResetConnection;
