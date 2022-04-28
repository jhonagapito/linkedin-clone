import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { handlePostState, useSSRPostsState } from '../atoms/postAtom'
import { UserPost } from '../models/UserPost'
import Input from './Input'
import Post from './Post'

interface Props {
  posts: Array<UserPost>
}
const Feed = ({ posts }: Props) => {
  const [realtimePosts, setRealtimePosts] = useState([])
  const [handlePost, setHandlePost] = useRecoilState(handlePostState)
  const [useSSRPosts, setUseSSRPosts] = useRecoilState(useSSRPostsState)

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      const responseData = await response.json()
      setRealtimePosts(responseData)
      setHandlePost(false)
      setUseSSRPosts(false)
    }

    if (handlePost) {
      fetchPosts()
    }
  }, [handlePost])

  return (
    <div className="max-w-lg space-y-6 pb-24">
      <Input />
      <>
        {!useSSRPosts
          ? realtimePosts.map((post: UserPost) => (
              <Post key={post._id} post={post} />
            ))
          : posts.map((post) => <Post key={post._id} post={post} />)}
      </>
    </div>
  )
}

export default Feed
