import React, { useState, useEffect, useCallback } from 'react'
import { FiHeart } from 'react-icons/fi'
import { FaBackward, FaPlay, FaPause, FaForward } from 'react-icons/fa';
import { ImVolumeMedium } from 'react-icons/im';
import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/playerAtom';
import { debounce } from 'lodash';
import useSpotify from '../hooks/useSpotify'
import useSongInfo from '../hooks/useSongInfo';


function Player() {
    const spotifyApi = useSpotify();
    const songInfo = useSongInfo();
    const { data: session } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(100);

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                setCurrentTrackId(data.body?.item?.id);

                spotifyApi.getMyCurrentPlaybackState().then((data) => {
                    setIsPlaying(data.body?.is_playing);
                })
            })
        }
    }

    const handlePlaysPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body?.is_playing) {
                spotifyApi.pause();
                setIsPlaying(false);
            } else {
                spotifyApi.play();
                setIsPlaying(true);
            }
        });
    }

    const handlePrev = () => {
            spotifyApi.skipToPrevious().then((data) => {
                spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                    setCurrentTrackId(data.body?.item?.id);
                });
            });
    }

    const handleNext = () => {
        spotifyApi.skipToNext().then((data) => {
            spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                setCurrentTrackId(data.body?.item?.id);
            });
        });
    }

    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debouncedAdjustVolume(volume);
        }
    }, [volume]);

    const debouncedAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume).catch((err) => { });
        }, 500), []
    );

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentSong();
            setVolume(50);
        }

    }, [currentTrackId, spotifyApi, session])
    console.log(songInfo);

    return (
        <div className="flex items-center justify-between px-7 bg-[#141414] border-t-2 border-[#ffffff13] sticky h-20 text-gray-300 w-screen bottom-0">
            {/* Music Album details */}
            <div className='flex space-x-3'>
                <img className='h-14 w-14 rounded-xl' src={songInfo?.album.images?.[0]?.url} alt="" />
                <div className="flex flex-col w-28 lg:w-[400px] justify-center">
                    <h1 className='font-bold truncate'>{songInfo?.name}</h1>
                    <h1 className='text-gray-400'>{songInfo?.album.artists[0].name}</h1>
                </div>
                <button className='h-6 hover:scale-125 transition ease-out my-auto items-center'><FiHeart /></button>
            </div>
            {/* Music Control */}
            <div className='flex space-x-6 items-center'>
                <button className='h-6 hover:scale-125 transition ease-out' onClick={handlePrev}><FaBackward /></button>
                <button className='hover:scale-110 transition ease-out h-8 w-8 rounded-full bg-slate-50' onClick={handlePlaysPause}>{
                    isPlaying ? <FaPause className='m-auto text-[17px] text-[#141414]' /> : <FaPlay className='m-auto ml-[12px] text-[17px] text-[#141414]' />
                }</button>
                <button className='h-6 hover:scale-125 transition ease-out' onClick={handleNext}><FaForward /></button>
            </div>
            {/* Volume Control */}
            <div className='hidden sm:flex space-x-3 items-center'>
                <button className='h-6 hover:scale-110 transition ease-out' onClick={() => setVolume(volume - 10)}><ImVolumeMedium /></button>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className='h-1 rounded-full w-20 form-range appearance-none p-0 bg-[#1ED760] scroll-thumb' />
            </div>
        </div>
    )
}

export default Player