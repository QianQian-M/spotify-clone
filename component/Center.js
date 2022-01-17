import { ChevronDownIcon } from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { useState, useEffect } from 'react';
import {shuffle} from "loadsh";
import { useRecoilState } from 'recoil';
import {playlistIdState, playlistState} from "../atoms/playlistAtom";
import useSpotify from '../hooks/useSpotify';
import Songs from "../component/Songs"

const colors =[
    "from-indigo-200",
    "from-blue-200",
    "from-green-200",
    "from-red-200",
    "from-yellow-200",
    "from-pink-200",
    "from-purple-200",
];

function Center() {

    const spotifyApi = useSpotify();
    const {data:session} = useSession();
    const [color, setColor] = useState(null);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
    const [playlist,setPlaylist] = useRecoilState(playlistState)

    useEffect(() => {
        setColor(shuffle(colors).pop())
       
    }, [playlistId])

    useEffect(()=>{
        spotifyApi.getPlaylist(playlistId).then((data) =>{
            setPlaylist(data.body);
        }).catch((err)=>console.log("something went wrong",err));
    },[spotifyApi,playlistId])

    console.log(playlist)
    return (
        <div className='flex-grow h-screen overflow-scroll scrollbar-hide'>
            <header className='absolute top-5 right-8'>
                <div className='flex iterms-center bg-white
                 space-x-3 opacity-90 hover:opacity-80 cursor-pointer
                 rounded-full p-1 pr-2'
                 onClick={signOut}>
                    <img className="rounded-full w-10 h-10 " src={session?.user.image} alt="" />
                
                    {/* <h2>{session?.user.email}</h2> */}
                    <ChevronDownIcon className='h-5 w-5'/>
                </div>
            </header>

            <section className={`flex items-end space-x-7
                 bg-gradient-to-b to-black ${color} h-80 text-white padding-8 w-full
                 p-8`}>
                <img className="h-44 w-44 shadow-2xl" src={playlist?.images[0]?.url} />
                
                <div>
                    <p>Playlist</p>
                    <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold'>{playlist?.name}</h1>
                </div>
            </section>

            <div>
                
                <Songs />
            </div>

        </div>
    )
}

export default Center
