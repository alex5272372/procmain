import { NextPage } from 'next'

const Modal: NextPage<{
  title?: string,
  body: string,
  buttons: {title: string, default?: boolean, next?: any}[]
  dispatch: any
}> = ({ title, body, buttons = [{ title: 'OK', default: true }], dispatch }) => {

  return <div className="modal is-active">
    <div className="modal-background"></div>
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">{title || 'Information'}</p>
        <button className="delete" aria-label="close" onClick={() => dispatch({ type: 'HIDE_MODAL' })}></button>
      </header>
      <section className="modal-card-body">
        <div className="content" dangerouslySetInnerHTML={{ __html: body }} />
      </section>
      <footer className="modal-card-foot">
        {buttons.map((btn: {title: string, default?: boolean, next?: any}, i: number) => {
          const click = () => {
            dispatch({ type: 'HIDE_MODAL' })
            if (btn.next) btn.next()
          }
          const classes = ['button']
          if (btn.default) classes.push('is-success')
          return <button
            key={i} className={classes.join(' ')} onClick={click}
          >{btn.title}</button>
        })}
      </footer>
    </div>
  </div>
}

export default Modal
