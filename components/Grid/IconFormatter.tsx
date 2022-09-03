import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'

const IconFormatter: NextPage<{ icon: IconProp }> = ({ icon }) => {
  return <span className="icon">
    <FontAwesomeIcon icon={icon} />
  </span>
}

export default IconFormatter
