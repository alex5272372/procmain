import { NextPage } from 'next'

const Modal: NextPage = () => {
  return (
    <div id="modal" className="modal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p id="modal__title" className="modal-card-title"></p>
          <button id="modal__button_close" className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <div id="modal__body" className="content"></div>
        </section>
        <footer className="modal-card-foot">
          <button id="modal__button_1" className="button is-success">Button 1</button>
          <button id="modal__button_2" className="button">Button 2</button>
          <button id="modal__button_3" className="button">Button 3</button>
        </footer>
      </div>
    </div>
  )
}

export default Modal
