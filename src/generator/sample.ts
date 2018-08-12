export const TEST_OBJECT = {
    repeat: [5, 10],
    object: {
        _id: '{{objectId()}}',
        index: '{{index()}}',
        guid: '{{guid()}}',
        isActive: '{{bool()}}',
        role: 'user',
        empty: null,
        balance: '{{floating(1000, 4000, 2, "$0,0.00")}}',
        picture: 'http://placehold.it/32x32',
        age: '{{integer(20, 40)}}',
        eyeColor: '{{random("blue", "brown", "green")}}',
        name: {
            first: '{{firstName()}}',
            last: '{{surname()}}',
        },
        upperID(tags: any) {
            return tags.objectId().toUpperCase()
        },
        company: '{{company().toUpperCase()}}',
        phone: '+1 {{phone()}}',
        address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
        about: '{{lorem(1, "paragraphs")}}',
        registered: '{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}',
        latitude: '{{floating(-90.000001, 90)}}',
        longitude: '{{floating(-180.000001, 180)}}',
        tags: {
            repeat: 5,
            object: '{{lorem(1, "words")}}',
        },
        friends: {
            repeat: 3,
            object: {
                id: '{{index()}}',
                name: '{{firstName()}} {{surname()}}',
            },
        },
        arrayy: [1, '{{objectId()}}', 4, 234],
        // email(tags: any) {
        //     console.log(this)
        //     return `${this.name.first}.${this.name.last}@${this.company}${tags.domainZone()}`.toLowerCase()
        // },
        // greeting(tags: any) {
        //     return `Hello, ${this.name.first}! You have ${tags.integer(5, 10)} unread messages.`
        // },
        // favoriteFruit(tags: any) {
        //     const fruits = ['apple', 'banana', 'strawberry']
        //     return fruits[tags.integer(0, fruits.length - 1)]
        // },
    },
}
