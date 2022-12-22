import { differenceInSeconds } from 'date-fns'
import React, { useContext, useEffect } from 'react'
import { CyclesContext } from '../../../../contexts/CycleContext'
import { CountdownConatiner, Separator } from './styles'

export function Countdown () {
	const {
		activeCycle,
		amountSecondsPassed,
		setSecondsPassed,
		markCurrentCysleAsFinished
	} = useContext(CyclesContext)

	const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
	const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

	useEffect(() => {
		let interval: number

		if (activeCycle) {
			interval = setInterval(() => {
				const secondsDifference = differenceInSeconds(new Date, new Date(activeCycle.startDate))

				if (secondsDifference >= totalSeconds) {
					markCurrentCysleAsFinished()
					setSecondsPassed(totalSeconds)
					clearInterval(interval)
				} else {
					setSecondsPassed(secondsDifference)
				}
			}, 1000)
		}

		return () => {
			clearInterval(interval)
		}
	}, [activeCycle, totalSeconds, markCurrentCysleAsFinished])

	const minutesAmount = Math.floor(currentSeconds / 60)
	const secondsAmount = currentSeconds % 60

	const minutes = String(minutesAmount).padStart(2, '0')
	const seconds = String(secondsAmount).padStart(2, '0')

	useEffect(() => {
		if (activeCycle) {
			document.title = `${activeCycle.task} - ${minutes}:${seconds}`
		}
	}, [minutes, seconds, activeCycle])

	return (
		<CountdownConatiner>
			<span>{minutes[0]}</span>
			<span>{minutes[1]}</span>
			<Separator>:</Separator>
			<span>{seconds[0]}</span>
			<span>{seconds[1]}</span>
		</CountdownConatiner>
	)
}