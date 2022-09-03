import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { signIn, signOut } from 'next-auth/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const Header: NextPage<{ toolbarElement?: any, email?: string | null }> = ({ toolbarElement, email }) => {
  const burgerClick = (): void => {
    const burgerEl: HTMLElement | null = document.querySelector('.navbar-burger')
    if (burgerEl) burgerEl.classList.toggle('is-active')
    const menuEl: HTMLElement | null = document.querySelector('.navbar-menu')
    if (menuEl) menuEl.classList.toggle('is-active')
  }

  return <nav className="navbar has-background-light" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link href={'/'}><a className="navbar-item">
        <Image src="/vercel.svg" alt="Procmain Logo" width={160} height={40} />
      </a></Link>

      {email &&
      <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" onClick={burgerClick}>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>}
    </div>
    <div className="navbar-menu">
      {email && toolbarElement}
      {email ? <div className="navbar-end">
        <div className="navbar-item">{email}</div>
        <div className="navbar-item">
          <button className="button" onClick={() => signOut()}>
            <span>Sign out</span>
            <span className="icon"><FontAwesomeIcon icon={faSignOutAlt} /></span>
          </button>
        </div>
      </div> : <div className="navbar-end">
        <div className="navbar-item">
          Not signed in
        </div>
        <div className="navbar-item">
          <button className="button is-warning" onClick={() => signIn()}>
            <span className="icon"><FontAwesomeIcon icon={faSignInAlt} /></span>
            <span>Sign in</span>
          </button>
        </div>
      </div>}
    </div>
  </nav>
}

export default Header
