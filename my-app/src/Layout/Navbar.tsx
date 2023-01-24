import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const Navbar: React.FC<{}> = () => {
  const { user } = useAuth();
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!user.name && (
          <li>
            <Link to="login">Login</Link>
          </li>
        )}
        {!user.name && (
          <li>
            <Link to="register">Register</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
