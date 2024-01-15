import React, { FC, ReactNode } from 'react';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import { IModalProps } from '../types';
import {ib} from "../../../utils/fontStyles";

interface IAskModalProps extends IModalProps {
    children: ReactNode;
    title: string
}

const AskModal: FC<IAskModalProps> = ({ visible, onClose, children, title }) => {
    return (
        <Modal isVisible={visible} onBackdropPress={onClose} className={'justify-end m-0'}>
            <View className={"py-10 px-12 w-full bg-white flex flex-col items-center"} style={{borderTopLeftRadius: 40, borderTopRightRadius: 40}}>
                <Text style={ib} className={"text-base pb-7 text-center"}>{title}</Text>
                {children}
            </View>
        </Modal>
    );
};

export default AskModal;