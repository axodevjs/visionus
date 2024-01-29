import React, {FC} from 'react';
import {Pressable, Text, View} from "react-native";
import {ib, ir} from "../../../utils/fontStyles";
import {ICategory} from "../../../../store/useExerciseStore/types";

interface ICategoryComponent {
    category: ICategory
    isActive: boolean
    onPress: () => void
}

const Category: FC<ICategoryComponent> = ({category, isActive, onPress}) => {
    return (
        <Pressable onPress={onPress} className={'py-5 px-6 flex flex-col border w-full'} style={{borderRadius: 13, borderColor: isActive ? "#1657FF" : "#D5DDF1"}}>
            <Text style={ib} className={"text-base text-black"}>{category.name}</Text>
            <Text style={ir} className={"text-xs text-gray-400 mt-4"}>{category.description}</Text>
        </Pressable>
    );
};

export default Category;