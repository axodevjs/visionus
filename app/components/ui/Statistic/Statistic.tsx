import React, {FC} from 'react';
import MiniTitle from "../MiniTitle/MiniTitle";
import {View} from "react-native";

interface IStatistic {
    children: React.ReactNode;
    title: string;
}

const Statistic:FC<IStatistic> = ({children, title}) => {
    return (
        <View className={"w-full flex flex-col items-start mt-5"}>
            <MiniTitle text={title}/>
            <View className={'w-full flex justify-center items-center p-5 bg-gray-100 rounded-xl'}>
                {children}
            </View>
        </View>
    );
};

export default Statistic;