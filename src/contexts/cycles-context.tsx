import {
  addNewCycleAction,
  interruptActiveCycleAction,
  markActiveCycleAsFinishedAction,
} from '@/reducers/cycles/actions'
import { cyclesReducer, type Cycle } from '@/reducers/cycles/reducer'
import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  useEffect,
  useReducer,
  useState,
  type ReactNode,
} from 'react'

export interface CreateCycleType {
  task: string
  minutes: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  secondsPassed: number
  markActiveCycleAsFinished: () => void
  setNewSecondsPassed: (seconds: number) => void
  interruptActiveCycle: () => void
  createNewCycle: (data: CreateCycleType) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedCyclesStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0',
      )

      if (storedCyclesStateAsJSON) {
        return JSON.parse(storedCyclesStateAsJSON)
      }

      return initialState
    },
  )

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [secondsPassed, setSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  useEffect(() => {
    function saveData() {
      const cyclesStateToString = JSON.stringify(cyclesState)

      localStorage.setItem(
        '@ignite-timer:cycles-state-1.0.0',
        cyclesStateToString,
      )
    }

    saveData()
  }, [cyclesState])

  function markActiveCycleAsFinished() {
    dispatch(markActiveCycleAsFinishedAction())
  }

  function setNewSecondsPassed(seconds: number) {
    setSecondsPassed(seconds)
  }

  function createNewCycle(data: CreateCycleType) {
    const newCycle: Cycle = {
      id: crypto.randomUUID(),
      task: data.task,
      minutes: data.minutes,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    setSecondsPassed(0)
  }

  function interruptActiveCycle() {
    dispatch(interruptActiveCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        secondsPassed,
        markActiveCycleAsFinished,
        setNewSecondsPassed,
        interruptActiveCycle,
        createNewCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
