import React from 'react'
import { getProviders, signIn } from "next-auth/react"
import { BsSpotify } from "react-icons/bs";

function Login({ providers }) {
    return (
        <div className='flex flex-col bg-black h-screen w-screen justify-center items-center'>
            <BsSpotify className="text-[#1ED760] text-4xl cursor-pointer" />
            {Object.values(providers).map((provider) => (
                <button onClick={() => signIn(provider.id, { callbackUrl: "/" })} key={provider} className='bg-[#1ED760] text-black mt-4 px-4 py-3 rounded-full font-bold'>
                    Sign in with {provider.name}
                </button>
            ))}
        </div>

    )
}

export default Login

export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: {
            providers,
        },
    };
}