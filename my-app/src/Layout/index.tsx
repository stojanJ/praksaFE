import React from "react";
import Navigationbar from "./Navigationbar";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>
        <Navigationbar />
      </div>
      <div>{children}</div>
    </>
  );
};

export default DefaultLayout;
