import React, {useState, useEffect} from 'react'
import {HomeIcon,SearchIcon,LibraryIcon,
    PlusCircleIcon,HeartIcon,RssIcon}
     from '@heroicons/react/outline';
import {signOut, useSession} from "next-auth/react"
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from 'recoil';
import {playlistIdState} from "../atoms/playlistAtom";



function Siderbar() {
    const spotifyApi = useSpotify();
    const {data: session, status} = useSession();
    const [playlists, setPlaylists] = useState([]);
    // const [playlistId, setPlaylistId] = useState();
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
    
    
    useEffect(() => {
        if (spotifyApi.getAccessToken()){
            spotifyApi.getUserPlaylists().then((data)=>{
                setPlaylists(data.body.items);
            });
        }
    }, [session,spotifyApi])

    console.log('dfa',playlistId);


    return (
        <div className='text-gray-500 p-5 text-xs lg:text-sm border-r
         border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem]
         lg:max-w-[15rem] hidden md:inline-flex'>
            
            <div className='space-y-4'>
                

                <button className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className ="h-5 w-5 "/>
                    <p>Home</p>
                </button>

                <button className="flex items-center space-x-2 hover:text-white">
                    <SearchIcon className ="h-5 w-5 "/>
                    <p>Search</p>
                </button>

                <button className="flex items-center space-x-2 hover:text-white">
                    <LibraryIcon className ="h-5 w-5 "/>
                    <p>Your Library</p>
                </button>

                {/* <button>
                    <PlusCircleIcon className ="h-5 w-5 "/>
                    <p>Home</p>
                </button> */}

                <hr className='border-t-[0.1px] border-gray-900 '></hr>
                
                <button className="flex items-center space-x-2 hover:text-white">
                    <HeartIcon className ="h-5 w-5 "/>
                    <p>Favorite</p>
                </button>

                <button className="flex items-center space-x-2 hover:text-white">
                    <RssIcon className ="h-5 w-5 "/>
                    <p>Your Eposides</p>
                </button>

                <button className="flex items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className ="h-5 w-5 "/>
                    <p>Create Playlist</p>
                </button>

                <hr className='border-t-[0.1px] border-gray-900'></hr>

                {/* playlist */}
                {playlists.map((playlist)=>(
                    <p key = {playlist.id} onClick={()=>setPlaylistId(playlist.id)} className='cursor-pointer hover:text-white'>
                        {playlist.name}
                    </p> 
                ))}
    

            </div>

        </div>
    )
}

export default Siderbar
