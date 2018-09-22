import * as context from '../context'

export function handleFunction(field: (...args) => any, customContext: any) {
    const result = field({ ...context, ...customContext })

    return result ? result : null
}
