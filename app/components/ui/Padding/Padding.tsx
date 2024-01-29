import React, {FC} from 'react';
import {View} from "react-native";

interface IPadding {
    children: React.ReactNode | React.ReactNode[]
    className?: string
}

const Padding:FC<IPadding> = ({children, className}) => {
    return (
        <View className={`bg-white pb-8 pt-16 px-8 ${className ? className : ""}`}>
            {children}
        </View>
    );
};

export default Padding;