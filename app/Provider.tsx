"use client";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import Header from "./_components/Header";
import { useUser } from "@clerk/nextjs";

export const UserContext = React.createContext<{
  userInfo?: Record<string, string>;
  checkUser?: () => void;
}>({});
export default function Provider({ children }: PropsWithChildren) {
  const [userInfo, setUserInfo] = useState();
  const { user } = useUser();
  console.log(userInfo);
  const checkUser = useCallback(async () => {
    if (!user?.id) return;
    const body = {
      name: user?.username,
      clerkId: user?.id,
      email: user?.primaryEmailAddress?.emailAddress,
    };
    const request = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const userDetail = await request.json();
    setUserInfo(userDetail);
  }, [user]);

  useEffect(() => {
    if (user?.id) {
      checkUser();
    }
  }, [checkUser, user]);
  return (
    <UserContext value={{ userInfo, checkUser }}>
      <Header />
      <div className="layout"> {children}</div>
    </UserContext>
  );
}
