"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    console.log("working")
    router.replace("/application");
  }, []);

  return <div>home</div>;
}
