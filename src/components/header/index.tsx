import { HeaderContainer } from './styles'

import logo from '../../assets/logo.svg'
import { NavLink } from 'react-router-dom'
import { ScrollText, TimerIcon } from 'lucide-react'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logo} alt="" />

      <nav>
        <ul>
          <li>
            <NavLink to="/" title="Timer">
              <TimerIcon />
            </NavLink>
          </li>
          <li>
            <NavLink to="/history" title="Histórico">
              <ScrollText />
            </NavLink>
          </li>
        </ul>
      </nav>
    </HeaderContainer>
  )
}
