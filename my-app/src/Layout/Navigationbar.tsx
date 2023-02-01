import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Navigationbar: React.FC<{}> = () => {
  const { user } = useAuth();

  return (
    <Navbar bg="dark" variant="dark">
      <Nav className="row align-items-center">
        <div className="container-fluid">
          <ul className="nav navbar-nav">
            {!user.name && (
              <>
                <li className="active nav-item">
                  <Link to="login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="register" className="nav-link">
                    Register
                  </Link>
                </li>
              </>
            )}
            {user.name && (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="createMovie" className="nav-link">
                    Create Movie
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </Nav>
    </Navbar>
  );
};

export default Navigationbar;
