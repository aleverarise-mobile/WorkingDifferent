//import liraries
import React, { Component } from 'react'
import GuestNavigation from './navigation/guest'
import LoggedNavigation from './navigation/logged'
import { connect } from 'react-redux'
import { AsyncStorage } from 'react-native'
import {
    storeUser,
    clearUser,
    storeUserData,
} from './store/modules/auth/login/actions'

// create a component
class Navigation extends Component {
    constructor() {
        super()
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('USER')
            if (value !== null) {
                this.props.onProcessStoreUser(JSON.parse(value))
                try {
                    const valueData = await AsyncStorage.getItem('DATA_USER')
                    if (valueData !== null) {
                        this.props.onProcessStoreUserData(JSON.parse(valueData))
                    }
                } catch (error) {
                    console.log('error storage user data', error)
                }
            }
        } catch (error) {
            console.log('error storage', error)
        }
    }

    _removeData = async () => {
        try {
            await AsyncStorage.removeItem('USER')
            await AsyncStorage.removeItem('DATA_USER')
            this.props.onProcessClearUser()
        } catch (error) {
            console.log('error storage', error)
        }
    }
    render() {
        this._retrieveData()
        if (!this.props.auth) {
            return <GuestNavigation />
        }
        return <LoggedNavigation />
    }
}

const mapStateToProps = state => {
    return {
        auth: state.login.auth,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onProcessStoreUser: user => dispatch(storeUser(user)),
        onProcessStoreUserData: user => dispatch(storeUserData(user)),
        onProcessClearUser: () => dispatch(clearUser()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigation)
