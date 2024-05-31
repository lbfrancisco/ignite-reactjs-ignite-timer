import styled from 'styled-components'

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  color: ${({ theme }) => theme['gray-100']};
  font-size: 1.125rem;
  line-height: 1.6;
  font-weight: bold;
  flex-wrap: wrap;
`
const InputLayout = styled.input`
  background: transparent;
  border: 0;
  outline: 0;
  height: 2.5rem;

  border-bottom: 2px solid ${({ theme }) => theme['gray-100']};
  color: ${({ theme }) => theme['gray-100']};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;

  &:disabled {
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${({ theme }) => theme['gray-500']};
  }

  &:focus {
    box-shadow: none;
    border-color: ${({ theme }) => theme['green-500']};
  }
`

export const TaskInput = styled(InputLayout)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinutesInput = styled(InputLayout)`
  width: 4rem;
`
