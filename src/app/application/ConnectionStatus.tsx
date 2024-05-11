import { useRtcCtx } from "./page";

const ConnectionStatus = () => {
  // hooks
  const { connectionStatus } = useRtcCtx();

  // handlers
  function getStatusPill(status: RTCIceConnectionState) {
    switch (status) {
      case "new":
        return (
          <div className="px-3 py-1 rounded-lg border-2 border-slate-600 text-sm text-slate-400 bg-slate-950">
            <p className="capitalize">not connected</p>
          </div>
        );
      case "connected":
        return (
          <div className="px-3 py-1 rounded-lg border-2 border-green-600 text-sm text-green-400 bg-green-950">
            <p className="capitalize">{status}</p>
          </div>
        );
      case "failed":
      case "closed":
      case "disconnected":
        return (
          <div className="px-3 py-1 rounded-lg border-2 border-red-600 text-sm text-red-400 bg-red-950">
            <p className="capitalize">{status}</p>
          </div>
        );
      case "checking":
        return (
          <div className="px-3 py-1 rounded-lg border-2 border-amber-600 text-sm text-amber-400 bg-amber-950">
            <p className="capitalize">{status}...</p>
          </div>
        );
      default:
        break;
    }
  }

  return (
    <div className="flex items-center h-[fit-content] gap-4">
      <div className="flex items-center gap-1">
        <i className="ri-circle-line"></i>
        <p className="text-slate-400">Connection status:</p>
      </div>
      {getStatusPill(connectionStatus)}
    </div>
  );
};

export default ConnectionStatus;
