import React, {FC} from 'react';
import {Text, View} from "react-native";
import {ib, im} from "../../../utils/fontStyles";
import { AntDesign } from '@expo/vector-icons';

interface IHeader {
    onClose: () => void
    text: string
}

const Header:FC<IHeader> = (props) => {
    return (
        <View className={'w-full flex flex-row justify-between items-center'}>
            <Text style={im} className={"text-base text-black"}>{props.text}</Text>
            <AntDesign name={'close'} size={24} color={'#000'} onPress={props.onClose}/>
        </View>
    );
};

export default Header;