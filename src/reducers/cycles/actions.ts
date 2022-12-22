import { Cycles } from './reducer'

export enum ActionType {
  CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED'
}

export function createNewCycleAction(newCycle: Cycles) {
	return {
		type: ActionType.CREATE_NEW_CYCLE,
		payload: {
			newCycle
		}
	}
}

export function interruptCycleAction() {
	return {
		type: ActionType.INTERRUPT_CYCLE
	}
}

export function markCurrentCycleAsFinishedAction() {
	return {
		type: ActionType.MARK_CURRENT_CYCLE_AS_FINISHED
	}
}