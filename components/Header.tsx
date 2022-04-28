import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import HeaderLink from './HeaderLink'
import GroupIcon from '@mui/icons-material/Group'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import ChatIcon from '@mui/icons-material/Chat'
import NotificationsIcon from '@mui/icons-material/Notifications'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined'
import { Avatar } from '@mui/material'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
}

function Header() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme, theme } = useTheme()

  useEffect(() => setMounted(true), [])

  return (
    <header className="sticky top-0 z-40 flex items-center justify-around bg-white py-1.5 px-3 focus-within:shadow-lg dark:bg-[#1D2226] ">
      <div className="flex w-full max-w-xs items-center space-x-2">
        {mounted && (
          <>
            {resolvedTheme === 'dark' ? (
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Linkedin_footer.svg"
                width={45}
                height={45}
                className="rounded-sm"
              />
            ) : (
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg"
                width={45}
                height={45}
              />
            )}
          </>
        )}

        <div className="flex w-full items-center space-x-1 rounded py-2.5 px-4 md:bg-[#EEF3F8] dark:md:bg-gray-700">
          <SearchRoundedIcon />
          <input
            type="text"
            placeholder="Search"
            className="hidden flex-grow bg-transparent text-sm placeholder-black/70 focus:outline-none dark:placeholder-white/75 md:inline-flex"
          />
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <HeaderLink Icon={HomeRoundedIcon} text="Home" feed active />
        <HeaderLink Icon={GroupIcon} text="My Network" feed />
        <HeaderLink Icon={BusinessCenterIcon} text="Jobs" feed hidden />
        <HeaderLink Icon={ChatIcon} text="Messaging" feed />
        <HeaderLink Icon={NotificationsIcon} text="Notifications" feed />
        <HeaderLink Icon={Avatar} text="Me" feed avatar hidden />
        <HeaderLink Icon={AppsOutlinedIcon} text="Work" feed hidden />

        {mounted && (
          <div
            className={`relative flex h-6 w-12 flex-shrink-0 cursor-pointer items-center rounded-full bg-gray-600 px-0.5 ${
              resolvedTheme === 'dark' ? 'justify-end' : 'justify-start'
            }`}
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
          >
            <span className="absolute left-0">🌜</span>
            <motion.div
              className="z-40 h-5 w-5 rounded-full bg-white"
              layout
              transition={spring}
            />

            <span className="absolute right-0.5">🌞</span>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
