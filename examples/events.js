import { generate } from '../src/generator'
import * as fs from 'fs'

const staticData = {
    places: [
        'Казань',
        'Киев',
        'Копенгаген',
        'Краков',
        'Краматорск',
        'Кременчуг',
        'Кривой Рог',
        'Кропивницкий',
        'Курортное',
        'Лондон',
        'Луганск',
        'Луцк',
        'Львов',
        'Мариуполь',
        'Мелитополь',
        'Минск',
        'Москва',
        'Мюнхен',
        'Николаев',
        'Новосибирск',
    ],
    topics: [
        'C',
        'C++',
        'Clojure',
        'cloud',
        'Data Science',
        'Database',
        'DevOps',
        'Erlang',
        'F#',
        'Flash',
        'Front-end',
        'gamedev',
        'Go',
        'golang',
    ],
}

const Events = generate({
    repeat: 10,
    object: {
        id: '{{ faker.random.uuid() }}',
        isOnline: '{{ faker.random.boolean() }}',
        description: '{{ faker.lorem.paragraphs(faker.random.number({ min: 1, max: 3 })) }}',
        link: 'https://dou.ua/calendar/{{ faker.random.uuid() }}',
        image: 'https://s.dou.ua/CACHE/images/img/events/{{ faker.random.uuid() }}_{{ faker.random.uuid() }}.png',
        price({ faker }) {
            const isFree = faker.random.boolean()
            if (isFree) return 'бесплатно'

            const randomNumber = faker.random.number({ min: 100, max: 3000 })
            const roundedPrice = Math.round(randomNumber / 100) * 100
            const currencySymbol = faker.finance.currencySymbol()

            const doublePrice = faker.random.boolean()
            if (doublePrice) return `${roundedPrice} - ${roundedPrice + 500} ${currencySymbol}`

            return `${roundedPrice} ${currencySymbol}`
        },
        title({ faker }) {
            const countWords = faker.random.number({ min: 3, max: 12 })

            return faker.lorem.words(countWords)
        },
        places({ faker }) {
            const mainPlcae = faker.random.arrayElement(staticData.places)

            return [mainPlcae]
        },
        topics({ faker }) {
            const getRandomTopic = () => faker.random.arrayElement(staticData.topics)
            const topicsCount = faker.random.number({ min: 1, max: 4 })
            const result = []

            for (let i = 0; i < topicsCount; i++) {
                result[i] = getRandomTopic()
            }

            return result
        },
        time({ moment }) {
            const date = moment()
            const raw = date.format('Do MMMM', 'ru')

            return { dates: [date.toISOString()], raw }
        },
    },
})

fs.writeFile(__dirname + '/events.json', Events, err => {
    if (err) throw err
})
