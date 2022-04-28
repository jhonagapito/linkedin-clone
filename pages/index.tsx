import Head from 'next/head'
import { getSession, signOut, useSession } from 'next-auth/react'
import { AnimatePresence } from 'framer-motion'
import { useRecoilState } from 'recoil'
import { modalState, modalTypeState } from '../atoms/modalAtom'
import { connectToDatabase } from '../util/mongodb'
import { useRouter } from 'next/router'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import { UserPost } from '../models/UserPost'
import Feed from '../components/Feed'
import Modal from '../components/Modal'

interface Props {
  posts: Array<UserPost>
  articles: Array<any>
}

const Home = ({ posts, articles }: Props) => {
  const [modalOpen, setModalOpen] = useRecoilState(modalState)
  const [modalType, setModalType] = useRecoilState(modalTypeState)
  const router = useRouter()
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login')
    },
  })

  return (
    <div className="h-screen overflow-y-scroll bg-[#F3F2EF] dark:bg-black md:space-y-6">
      <Head>
        <title>Feed | LinkedIn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex justify-center gap-x-5 px-4 sm:px-12">
        <div className="flex flex-col gap-5 md:flex-row">
          <Sidebar />
          <Feed posts={posts} />
        </div>
        <Widgets articles={articles} />
        <AnimatePresence>
          {modalOpen && (
            <Modal handleClose={() => setModalOpen(false)} type={modalType} />
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default Home

export async function getServerSideProps(context: any) {
  // Check if the user is authenticated on the server
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    }
  }

  // Get posts on SSR
  const { db } = await connectToDatabase()
  const posts = await db
    .collection('posts')
    .find()
    .sort({ timestamp: -1 })
    .toArray()

  // Get Google News API
  const results = await fetch(
    `https://newsapi.org/v2/top-headlines?country=ph&apiKey=${process.env.NEWS_API_KEY}`
  ).then((res) => res.json())

  return {
    props: {
      session,
      articles: results.articles,
      posts: posts.map(
        (post: any) =>
          ({
            _id: post._id.toString(),
            input: post.input,
            photoUrl: post.photoUrl,
            username: post.username,
            email: post.email,
            userImg: post.userImg,
            createdAt: post.createdAt,
          } as UserPost)
      ),
    },
  }
}
