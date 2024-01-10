import React, {FC} from 'react';
import {ir} from "../../../utils/fontStyles";
import {Text} from "react-native";

interface IMiniTitle {
    text: string;
}

const MiniTitle:FC<IMiniTitle> = ({text}) => {
    return (
        <Text className={"text-gray-700 text-sm mb-3.5"} style={ir}>{text}</Text>
    );
};

export default MiniTitle;