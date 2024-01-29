import {create} from "zustand";
import {IExerciseStore} from "./types";

const useExerciseStore = create<IExerciseStore>((set, get) => ({
    currentExercise: null,
    currentTask: null,
    time: 0,

    setCurrentExercise: async (exercise) => {
        set({currentExercise: exercise})
    },
    setTime: async (time) => {
        set({time: time})
    },
    setCurrentTask: async (task) => {
        set({currentTask: task})
    },
}))

export default useExerciseStore