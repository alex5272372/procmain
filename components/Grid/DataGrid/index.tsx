import { NextPage } from 'next'
import { useRouter } from 'next/router'
import ReactDataGrid, { Column, HeaderRendererProps, SelectColumn } from 'react-data-grid'
import { Key, useEffect, useMemo, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DraggableHeaderRenderer from '../DraggableHeaderRenderer'
import { getTitle, resizeEffect } from '../../../lib/grid'
import { TRow } from '..'

const DataGrid: NextPage<{
  main: { columns: Column<TRow>[], rows: TRow[], detail: string, rowKey: string[] }, toolbar: any, dispatch: any
}> = ({ main: { columns, rows, detail, rowKey }, toolbar, dispatch }) => {
  const router = useRouter()
  const [columnsState, setColumnsState] = useState(columns)

  const draggableColumns = useMemo(() => {
    const HeaderRenderer = (props: HeaderRendererProps<TRow>) =>
      <DraggableHeaderRenderer {...props} onColumnsReorder={handleColumnsReorder} />

    const handleColumnsReorder = (sourceKey: string, targetKey: string) => {
      const sourceColumnIndex = columnsState.findIndex((col: Column<TRow>) => col.key === sourceKey)
      const targetColumnIndex = columnsState.findIndex((col: Column<TRow>) => col.key === targetKey)
      const reorderedColumns = [...columnsState]

      reorderedColumns.splice(targetColumnIndex, 0, reorderedColumns.splice(sourceColumnIndex, 1)[0])
      setColumnsState(reorderedColumns)
    }

    return columnsState.map((col: Column<TRow>) => ({ ...col, headerRenderer: HeaderRenderer }))
  }, [columnsState])

  const mainElement = useMemo(() => {
    const rowKeyGetter = (row: TRow): Key => {
      const { key } = getTitle(
        detail,
        row[rowKey[0]],
        rowKey[1] ? row[rowKey[1]] : undefined,
        rowKey[2] ? row[rowKey[2]] : undefined
      )
      return key
    }

    const onRowDoubleClick = (row: TRow): void => {
      router.push(String(rowKeyGetter(row)))
    }

    return <DndProvider backend={HTML5Backend}>
      <ReactDataGrid
        className="rdg-light"
        columns={[SelectColumn, ...draggableColumns]}
        rows={rows}
        rowKeyGetter={rowKeyGetter}
        selectedRows={toolbar.selectedRows}
        onSelectedRowsChange={toolbar.setSelectedRows}
        headerRowHeight={40}
        onRowDoubleClick={onRowDoubleClick}
      />
    </DndProvider>
  }, [detail, draggableColumns, router, rowKey, rows, toolbar.selectedRows, toolbar.setSelectedRows])

  useEffect(() => {
    dispatch({ type: 'SET_MAIN_ELEMENT', mainElement })
    return resizeEffect()
  }, [dispatch, mainElement])

  return mainElement
}

export default DataGrid
