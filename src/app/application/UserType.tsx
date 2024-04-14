"use client"

import { useState } from "react";

type Usertype = "sender" | "receiver";

const UserType = () => {
  // states
  const [userType, setUserType] = useState<Usertype>("sender");

  return <div>UserType</div>;
};

export default UserType;
