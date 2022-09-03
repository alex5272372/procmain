import { useDrag, useDrop } from 'react-dnd'
import { HeaderRenderer, HeaderRendererProps } from 'react-data-grid'
import { LegacyRef } from 'react'
import styles from './DraggableHeaderRenderer.module.sass'

interface DraggableHeaderRendererProps<R, SR> extends HeaderRendererProps<R, SR> {
  onColumnsReorder: (sourceKey: string, targetKey: string) => void
}

function DraggableHeaderRenderer<R, SR>({ onColumnsReorder, column, ...props }: DraggableHeaderRendererProps<R, SR>) {
  const [{ isDragging }, drag] = useDrag({
    type: 'COLUMN_DRAG',
    item: { key: column.key },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  })

  const [{ isOver }, drop] = useDrop({
    accept: 'COLUMN_DRAG',
    drop: ({ key }: { key: string }) => onColumnsReorder(key, column.key),
    collect: (monitor) => ({ isOver: monitor.isOver(), canDrop: monitor.canDrop() })
  })

  const ref: LegacyRef<HTMLDivElement> = (ref: HTMLDivElement) => {
    drag(ref)
    drop(ref)
  }

  const containerClasses = [styles.container]
  if (isDragging) containerClasses.push(styles.drag)
  if (isOver) containerClasses.push(styles.over)

  return <div ref={ref} className={containerClasses.join(' ')}>
    <p className={styles.paragraph}>
      <HeaderRenderer column={column} {...props} />
    </p>
  </div>
}

export default DraggableHeaderRenderer
