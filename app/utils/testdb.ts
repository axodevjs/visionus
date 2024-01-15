interface ICategory {
    id: number
    name: string
    description: string
}

interface IExercise {
    categoryId: number
    name: string
    description: string
    tasks: IExerciseTask[]
}

interface IExerciseTask {
    name: string
    timeInSec: number
}

export const categories: ICategory[] = [
    {
        id: 1,
        name: 'Разогрев для глаз',
        description: 'Готовьте глаза к тренировке с массажем и растяжкой, улучшая гибкость.'
    },
    {
        id: 2,
        name: 'Отдых и расслабление',
        description: 'Снимайте напряжение с глаз с помощью массажа, пальцевой гимнастики и компрессов'
    },
    {
        id: 3,
        name: 'Координация и сосредоточенность',
        description: 'Тренируйте координацию и сосредотачивайтесь с помощью следящих и переключающих взгляд упражнений.'
    },
]

export const exercises: IExercise[] = [
    {
        categoryId: 1,
        name: 'Вращение глаз по часовой стрелке',
        description: 'Медленно вращайте глаза вокруг, следуя по часовой стрелке. Повторите в течение 20 секунд.',
        tasks: [
            { name: 'Вращение глаз по часовой стрелке', timeInSec: 20 },
        ],
    },
    {
        categoryId: 1,
        name: 'Поморгайте',
        description: 'Поморгайте быстро и расслабьте глаза в течение 5 секунд.',
        tasks: [
            { name: 'Поморгайте быстро', timeInSec: 5 },
        ],
    },
    {
        categoryId: 1,
        name: 'Вращение глаз против часовой стрелки',
        description: 'Медленно вращайте глаза вокруг, следуя против часовой стрелки. Повторите в течение 20 секунд.',
        tasks: [
            { name: 'Вращение глаз против часовой стрелки', timeInSec: 20 },
        ],
    },
    {
        categoryId: 2,
        name: 'Массаж висковой зоны',
        description: 'Массируйте висковую зону кончиками пальцев в течение 30 секунд.',
        tasks: [
            { name: 'Массаж висковой зоны', timeInSec: 30 },
        ],
    },
    {
        categoryId: 2,
        name: 'Поморгайте и расслабьтесь',
        description: 'Поморгайте быстро в течение 5 секунд, затем расслабьтесь в течение 10 секунд.',
        tasks: [
            { name: 'Поморгайте быстро', timeInSec: 5 },
            { name: 'Расслабьтесь', timeInSec: 10 },
        ],
    },
    {
        categoryId: 3,
        name: 'Фокусировка на кончике носа',
        description: 'Сфокусируйтесь на кончике носа в течение 15 секунд, затем переключитесь на дальний объект в течение 15 секунд.',
        tasks: [
            { name: 'Фокусировка на кончике носа', timeInSec: 15 },
            { name: 'Переключение взгляда на дальний объект', timeInSec: 15 },
        ],
    },
];