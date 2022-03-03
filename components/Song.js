import React from 'react'
import { useRecoilState } from 'recoil';
import { millisToMinutesAndSeconds } from '../lib/time'
import { currentTrackIdState, isPlayingState } from '../atoms/playerAtom';
import spotifyApi from '../lib/spotify';

function Song({ track, order }) {
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

    const playSong = () => {
        setCurrentTrackId(track.track.id);
        setIsPlaying(true);
        spotifyApi.play({
            uris: [track.track.uri]
        });
    }

    return (
        <div onClick={playSong} className='grid grid-cols-1 lg:grid-cols-2 rounded-lg cursor-pointer hover:bg-[#ffffff10] mx-8 sm:m-0 sm:mr-8'>
            <div className='flex items-center rounded-lg space-x-6 p-3 h-16 w-full '>
                <p>{order + 1}</p>
                <img className='h-14 w-14 rounded-xl' src={track.track.album.images[0].url} alt="" />
                <div className='flex flex-col'>
                    <h1 className=' w-48 sm:w-36 lg truncate'>{track.track.name}</h1>
                    <p className='text-[15px] text-gray-500'>{track.track.artists[0].name}</p>
                </div>
            </div>
            <div className='flex items-center justify-between pr-4'>
                <p className='hidden lg:inline text-[15px] text-gray-500'>{track.track.album.name}</p>
                <p className='hidden lg:inline text-[15px]'>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
            </div>
        </div>
    )
}

export default Song