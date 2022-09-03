import { ReactElement } from 'react'
import { Column } from 'react-data-grid'

export type TRow = Record<string, string>
export type TSummaryRow = Record<string, string>

export function exportToCsv(mainElement: ReactElement, fileName: string) {
  const gridProps = mainElement.props.children.props

  const head = gridProps.columns
    .filter((col: Column<TRow, TSummaryRow>) => col.key !== 'select-row')
    .map((col: Column<TRow, TSummaryRow>) => col.key)
  const body = gridProps.rows
    .filter((row: TRow) => gridProps.selectedRows.has(gridProps.rowKeyGetter(row)))
    .map((row: TRow) => head.map((key: string) => row[key]))
  const foot = gridProps.summaryRows ? gridProps.summaryRows.map((row: TSummaryRow) =>
    head.map((key: string) => row[key])) : []

  const serialiseCellValue = (value: unknown) => {
    if (typeof value === 'string') {
      const formattedValue = value.replace(/"/g, '""')
      return formattedValue.includes(',') ? `"${formattedValue}"` : formattedValue
    }
    return value
  }

  const content = [head, ...body, ...foot]
    .map((cells) => cells.map(serialiseCellValue).join(','))
    .join('\n')

  downloadFile(fileName, new Blob([content], { type: 'text/csv;charset=utf-8;' }))
}

function downloadFile(fileName: string, data: Blob) {
  const downloadLink = document.createElement('a')
  downloadLink.download = fileName
  const url = URL.createObjectURL(data)
  downloadLink.href = url
  downloadLink.click()
  URL.revokeObjectURL(url)
}
