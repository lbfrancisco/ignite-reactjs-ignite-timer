import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ul {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    li {
      width: 3rem;
      height: 3rem;

      display: flex;
      align-items: center;
      justify-content: center;

      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      a {
        color: ${({ theme }) => theme['gray-100']};

        &.active {
          color: ${({ theme }) => theme['green-500']};
        }
      }

      &:hover {
        border-bottom: 3px solid ${({ theme }) => theme['green-500']};
      }
    }
  }
`
