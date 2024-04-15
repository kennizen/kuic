const ConnectionStatus = () => {
  return (
    <div className="flex items-center h-[fit-content] gap-4">
      <div className="flex items-center gap-1">
        <i className="ri-circle-line"></i>
        <p className="text-slate-400">Connection status:</p>
      </div>
      <div className="px-3 py-1 rounded-lg border-2 border-green-600 text-sm text-green-400 bg-green-950">
        <p>Connected</p>
      </div>
    </div>
  );
};

export default ConnectionStatus;
