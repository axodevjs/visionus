import React, {FC} from 'react';
import MainLayout from "./MainLayout";
import Title from "../ui/Title/Title";
import {Text, View} from "react-native";
import {im} from "../../utils/fontStyles";
import {smiles} from "../../utils/smiles";
import SelectSmiles from "../SelectSmiles/SelectSmiles";

interface IQuizLayout {
    children: React.ReactNode
    onPressBtn: () => void
    btnText: string
    title: string
}

const QuizLayout: FC<IQuizLayout> = ({children, onPressBtn, btnText, title}) => {
    return (
        <MainLayout onPressBtn={onPressBtn} btnText={btnText}>
            <Title className="text-center w-full justify-center" text={title} />
            {children}
        </MainLayout>
    );
};

export default QuizLayout;