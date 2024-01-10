import React, {useState} from 'react';
import {Text, View} from "react-native";
import {ir} from "../../utils/fontStyles";
import SelectSmiles from "../SelectSmiles/SelectSmiles";
import MiniTitle from "../ui/MiniTitle/MiniTitle";

const RateYourStatus = () => {
    const [currentLevel, setCurrentLevel] = useState(3)

    return (
        <View className={"py-4 mt-5 w-full flex flex-col items-center"}>
            <MiniTitle text={'Ваше состояние сегодня'}/>
            <SelectSmiles type={'small'} currentLevel={currentLevel} setCurrentLevel={setCurrentLevel}/>
        </View>
    );
};

export default RateYourStatus;