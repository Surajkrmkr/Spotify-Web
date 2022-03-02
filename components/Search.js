import React from 'react'
import { RiSearch2Line } from 'react-icons/ri'

function Search() {
    return (
        <div className='flex-[3]'>
            <div className='flex justify-start bg-[#ffffff13] text-white  border-2 pl-2 border-[#ffffff3f] rounded-full text-sm h-10'>
                <RiSearch2Line className='text-[20px] my-auto' />
                <input type="text" className='pl-3 text-[15px] bg-transparent focus:outline-none' placeholder="Search..." /></div>
        </div>
    )
}

export default Search