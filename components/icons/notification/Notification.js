import React from 'react'
import { Image } from 'react-native'
import { Badge } from 'react-native-elements'
import { View } from 'react-native'
import io from 'socket.io-client'
export class NotificationIconColor extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            notifications: 0,
        }

        this.options = {
            transports: ['websocket'],
            forceNew: true,
            rejectUnauthorized: false,
            query: 'auth_token=' + props.user.token,
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 20,
        }

        this.socket = io('https://workingdifferent.com/', this.options)
    }

    componentWillMount() {
        this.socket.on('notification.new', notification => {
            console.log('notification Focus: ', notification)
            this.setState({ notifications: this.state.notifications + 1 })
        })
    }

    componentWillFocus() {
        this.setState({ notifications: 0 })
    }

    render() {
        return (
            <View>
                {this.state.notifications > 0 && (
                    <Badge
                        containerStyle={{
                            backgroundColor: '#16a085',
                            position: 'absolute',
                            left: 20,
                            width: 40,
                            bottom: -10,
                        }}
                        value={this.state.notifications}
                        textStyle={{ color: 'white' }}
                    />
                )}
                <Image
                    source={require('../../../assets/icons/notification/color.png')}
                    fadeDuration={0}
                    style={{
                        width: this.props.width,
                        height: this.props.height,
                    }}
                />
            </View>
        )
    }
}

export class NotificationIconBlack extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            notifications: 0,
        }

        this.options = {
            transports: ['websocket'],
            forceNew: true,
            rejectUnauthorized: false,
            query: 'auth_token=' + props.user.token,
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 20,
        }

        this.socket = io('https://workingdifferent.com/', this.options)
    }

    componentWillMount() {
        this.socket.on('notification.new', notification => {
            console.log('notification bot Focus: ', notification)
            this.setState({ notifications: this.state.notifications + 1 })
        })
    }

    render() {
        return (
            <View>
                {this.state.notifications > 0 && (
                    <Badge
                        containerStyle={{
                            backgroundColor: '#16a085',
                            position: 'absolute',
                            left: 20,
                            width: 40,
                            bottom: -10,
                        }}
                        value={this.state.notifications}
                        textStyle={{ color: 'white' }}
                    />
                )}
                <Image
                    source={require('../../../assets/icons/notification/black.png')}
                    fadeDuration={0}
                    style={{
                        width: this.props.width,
                        height: this.props.height,
                    }}
                />
            </View>
        )
    }
}
