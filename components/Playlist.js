import React from 'react'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom'

function Playlist({playlist}) {
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
    return (
            <div onClick={() => setPlaylistId(playlist.id)} className='bg-white sm:h-40 sm:w-40 rounded-lg cursor-pointer relative'>
                <img className='h-40 w-40 rounded-lg' src={playlist?.images[0]?.url} alt="" />
                <div className='h-40 w-40 absolute top-0 left-0 bg-gradient-to-b from-transparent to-black'></div>
                <h1 className='text-white absolute bottom-3 left-3 text-[18px] font-bold'>{playlist?.name}</h1>
        </div>
    )
}

export default Playlist