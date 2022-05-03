import { NextPage } from 'next'
import Layout from '../components/Layout'

const IndexPage: NextPage = () => {
  return <Layout><main className="content">
    <div className='has-text-centered'>
      <h1>PROCMAIN<br />accounting platform</h1>
    </div>
  </main></Layout>
}

export default IndexPage
