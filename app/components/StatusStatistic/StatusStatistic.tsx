import React from 'react';
import Statistic from "../ui/Statistic/Statistic";
import {Text} from "react-native";
import WeekStatistic from "../ui/WeekStatistic/WeekStatistic";

const StatusStatistic = () => {
    const data = [
        { date: new Date('2023-01-08'), value: 5 },
        { date: new Date('2023-01-09'), value: 1 },
        { date: new Date('2023-01-10'), value: 3 },
        { date: new Date('2023-01-11'), value: 0 },
        { date: new Date('2023-01-12'), value: 5 },
        { date: new Date('2023-01-13'), value: 3 },
        { date: new Date('2023-01-14'), value: 2 },
    ];

    return (
        <Statistic title={'Ваша усталость'}>
            <WeekStatistic data={data} type={'smile'}/>
        </Statistic>
    );
};

export default StatusStatistic;