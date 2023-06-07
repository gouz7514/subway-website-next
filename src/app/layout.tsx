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
        <meta name="title" content="SubHow - 쉽게 즐기는 써브웨이" />
        <meta name="description" content="SubHow와 함께 써브웨이를 즐기세요!" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SubHow - 쉽게 즐기는 써브웨이" />
        <meta property="og:description" content="SubHow와 함께 써브웨이를 즐기세요!" />
        <meta property="og:image" content="/logo_subhow.png" />
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
