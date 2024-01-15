import React from "react";

export type ModalNameType =
    'RateOurApp' |
    'Feedback' |
    'SelectCategory'

export interface IModal {
    isVisible: boolean
}

export interface IModals {
    [key: string]: IModal
}

export interface IModalStore {
    modals: IModals;
    openModal: (modalName: ModalNameType) => void
    closeModal: (modalName: ModalNameType) => void
}