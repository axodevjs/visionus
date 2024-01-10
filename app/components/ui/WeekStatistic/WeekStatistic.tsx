import React, {FC, useEffect, useState} from 'react';
import { View } from 'react-native';
import { addDays, format, startOfWeek } from 'date-fns';
import { ru } from 'date-fns/locale';
import { IWeekDay } from './types';
import StatisticDisplay from "./StatisticDisplay";

interface IWeekStatistic {
    type: 'progress' | 'smile'
    data: any
}

const WeekStatistic:FC<IWeekStatistic> = ({type, data}) => {
    const [weekDays, setWeekDays] = useState<IWeekDay[]>([]);

    useEffect(() => {
        const currentDate = new Date();
        const startOfCurrentWeek = startOfWeek(currentDate, { locale: ru, weekStartsOn: 1 });

        const updatedWeekDays = Array.from({ length: 7 }, (_, index) => {
            const date = format(addDays(startOfCurrentWeek, index), 'yyyy-MM-dd', { locale: ru });
            const name = format(addDays(startOfCurrentWeek, index), 'EEE', { locale: ru });
            return { date, name: name === 'суб' ? 'сб' : name.slice(0, -1) };
        });

        setWeekDays(updatedWeekDays);
    }, []);

    return (
        <View className={'flex flex-row justify-around pt-2 items-end gap-4'}>
            {weekDays.map((day, i) => {
                const value = data.find(x => new Date(x?.date)?.getDate() === new Date(day?.date)?.getDate())?.value || 0;

                return (
                    <StatisticDisplay day={day.name} value={value} calculate={type === 'progress'} key={i}/>
                );
            })}
        </View>
    );
};

export default WeekStatistic;
