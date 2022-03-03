import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import spotifyApi from '../lib/spotify';
import SpotifyWebApi from 'spotify-web-api-node';

// const spotifyApi = new SpotifyWebApi({
//     clientId: process.env.SPOTIFY_ID,
//     clientSecret: process.env.SPOTIFY_SECRET,
// });

function useSpotify() {
    const {data: session} = useSession();
    useEffect(() => {
        if(session) {
            if(session.error === "RefreshAccessTokenError") {
                signIn();
            }

            spotifyApi.setAccessToken(session.user.accessToken);
        }
    },[session]);
  return spotifyApi;
}

export default useSpotify