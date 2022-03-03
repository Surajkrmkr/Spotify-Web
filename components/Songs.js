import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistState, playlistIdState } from '../atoms/playlistAtom';
import Song from './Song';

function Songs() {
    const spotifyApi = useSpotify();
    const { data: session } = useSession();
    const [playlist, setPlaylist] = useRecoilState(playlistState);
    const playlistId = useRecoilValue(playlistIdState);

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId).then((data) => {
            setPlaylist(data.body);
        }).catch((err) => {
            console.log(err);
        });
    }, [playlistId]);

    return (
        <section className='w-full h-screen overflow-x-scroll scrollbar-hide flex flex-col space-y-2 mt-2 mb-64 bg-black text-white'>
            {
                playlist?.tracks?.items.map((track ,i) => (
                    <Song track={track} key={track.track.id} order={i}/>
                ))
            }
        </section>
    )
}

export default Songs