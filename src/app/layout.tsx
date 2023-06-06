'use client'

import './globals.css'
import StyledComponentsRegistry from '@/lib/registry'
import GlobalHeader from '@/lib/globalHeader'

import Header from './components/Header'
import ReactQueryProvider from './ReactQueryProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>SubHow</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Next와 Typescript로 만드는 subway 가이드" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ReactQueryProvider>
          <GlobalHeader>
            <Header />
          </GlobalHeader>
          <StyledComponentsRegistry>
            { children }
          </StyledComponentsRegistry>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
