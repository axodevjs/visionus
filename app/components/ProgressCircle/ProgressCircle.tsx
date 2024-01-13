import React, {FC, useEffect, useState} from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {Text, View} from "react-native";
import {ib, ir} from "../../utils/fontStyles";
import {useAuth} from "../../hooks/useAuth";

interface IProgressCircle {
    fill: number;
    type: 'big' | 'small'
}

const ProgressCircle:FC<IProgressCircle> = ({fill, type}) => {
    const [dayPlan, setDayPlan] = useState(0)
    const {userFirestoreData} = useAuth()

    useEffect(() => {
console.log('fires', userFirestoreData)
    }, [userFirestoreData]);

    return (
        <View className={"flex flex-col w-full items-center"}>
            <AnimatedCircularProgress
                duration={600}
                size={type === 'big' ? 104 : 22}
                width={type === 'big' ? 12 : 2}
                fill={fill}
                rotation={0}
                lineCap={"round"}
                tintColor="#2563eb"
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="#EAEAEA" >
                {
                     (fill) => (
                         type === 'big' && <Text className={'text-xl text-black'} style={ib}>
                            { parseInt(fill?.toString()) }%
                        </Text>
                    )
                }
            </AnimatedCircularProgress>
            {type === 'big' && <View className={"items-center flex-row"} style={{gap: 14, marginTop: 14}}>
                <View className={"bg-blue-600 w-4 h-4 rounded-full"}/>
                <Text className={"text-sm text-black"} style={ir}>Дневная цель (15 мин)</Text>
            </View>}

        </View>
    );
};

export default ProgressCircle;
