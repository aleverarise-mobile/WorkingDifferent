import React from 'react'
import { Image } from 'react-native'

export class ChatIconColor extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Image
                source={require('../../../assets/icons/chat/color.png')}
                fadeDuration={0}
                style={{ width: this.props.width, height: this.props.height }}
            />
        )
    }
}

export class ChatIconBlack extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Image
                source={require('../../../assets/icons/chat/black.png')}
                fadeDuration={0}
                style={{ width: this.props.width, height: this.props.height }}
            />
        )
    }
}
