import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Eureka | Result',
  description: 'In a rapidly evolving contemporary context rife with falsehoods and fake news, Eureka\'23 aims to uncover and present the truth and facts. The Darul Huda U.G. Arts Fest will play a pivotal role in enhancing the academic progress of students across various fields of study and academic activities.',
  keywords: ['Eureka', 'Eureka.live', 'asas', 'dhiu', 
  'darul huda', 'DHPC Arts Fest',
   'dhiu rabee fest', 'rabee fest dhiu', 'Eureka23'
    , 'sibaq' , 'result portal Eureka' , 'results Eureka']
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
