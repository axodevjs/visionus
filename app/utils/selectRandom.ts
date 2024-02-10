export const selectTwoRandom = (array: Array<any>) => {
	if (array.length <= 2) {
		return array
	}

	const randomIndexes = []
	while (randomIndexes.length < 2) {
		const randomIndex = Math.floor(Math.random() * array.length)
		if (!randomIndexes.includes(randomIndex)) {
			randomIndexes.push(randomIndex)
		}
	}

	return randomIndexes.map(index => array[index])
}
