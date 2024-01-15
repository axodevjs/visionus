import React, {FC, useState} from 'react';
import {IModalProps} from '../types';
import AskModal from "../AskModal/AskModal";
import {Text} from "react-native";
import StarRating from 'react-native-star-rating-widget';
import useModalStore from "../../../../store/useModalStore/useModalStore";

const RateOutAppModal: FC<IModalProps> = ({visible, onClose}) => {
    const [rating, setRating] = useState(null)
    const {openModal} = useModalStore()

    const onPressStar = (rating: number) => {
        setRating(rating)
        setTimeout(() => {
            onClose()
            if (rating < 5) {
                openModal("Feedback")
            }
        }, 500)
    }

    return (
        <AskModal title={"Насколько вам нравится наше приложение?"} visible={visible} onClose={onClose}>
            <StarRating
                color={'#2563eb'}
                emptyColor={'#CBCBCB'}
                starStyle={{width: 30}}
                rating={rating}
                enableHalfStar={false}
                onChange={onPressStar}
            />
        </AskModal>
    );
};

export default RateOutAppModal;
