import { handleField } from '../src/generator'

describe('handleField function', () => {
    describe('number', () => {
        it('should return number', () => {
            expect(handleField(12312312)).toBe(12312312)
            expect(handleField(-23542)).toBe(-23542)
            expect(handleField(0)).toBe(0)
        })

        it('should return null if value equals NaN', () => {
            expect(handleField(NaN)).toBeNull()
        })

        it('should return null if value equals Infinity', () => {
            expect(handleField(Infinity)).toBeNull()
            expect(handleField(-Infinity)).toBeNull()
        })
    })

    describe('string', () => {
        it('should return simple string', () => {
            expect(handleField('Hello')).toBe('Hello')
        })

        it('should return evaluated string', () => {
            expect(handleField('{{"kek".toUpperCase()}}')).toBe('KEK')
            expect(handleField('lol {{sameValue(10)}} _ {{sameValue(3)}}')).toBe('lol 10 _ 3')
        })

        it('should return evaluated value', () => {
            expect(handleField('{{sameValue(10)}}')).toBe(10)
            expect(handleField('{{10 * 5}}')).toBe(50)
            expect(handleField('{{sameValue(null)}}')).toBe(null)
        })
    })

    describe('function', () => {
        it('should call function and return value', () => {
            const fun = (context: any) => {
                const str = 'l' + 'o' + 'l'

                return context.sameValue(str).toUpperCase()
            }

            expect(handleField(fun)).toBe('LOL')
        })

        it('should call function and return null', () => {
            const fun = (context: any) => {
                1 + 1
            }

            expect(handleField(fun)).toBeNull()
        })
    })

    describe('object', () => {
        it('should return array of values', () => {
            const field = '{{sameValue("l")}}'

            expect(
                handleField({
                    repeat: 3,
                    object: field,
                })
            ).toEqual(['l', 'l', 'l'])

            for (let i = 0; i < 10; i++) {
                expect(handleField({ repeat: [3, 10], object: field }).length).toBeGreaterThanOrEqual(3)
                expect(handleField({ repeat: [3, 10], object: field }).length).toBeLessThanOrEqual(10)
            }
        })

        it('should return empty array', () => {
            expect(handleField({ repeat: 0, object: {} })).toEqual([])
            expect(handleField({ repeat: -1, object: {} })).toEqual([])
        })

        it('should return evaluated object', () => {
            const object = {
                age: 12,
                kek: '{{3+10}}',
                name: {
                    first: '{{sameValue("Bob")}}',
                    last: '{{sameValue("Marley")}}',
                },
            }

            const resulted = {
                age: 12,
                kek: 13,
                name: {
                    first: 'Bob',
                    last: 'Marley',
                },
            }

            expect(handleField(object)).toEqual(resulted)
        })
    })

    describe('array', () => {
        it('should return array of evaluated values', () => {
            const arr = [1, '{{sameValue("30")}}', 4, 234]

            expect(handleField(arr)).toEqual([1, '30', 4, 234])
        })
    })

    describe('null', () => {
        it('should return null', () => {
            expect(handleField(null)).toBeNull()
        })
    })

    describe('undefined', () => {
        it('should return undefined', () => {
            expect(handleField(undefined)).toBeUndefined()
        })
    })
})
