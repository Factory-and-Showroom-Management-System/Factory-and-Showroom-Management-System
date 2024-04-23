import React, { useState } from "react";
import { NavLink , useNavigate } from 'react-router-dom';
import { IoPerson, IoPricetag , IoHome, IoLogOut} from "react-icons/io5";
import { useDispatch , useSelector } from 'react-redux'
import { LogOut, reset } from '../../features/authSlice'
import Modal from "../model/Model";

function Sidebar() {
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
    <div style={sidebarStyle}> 
<aside className="menu pl-2 has-shadow" >
  <p className="menu-label">General</p>
  <ul className="menu-list" >
    <li ><NavLink to={"/dashboard"} style={sidebarStyle}><IoHome/>Dashboard</NavLink></li>
    
  </ul>

  {user && user.role === "admin" &&(
    <div>
      <p className="menu-label">Admin</p>
      <ul className="menu-list">
      <li><NavLink to={"/users"} style={sidebarStyle}><IoPerson/>Users</NavLink></li>
    
  </ul>
    </div>
  )}
  {user && user.role === "inventory_manager" &&(
    <div>
      <p className="menu-label">Inventory</p>
      <ul className="menu-list">
      <li><NavLink to={""} style={sidebarStyle}><IoPerson/></NavLink></li>
    
  </ul>
    </div>
  )}
  {user && user.role === "finance_manager" &&(
    <div>
      <p className="menu-label">Finance</p>
      <ul className="menu-list">
      <li><NavLink to={"/users"} style={sidebarStyle}><IoPerson/></NavLink></li>
    
  </ul>
    </div>
  )}
  {user && user.role === "hr_manager" &&(
    <div>
      <p className="menu-label">HRM</p>
      <ul className="menu-list">
      <li><NavLink to={"/users"} style={sidebarStyle}><IoPerson/></NavLink></li>
    
  </ul>
    </div>
  )}
  {user && user.role === "sales_manager" &&(
    <div>
      <p className="menu-label">Sales & Product</p>
      <ul className="menu-list">
      <li><NavLink to={"/users"} style={sidebarStyle}><IoPerson/></NavLink></li>
    
  </ul>
    </div>
  )}
 
  <p className="menu-label">Settings</p>
    <ul className="menu-list">
    <li><button onClick={logout} className="button is-white" style={sidebarStyle}><IoLogOut/>Logout</button></li>
    
  </ul>
  </aside>
  {showModal && (
        <Modal 
          message="Do you want to log out?" 
          onConfirm={confirmLogout} 
          onCancel={cancelLogout} 
        />
      )}

    </div>
  )
}

const sidebarStyle = {
  backgroundColor: '#f5fff5', // Green color
  color: 'black', // Text color
};

export default Sidebar;