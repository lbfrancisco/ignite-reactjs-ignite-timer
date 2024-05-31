import { CyclesContext } from '@/contexts/cycles-context'
import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'

import { CountdownContainer, Separator } from './styles'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markActiveCycleAsFinished,
    secondsPassed,
    setNewSecondsPassed,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutes * 60 : 0
  const remainingSeconds = activeCycle ? totalSeconds - secondsPassed : 0

  const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, '0')
  const seconds = String(remainingSeconds % 60).padStart(2, '0')

  useEffect(() => {
    if (!activeCycle) return

    const interval = setInterval(() => {
      const diffInSeconds = differenceInSeconds(
        new Date(),
        new Date(activeCycle.startDate),
      )

      if (diffInSeconds > totalSeconds) {
        markActiveCycleAsFinished()

        setNewSecondsPassed(totalSeconds)
        clearInterval(interval)
      } else {
        setNewSecondsPassed(diffInSeconds)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [
    activeCycle,
    activeCycleId,
    totalSeconds,
    markActiveCycleAsFinished,
    setNewSecondsPassed,
  ])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
