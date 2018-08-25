export const MUSTASCHE_REGEX = /{{(((?!}})(.|\n))*)}}/gi

export function getRandomInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getRepeatTimes(times: number | number[]): number {
    if (Array.isArray(times) && times.length === 2) {
        const [min, max] = times
        return getRandomInRange(min, max)
    } else {
        if (Array.isArray(times)) return times[0] ? times[0] : 0
        return times
    }
}
