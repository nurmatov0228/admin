import React, { useState, useRef } from "react";
import "./navbar.scss";
import { FaRegUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  const handleHover = () => {
    clearTimeout(timeoutRef.current);
    setShowModal(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowModal(false);
    }, 300);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    toast.warning("You are logged out");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar__container">
          <div></div>
          <div className="navbar__right">
            <div
              className="navbar__admin"
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
            >
              <div className="navbar__user">
                <FaRegUser />
              </div>
              <span>Admin</span>
              {showModal && (
                <div
                  className="navbar__modal"
                  onMouseEnter={handleHover}
                  onMouseLeave={handleLeave}
                >
                  <button onClick={handleLogOut}>LogOut</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
