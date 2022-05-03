import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const Header: NextPage = () => {
  const { data: session } = useSession()

  const burgerClick = (): void => {
    const burgerEl: HTMLElement | null = document.querySelector('.navbar-burger')
    if (burgerEl) burgerEl.classList.toggle('is-active')
    const menuEl: HTMLElement | null = document.querySelector('.navbar-menu')
    if (menuEl) menuEl.classList.toggle('is-active')
  }

  return <nav className="navbar has-background-light" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link href={'/'}><a className="navbar-item">
        <Image src="/vercel.svg" alt="Vercel Logo" width={200} height={40} />
      </a></Link>

      {session &&
      <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" onClick={burgerClick}>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>}
    </div>

    {session && <div className="navbar-menu">
      <div className="navbar-start">
        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link">Administration</a>
          <div className="navbar-dropdown">
            <Link href="/">
              <a className="navbar-item">Home</a>
            </Link>
          </div>
        </div>
      </div>
    </div>}

    {session ? <div className="navbar-end">
      <div className="navbar-item">
        {session.user?.email}
      </div>
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
  </nav>
}

export default Header
