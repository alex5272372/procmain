import { NextPage } from 'next'
import Header from './Header'
import Footer from './Footer'
import Modal from './Modal'
import AccessDenied from './AccessDenied'
import { useSession } from 'next-auth/react'
import Head from 'next/head'

const Layout: NextPage<{
  children: React.ReactNode, count?: number, refetch?: any
}> = ({ children, count, refetch }) => {
  const { data: session } = useSession()

  return <>
    <Head>
      <link rel='icon' href='/favicon.ico' />
      <title>Procmain</title>
    </Head>
    <Header />
    {session ? children : <AccessDenied />}
    <Footer count={count} refetch={refetch} />
    <Modal />
  </>
}

export default Layout
