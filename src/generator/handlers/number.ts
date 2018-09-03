export function handleNumber(field: number) {
    if (Number.isNaN(field) || !Number.isFinite(field)) {
        return null
    } else {
        return field
    }
}
