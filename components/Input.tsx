import React from 'react'
import { Avatar } from '@mui/material'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'

import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual'
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import ArticleIcon from '@mui/icons-material/Article'
import { modalState, modalTypeState } from '../atoms/modalAtom'
import { useRecoilState } from 'recoil'

const Input = () => {
  const { data: session } = useSession()
  const [modalOpen, setModalOpen] = useRecoilState(modalState)
  const [modalType, setModalType] = useRecoilState(modalTypeState)

  return (
    <div className="space-y-3 rounded-lg border border-gray-300 bg-white p-3 dark:border-none dark:bg-[#1D2226]">
      <div className="flex items-center space-x-2">
        <Avatar
          src={session?.user?.image ?? ''}
          className="h-10 !w-10 cursor-pointer"
        />
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="text-text w-full rounded-full border border-gray-400 py-2.5 px-3 font-medium opacity-80 hover:opacity-100"
          onClick={() => {
            setModalType('dropIn')
            setModalOpen(true)
          }}
        >
          Start a post
        </motion.button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-x-10">
        <button className="inputButton group">
          <PhotoSizeSelectActualIcon className="text-blue-400" />
          <h4 className="opacity-80 group-hover:opacity-100">Photo</h4>
        </button>
        <button className="inputButton group">
          <VideoCameraBackIcon className="text-green-400" />
          <h4 className="opacity-80 group-hover:opacity-100">Video</h4>
        </button>
        <button className="inputButton group">
          <BusinessCenterIcon className="text-blue-300" />
          <h4 className="opacity-80 group-hover:opacity-100">Job</h4>
        </button>
        <button className="inputButton group">
          <ArticleIcon className="text-red-400" />
          <h4 className="whitespace-nowrap opacity-80 group-hover:opacity-100">
            Write Article
          </h4>
        </button>
      </div>
    </div>
  )
}

export default Input
