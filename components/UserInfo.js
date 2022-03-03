import React from 'react';
import { useSession, signOut } from 'next-auth/react'

function UserInfo() {
    const { data: session } = useSession();

    return (
        <div className='flex flex-[1] justify-center'>
            <div className='flex flex-row justify-between bg-[#ffffff13] text-white  border-2 pl-2 border-[#ffffff3f] rounded-full text-sm h-10 w-[200px]'>
                <button className='ml-3' >
                    {session?.user.name}
                </button>
                <img onClick={() => signOut()} className='cursor-pointer h-10 w-10 rounded-full border-2 border-[#ffffff8c]' src={session?.user.image} alt="" />
            </div>
        </div>
    )
}

export default UserInfo