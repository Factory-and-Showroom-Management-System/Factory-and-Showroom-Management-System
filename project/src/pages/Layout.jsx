import React from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/sidebar/Sidebar'

const Layout = ({ children }) => {
  return (
    <React.Fragment >
    <Navbar />
    <div className="columns mt-6 " style={{minHeight: "100vh"}}>
        <div className="column is-2" style={sidebarStyle}>
            <Sidebar />
        </div>
        <div className="column has-background-light">
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