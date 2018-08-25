import { generate } from '../src/generator'
import * as fs from 'fs'

const staticData = {
    places: [
        'по всем городам',
        'Алушта',
        'Амстердам',
        'Анахейм',
        'Атланта',
        'Афины',
        'Белая Церковь',
        'Берлин',
        'Бостон',
        'Братислава',
        'Брно',
        'Брюссель',
        'Будапешт',
        'Бухарест',
        'Варшава',
        'Вена',
        'Вильнюс',
        'Винница',
        'Вроцлав',
        'Гданьск',
        'Гродно',
        'Днепр',
        'Донецк',
        'Дорнбирн',
        'Екатеринбург',
        'Житомир',
        'Запорожье',
        'Ивано-Франковск',
        'Ирпень',
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
        'Нью-Йорк',
        'Одесса',
        'Оксфорд',
        'Орхус',
        'Осло',
        'Остин',
        'Париж',
        'Познань',
        'Полтава',
        'Прага',
        'Рига',
        'Ровно',
        'Самара',
        'Сан-Франциско',
        'Санкт-Петербург',
        'Санта-Клара',
        'Севастополь',
        'Северодонецк',
        'Симферополь',
        'Сиэтл',
        'Сиэттл',
        'Солигорск',
        'София',
        'Сплит',
        'Спокан',
        'Стамбул',
        'Стокгольм',
        'Сумы',
        'Таллинн',
        'Тель-Авив',
        'Тернополь',
        'Турку',
        'Ужгород',
        'Флоренция',
        'Харьков',
        'Хельсинки',
        'Херсон',
        'Хмельницкий',
        'Челябинск',
        'Черкассы',
        'Чернигов',
        'Черновцы',
        'Чешке-Будейовице',
        'Шацк',
        'Шостка',
        'Online',
        'Барселона',
        'Тбилиси',
    ],
    topics: [
        'по всем темам',
        '.NET',
        '1C',
        '3D',
        'Agile',
        'AI',
        'Algorithms',
        'Android',
        'APL',
        'BA',
        'big data',
        'Blockchain',
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
        'Groovy',
        'hardware',
        'Haskell',
        'highload',
        'HR',
        'iOS',
        'IoT',
        'Java',
        'JavaScript',
        'Kotlin',
        'Linux',
        'Lisp',
        'Lua',
        'Microsoft',
        'ML',
        'mobile',
        'Perl',
        'PHP',
        'PM',
        'Python',
        'QA',
        'R',
        'Ruby',
        'Rust',
        'SaaS',
        'Sales',
        'Scala',
        'Scrum',
        'Solution Architecture',
        'VR',
        'английский',
        'безопасность',
        'бизнес',
        'благотворительность',
        'вебинар',
        'вечеринка',
        'дизайн',
        'карьера',
        'клубные встречи',
        'конкурс',
        'конференция',
        'курсы',
        'маркетинг',
        'менеджмент',
        'семинар',
        'сертификация',
        'соревнование',
        'стартап',
        'тестирование',
        'технологии',
        'ФП',
        'фриланс',
        'хакатон',
    ],
}

const Events = generate({
    repeat: 10,
    object: {
        id: '{{ faker.random.uuid() }}',
        isOnline: '{{ faker.random.boolean() }}',
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
        description: '{{ faker.lorem.paragraphs(faker.random.number({ min: 1, max: 3 })) }}',
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
        link: 'https://dou.ua/calendar/{{ faker.random.uuid() }}',
        image: 'https://s.dou.ua/CACHE/images/img/events/{{ faker.random.uuid() }}_{{ faker.random.uuid() }}.png',
        time({ moment }) {
            const date = moment()
            const raw = date.format('Do MMMM', 'ru')

            return { dates: [date.toISOString()], raw }
        },
    },
})

// fs.writeFile(__dirname + '/../trash/events.json', Events, err => {
//     if (err) throw err
//     else console.log('successful!')
// })
