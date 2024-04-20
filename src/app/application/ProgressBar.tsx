const ProgressBar = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-end justify-between">
        <p className="text-sm text-slate-400">Transfer progress</p>
        <p className="text-sm text-slate-400">19mbps</p>
      </div>
      <div className="border-2 border-pink-500 h-5 rounded-full relative">
        <div className="w-[60%] bg-pink-900 h-full rounded-full"></div>
        <p className="absolute text-[12px] text-slate-200 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">60%</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">size: 1.2gb</p>
        <p className="text-sm text-slate-400">Time remaining: 19:10min</p>
      </div>
    </div>
  );
};

export default ProgressBar;
