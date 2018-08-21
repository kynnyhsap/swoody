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
            expect(handleField('lol {{same(10)}}')).toBe('lol 10')
        })

        it('should return evaluated value', () => {
            expect(handleField('{{same(10)}}')).toBe(10)
            expect(handleField('{{10 * 5}}')).toBe(50)
            expect(handleField('{{same(null)}}')).toBe(null)
        })
    })

    describe('function', () => {
        it('should call function and return value', () => {
            const fun = (tags: any) => {
                const str = 'l' + 'o' + 'l'

                return tags.same(str).toUpperCase()
            }

            expect(handleField(fun)).toBe('LOL')
        })

        it('should call function and return null', () => {
            const fun = (tags: any) => {
                1 + 1
            }

            expect(handleField(fun)).toBeNull()
        })
    })

    describe('object', () => {
        it('sould return array of values', () => {
            // check when repeat equals to 0 or less
            const field = '{{same("l")}}'

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

        it('sould return evaluated object', () => {
            const object = {
                age: 12,
                kek: '{{3+10}}',
                name: {
                    first: '{{same("Bob")}}',
                    last: '{{same("Marley")}}',
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

    describe('array', () => {})

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
