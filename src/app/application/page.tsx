import ConnectionStatus from "./ConnectionStatus";
import UserType from "./UserType";

const Application = () => {
  return (
    <div className="h-[calc(100vh-var(--navbar-height))] text-slate-100 flex justify-center">
      <div className="min-w-[400px] w-[50%] py-8 flex justify-between flex-wrap gap-4">
        <UserType />
        <ConnectionStatus />
      </div>
    </div>
  );
};

export default Application;
