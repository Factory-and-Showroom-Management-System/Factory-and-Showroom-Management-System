import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import video from '../../assets/login/backsitebackground222.mp4'
import logo from '../../assets/login/mainLogo.png'


export default function UserLogin() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        setLoading(true);
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
    
      if(res.ok){
        if (data.role === 'admin') {
          navigate('/dashboard');
      } else if (data.role === 'sales_manager') {
        navigate('/sales/dashboard');
      } else if (data.role === 'finance_manager') {
        navigate('/finance/dashboard');
      } else(data.role === 'inventory_manager') 
        navigate('/inventory/dashboard');
    
      }
    } catch (error) {
       
    }
  };

  return (
    <div className="min-h-screen mt-20">
    <div className="flex max-w-3xl p-3 mx-auto flx-col md:flex-row md:items-center">
      <div className="">
        <video src={video} autoPlay muted loop></video>
      </div>
  
      <div className="gap">
        <div className="" >
          <img src={logo} alt="logo" />
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
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  
   
  );
}



