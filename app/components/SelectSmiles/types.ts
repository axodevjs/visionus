import {Dispatch} from "react";
import {ISmile} from "../../utils/smiles";

export type SmileType = 'big' | 'small'

export interface ISelectSmiles {
    type: SmileType
    currentLevel: number
    setCurrentLevel: Dispatch<number>
}