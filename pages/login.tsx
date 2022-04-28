import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { getProviders, getSession, signIn, useSession } from 'next-auth/react'

import ExploreIcon from '@mui/icons-material/Explore'
import GroupIcon from '@mui/icons-material/Group'
import OndemandVideoSharpIcon from '@mui/icons-material/OndemandVideoSharp'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'

import HeaderLink from '../components/HeaderLink'
import workPic from '../public/assets/work.svg'
import { useRouter } from 'next/router'

interface Props {
  providers: any
}

function login({ providers }: Props) {  
  return (
    <div className="relative space-y-10">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex items-center justify-around py-4">
        <div className="relative h-10 w-36">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div className="item-center flex divide-gray-300 sm:divide-x">
          <div className="hidden space-x-8 pr-4 sm:flex">
            <HeaderLink Icon={ExploreIcon} text="Discover" />
            <HeaderLink Icon={GroupIcon} text="People" />
            <HeaderLink Icon={OndemandVideoSharpIcon} text="Learning" />
            <HeaderLink Icon={BusinessCenterIcon} text="Jobs" />
          </div>
          <>
          {Object.values(providers).map((provider: any) => (
            <div key={provider.name} className="pl-4">
              <button
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                className="rounded-full border border-blue-700 px-5 py-1.5 font-semibold text-blue-700 transition-all hover:border-2"
                >
                Sign In
              </button>
            </div>
          ))}
          </>
        </div>
      </header>

      <main className="mx-auto flex max-w-screen-lg flex-col items-center xl:flex-row">
        <div className="space-y-6 xl:space-y-10 ">
          <h1 className="max-w-xl pl-4 text-3xl !leading-snug text-amber-800/80 md:text-5xl xl:pl-0">
            Welcome to your professional community
          </h1>
          <div className="space-y-4">
            <div className="intent">
              <h2 className="text-xl">Search for a job</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
            <div className="intent">
              <h2 className="text-xl">Find a person you know</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
            <div className="intent">
              <h2 className="text-xl">Learn a new skill</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
          </div>
        </div>
        <div className="relative top-14 right-5 h-80 w-80 xl:absolute xl:h-[650px] xl:w-[650px]">
          <Image src={workPic} layout="fill" priority />
        </div>
      </main>
    </div>
  )
}

export default login

export async function getServerSideProps(context: any) {
  const providers = await getProviders()
  const session = await getSession(context)
  if(session) {
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    }
  }

  return {
    props: {
      providers,
    },
  }
}
