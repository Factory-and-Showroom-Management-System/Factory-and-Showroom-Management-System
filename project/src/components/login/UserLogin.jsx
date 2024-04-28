// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import { FaUserShield } from 'react-icons/fa';
// import { BsFillShieldLockFill } from 'react-icons/bs';
// import { AiOutlineSwapRight } from 'react-icons/ai';
// import video from '../../assets/login/videotest.mp4';
// import logo from '../../assets/login/mainLogo.png';
// import '../../styles/login.css';



// export default function UserLogin() {
//   const [formData, setFormData] = useState({});
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
 

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:3000/users/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

     

//       if (res.ok) {
//         const data = await res.json();
//         // Redirect based on user role
//         if (data.role === 'admin') {
//           navigate('/admin/dashboard');
//         }else if (data.role === 'sales_manager') {
//             navigate('/sales/dashboard');}
//         //   } else if (data.role === 'finance_manager') {
//         //     navigate('');
//         //   } else if (data.role === 'inventory_manager') {
//         //     navigate('');
//         //   }else  (data.role === 'hr_manager') 
//         //     navigate('');
          
          
//       } else {
//         // Handle login failure
//         console.error("Login failed");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='flex loginPage'>
//     <div className="container flex">
//       <div className="videoDiv">
//         <video src={video} autoPlay muted loop ></video>
//       </div>

//       <div className="flex formDiv">
//         <div className="headerDiv">
//           <img src={logo} alt="logo" />
//           <h3>Welcome Back!</h3>
//         </div>
//           <div className="">
//             <form onSubmit={handleSubmit} className='grid form' >
           
//               <div className="">
//                 <label htmlFor="username" className="">Username</label>
//                 <div className="flex input">
//                 <FaUserShield className='icon' />
//                   <input
//                     type="text"
//                     className="input"
//                     id="username"
//                     onChange={handleChange}
//                     placeholder="Enter your username"
//                   />
//                 </div>
//               </div>
//               <div className="">
//                 <label htmlFor="password" className="">Password</label>
//                 <div className="flex input">
//                 <BsFillShieldLockFill className='icon' />
//                   <input
//                     type="password"
//                     className="input"
//                     id="password"
//                     placeholder="********"
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>
//               <div className="">
//                 <button
//                   type="submit"
//                   className='flex btn'
//                   disabled={loading}
//                 >
//                   {loading ? 'Logging in...' : 'Login'}
//                   <AiOutlineSwapRight className='icon' />
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import video from '../../assets/login/videotest.mp4';
import logo from '../../assets/login/mainLogo.png';
import '../../styles/login.css';

export default function UserLogin() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        // Redirect based on user role
        if (data.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (data.role === 'sales_manager') {
          navigate('/sales/dashboard');
        }else if (data.role === 'finance_manager') {
          navigate('/finance/dashboard');
        }else if (data.role === 'inventory_manager') {
          navigate('/inventory/dashboard');
        }else(data.role === 'hr_manager') 
          navigate('/hr/dashboard');
      } else {
        // Handle login failure
        setError('Incorrect username or password.');
      }
    } catch (error) {
      console.error("Error:", error);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex loginPage'>
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop ></video>
        </div>

        <div className="flex formDiv">
          <div className="headerDiv">
            <img src={logo} alt="logo" />
            <h3>Welcome Back!</h3>
          </div>
          <div className="">
            <form onSubmit={handleSubmit} className='grid form' >
              <div className="">
                <label htmlFor="username" className="">Username</label>
                <div className="flex input">
                  <FaUserShield className='icon' />
                  <input
                    type="text"
                    className="input"
                    id="username"
                    onChange={handleChange}
                    placeholder="Enter your username"
                  />
                </div>
              </div>
              <div className="">
                <label htmlFor="password" className="">Password</label>
                <div className="flex input">
                  <BsFillShieldLockFill className='icon' />
                  <input
                    type="password"
                    className="input"
                    id="password"
                    placeholder="********"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="">
                <button
                  type="submit"
                  className='flex btn'
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                  <AiOutlineSwapRight className='icon' />
                </button>
              </div>
              {error && <p className="error">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
