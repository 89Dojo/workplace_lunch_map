import { AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { RecoilRoot } from 'recoil'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Button } from '@chakra-ui/react'

export default function MyApp({ Component, pageProps }: AppProps) {
  const { pathname, push } = useRouter()
  const [loading, setLoading] = useState(true)
  supabase.auth.onAuthStateChange((_, session) => {
    if (session?.user && (pathname === '/signin' || pathname === '/signup')) {
      push('/')
    } else if (!session?.user && pathname !== '/signup') {
      push('/signin')
    }
  })
  useEffect(() => {
    ;(async () => {
      const user = supabase.auth.user()
      if (user && (pathname === '/signin' || pathname === '/signup')) {
        await push('/')
      } else if (!user && pathname !== '/signup') {
        await push('/signin')
      }
      setLoading(false)
    })()
  }, [])
  return (
    <ChakraProvider>
      <RecoilRoot>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
            rel="stylesheet"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <title>This is Next.js + TypeScript + Chakra + Jest + StoryBook + Recoil Template</title>
          <meta
            property="og:title"
            content="This is Next.js + TypeScript + Chakra+Jest + StoryBook + Recoil Template"
          />
          <meta
            property="og:description"
            content="This template implements Next.js with TypeScript, uses ChakraUI for CSS, uses Jest for testing, StoryBook for cataloging components, and Recoil for state management by tubone24."
          />
          <meta
            name="keywords"
            content="Template, Next.js, TypeScript, Chakra, Jest, StoryBook, Recoil"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://my-nextjs-template-tubone24.vercel.app/" />
          <meta property="og:image" content="https://i.imgur.com/M2PhISt.png" />
          <meta
            property="og:site_name"
            content="This is Next.js + TypeScript + Chakra+Jest + StoryBook + Recoil Template"
          />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@meitante1conan" />
          <meta name="twitter:url" content="https://my-nextjs-template-tubone24.vercel.app/" />
          <meta
            name="twitter:title"
            content="This is Next.js + TypeScript + Chakra+Jest + StoryBook + Recoil Template"
          />
          <meta
            name="twitter:description"
            content="This template implements Next.js with TypeScript, uses ChakraUI for CSS, uses Jest for testing, StoryBook for cataloging components, and Recoil for state management by tubone24."
          />
          <meta name="twitter:image" content="https://i.imgur.com/M2PhISt.png" />
          <meta property="fb:app_id" content="280941406476272" />
          <link rel="canonical" href="https://my-nextjs-template-tubone24.vercel.app/" />
          <link rel="apple-touch-icon" href={'https://i.imgur.com/M2PhISt.png'} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <>
          {loading ? (
            <h1>loading...</h1>
          ) : (
            <>
              <Button onClick={() => supabase.auth.signOut()}>ログアウト</Button>
              <Component {...pageProps} />
            </>
          )}
        </>
      </RecoilRoot>
    </ChakraProvider>
  )
}
