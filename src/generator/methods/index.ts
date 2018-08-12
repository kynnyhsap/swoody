export const methods = {
    run(method: string) {
        try {
            return eval(`this.${method.trim()}`)
        } catch (error) {
            return `<${error}>`
        }
    },

    objectId() {
        return '_1asdf234jksjdhf823hf9un29d'
    },
}
