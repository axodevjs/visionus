import {create} from "zustand";
import {categories} from "../../app/utils/testdb";
import {ICategoryStore} from "./types";

const useCategoryStore = create<ICategoryStore>((set) => ({
    categories: categories,
    currentCategory: categories[0],
    setCurrentCategory: async (category) => {
        set({currentCategory: category})
    }
}))

export default useCategoryStore