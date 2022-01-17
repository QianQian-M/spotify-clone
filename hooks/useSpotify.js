import { signIn, useSession} from 'next-auth/react';
import {useEffect} from 'react'
import spotifyApi from '../lib/spotify';

// const spotifyApi = new SpotifyWebApi({
//     clientId:process.env.NEXT_PUBLIC_CLIENT_ID,
//     clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
//     // redirectUri:process.env.REDIRECT_URI,
// });

function useSpotify() {

    const {data:session,status} = useSession();
    useEffect(() => {
        if (session){
            if(session.error==="refreshAccessTokenError"){
                signIn();
            }
            spotifyApi.setAccessToken(session.user.accessToken);
        }
      
    }, [session]);

    return spotifyApi;
}

export default useSpotify
