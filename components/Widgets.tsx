import React from 'react'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded'
import TimeAgo from 'timeago-react'
import Image from 'next/image'
import widgetAd from '../public/assets/widgetAd.png'
interface Props {
  articles: Array<any>
}

const Widgets = ({ articles }: Props) => {
  console.log(articles)
  const openArticle = (link: string) => {
    window.open(link, '_blank')
  }
  return (
    <div className="hidden space-y-2 xl:inline">
      <div className="w-11/12 space-y-2 overflow-hidden rounded-lg border border-gray-300 bg-white py-2.5 dark:border-none dark:bg-[#1D2226]">
        <div className="flex items-center justify-between px-2.5 font-bold">
          <h4>LinkedIn News</h4>
          <InfoRoundedIcon className="h-5 w-5" />
        </div>

        <div className="space-y-1">
          <>
            {articles.slice(0, 5).map((article) => (
              <div
                onClick={() => openArticle(article.url)}
                key={article.url}
                className="flex cursor-pointer items-center space-x-2 px-2.5 py-1 hover:bg-black/10 dark:hover:bg-black/20"
              >
                <FiberManualRecordRoundedIcon className="!h-2 !w-2" />
                <div>
                  <h5 className="max-w-xs truncate pr-10 text-sm font-medium">
                    {article.title}
                  </h5>
                  <TimeAgo
                    datetime={article.publishedAt}
                    className="mt-0.5 text-xs opacity-80 dark:text-white/75"
                  />
                </div>
              </div>
            ))}
          </>
        </div>
      </div>
      <div className="sticky top-20 h-64 w-11/12 rounded-lg border border-gray-300 bg-white px-2.5 dark:border-none dark:bg-[#1D2226]">
        <div className="relative h-full w-full">
          <Image src={widgetAd} layout="fill" objectFit="contain" priority />
        </div>
      </div>
    </div>
  )
}

export default Widgets
