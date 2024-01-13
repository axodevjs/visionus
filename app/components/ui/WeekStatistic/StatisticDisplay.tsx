import React, {FC} from 'react';
import {Text, View} from "react-native";
import ProgressCircle from "../../ProgressCircle/ProgressCircle";
import {ir} from "../../../utils/fontStyles";
import {smiles} from "../../../utils/smiles";

interface IStatisticDisplay {
    value: number | string
    day: string
    calculate: boolean
}

const StatisticDisplay: FC<IStatisticDisplay> = ({value, calculate, day}) => {
    return (
        <View className={'items-center ml-4 first:ml-0'}>
            <View>
                {calculate ?
                    <ProgressCircle type={'small'} fill={(parseInt(value?.toString()) / 15) * 100}/>
                    :
                    <Text className={'text-xs text-black font-medium'} style={ir}>
                        {smiles.find(smile => smile.level === value)?.smile || '?'}
                    </Text>
                }
            </View>
            <Text className={'mt-2.5 text-xs text-gray-500'} style={ir}>
                {day}
            </Text>
        </View>
    );
};

export default StatisticDisplay;