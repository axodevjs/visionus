import React, {Dispatch, FC, useEffect} from 'react';
import {Pressable, Text, View} from "react-native";
import {smiles} from "../../utils/smiles";
import {ir} from "../../utils/fontStyles";
import {ISelectSmiles} from "./types";

const SelectSmiles: FC<ISelectSmiles> = ({type, currentLevel, setCurrentLevel}) => {
    return (
        <View className={'flex flex-row gap-5 w-full justify-center'}>
            {
                smiles.map((smile, i) => (
                    <Pressable onPress={() => setCurrentLevel(smile.level)} className={`rounded-full bg-gray-100 flex justify-center items-center 
                    ${type === 'big' ? "w-10 h-10" : 'w-8 h-8'}
                    ${currentLevel === i + 1 && 'bg-blue-600'}
                    `} key={i}>
                        <Text style={ir}>{smile.smile}</Text>
                    </Pressable>
                ))
            }
        </View>
    );
};

export default SelectSmiles;