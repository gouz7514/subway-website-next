'use client'

import './globals.css'
import StyledComponentsRegistry from '@/lib/registry'

import Header from './components/Header'

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
        <StyledComponentsRegistry>
          <Header />
          { children }
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
