import React, {FC, useState} from 'react';
import {IModalProps} from '../types';
import AskModal from "../AskModal/AskModal";
import {TextInput} from "react-native";
import useModalStore from "../../../../store/useModalStore/useModalStore";
import Button from "../../ui/Button/Button";

const FeedbackModal: FC<IModalProps> = ({visible, onClose}) => {
    const [rating, setRating] = useState(null)
    const {openModal} = useModalStore()
    const [text, setText] = useState("")

    const onPressBtn = () => {
        onClose()
    }

    return (
        <AskModal title={"Что мы можем улучшить?"} visible={visible} onClose={onClose}>
            <TextInput
                className={"bg-gray-100 rounded-xl w-full mb-4 text-sm p-5"}
                textAlignVertical="top"
                multiline
                numberOfLines={4} // Можете регулировать количество видимых строк
                placeholder="Введите ваш текст здесь"
                value={text}
                onChangeText={(val) => setText(val)}
            />
            <Button type={'miniBlue'} onPress={onPressBtn} text={'Отправить'}/>
        </AskModal>
    );
};

export default FeedbackModal;
