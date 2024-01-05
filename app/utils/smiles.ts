export interface ISmile {
    level: number;
    smile: string;
    description: string;
}

export const smiles: ISmile[] = [
    {
        level: 1,
        description: "Очень плохо",
        smile: '😵‍💫'
    },
    {
        level: 2,
        description: "Плохо",
        smile: '‍🫤'
    },
    {
        level: 3,
        description: "Нормально",
        smile: '‍😐'
    },
    {
        level: 4,
        description: "Хорошо",
        smile: '‍😊'
    },
    {
        level: 5,
        description: "Отлично!",
        smile: '‍😁'
    },
]