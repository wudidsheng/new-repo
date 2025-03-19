import React, { PropsWithChildren } from "react";
import Header from "./_components/Header";

export default function Provider({ children }: PropsWithChildren) {
  return (
    <React.Fragment>
      <Header />
      <div className="layout"> {children}</div>
    </React.Fragment>
  );
}
