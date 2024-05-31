import styled from 'styled-components'

export const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3.5rem;
  flex: 1;
  gap: 2rem;

  h1 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme['gray-100']};
  }
`

export const HistoryTableContainer = styled.div`
  flex: 1;
  overflow: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background: ${({ theme }) => theme['gray-600']};
      color: ${({ theme }) => theme['gray-100']};
      padding: 1rem;
      text-align: left;
      line-height: 1.6;
      font-size: 0.875rem;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background: ${({ theme }) => theme['gray-700']};
      border-top: 4px solid ${({ theme }) => theme['gray-800']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`

interface StatusProps {
  statusColor: 'green' | 'yellow' | 'red'
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 999px;
    background: ${({ theme, statusColor }) => theme[`${statusColor}-500`]};
  }
`
