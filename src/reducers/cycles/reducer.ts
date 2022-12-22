import produce from 'immer'
import { ActionType } from './actions'

export interface Cycles {
  id: string,
  task: string,
  minutesAmount: number
  startDate: Date,
  interruptedDate?: Date,
  finishedDate?: Date
}

interface CycleState {
  cycles: Cycles[],
  activeCycleId: string | null
}

export function cyclesReducer(state: CycleState, action: any) {
	switch (action.type) {
	case ActionType.CREATE_NEW_CYCLE:
		return produce(state, (draft) => {
			draft.cycles.push(action.payload.newCycle)
			draft.activeCycleId = action.payload.newCycle.id
		})
	case ActionType.INTERRUPT_CYCLE: {
		const currentCycleIndex = state.cycles.findIndex(cycle => cycle.id === state.activeCycleId)

		if (currentCycleIndex < 0) return state

		return produce(state, (draft) => {
			draft.activeCycleId = null,
			draft.cycles[currentCycleIndex].interruptedDate = new Date()
		})
	}
	case ActionType.MARK_CURRENT_CYCLE_AS_FINISHED: {
		const currentCycleIndex = state.cycles.findIndex(cycle => cycle.id === state.activeCycleId)

		if (currentCycleIndex < 0) return state

		return produce(state, (draft) => {
			draft.activeCycleId = null,
			draft.cycles[currentCycleIndex].finishedDate = new Date()
		})
	}
	default:
		return state
	}
}