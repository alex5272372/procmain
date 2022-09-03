import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import ReactDataGrid, { Column, HeaderRendererProps } from 'react-data-grid'
import { fetchData } from '../../../lib'
import { resizeEffect } from '../../../lib/grid'
import GridHeaderRenderer from '../GridHeaderRenderer'
import { TRow, TSummaryRow } from '..'

const ReportGrid: NextPage<{
  main: { columns: Column<TRow, TSummaryRow>[], path: string }, dispatch: any
}> = ({ main: { columns, path }, dispatch }) => {
  const [data, setData]: any = useState(null)

  useEffect(() => {
    dispatch({ type: 'ADD_LOADING', loading: 'ReportGrid' })
    fetchData(path).then((data: any) => {
      dispatch({ type: 'DELETE_LOADING', loading: 'ReportGrid' })
      setData(data)
    }).catch((error: any) => dispatch({ type: 'SET_ERROR', error }))
    return resizeEffect()
  }, [dispatch, path])

  const gridColumns: Column<TRow, TSummaryRow>[] = columns.map((col: Column<TRow, TSummaryRow>) => ({
    ...col,
    headerRenderer: (props: HeaderRendererProps<TRow, TSummaryRow>) => <GridHeaderRenderer {...props} />
  }))

  return <ReactDataGrid
    className="rdg-light"
    columns={gridColumns}
    rows={data?.rows || []}
    summaryRows={data?.summaryRows || []}
    headerRowHeight={40}
  />
}

export default ReportGrid
