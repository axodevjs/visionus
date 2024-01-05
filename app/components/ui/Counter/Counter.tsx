import React, {Dispatch, FC} from 'react';
import {Pressable, Text, View} from "react-native";
import {ir} from "../../../utils/fontStyles";

interface ICounter {
    min: number;
    max: number;
    count: number;
    setCount: Dispatch<number>
}

const Counter: FC<ICounter> = ({count, setCount, min, max}) => {
    const increment = () => {
        if (count + 1 <= max)
            setCount(count + 1)
    }

    const decrement = () => {
        if (count - 1 >= min)
        setCount(count - 1)
    }

    return (
        <View className={"flex flex-row gap-8 items-center"}>
            <Pressable className={'w-9 h-9 bg-blue-600 rounded-full flex justify-center items-center'} onPress={decrement}>
                <Text  style={ir} className={"text-white text-2xl flex justify-center items-center"}>-</Text>
            </Pressable>
            <Text className={"text-2xl"} style={ir}>{count}</Text>
            <Pressable className={'w-9 h-9 bg-blue-600 rounded-full flex justify-center items-center'} onPress={increment}>
                <Text style={ir} className={"text-white text-2xl flex justify-center items-center"}>+</Text>
            </Pressable>
        </View>
    );
};

export default Counter;