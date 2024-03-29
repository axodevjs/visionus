import {create} from "zustand";
import {IModalStore} from "./types";

const useModalStore = create<IModalStore>((set) => ({
    modals: {
        RateOurApp: {isVisible: false},
        Feedback: {isVisible: false},
    },
    openModal: (modalName) => {
        set((state) => ({
            modals: {
                ...state.modals,
                [modalName]: { isVisible: true },
            },
        }));
    },
    closeModal: (modalName) => {
        set((state) => ({
            modals: {
                ...state.modals,
                [modalName]: { isVisible: false },
            },
        }));
    },
}))

export default useModalStore