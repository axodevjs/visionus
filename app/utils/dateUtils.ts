import { addDays, format, startOfWeek } from 'date-fns'
import { ru } from 'date-fns/locale'

export interface IWeekDay {
	date: string
	name: string
}

export const generateWeekDays = (): IWeekDay[] => {
	const currentDate = new Date()
	const startOfCurrentWeek = startOfWeek(currentDate, {
		locale: ru,
		weekStartsOn: 1,
	})

	const weekDays = Array.from({ length: 7 }, (_, index) => {
		const date = format(addDays(startOfCurrentWeek, index), 'yyyy-MM-dd', {
			locale: ru,
		})
		const name = format(addDays(startOfCurrentWeek, index), 'EEE', {
			locale: ru,
		})
		return { date, name: name === 'суб' ? 'сб' : name.slice(0, -1) }
	})

	return weekDays
}
