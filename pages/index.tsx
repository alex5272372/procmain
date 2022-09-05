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
      items: [{ path: '/detail/user', label: 'User detail' }] },
    { path: '/list/products', label: 'Products list',
      items: [{ path: '/detail/product', label: 'Product detail' }] },
    { path: '/list/accounts', label: 'Chart of Accounts',
      items: [{ path: '/detail/account', label: 'Account detail' }] }
  ] },
  { path: '/?label=Documents', label: 'Documents', items: [
    { path: '/list/suppliers_invoices', label: 'Suppliers invoices list',
      items: [{ path: '/detail/supplier_invoice', label: 'Supplier invoice detail' }] },
    { path: '/list/sales_invoices', label: 'Sales invoices list',
      items: [{ path: '/detail/sale_invoice', label: 'Sale invoice detail' }] },
    { path: '/list/warehouse', label: 'Warehouse journal',
      items: [{ path: '/detail/general_ledger', label: 'General Ledger detail' }] },
    { path: '/list/general_ledger', label: 'General Ledger',
      items: [{ path: '/detail/general_ledger', label: 'General Ledger detail' }] }
  ] },
  { path: '/?label=Reports', label: 'Reports', items: [
    { path: '/report/trial_balance', label: 'Trial balance' },
    { path: '/report/balance_sheet', label: 'Balance sheet' },
    { path: '/report/cash_flow', label: 'Cash flow statement' },
    { path: '/report/income', label: 'Income statement' }
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
