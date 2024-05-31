import type { Cycle } from './reducer'

export enum ActionTypes {
  create_new_cycle = 'create_new_cycle',
  mark_active_cycle_as_finished = 'mark_active_cycle_as_finished',
  interrupt_active_cycle = 'interrupt_active_cycle',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.create_new_cycle,
    payload: {
      newCycle,
    },
  }
}

export function markActiveCycleAsFinishedAction() {
  return {
    type: ActionTypes.mark_active_cycle_as_finished,
  }
}

export function interruptActiveCycleAction() {
  return {
    type: ActionTypes.interrupt_active_cycle,
  }
}
