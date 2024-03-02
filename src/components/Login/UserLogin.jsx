import React from 'react'
import '../../styles/UserLogin.css'
import '../../styles/App.css'
import { Link } from 'react-router-dom'

// import our assets login 
import video from '../../assets/Login/backsitebackground222.mp4'
import logo from '../../assets/Login/mainLogo.png'

//import react icons
import { FaUserShield } from 'react-icons/fa'
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";



const UserLogin = () => {
  return (
    <div className='loginPage flex'>
      <div className="container flex">
          <div className="videoDiv">
              <video src = {video} autoPlay muted loop ></video> 
              
              {/* <div className='textDiv'>
                <h2 className='title'>Creat and Seell Extraordinary Products</h2>
                <p>Adopt the peace of natuer!</p>
              </div>
              
              <div className="footerDiv flex">
                <span className='text'>Don't have an account?</span>
                
                <Link to={'/register'}>
                <button className='btn'>Sign Up</button>
                </Link>
              </div> */}
          </div>

          <div className="formDiv flex">
                <div className="headerDiv">
                  <img src={logo} alt="logo" />
                  <h3>Welcome Back!</h3>
                </div>
                <form action='' className='form grid'>
                  <span className='showMessage'>Login Status will go here</span>
                <div className="inputDiv">
                  <label htmlFor="username">Username</label>
                  <div className="input flex">
                      <FaUserShield className = 'icon'/>
                      <input type="text" id="username" placeholder="Enter your username" />
                  </div>        
                </div>
                
                <div className="inputDiv">
                  <label htmlFor="password">Password</label>
                  <div className="input flex">
                      <BsFillShieldLockFill className = 'icon'/>
                      <input type="password" id="password" placeholder="Enter your password" />
                  </div>        
                </div>


              <button type='submit' className='btn flex'>
                <span>Login</span>
                <AiOutlineSwapRight className = 'icon'/>
              </button>

              <span className='forgotpassword'>
                Forgot your passoword? <a href='/'>Click Here</a>
              </span>

                </form>
          </div>


        </div> 
    </div> 
  )
}

export default UserLogin;
