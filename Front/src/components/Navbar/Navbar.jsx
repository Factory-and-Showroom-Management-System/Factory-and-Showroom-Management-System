import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import image from "../../assets/login/mainLogo.png";
import axios from "axios";
import userImage from "../Profile/user.png";
import ProfileModal from "../Profile/ProfileModal";

const Navbar = () => {
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [user, setUser] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const dateString = now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      });
      setCurrentDateTime(${dateString}, ${timeString});
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/users/profile",
          {
            headers: {
              Authorization: Bearer ${token},
            },
          }
        );
        setUser(response.data.user);
      } catch (error) {
        console.error("There was an error fetching the profile!", error);
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleProfileClick = () => {
    setIsProfileModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsProfileModalOpen(false);
  };

  // Check if the current location is the login page
  const isLoginPage = location.pathname === "/login";
  const isHomepage = location.pathname === "/";

  return (
    <div className="flex justify-between p-0 py-2 bg-[#cdf8da] border-b-2">
      <div className="flex">
        <img src={image} className="h-10 mt-2" alt="Logo" />
        <span className="flex self-center ml-2 text-xl font-semibold whitespace-nowrap">
          DOLPHIN ECO PACK
          <div className="pl-8 text-sm mt-1.5">{currentDateTime}</div>
        </span>
      </div>
      {user && !isLoginPage && !isHomepage && (
        <div className="flex items-center gap-2">
          <div className="font-semibold">User Profile </div>
          <div
            className="flex items-center justify-center w-8 h-8 mr-4 overflow-hidden bg-gray-200 rounded-full cursor-pointer"
            onClick={handleProfileClick}
          >
            <img
              src={user.profileImageUrl || userImage}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      )}
      {isProfileModalOpen &&
        user && ( // Only render profile modal if user is logged in
          <ProfileModal user={user} onClose={handleCloseModal} />
        )}
    </div>
  );
};

export default Navbar;