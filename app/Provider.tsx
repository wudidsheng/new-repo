"use client";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import Header from "./_components/Header";
import { useUser } from "@clerk/nextjs";

const UserContext = React.createContext({});
export default function Provider({ children }: PropsWithChildren) {
  const [userInfo, setUserInfo] = useState();
  const { user } = useUser();

  const checkUser = useCallback(async () => {
    const body = {
      name: user?.fullName,
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
    if (user) {
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
