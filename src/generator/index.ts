import { defineFieldType } from './utils'
import * as handlers from './handlers'

export function handleField(field: any, customContext: any) {
    switch (defineFieldType(field)) {
        case 'string':
            return handlers.handleString(field, customContext)
        case 'number':
            return handlers.handleNumber(field)
        case 'function':
            return handlers.handleFunction(field, customContext)
        case 'object':
            return handlers.handleObject(field, handleField)
        default:
            return field
    }
}

export function generate(schema: any, customContext: any = {}) {
    if (defineFieldType(customContext) !== 'object') {
        throw new Error(`Error: customContext should be an "object", got ${defineFieldType(customContext)}`)
    }

    return JSON.stringify(handleField(schema, customContext))
}
