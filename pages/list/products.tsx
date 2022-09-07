import { DocumentNode, gql, useQuery } from '@apollo/client'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { NextPage } from 'next'
import { Column } from 'react-data-grid'
import DataGrid from '../../components/Grid/DataGrid'
import { TRow } from '../../components/Grid'
import IconFormatter from '../../components/Grid/IconFormatter'
import Layout from '../../components/Layout'
import { Key, useState } from 'react'
import DataGridToolbar from '../../components/Grid/DataGrid/Toolbar'
import { statuses } from '../detail/product'

const ProductsList: NextPage = () => {
  const columns: Column<TRow, unknown>[] = [
    { key: 'id', name: 'ID', minWidth: 30, width: 60, resizable: true },
    { key: 'name', name: 'Name', minWidth: 100, width: 200, resizable: true }
  ]

  statuses.forEach((st: { key: string, name: string }) => {
    columns.push({ key: st.key, name: st.name, minWidth: 60, width: 60,
      formatter: ({ row }: { row: TRow }) => row[st.key] ? <IconFormatter icon={faCheck} /> : null })
  })

  const query: DocumentNode = gql`
  query ProductsList($limit: Int, $page: Int) {
    products(limit: $limit, page: $page) {
      id
      name
      isDeleted
      isHidden
    }
    productsCount
  }`

  const { data, error, loading, fetchMore } = useQuery(query, {
    variables: { limit: 50, page: 1 },
    notifyOnNetworkStatusChange: true
  })
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<Key>>(() => new Set())

  const toolbar = {
    selectedRows,
    setSelectedRows
  }

  const main = {
    columns,
    rows: data?.products || [],
    detail: 'product',
    rowKey: ['id']
  }

  const pagination = {
    count: data?.productsCount || 0,
    fetchMore
  }

  const errorsProp: Error[] = []
  if (error) errorsProp.push(error)

  return <Layout
    Toolbar={DataGridToolbar}
    Main={DataGrid}
    toolbar={toolbar}
    main={main}
    loading={{ ProductsList: loading }}
    errors={errorsProp}
    pagination={pagination}
  />
}

export default ProductsList
