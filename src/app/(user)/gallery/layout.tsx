import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eureka | Gallery',
  description: 'Deconstructing Disinformation',
  keywords: ['Eureka', 'Eureka.live', 'asas', 'dhiu', 
  'darul huda', 'DHPC Arts Fest',
   'dhiu rabee fest', 'rabee fest dhiu', 'Eureka23'
    , 'sibaq' , 'result portal Eureka' , 'gallery Eureka']
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div className="w-full h-full flex">{children}</div>
 
  )
}