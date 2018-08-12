export function getRandomInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getRepeatTimes(times: number | number[]) {
    if (Array.isArray(times) && times.length >= 2) {
        const [min, max] = times
        return getRandomInRange(min, max)
    } else {
        return times
    }
}

export const MUSTASCHE_REGEX = /{{([^{}]+)}}/gi
