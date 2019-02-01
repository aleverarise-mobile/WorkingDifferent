import React from 'react'
import { Image } from 'react-native'

export class TimelineIconColor extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Image
                source={require('../../../assets/icons/timeline/color.png')}
                fadeDuration={0}
                style={{ width: this.props.width, height: this.props.height }}
            />
        )
    }
}

export class TimelineIconBlack extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Image
                source={require('../../../assets/icons/timeline/black.png')}
                fadeDuration={0}
                style={{ width: this.props.width, height: this.props.height }}
            />
        )
    }
}
