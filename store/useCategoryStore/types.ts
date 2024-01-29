import {ICategory} from "../useExerciseStore/types";

export interface ICategoryStore {
    categories: ICategory[]
    currentCategory: ICategory
    setCurrentCategory: (category: ICategory) => Promise<void>
}