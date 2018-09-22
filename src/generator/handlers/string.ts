import { MUSTASCHE_REGEX, evaluate } from '../utils'
import * as context from '../context'

export function handleString(field: string, customContext: any) {
    if (field.match(MUSTASCHE_REGEX)) {
        const leftChars = field.replace(MUSTASCHE_REGEX, '')
        const isInsideStringTemplate = leftChars.length > 0

        if (isInsideStringTemplate) {
            const replacer = (_: string, code: string) => {
                return evaluate(code, { ...context, ...customContext })
            }

            return field.replace(MUSTASCHE_REGEX, replacer)
        } else {
            let result

            field.replace(MUSTASCHE_REGEX, (_: string, code: string) => {
                result = evaluate(code, { ...context, ...customContext })

                return ''
            })

            return result
        }
    } else {
        return field
    }
}
