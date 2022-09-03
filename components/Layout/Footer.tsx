import { NextPage } from 'next'
import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'
import { useState } from 'react'
import { MenuItem, sitemap } from '../../pages'

const Pagination: NextPage<{ count: number, fetchMore: any }> = ({ count, fetchMore }: any) => {
  const [limit, setLimit] = useState(50)
  const [page, setPage] = useState(1)
  const pages = Math.ceil(count / limit)

  const firstPageHandler = () => {
    setPage(1)
    fetchMore({ variables: { limit, page: 1 }})
  }

  const prevPageHandler = () => {
    setPage(prevState => prevState - 1)
    fetchMore({ variables: { limit, page: page - 1 }})
  }

  const nextPageHandler = () => {
    setPage(prevState => prevState + 1)
    fetchMore({ variables: { limit, page: page + 1 }})
  }

  const lastPageHandler = () => {
    setPage(pages)
    fetchMore({ variables: { limit, page: pages }})
  }

  const getNextLimit = (limit: number, prev = false) => {
    const scale = [10, 20, 50, 100, 200, 500, 1000, 2000, 5000]
    const index = scale.findIndex(s => s === limit)

    if (prev && index > 0) return scale[index - 1]
    else if (!prev && index < scale.length - 1) return scale[index + 1]
    else return limit
  }

  const lessLimitHandler = () => {
    const nextLimit = getNextLimit(limit, true)
    setLimit(nextLimit)
    fetchMore({ variables: { limit: nextLimit, page }})
  }

  const moreLimitHandler = () => {
    const nextLimit = getNextLimit(limit)
    setLimit(nextLimit)
    fetchMore({ variables: { limit: nextLimit, page }})
  }

  return <div className="level-right">
    <nav className="level-item pagination m-1" role="navigation" aria-label="pagination">
      <ul className="pagination-list mr-4">
        {page > 2 &&
          <li><button
            onClick={firstPageHandler}
            className="pagination-link"
            aria-label="Goto page 1"
          >1</button></li>}

        {page > 3 &&
          <li><span className="pagination-ellipsis">&hellip;</span></li>}

        {page > 1 &&
          <li><button
            onClick={prevPageHandler}
            className="pagination-link"
            aria-label={'Goto page ' + (page - 1)}
          >{page - 1}</button></li>}

        <li><button
          className="pagination-link is-current"
          aria-label={'Page ' + page}
          aria-current="page"
        >{page}</button></li>

        {pages - page > 0 &&
          <li><button
            onClick={nextPageHandler}
            className="pagination-link"
            aria-label={'Goto page ' + (page + 1)}
          >{page + 1}</button></li>}

        {pages - page > 2 &&
          <li><span className="pagination-ellipsis">&hellip;</span></li>}

        {pages - page > 1 &&
          <li><button
            onClick={lastPageHandler}
            className="pagination-link"
            aria-label={'Goto page ' + pages}
          >{pages}</button></li>}
      </ul>
      <ul className="pagination-list">
        <li><button
          onClick={lessLimitHandler}
          className="pagination-link"
        >–</button></li>
        <li className='m-2'>{limit}</li>
        <li><button
          onClick={moreLimitHandler}
          className="pagination-link"
        >+</button></li>
      </ul>
    </nav>
  </div>
}

const Footer: NextPage<{ count?: number, fetchMore?: any }> = ({ count, fetchMore }) => {
  const router: NextRouter = useRouter()
  const breadcrumb: MenuItem[] = []

  const setBreadcrumb = (sitemap: MenuItem[], breadcrumb: MenuItem[]): boolean => {
    for (const item of sitemap)
      if (item.path === router.asPath || item.items && setBreadcrumb(item.items, breadcrumb)) {
        breadcrumb.unshift(item)
        return true
      }
    return false
  }
  setBreadcrumb(sitemap, breadcrumb)

  return <footer className="level has-background-light m-0">
    <nav className="level-left breadcrumb m-3" aria-label="breadcrumbs">
      <ul className='level-item'>
        <li className={breadcrumb.length === 0 ? 'is-active' : ''}>
          <Link href="/">
            {breadcrumb.length === 0 ? <a aria-current="page">Procmain</a> : <a>Procmaina</a>}
          </Link>
        </li>
        {breadcrumb.map((bc: MenuItem, i: number) =>
          <li key={bc.label} className={i === breadcrumb.length - 1 ? 'is-active' : ''}>
            <Link href={bc.path}>
              {i === breadcrumb.length - 1 ? <a aria-current="page">{bc.label}</a> : <a>{bc.label}</a>}
            </Link>
          </li>
        )}
      </ul>
    </nav>
    {count ? <Pagination count={count} fetchMore={fetchMore} /> : null}
  </footer>
}

export default Footer
