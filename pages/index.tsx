import Head from 'next/head';
import Sidebar from "../component/Sidebar";
import Center from "../component/Center";
import Player from "../component/Player"
import { getSession, GetSessionParams } from 'next-auth/react';
export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
     

 


      <main className='flex'>
        <Sidebar />
        <Center/>
        {/* // sidebar */}
        {/* // center */}
      </main>


      <div className='sticky bottom-0'>      
        <Player />
       

      </div>
    </div>
  )
}

// context??
export async function getServerSideProps(context: GetSessionParams | undefined) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
  
}