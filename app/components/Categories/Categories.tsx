import React, {useState} from 'react';
import {View} from "react-native";
import Category from "../ui/Category/Category";
import useCategoryStore from "../../../store/useCategoryStore/useCategoryStore";
import {ICategory} from "../../../store/useExerciseStore/types";

const Categories = () => {
    const {categories} = useCategoryStore()
    const {setCurrentCategory, currentCategory} = useCategoryStore()
    const onPressCategory = async (category: ICategory) => {
        await setCurrentCategory(category)
    }

    return (
        <View className={'flex flex-col items-center w-full'} style={{gap: 20}}>
            {categories?.map((category, i) => (
                <Category onPress={() => onPressCategory(category)} isActive={currentCategory.id === category.id} key={i} category={category}/>
            ))}
        </View>
    );
};

export default Categories;