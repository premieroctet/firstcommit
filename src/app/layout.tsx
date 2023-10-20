import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import './globals.css'
import Logo from '@/components/Logo'

const font = Raleway({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'First Commit - Dig up the first commit of any GitHub repo',
  description: 'Dig up the first commit of any GitHub repo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <main className="h-screen flex [-webkit-box-align:center] items-center text-center flex-col">
          <a href="https://github.com/premieroctet/firstcommit" rel="noopener" target="_self" aria-label="View source on Github" className="text-[rgb(34,46,124)] fill-[white] absolute border-0 right-0 top-0">
            <svg className="h-20 w-20" viewBox="0 0 250 250" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="#222e7c" className="GithubCorner__octo-arm" ></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="#222e7c" className="GithubCorner__octo-body"></path></svg>
          </a>
          <div className="h-screen flex items-center text-center flex-col">
            <Logo />
            <h1 className="text-7xl font-bold m-0">First Commit</h1>
            <p className="text-[23px] font-semibold mt-0 mb-8 mx-0">Dig up the first commit of any GitHub repo</p>
            {children}
          </div>
          <footer className="fixed font-semibold text-[1.1rem] px-2.5 py-1 right-0 bottom-[5px]">Crafted by <a href="https://www.premieroctet.com/">@premieroctet</a> 🎈 - Code available on <a href="https://github.com/premieroctet/firstcommit">GitHub</a></footer>
        </main>
      </body>
    </html>
  )
}
