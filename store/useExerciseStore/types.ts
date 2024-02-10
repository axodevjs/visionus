export interface ICategory {
	id: number
	name: string
	description: string
}

export interface IExercise {
	id: number
	categoryId: number
	name: string
	description: string
	tasks: IExerciseTask[]
}

export interface IExerciseTask {
	name: string
	timeInSec: number
}

export interface IExerciseStore {
	currentExercise: IExercise | null
	currentTask: IExerciseTask | null
	time: number
	timerIntervalId: NodeJS.Timeout | null
	taskQueue: IExerciseTask[]

	setCurrentExercise: (exercise: IExercise) => void
	setTime: (time: number) => void
	setCurrentTask: (task: IExerciseTask) => void
	enqueueTask: (task: IExerciseTask) => void
	dequeueTask: () => void
	startTimer: (onTimerTick: () => void, onTimerEnd: () => void) => void
}
