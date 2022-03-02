import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <>
      {/* <div className='bg-gray-500 min-h-screen'> */}
      <div className='bg-[#242424] min-h-screen overflow-hidden'>
        <div className='flex flex-col'>
          {/* Header */}
          <Header />
          {/* Sidebar */}
          <Sidebar />
        </div>
      {/* main */}
      {/* footer - player */}
      </div>
    </>
  )
}
