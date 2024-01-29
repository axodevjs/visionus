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

interface IExerciseTask {
    name: string
    timeInSec: number
}

export interface IExerciseStore {
    currentExercise: IExercise
    currentTask: IExerciseTask
    time: number

    setCurrentExercise: (exercise: IExercise) => Promise<void>
    setTime: (time: number) => Promise<void>
    setCurrentTask: (task: IExerciseTask) => Promise<void>
}