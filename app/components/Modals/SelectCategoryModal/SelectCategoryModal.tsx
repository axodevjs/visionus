import React, {FC} from 'react';
import {Text, View} from "react-native";
import {IModalProps} from "../types";
import Modal from "react-native-modal";

const SelectCategoryModal: FC<IModalProps> = ({visible, onClose}) => {
    return (
        <Modal isVisible={visible}>
            <View>

            </View>
        </Modal>
    );
};

export default SelectCategoryModal;