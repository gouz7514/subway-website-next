import './globals.css'
import StyledComponentsRegistry from '@/lib/registry'
import GlobalHeader from '@/lib/globalHeader'

import Header from './components/Header'
import ReactQueryProvider from './ReactQueryProvider'

import { Providers } from '@/store/provider'

function SetDocumentColor() {
  const theme = localStorage.getItem('theme') || 'light'
  
  if (theme === 'light') {
    document.body.dataset.theme = 'light'
  } else {
    document.body.dataset.theme = 'dark'
  }
}

const ScriptTag = () => {
  const stringifyFn = String(SetDocumentColor)

  const fnToRun = `(${stringifyFn})()`

  return <script dangerouslySetInnerHTML={{ __html: fnToRun }} />;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>SubHow - 쉽게 즐기는 써브웨이</title>
        <meta charSet="utf-8" />
        <meta name="title" content="SubHow - 쉽게 즐기는 써브웨이" />
        <meta name="description" content="SubHow와 함께 써브웨이를 즐기세요!" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SubHow - 쉽게 즐기는 써브웨이" />
        <meta property="og:description" content="SubHow와 함께 써브웨이를 즐기세요!" />
        <meta property="og:image" content="https://subway-website-next.vercel.app/image/logo_og_image.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ScriptTag />
        <ReactQueryProvider>
          <Providers>
            <GlobalHeader>
              <Header />
            </GlobalHeader>
            <StyledComponentsRegistry>
                { children }
            </StyledComponentsRegistry>
          </Providers>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
