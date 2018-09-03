import { defineFieldType } from './utils'
import * as handlers from './handlers'

export function handleField(field: any) {
    switch (defineFieldType(field)) {
        case 'string':
            return handlers.handleString(field)
        case 'number':
            return handlers.handleNumber(field)
        case 'function':
            return handlers.handleFunction(field)
        case 'object':
            return handlers.handleObject(field, handleField)
        default:
            return field
    }
}

export function generate(schema: any) {
    return JSON.stringify(handleField(schema))
}
