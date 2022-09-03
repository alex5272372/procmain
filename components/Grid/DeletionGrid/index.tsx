import { NextPage } from 'next'
import ReactDataGrid, { Column, HeaderRendererProps, SelectColumn } from 'react-data-grid'
import { Key, useEffect } from 'react'
import { resizeEffect } from '../../../lib/grid'
import { TRow } from '..'
import GridHeaderRenderer from '../GridHeaderRenderer'

const DeletionGrid: NextPage<{
  main: { columns: Column<TRow>[], rows: TRow[] }, toolbar: any
}> = ({ main: { columns, rows }, toolbar }) => {
  useEffect(resizeEffect)

  const gridColumns: Column<TRow>[] = columns.map((col: Column<TRow>) => ({
    ...col,
    headerRenderer: (props: HeaderRendererProps<TRow>) => <GridHeaderRenderer {...props} />
  }))

  return <ReactDataGrid
    className="rdg-light"
    columns={[SelectColumn, ...gridColumns]}
    rows={rows}
    rowKeyGetter={(row: TRow): Key => row.key}
    selectedRows={toolbar.selectedRows}
    onSelectedRowsChange={toolbar.setSelectedRows}
    headerRowHeight={40}
  />
}

export default DeletionGrid
