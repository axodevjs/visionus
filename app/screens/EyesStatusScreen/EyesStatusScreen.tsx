import React, {useState} from 'react';
import {Text, View} from "react-native";
import SelectSmiles from "../../components/SelectSmiles/SelectSmiles";
import {im} from "../../utils/fontStyles";
import {smiles} from "../../utils/smiles";
import QuizLayout from "../../components/Layouts/QuizLayout";
import {useStatus} from "../../hooks/useStatus";

const EyesStatusScreen = ({navigation}) => {
    const [level, setLevel] = useState(3)
    const {saveStatus} = useStatus()

    const onPressNext = async () => {
        await saveStatus(level)
        await navigation.navigate("EverydayTime")
    }

    return (
        <QuizLayout onPressBtn={onPressNext} btnText={'Продолжить'} title={"Насколько ваши глаза напряжены?"}>
            <View className={"justify-center w-full"}>
                <Text className={"mb-6 text-center text-xl w-full justify-center"} style={im}>{smiles?.find(smile => smile.level === level).description}</Text>
                <SelectSmiles type={"big"} currentLevel={level} setCurrentLevel={setLevel}/>
            </View>
        </QuizLayout>
    );
};

export default EyesStatusScreen;