import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


export default function UserLogin() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
        }else if (data.role === 'sales_manager') {
            navigate('/sales/dashboard');}
        //   } else if (data.role === 'finance_manager') {
        //     navigate('');
        //   } else if (data.role === 'inventory_manager') {
        //     navigate('');
        //   }else  (data.role === 'hr_manager') 
        //     navigate('');
          
          
      } else {
        // Handle login failure
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20 ">
      <div className="flex max-w-3xl p-3 mx-auto flx-col md:flex-row md:items-center">
        <div className="">
          {/* <video src={video} autoPlay muted loop></video> */}
        </div>
        <div className="">
          <div className="" >
            {/* <img src={logo} alt="logo" /> */}
            {/* <h3 className="">Welcome Back!</h3> */}
          </div>
          <div className="">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" >
              <div className="">
                <label htmlFor="username" className="">Username</label>
                <div className="">
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
                <div className="">
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
                  className=""
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}