import createStore from './lib/index.js'

const store = {
    initialState: {
        user: null
    },
    actionsCreators: {
        getUser:  async () => {
            const response = await fetch('https://api.github.com/users/Yang03')
            const body = await response.json()
            return {
                user: {avatar: body.avatar_url}
            }
        }
    }
}


console.log(createStore(store))
export const {
    Provider,
    Consumer,
    actions,
    connect
} = createStore(store)