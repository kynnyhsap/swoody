# [Swoody](https://github.com/tobira-shoe/swoody) &middot; [![npm version](https://img.shields.io/npm/v/swoody.svg?style=flat)](https://www.npmjs.com/package/swoody)

Powerfull JSON Generator

-   [Complete documentation](#documentation)
-   [Example of schema](#example-of-schema)
-   [Table of contents](#table-of-contents)

## Example of `schema`

Try out the following code and realise the power of Swoody 😎

```js
import { generate } from 'swoody'

const schema = {
    repeat: 7,
    object: {
        id: '{{ faker.random.uuid() }}',
        isOnline: '{{ faker.random.boolean() }}',
        description: '{{ faker.lorem.paragraphs(2) }}',
        date: '{{ moment() }}',
        organizators: {
            repeat: [1, 5],
            object: {
                name: '{{ faker.name.firstName() }} {{ faker.name.lastName() }}',
                job: '{{ faker.name.jobTitle() }}',
                email: '{{ faker.internet.email() }}',
                ava: '{{ faker.internet.avatar() }}',
                age: '{{ 10 + 8 }}',
            },
        },
        place({ faker }) {
            return faker.random.arrayElement(['New-York', 'Moscow', 'Tokyo'])
        },
        title({ faker }) {
            const randomWordsCount = faker.random.number({ min: 3, max: 12 })

            return faker.lorem.words(countWords)
        },
        price({ faker }) {
            const randomNumber = faker.random.number({ min: 100, max: 3000 })
            const roundedPrice = Math.round(randomNumber / 100) * 100
            const currencySymbol = faker.finance.currencySymbol()

            return `${currencySymbol} ${roundedPrice}`
        },
    },
}

const json = generate(schema) // random generated json data

console.log(json)
```

## Documentation

Soon...

## Table of contents

Soon...
