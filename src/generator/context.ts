import { getRandomInRange } from './utils'
import * as fakerApi from 'faker'
import * as momentApi from 'moment'

export const faker = fakerApi
export const moment = momentApi

export function objectId() {
    // @todo make it dynamic
    return '_1asdf234jksjdhf823hf9un29d'
}

export function boolean(): boolean {
    return Math.random() >= 0.5
}

export function integer(min?: number, max?: number): number {
    if (!min && !max) return getRandomInRange(-100000000, 100000000)

    return getRandomInRange(min, max)
}

export function same(argument: any): any {
    return argument
}
