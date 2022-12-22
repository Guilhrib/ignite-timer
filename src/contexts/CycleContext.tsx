import { differenceInSeconds } from 'date-fns'
import React, { createContext, ReactNode, useEffect, useReducer, useState } from 'react'
import { createNewCycleAction, interruptCycleAction, markCurrentCycleAsFinishedAction } from '../reducers/cycles/actions'
import { Cycles, cyclesReducer } from '../reducers/cycles/reducer'

interface CreateCycleData {
  task: string,
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycles[],
  activeCycle: Cycles | undefined,
  activeCycleId: string | null,
  amountSecondsPassed: number,
  setSecondsPassed: (seconds: number) => void,
  markCurrentCysleAsFinished: () => void,
  createNewCycle: (data: CreateCycleData) => void,
  interruptCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CycleContextProviderProps {
  children: ReactNode
}

export function CycleContextProvider({ children }: CycleContextProviderProps) {
	const [cycleState, dispatch] = useReducer( cyclesReducer, {
		cycles: [],
		activeCycleId: null
	}, () => {
		const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state')
		if (storedStateAsJSON) return JSON.parse(storedStateAsJSON)
	})

	const { cycles, activeCycleId } = cycleState
	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

	const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
		if (activeCycle) differenceInSeconds(new Date(), new Date(activeCycle.startDate))

		return 0
	})

	useEffect(() => {
		const stateJSON = JSON.stringify(cycleState)
		localStorage.setItem('@ignite-timer:cycles-state', stateJSON)
	}, [cycleState])

	function markCurrentCysleAsFinished() {
		dispatch(markCurrentCycleAsFinishedAction())
	}

	function setSecondsPassed(seconds: number) {
		setAmountSecondsPassed(seconds)
	}

	function createNewCycle(data: CreateCycleData) {
		const id = String(new Date().getTime())

		const newCycle: Cycles = {
			id,
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date()
		}

		dispatch(createNewCycleAction(newCycle))
		setAmountSecondsPassed(0)
	}

	function interruptCycle() {
		dispatch(interruptCycleAction())
	}
  
	return(
		<CyclesContext.Provider value={{
			cycles,
			activeCycle,
			activeCycleId,
			amountSecondsPassed,
			setSecondsPassed,
			markCurrentCysleAsFinished,
			createNewCycle,
			interruptCycle
		}}>
			{children}
		</CyclesContext.Provider>
	)
}