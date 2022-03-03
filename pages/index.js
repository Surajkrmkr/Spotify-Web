import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Playlists from '../components/Playlists'
import Player from '../components/Player'
import Songs from '../components/Songs'

export default function Home() {
  return (
    <>
      {/* <div className='bg-gray-500 min-h-screen'> */}
      <div className='bg-black h-screen overflow-hidden'>
          {/* Header */}
          <Header />
          <div className='flex'>
            {/* Sidebar */}
            <Sidebar />
            {/* main */}
            <Songs/>
            <Playlists />
        </div>
        {/* footer - player */}
        <Player/>
      </div>
    </>
  )
}
