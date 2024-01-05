import React, {useState} from 'react';
import {Text, View} from "react-native";
import MainLayout from "../../components/Layouts/MainLayout";
import SelectSmiles from "../../components/SelectSmiles/SelectSmiles";
import Title from "../../components/ui/Title/Title";
import {im} from "../../utils/fontStyles";
import {smiles} from "../../utils/smiles";
import QuizLayout from "../../components/Layouts/QuizLayout";

const EyesStatusScreen = ({navigation}) => {
    const [level, setLevel] = useState(3)

    return (
        <QuizLayout onPressBtn={() => navigation.navigate("EverydayTimeScreen")} btnText={'Продолжить'} title={"Насколько ваши глаза напряжены?"}>
            <View className={"justify-center w-full"}>
                <Text className={"mb-6 text-center text-xl w-full justify-center"} style={im}>{smiles?.find(smile => smile.level === level).description}</Text>
                <SelectSmiles type={"big"} currentLevel={level} setCurrentLevel={setLevel}/>
            </View>
        </QuizLayout>
    );
};

export default EyesStatusScreen;