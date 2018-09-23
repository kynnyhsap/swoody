import { handleField } from '../src/generator'

describe('handleField function', () => {
    describe('number', () => {
        const tests = [
            {
                name: 'should return number',
                expected: 12312312,
                value: 12312312,
            },
            {
                name: 'should return number',
                expected: -2312,
                value: -2312,
            },
            {
                name: 'should return number',
                expected: 0,
                value: 0,
            },
            {
                name: 'should return null',
                expected: null,
                value: NaN,
            },
            {
                name: 'should return null',
                expected: null,
                value: Infinity,
            },
            {
                name: 'should return null',
                expected: null,
                value: -Infinity,
            },
        ]

        tests.forEach(tt => {
            it(tt.name, () => {
                const received = handleField(tt.value)

                expect(received).toEqual(tt.expected)
            })
        })
    })

    describe('string', () => {
        const tests = [
            {
                name: 'should return string',
                expected: 'Hello',
                value: 'Hello',
            },
            {
                name: 'should return evaluated string',
                expected: 'KEK',
                value: '{{"kek".toUpperCase()}}',
            },
            {
                name: 'should return evaluated string',
                expected: 'lol 10 _ 3',
                value: 'lol {{sameValue(10)}} _ {{sameValue(3)}}',
            },
            {
                name: 'should return evaluated value',
                expected: 10,
                value: '{{ sameValue(10) }}',
            },
            {
                name: 'should return evaluated value',
                expected: 50,
                value: '{{ 10 * 5 }}',
            },
            {
                name: 'should return evaluated value',
                expected: null,
                value: '{{ sameValue(null) }}',
            },
        ]

        tests.forEach(tt => {
            it(tt.name, () => {
                const received = handleField(tt.value)

                expect(received).toEqual(tt.expected)
            })
        })
    })

    describe('function', () => {
        const tests = [
            {
                name: 'should call function and return value',
                expected: 'LOL',
                value: (context: any) => {
                    const str = 'l' + 'o' + 'l'

                    return context.sameValue(str).toUpperCase()
                },
            },
            {
                name: 'should call function and return null',
                expected: null,
                value: (context: any) => {
                    1 + 1
                },
            },
        ]

        tests.forEach(tt => {
            it(tt.name, () => {
                const received = handleField(tt.value)

                expect(received).toEqual(tt.expected)
            })
        })
    })

    describe('object', () => {
        it('should return array of values', () => {
            for (let i = 0; i < 10; i++) {
                expect(handleField({ repeat: [3, 10], object: '{{sameValue("l")}}' }).length).toBeGreaterThanOrEqual(3)
                expect(handleField({ repeat: [3, 10], object: '{{sameValue("l")}}' }).length).toBeLessThanOrEqual(10)
            }
        })

        const tests = [
            {
                name: 'should return array of values',
                expected: ['l', 'l', 'l'],
                value: {
                    repeat: 3,
                    object: '{{sameValue("l")}}',
                },
            },
            {
                name: 'should return empty array',
                expected: [],
                value: { repeat: 0, object: {} },
            },
            {
                name: 'should return empty array',
                expected: [],
                value: { repeat: -1, object: {} },
            },
            {
                name: 'should return empty array',
                expected: [],
                value: { repeat: -134, object: {} },
            },
            {
                name: 'should return evaluated object',
                expected: {
                    age: 12,
                    kek: 13,
                    name: {
                        first: 'Bob',
                        last: 'Marley',
                    },
                },
                value: {
                    age: 12,
                    kek: '{{3+10}}',
                    name: {
                        first: '{{sameValue("Bob")}}',
                        last: '{{sameValue("Marley")}}',
                    },
                },
            },
        ]

        tests.forEach(tt => {
            it(tt.name, () => {
                const received = handleField(tt.value)

                expect(received).toEqual(tt.expected)
            })
        })
    })

    describe('array', () => {
        const tests = [
            {
                name: 'should return array of evaluated values',
                expected: [1, '30', 4, 234, { kek: 'lol' }],
                value: [
                    1,
                    '{{sameValue("30")}}',
                    4,
                    234,
                    {
                        kek() {
                            return 'lol'
                        },
                    },
                ],
            },
        ]

        tests.forEach(tt => {
            it(tt.name, () => {
                const received = handleField(tt.value)

                expect(received).toEqual(tt.expected)
            })
        })
    })

    describe('null', () => {
        const tests = [
            {
                name: 'should return null',
                expected: null,
                value: null,
            },
        ]

        tests.forEach(tt => {
            it(tt.name, () => {
                const received = handleField(tt.value)

                expect(received).toEqual(tt.expected)
            })
        })
    })

    describe('undefined', () => {
        const tests = [
            {
                name: 'should return undefined',
                expected: undefined,
                value: undefined,
            },
        ]

        tests.forEach(tt => {
            it(tt.name, () => {
                const received = handleField(tt.value)

                expect(received).toEqual(tt.expected)
            })
        })
    })
})
