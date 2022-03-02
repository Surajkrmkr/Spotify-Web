import React from 'react'
import UserInfo from './UserInfo'
import Search from './Search'
import Logo from './Logo'

function Header() {
  return (
    <div className=' bg-black flex flex-row justify-center content items-center w-screen pt-5 pr-5'>
      <Logo />
      <Search />
      <UserInfo />
    </div>
  )
}

export default Header