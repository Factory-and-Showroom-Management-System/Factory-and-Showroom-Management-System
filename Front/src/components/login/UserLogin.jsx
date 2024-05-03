import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import logo from "../../assets/login/mainLogo.png";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Alert, Button } from "flowbite-react";
import { useDispatch , useSelector } from "react-redux";
import { signInStart,signInFailure , signInSuccess } from "../../redux/user/userSlice";



export default function UserLogin() {
  const [formData, setFormData] = useState({});

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading , error : errorMessage} = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      return dispatch(signInFailure("Please fill in all fields."));
     
    }
    // setLoading(true);

    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // const data = await res.json();
      // if(data.success === false){
      //   setError("Incorrect username or password.");
      //   dispatch(signInFailure(data.message));
      // }

      if (res.ok) {
        const data = await res.json();
        dispatch(signInSuccess(data));
        // const data = await res.json();
        // Redirect based on user role
        if (data.role === "admin") {
          navigate("/admin?tab=admindash");
        } else if (data.role === "sales_manager") {
          navigate("/sales?tab=salesdash");
        } else if (data.role === "finance_manager") {
          navigate("/finance?tab=financedash");
        } else if (data.role === "inventory_manager") {
          navigate("/inventory?tab=inventorydash");
        } else if (data.role === "hr_manager") {
          navigate("/hr?tab=hrdash");
        }
        
      } 
      else {
        const data = await res.json();
      if (res.status === 401) {
        // Invalid username or password
        dispatch(signInFailure("Invalid username or password."));
      } else {
        // Other server-side errors
        dispatch(signInFailure(data.message))
        
      }
    }
    } catch (error) {
      // console.error("Error:", error);
      // setError("An error occurred. Please try again later.");
      dispatch(signInFailure(error.message));
    } 
  };

  return (
    //drop-shadow-2xl

    <div className="grid justify-items-center ">
      <div className="grid w-2/4 p-8 m-8 shadow-lg mt-36 justify-items-center ">
        <div className="flex flex-col max-w-xl gap-5 p-3 mx-auto border-indigo-500 md:flex-row md:items-center ">
          <div className="flex-1 ">
            <img src={logo} alt="logo" />
          </div>
          {/* <h3>Welcome Back!</h3> */}
          <div className="flex-1 ">
            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
              <div className="">
                <div className="flex gap-2">
                  <div className="grid w-10 h-10 pt-2 pl-1 bg-green-400 rounded-full justify-items-center">
                    <FaUserShield className="text-white icon size-6" />
                  </div>

                  <div className="flex">
                    <input
                      type="text"
                      className="rounded-full w-72 "
                      id="username"
                      onChange={handleChange}
                      placeholder="Enter your username"
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="flex gap-2 ">
                  <div className="grid w-10 h-10 pt-2 pl-0 bg-green-400 rounded-full justify-items-center">
                    <BsFillShieldLockFill className="text-white icon size-6" />
                  </div>
                  <div className="flex">
                    <input
                      type="password"
                      className="rounded-full w-72"
                      id="password"
                      placeholder="Enter your password"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="grid w-10 h-10 pt-[6px] bg-green-400 rounded-full pl-[1px] justify-items-center">
                  <AiOutlineSwapRight className="text-white icon size-6" />
                </div>
                <Button
                  type="submit"
                  className="h-10 rounded-full rounded-ful w-72 "
                  disabled={loading}
                  size="xl"
                  gradientDuoTone="greenToBlue"
                >
                  
                  {loading ? "Logging in..." : "LOGIN"}
                 
                </Button>
              </div>
              
              {error && <p className="error">{error}</p>}
              
              {errorMessage && (
                <Alert className="mt-5" color='failure'>
                  {errorMessage}
                </Alert>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
