import React from 'react';
import Statistic from "../ui/Statistic/Statistic";
import {Text} from "react-native";
import WeekStatistic from "../ui/WeekStatistic/WeekStatistic";

const TimeStatistic = () => {
    const data = [
        { date: new Date('2023-01-08'), value: 15 },
        { date: new Date('2023-01-09'), value: 12 },
        { date: new Date('2023-01-10'), value: 7 },
        { date: new Date('2023-01-11'), value: 0 },
        { date: new Date('2023-01-12'), value: 5 },
        { date: new Date('2023-01-13'), value: 3 },
        { date: new Date('2023-01-14'), value: 26 },
    ];

    return (
        <Statistic title={'Время тренировок'}>
            <WeekStatistic type={'progress'} data={data}/>
        </Statistic>
    );
};

export default TimeStatistic;