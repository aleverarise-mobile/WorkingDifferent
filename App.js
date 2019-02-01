import React from 'react'
import { store } from './store/'
import { Provider } from 'react-redux'
import Navigation from './Navigation'
import { Font } from 'expo'
import { Provider as PaperProvider } from 'react-native-paper'
import { Permissions, Notifications } from 'expo'
export default class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = { loading: true }
    }
   
    async componentWillMount() {
        await Font.loadAsync({
            HelveticaNeue: require('./assets/fonts/HelveticaNeue.ttf'),
        })
        this.setState({ loading: false })
    }

    render() {
        if (this.state.loading) {
            return null
        }
        return (
            <Provider store={store}>
                <PaperProvider>
                    <Navigation />
                </PaperProvider>
            </Provider>
        )
    }
}
