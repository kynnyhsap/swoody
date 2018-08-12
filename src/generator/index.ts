import { getRepeatTimes, MUSTASCHE_REGEX } from './utils'
import { methods } from './methods'

// todo: test and handle arrays
export function handleField(value: any) {
    if (typeof value === 'string') {
        if (value.match(MUSTASCHE_REGEX)) {
            return value.replace(MUSTASCHE_REGEX, (matched: string, expresion: string) => {
                return methods.run(expresion)
            })
        } else {
            return value
        }
    } else if (typeof value === 'function') {
        return value(methods)
    } else if (typeof value === 'object' && value !== null) {
        if (value.repeat !== undefined && value.object !== undefined) {
            if (value.object !== 'object') {
                const resultedArray = []
                for (let i = 0; i < getRepeatTimes(value.repeat); i++) {
                    resultedArray.push(handleField(value.object))
                }
                return resultedArray
            } else {
                const resultedArray = []
                for (let i = 0; i < getRepeatTimes(value.repeat); i++) {
                    // extract
                    const resultedObject = {}
                    for (const key in value.object) {
                        resultedObject[key] = handleField(value.object[key])
                    }
                    // extract

                    resultedArray.push(resultedObject)
                }
                return resultedArray
            }
        } else {
            if (Array.isArray(value)) {
                return value.map(elem => handleField(elem))
            } else {
                // extract
                const result = {}
                for (const key in value) {
                    result[key] = handleField(value[key])
                }
                return result
                // extract
            }
        }
    } else {
        return value
    }
}
