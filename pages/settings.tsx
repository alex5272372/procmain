import { NextPage } from 'next'
import Layout from '../components/Layout'
import { fetchData } from '../lib'
import { useEffect, useState } from 'react'

const Settings: NextPage = () => {
  const [settings, setSettings]: any = useState({})

  useEffect(() => {
    fetchData('/api/settings').then((value: any) => {
      setSettings(value)
    })
  }, [])

  const Main: NextPage<{dispatch: any}> = ({ dispatch }) => {
    return <main className="content m-2">
      <h2>Server settings</h2>
      <p><b>Database URL:</b> {settings.database}</p>
    </main>
  }

  return <Layout Main={Main} />
}

export default Settings
