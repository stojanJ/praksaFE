import React from "react";
import Navigationbar from "./Navigationbar";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>
        <Navigationbar />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default DefaultLayout;
