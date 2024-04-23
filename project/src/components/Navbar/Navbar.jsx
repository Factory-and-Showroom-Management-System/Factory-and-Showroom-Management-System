import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch , useSelector } from 'react-redux'
import { LogOut, reset } from '../../features/authSlice'
import Modal from "../model/Model";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);

  const logout = () => {
    setShowModal(true);
  }

  const confirmLogout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
    setShowModal(false);
  }

  const cancelLogout = () => {
    setShowModal(false);
  }


  return (
    <div>
      <nav className="navbar is-fixed-top has-shadow" role="navigation" aria-label="main navigation"  style={{ backgroundColor: "white" }}>
        <div className="navbar-brand">
          <NavLink to="/dashboard" className="navbar-item">
            {/* <img
              src="https://bulma.io/images/bulma-logo.png"
              width="112"
              height="28"
              alt="logo"
            /> */}
            <h1>Logo</h1>
          </NavLink>

          <a
            href="!#"
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button onClick={logout} className="button is-light">Log out</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {showModal && (
        <Modal 
          message="Do you want to log out?" 
          onConfirm={confirmLogout} 
          onCancel={cancelLogout} 
        />
      )}
    </div>
  );
}

export default Navbar;
