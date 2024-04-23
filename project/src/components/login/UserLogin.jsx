import React, { useState, useEffect } from "react";
import '../../styles/UserLogin.css'
import '../../styles/App.css'
import video from '../../assets/login/backsitebackground222.mp4'
import logo from '../../assets/login/mainLogo.png'
// import { FaUserShield } from 'react-icons/fa'
// import { BsFillShieldLockFill } from "react-icons/bs";
// import { AiOutlineSwapRight } from "react-icons/ai";
import { useDispatch , useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoginUser, reset } from '../../features/authSlice'




const UserLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ username, password }));
  };

  return (
    <div className='loginPage flex'  style={{  backgroundColor: 'gray' }} >
      <div className="container flex">
          <div className="videoDiv">
              <video src = {video} autoPlay muted loop ></video> 
            
          </div>

          <div className="formDiv flex" >
                <div className="headerDiv" style={{ height: '170px' }}>
                  <img src={logo} alt="logo" />
                  <h3>Welcome Back!</h3>
                </div>
                <div>
             
              <form onSubmit={Auth} className="" style={{ width: '300px' }}>
                {isError && <p className="has-text-centered">{message}</p>}
                
                <div className="field">
                  <label className="label" style={{color: 'black',fontSize: '13px' }}>Username</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input "
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      style={{ height: '40px',fontSize: '11px'}}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" style={{color: 'black',fontSize: '13px' }}>Password</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="********"
                      style={{ height: '40px',fontSize: '12px' }}
                    
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button
                    type="submit"
                    className="button is-success is-fullwidth"
                    style={{ height: '40px',fontSize: '12px' }}
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>
       
     
         
  
                </div>
                
              
          </div>


        </div> 
    </div> 
  )
}

export default UserLogin;
