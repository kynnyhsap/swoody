import * as context from '../context'

export function handleFunction(field: (...args) => any) {
    const result = field(context)

    return result ? result : null
}
