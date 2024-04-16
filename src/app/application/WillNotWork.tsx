const WillNotWork = () => {
  return (
    <div className="h-[calc(100%-var(--navbar-height))] text-slate-300 flex flex-col items-center justify-center">
      <p className="text-3xl font-bold">OOPS!</p>
      <p>This browser is not supported.</p>
    </div>
  );
};

export default WillNotWork;
