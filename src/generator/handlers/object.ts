import { getRandomInRange } from '../utils'

export function getRepeatTimes(times: number | number[]): number {
    if (Array.isArray(times) && times.length === 2) {
        const [min, max] = times
        return getRandomInRange(min, max)
    } else {
        if (Array.isArray(times)) return times[0] ? times[0] : 0
        return times
    }
}

export function handleObject(field, handleField) {
    if (field.repeat !== undefined && field.object !== undefined) {
        console.log(field)

        if (field.object !== 'object') {
            const resultedArray = []
            for (let i = 0; i < getRepeatTimes(field.repeat); i++) {
                resultedArray.push(handleField(field.object))
            }
            return resultedArray
        } else {
            const resultedArray = []
            for (let i = 0; i < getRepeatTimes(field.repeat); i++) {
                // extract
                const resultedObject = {}
                for (const key in field.object) {
                    resultedObject[key] = handleField(field.object[key])
                }
                // extract

                resultedArray.push(resultedObject)
            }
            return resultedArray
        }
    } else {
        if (Array.isArray(field)) {
            return field.map(elem => handleField(elem))
        } else {
            // extract
            const result = {}
            for (const key in field) {
                result[key] = handleField(field[key])
            }
            return result
            // extract
        }
    }
}
