import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'

export type MenuItem = { path: string, label: string, items?: MenuItem[] }

export const sitemap: MenuItem[] = [
  { path: '/?label=Administration', label: 'Administration', items: [
    { path: '/settings', label: 'Settings' },
    { path: '/list/scheduler', label: 'Scheduler list',
      items: [{ path: '/detail/scheduler', label: 'Scheduler detail' }] },
    { path: '/list/changes', label: 'Changes list',
      items: [{ path: '/detail/change', label: 'Changes detail' }] },
    { path: '/list/deletion', label: 'Delete objects',
      items: [{ path: '/list/links', label: 'Delete links' }] },
    { path: '/list/report_params', label: 'Report parameters list',
      items: [{ path: '/detail/report_params', label: 'Report parameters detail' }] }
  ] },
  { path: '/?label=Catalogs', label: 'Catalogs', items: [
    { path: '/list/users', label: 'Users list',
      items: [{ path: '/detail/user', label: 'User detail' }] }
  ] },
  { path: '/?label=Documents', label: 'Documents', items: [
    { path: '/list/invoices', label: 'Invoices list',
      items: [{ path: '/detail/invoice', label: 'Invoice detail' }] },
    { path: '/list/orders', label: 'Orders list',
      items: [{ path: '/detail/order', label: 'Order detail' }] }
  ] },
  { path: '/?label=Reports', label: 'Reports', items: [
    { path: '/report/profit_loss', label: 'Profit and Loss' }
  ] }
]

const Home: NextPage = () => {
  const router = useRouter()
  const [menuState, setMenuState] = useState(sitemap)

  useEffect(() => {
    if (router.query.label) setMenuState(sitemap.filter(s => s.label === router.query.label))
  }, [router.query.label])

  const Main: NextPage = () => {
    return <main className="tile">
      {menuState.map(navbarItem =>
        <div key={navbarItem.label} className="panel m-2">
          <p className="panel-heading">{navbarItem.label}</p>
          {navbarItem.items && navbarItem.items.map((item: any) =>
            <Link key={item.label} href={item.path}><a className="panel-block">{item.label}</a></Link>
          )}
        </div>
      )}
    </main>
  }

  return <Layout Main={Main} />
}

export default Home
