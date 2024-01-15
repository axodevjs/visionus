import React, {useEffect, useState} from 'react';
import {Text, View} from "react-native";
import {ir} from "../../utils/fontStyles";
import SelectSmiles from "../SelectSmiles/SelectSmiles";
import MiniTitle from "../ui/MiniTitle/MiniTitle";
import {useAuth} from "../../hooks/useAuth";
import {useStatus} from "../../hooks/useStatus";

const RateYourStatus = () => {
    const [currentLevel, setCurrentLevel] = useState(3)
    const {getCurrentStatus, saveStatus} = useStatus()

    useEffect(() => {
        getCurrentStatus().then((status) => {
            setCurrentLevel(status?.level)
        })

    }, []);

    const updateLevel = (level: number) => {
        setCurrentLevel(level)
        saveStatus(level)
    }

    return (
        <View className={"py-4 mt-5 w-full flex flex-col items-center"}>
            <MiniTitle text={'Ваше состояние сегодня'}/>
            <SelectSmiles type={'small'} currentLevel={currentLevel} setCurrentLevel={updateLevel}/>
        </View>
    );
};

export default RateYourStatus;