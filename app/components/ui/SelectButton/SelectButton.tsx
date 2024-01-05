import React, {FC} from 'react';
import {Pressable, Text, View} from "react-native";

interface ISelectButton {
    active: boolean
    text: string
    onPress: () => void
}

const SelectButton: FC<ISelectButton> = ({active, text, onPress}) => {
    return (
        <Pressable onPress={onPress}
                   className={`flex rounded justify-center items-center px-4 py-2 text-base ${active ? 'bg-blue-600' : 'bg-gray-100'}`}>
            <Text className={`${active ? 'text-white' : 'text-gray-600'}`}>{text}</Text>
        </Pressable>
    );
};

export default SelectButton;