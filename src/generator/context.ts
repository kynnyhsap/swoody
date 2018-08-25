import * as fakerApi from 'faker'
import * as momentApi from 'moment'

export const faker = fakerApi
export const moment = momentApi

export function same(argument: any): any {
    return argument
}
