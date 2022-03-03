import React from 'react'
import { HiHome, } from "react-icons/hi";
import { RiCompassFill } from "react-icons/ri";
import { IoMdMic } from "react-icons/io";
import { BsFillSuitHeartFill } from "react-icons/bs";

function Sidebar() {
    return (
        <div className='hidden  bg-black w-20 h-full p-5 sm:flex flex-col items-center'>
            <div className='cursor-pointer text-[25px] text-gray-400 flex flex-col space-y-5 mt-6'>
                <HiHome className='hover:text-white hover:scale-125 transition ease-out text-white' />
                <RiCompassFill className='hover:text-white hover:scale-125 transition ease-out' />
                <IoMdMic className='hover:text-white hover:scale-125 transition ease-out' />
                <BsFillSuitHeartFill className='text-[20px] m-auto hover:text-white hover:scale-125 transition ease-out' />
            </div>
        </div>
    )
}

export default Sidebar