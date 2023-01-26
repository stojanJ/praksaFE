import React from "react";
import Navbar from "./Navbar";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default DefaultLayout;
