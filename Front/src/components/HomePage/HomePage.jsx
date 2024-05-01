import React from 'react'
import video from "../../assets/login/loginvideo.mp4";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Button } from "flowbite-react";
import { Link } from 'react-router-dom';


const HomePage = () => {
  return (
    <div className="grid m-8 mt-36 justify-items-center">
      <div className="grid m-8 size-6/12 ">
        <div className="">
          <video src={video} autoPlay muted loop></video>
        </div>
        <div className="grid mt-8 justify-items-center">
          <Link to="/login"><Button size="xl" gradientDuoTone="greenToBlue">
            Login To System
            <HiOutlineArrowRight className="w-5 h-5 ml-2" />
          </Button>
          </Link>
        </div>
      </div>
      </div>
  )
}

export default HomePage