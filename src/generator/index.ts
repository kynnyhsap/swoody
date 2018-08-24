import * as notevil from 'notevil'
import * as context from './context'
import { getRepeatTimes, MUSTASCHE_REGEX } from './utils'

export function runMethods(method: string, ctx: any) {
    try {
        return notevil.eval(`${method}`, ctx)
    } catch (error) {
        return `<${error}>`
    }
}

export function handleField(field: any): any {
    if (typeof field === 'string') {
        if (field.match(MUSTASCHE_REGEX)) {
            const leftChars = field.replace(MUSTASCHE_REGEX, '')
            const insideString = leftChars.length > 0

            if (insideString) {
                const replacer = (_: string, code: string) => runMethods(code, context)
                return field.replace(MUSTASCHE_REGEX, replacer)
            } else {
                let result

                field.replace(MUSTASCHE_REGEX, (_: string, code: string) => {
                    result = runMethods(code, context)
                    return ''
                })

                return result
            }
        } else {
            return field
        }
    } else if (typeof field === 'function') {
        const result = field(context)

        return result ? result : null
    } else if (typeof field === 'object' && field !== null) {
        if (field.repeat !== undefined && field.object !== undefined) {
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
    } else if (typeof field === 'number') {
        if (Number.isNaN(field) || !Number.isFinite(field)) {
            return null
        } else {
            return field
        }
    } else {
        return field
    }
}

export function generate(schema: any) {
    return JSON.stringify(handleField(schema))
}
