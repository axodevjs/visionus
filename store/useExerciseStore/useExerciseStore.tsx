import { create } from 'zustand'
import { IExerciseStore } from './types'

const useExerciseStore = create<IExerciseStore>((set, get) => ({
	currentExercise: null,
	currentTask: null,
	time: 0,
	taskQueue: [],
	timerIntervalId: null,

	setCurrentExercise: exercise => {
		set({ currentExercise: exercise })
	},
	setTime: time => {
		set({ time: time })
	},
	setCurrentTask: task => {
		set({ currentTask: task })
	},
	enqueueTask: task => {
		set(state => ({ taskQueue: [...state.taskQueue, task] }))
	},
	dequeueTask: () => {
		set(state => ({ taskQueue: state.taskQueue.slice(1) }))
	},
	startTimer: (onTimerTick, onTimerEnd) => {
		// Clear existing interval if it exists
		const existingIntervalId = get().timerIntervalId
		if (existingIntervalId !== null) {
			clearInterval(existingIntervalId)
		}

		// Start a new interval
		const newIntervalId = setInterval(() => {
			const currentTime = get().time
			if (currentTime > 0) {
				onTimerTick()
				set(state => ({ time: state.time - 1 }))
			} else {
				clearInterval(newIntervalId)
				onTimerEnd()
			}
		}, 1000)

		// Save the new interval ID in the store
		set({ timerIntervalId: newIntervalId })
	},
}))

export default useExerciseStore
