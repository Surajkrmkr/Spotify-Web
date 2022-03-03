import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import spotifyApi from '../lib/spotify';
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom';
import Playlist from './Playlist';

function Playlists() {
    const spotifyApi = useSpotify();
    const { data: session } = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            });
        }
    }, [session, spotifyApi]);

    return (
        <main>
            <div className='bg-black h-screen pr-7 overflow-x-scroll scrollbar-hide w-min hidden sm:block'>
                <h1 className=' text-white text-[18px] py-4'>PlayLists For You</h1>
                <div className='flex flex-col space-y-4 mb-40 justify-center'>
                    {
                        playlists.map((playlist) => (
                            <Playlist key={playlist.id} playlist={playlist} />
                        ))
                    })
                </div>
            </div>
        </main>
    )
}

export default Playlists