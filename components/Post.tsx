import { Avatar, IconButton } from '@mui/material'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import TimeAgo from 'timeago-react'

import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined'
import ThumbUpOffAltRoundedIcon from '@mui/icons-material/ThumbUpOffAltRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'

import { modalState, modalTypeState } from '../atoms/modalAtom'
import { getPostState, handlePostState } from '../atoms/postAtom'
import { UserPost } from '../models/UserPost'

interface Props {
  post: UserPost
  modalPost?: boolean
}

const Post = ({ post, modalPost = false }: Props) => {
  const { data: session } = useSession()
  const [modalOpen, setModalOpen] = useRecoilState(modalState)
  const [modalType, setModalType] = useRecoilState(modalTypeState)
  const [postState, setPostState] = useRecoilState(getPostState)
  const [showInput, setShowInput] = useState(false)
  const [liked, setLiked] = useState(false)
  const [handlePost, setHandlePost] = useRecoilState(handlePostState)

  const truncate = (val: string, n: number) =>
    val?.length > n ? val.substring(0, n - 1) + '...see more' : val

  const deletePost = async () => {
    const response = await fetch(`/api/posts/${post._id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })

    setHandlePost(true)
    setModalOpen(false)
  }
  return (
    <div
      className={`${
        modalPost ? 'rounded-r-lg' : 'rounded-lg'
      } space-y-2 border border-gray-300 bg-white py-2.5 dark:border-none dark:bg-[#1D2226]`}
    >
      <div className="flex cursor-pointer items-center px-2.5">
        <Avatar src={post.userImg} className="!h-10 !w-10 cursor-pointer" />
        <div className="mr-auto ml-2 leading-none">
          <h6 className="font-medium hover:text-blue-500 hover:underline">
            {post.username}
          </h6>
          <p className="text-sm opacity-80 dark:text-white/75">{post.email}</p>
          <TimeAgo
            datetime={post.createdAt}
            className="text-xs opacity-80 dark:text-white/75"
          />
        </div>
        {modalPost ? (
          <IconButton onClick={() => setModalOpen(false)}>
            <CloseRoundedIcon className="h-7 w-7 dark:text-white/75" />
          </IconButton>
        ) : (
          <IconButton>
            <MoreHorizRoundedIcon className="h-7 w-7 dark:text-white/75" />
          </IconButton>
        )}
      </div>

      {post.input && (
        <div className="break-all px-2.5 md:break-normal">
          {modalPost || showInput ? (
            <p onClick={() => setShowInput(false)}>{post.input}</p>
          ) : (
            <p onClick={() => setShowInput(true)}>
              {truncate(post.input, 150)}
            </p>
          )}
        </div>
      )}

      {post.photoUrl && !modalPost && (
        <img
          src={post.photoUrl}
          alt=""
          className="w-full cursor-pointer"
          onClick={() => {
            setModalType('gifYouUp')
            setPostState(post)
            setModalOpen(true)
          }}
        />
      )}

      <div className="mx-2.5 flex items-center justify-evenly border-t border-gray-300 pt-2 text-black/60 dark:border-t dark:text-white/75">
        {modalPost ? (
          <button className="postButton">
            <CommentOutlinedIcon />
            <h4>Comment</h4>
          </button>
        ) : (
          <button
            className={`postButton ${liked && 'text-blue-500'}`}
            onClick={() => setLiked(!liked)}
          >
            {liked ? (
              <ThumbUpOffAltRoundedIcon className="-scale-x-100" />
            ) : (
              <ThumbUpOffAltOutlinedIcon className="-scale-x-100" />
            )}

            <h4>Like</h4>
          </button>
        )}

        {session?.user?.email === post.email ? (
          <button
            className="postButton hover:text-red-400"
            onClick={deletePost}
          >
            <DeleteRoundedIcon />
            <h4>Delete post</h4>
          </button>
        ) : (
          <button className="postButton ">
            <ReplyRoundedIcon className="-scale-x-100" />
            <h4>Share</h4>
          </button>
        )}
      </div>
    </div>
  )
}

export default Post
