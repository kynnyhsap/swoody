# [Swoody](https://github.com/tobira-shoe/swoody) &middot; [![npm version](https://img.shields.io/npm/v/swoody.svg?style=flat)](https://www.npmjs.com/package/swoody)

Powerfull JSON Generator

- [Complete documentation](#documentation)
- [Quick example](#quick-example)
- [Table of contents](#table-of-contents)

## Quick Example

Try out the following code and realise the power of Swoody 😎

```js
import { generate } from 'swoody'

const eventsSchema = {
  repeat: 7,
  object: {
    id: '{{ faker.random.uuid() }}',
    isOnline: '{{ faker.random.boolean() }}',
    description: '{{ faker.lorem.paragraphs(2) }}',
    when: '{{ moment() }}',
    place({ faker }) {
      const cities = ['New-York', 'Moscow', 'Tokyo']
      return faker.random.arrayElement(cities)
    },
    organizators: {
      repeat: [1, 5],
      object: {
        name: '{{ faker.name.firstName() }} {{ faker.name.lastName() }}',
        job: '{{ faker.name.jobTitle() }}',
        email: '{{ faker.internet.email() }}',
        avatar: '{{ faker.internet.avatar() }}',
        age: '{{ 10 + 8 }}',
      },
    },
  },
}

const json = generate(eventsSchema) // random generated json data

console.log(json)
```

## Documentation

- [Generating arrays](#arrays)
- [Generating static values](#static-values)
- [Special schema values](#special-schema-values)
- [Context](#context)

### arrays

`object` field is using for defining value of element of array

`repeat` field is using for defining _exact_ or _ramdom in range_ length of array:

```js
{
  repeat: 7, // exact length
}
// or
{
  repeat: [2, 8] // ramdom in range from 2 to 8
}
```

Will generate array of exact length

```js
const schema = {
  repeat: 7,
  object: '{{ faker.random.number() }}',
}
```

Will generate array of random length in range from 1 to 5

```js
const schema = {
  repeat: [1, 5],
  object: '{{ faker.random.number() }}',
}
```

### static values

To get a static values just pass whtire them as they are:

```js
{
  str: 'some string',
  num: 1923,
  nil: null,
  bool: false,
  parent: {
    isChild: true
    child: {
      otherNestedProp: 'kek'
    }
  }
}
```

And exceptions...

All the following propeties below will be evaluated to `null`

```js
{
  prop1: undefined,
  prop2: NaN,
  prop3: Infinity,
  prop4: -Infinity,
  prop5: () => console.log,
  prop6() {},
}
```

Soon...

### special `schema` values

#### evaluating function props

This function property will be evaluated to returned value:

```js
{
  funcProp(context) {
    return 20 % faker.random.number()
  }
}
```

And function which return nothing will be evaluated to `null`:

```js
{
  funcProp(context) {
    console.log(context)
  }
}
```

#### evaluating string and mustaches props

Any expresion inside mustaches `{{ }}` will be evaluated and returned in field.

This will evaluate expression inside mustache:

```js
{
  num: '{{ faker.random.number() }}',
  string: 'number: {{ 2 + 4 }}',
}
```

You also have a [`context`](#context) in [mustaches](#evaluating-string-and-mustaches-props) and [mustaches](#evaluating-function-props)

```js
{
  mustacheContext: '{{ faker.random.number() }}',
  functionContext(context){
    return context.faker.random.number()
  },
}
```

### context

Soon...

## Table of contents

Soon...
