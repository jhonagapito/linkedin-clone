import React from 'react'
import Image from 'next/image'
import { Avatar } from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import LogoutIcon from '@mui/icons-material/Logout'
import artDeco from '../public/assets/artdeco.svg'


function Sidebar() {
  const { data: session } = useSession()

  return (
    <div className="min-w-max max-w-lg space-y-2">
      <div className="relative flex flex-col items-center overflow-hidden rounded-lg border border-gray-300 bg-white text-center dark:border-none dark:bg-[#1D2226]">
        <div className="relative h-14 w-full">
          <Image
            src={artDeco}
            layout="fill"
            priority
          />
        </div>

        <Avatar
          src={session?.user?.image ?? ''}
          className="!absolute !top-4 !h-14 !w-14 !cursor-pointer !border-2"
        />
        <div className="mt-5 space-x-0.5 py-4">
          <h4 className="cursor-pointer decoration-purple-700 underline-offset-1 hover:underline">
            {session?.user?.name ?? ''}
          </h4>
          <p className="text-sm text-black/60 dark:text-white/75">
            {session?.user?.email ?? ''}
          </p>
        </div>
        <div className="hidden text-left text-sm dark:text-white/75 md:inline">
          <div className="sidebarButton space-y-0.5 font-medium">
            <div className="flex justify-between space-x-2">
              <h4>Who viewed your profile</h4>
              <span className="text-blue-500">321</span>
            </div>
            <div className="flex justify-between space-x-2">
              <h4>Views of your post</h4>
              <span className="text-blue-500">1,892</span>
            </div>
          </div>
          <div className="sidebarButton">
            <h4 className="text-xs leading-4">
              Access exclusive tools & insights
            </h4>
            <h4 className="font-medium dark:text-white">
              <span className="mr-1 inline-block h-3 w-3 rounded-sm bg-gradient-to-tr from-yellow-700 to-yellow-200" />{' '}
              Try Premium for free
            </h4>
          </div>

          <div className="sidebarButton flex items-center space-x-1.5">
            <BookmarkOutlinedIcon className="!-ml-1" />
            <h4 className="font-medium dark:text-white">My items</h4>
          </div>
          <div
            className="sidebarButton flex items-center space-x-1.5"
            onClick={() => {
              signOut()
            }}
          >
            <LogoutIcon className="!-ml-1" />
            <h4 className="font-medium dark:text-white">Logout</h4>
          </div>
        </div>
      </div>
      <div className="sticky top-20 hidden flex-col space-y-2 overflow-hidden rounded-lg border border-gray-300 bg-white pt-2.5 text-black/70 dark:border-none dark:bg-[#1D2226] dark:text-white/75 md:flex">
        <p className="sidebarLink">Groups</p>
        <div className="flex items-center justify-between">
          <p className="sidebarLink">Events</p>
          <AddRoundedIcon className="!h-5" />
        </div>
        <p className="sidebarLink">Followed Hashtags</p>
        <div className="sidebarButton text-center">
          <h4 className="text-sm font-medium dark:text-white">Discover More</h4>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
