import {ReactNode} from "react";

export interface IModalProps {
    visible: boolean;
    onClose: () => void;
}