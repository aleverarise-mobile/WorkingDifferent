//import liraries
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'

const POSITION_TASK = ['flex-end', 'flex-start', 'center']

// create a component
class TaskItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View
                style={{
                    width: 100,
                    alignItems: 'center',
                    alignSelf:
                        POSITION_TASK[
                            Math.floor(Math.random() * POSITION_TASK.length)
                        ],
                }}
            >
                <Avatar
                    small
                    rounded
                    title={this.props.data.name.substring(0, 2)}
                    activeOpacity={0.7}
                    onPress={() => console.log('Works!')}
                    overlayContainerStyle={{
                        backgroundColor: this.props.color,
                    }}
                />
                <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={{
                        fontFamily: 'HelveticaNeue',
                        fontStyle: 'normal',
                        fontWeight: '300',
                    }}
                >
                    {this.props.data.name}
                </Text>
            </View>
        )
    }
}

//make this component available to the app
export default TaskItem
