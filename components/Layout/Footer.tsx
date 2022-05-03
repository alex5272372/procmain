import { NextPage } from 'next'

const Footer: NextPage<{ count?: number, refetch?: any }> = ({ count, refetch }) => {
  return <footer className="level has-background-light m-0">
    <div className="level-left">
      Level left
    </div>
    <div className="level-right">
      Level right
    </div>
  </footer>
}

export default Footer
