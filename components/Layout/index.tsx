import { NextPage } from 'next'
import Header from './Header'
import Footer from './Footer'
import Modal from './Modal'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Error from './Error'
import Loader from './Loader'
import { useEffect, useReducer } from 'react'

const initialLayout = {
  loading: new Set(['Layout'])
}

const reducer = (state: any, action: any) => {
  let loading: Set<string>
  switch (action.type) {

  case 'ADD_LOADING':
    loading = new Set(state.loading.values())
    loading.add(action.loading)
    return { ...state, loading }

  case 'DELETE_LOADING':
    loading = new Set(state.loading.values())
    loading.delete(action.loading)
    return { ...state, loading }

  case 'SET_ERROR':
    return { ...state, error: action.error }

  case 'SHOW_MODAL':
    return { ...state, modal: {
      title: action.title,
      body: action.body,
      buttons: action.buttons
    }}

  case 'HIDE_MODAL':
    return { ...state, modal: null }

  case 'SET_MAIN_ELEMENT':
    return { ...state, mainElement: action.mainElement }

  default:
    return state
  }
}

type LayoutProps = {
  Toolbar?: any
  Main?: any
  toolbar?: Record<string, unknown>
  main?: Record<string, unknown>
  loading?: Record<string, boolean>
  errors?: Error[]
  pagination?: {
    count: number
    fetchMore: any
  }
}

const Layout: NextPage<LayoutProps> = ({ Toolbar, Main, toolbar, main, loading, errors, pagination }) => {
  const { data: session } = useSession()
  const [layout, dispatch] = useReducer(reducer, initialLayout)

  useEffect(() => {
    if (session !== undefined) dispatch({ type: 'DELETE_LOADING', loading: 'Layout' })
  }, [session])

  useEffect(() => {
    for (const key in loading) {
      if (loading[key]) dispatch({ type: 'ADD_LOADING', loading: key })
      else dispatch({ type: 'DELETE_LOADING', loading: key })
    }
  }, [loading])

  useEffect(() => {
    if (errors && errors.length) dispatch({ type: 'SET_ERROR', error: errors[0] })
  }, [errors])

  if (layout.error) return <Error title={layout.error.name} subtitle={layout.error.message}/>

  return <>
    <Head>
      <link rel='icon' href='/favicon.ico' />
      <title>Procmain</title>
    </Head>

    {layout.loading.size !== 0 && <Loader />}
    {session ? <>
      <Header
        toolbarElement={Toolbar
          ? <Toolbar toolbar={toolbar} dispatch={dispatch} mainElement={layout.mainElement} />
          : null}
        email={session.user?.email}
      />
      {Main ? <Main main={main} toolbar={toolbar} dispatch={dispatch} /> : null}
      <Footer count={pagination?.count} fetchMore={pagination?.fetchMore} />
    </> : <Header />}

    {layout.modal
      && <Modal
        title={layout.modal.title}
        body={layout.modal.body}
        buttons={layout.modal.buttons}
        dispatch={dispatch}
      />}
  </>
}

export default Layout
