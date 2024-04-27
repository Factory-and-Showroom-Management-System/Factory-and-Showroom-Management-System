import React from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/sidebar/Sidebar'

const Layout = ({ children }) => {
  return (
    <React.Fragment >
    <Navbar />
    <div className="grid grid-cols-2 mt-6" style={{minHeight: "100vh"}}>
    <div className="col-span-1" style={sidebarStyle}>
       
    </div>
    <div className="col-span-1 bg-gray-100">
        <main>{children}</main>
    </div>
</div>
    
</React.Fragment>
  )
}

const sidebarStyle = {
  backgroundColor: '#f5fff5', // Green color
  color: 'black', // Text color
};

export default Layout