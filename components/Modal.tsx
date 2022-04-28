import React from 'react'
import { useSession } from 'next-auth/react'
import { useRecoilValue } from 'recoil'
import { motion } from 'framer-motion'
import { getPostState } from '../atoms/postAtom'
import Backdrop from './Backdrop'
import { Avatar, IconButton } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import Form from './Form'
import Post from './Post'
import { UserPost } from '../models/UserPost'

interface Props {
  handleClose: () => void
  type: string
}

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
}

const gifYouUp = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.15,
      ease: 'easeOut',
    },
  },
}

const Modal = ({ handleClose, type }: Props) => {
  const { data: session } = useSession()
  const post: UserPost = useRecoilValue<UserPost>(getPostState)

  return (
    <Backdrop onClick={handleClose}>
      {type === 'dropIn' && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="mx-6 flex w-full max-w-lg flex-col justify-center rounded-xl bg-white dark:bg-[#1D2226] md:-mt-96"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex items-center justify-between border-b border-white/75 px-4 py-2.5">
            <h4 className="text-xl">Create a post</h4>
            <IconButton onClick={handleClose}>
              <CloseRoundedIcon className="h-7 w-7 dark:text-white/75" />
            </IconButton>
          </div>

          <div className="space-y-2 p-4">
            <div className="flex items-center space-x-2">
              <Avatar
                src={session?.user?.image ?? ''}
                className="!h-11 !w-11"
              />
              <h6>{session?.user?.name ?? ''}</h6>
            </div>

            <Form />
          </div>
        </motion.div>
      )}

      {type === 'gifYouUp' && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="mx-6 -mt-[7vh] flex w-full rounded-l-lg bg-[#1D2226]"
          variants={gifYouUp}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.img
            alt=""
            onDoubleClick={handleClose}
            src={post.photoUrl}
            className="max-h-[80vh] w-full max-w-3xl rounded-l-lg object-contain"
          />
          <div className="w-full rounded-r-lg bg-white dark:bg-[#1D2226] md:w-3/5">
            <Post post={post} modalPost />
          </div>
        </motion.div>
      )}
    </Backdrop>
  )
}

export default Modal
