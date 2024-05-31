import { produce } from 'immer'

import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutes: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.create_new_cycle: {
      const newCycle = action.payload.newCycle as Cycle

      return produce(state, (draft) => {
        draft.cycles.push(newCycle)
        draft.activeCycleId = newCycle.id
      })
    }

    case ActionTypes.interrupt_active_cycle: {
      const activeCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )

      if (activeCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[activeCycleIndex].interruptedDate = new Date()
      })
    }

    case ActionTypes.mark_active_cycle_as_finished: {
      const activeCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )

      if (activeCycleIndex < 0) {
        return state
      }

      document.title = `Ignite Timer`

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[activeCycleIndex].finishedDate = new Date()
      })
    }
    default:
      return state
  }
}
