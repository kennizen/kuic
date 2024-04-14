import UserType from "./UserType";

const Application = () => {
  return (
    <div className="h-[calc(100vh-var(--navbar-height))] text-slate-100 flex justify-center">
      <div className="min-w-[800px] w-[60%]">
        <UserType />
      </div>
    </div>
  );
};

export default Application;
