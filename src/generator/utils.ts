import * as notevil from 'notevil'

export function evaluate(code: string, ctx: any) {
    try {
        return notevil.eval(code, ctx)
    } catch (error) {
        return `<${error}>`
    }
}

export function defineFieldType(field: any) {
    if (typeof field === 'number') return 'number'
    if (typeof field === 'string') return 'string'
    if (typeof field === 'function') return 'function'
    if (typeof field === 'object' && field !== null) return 'object'
}

export function getRandomInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const MUSTASCHE_REGEX = /{{(((?!}})(.|\n))*)}}/gi
