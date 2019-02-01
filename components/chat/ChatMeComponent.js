//import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

// create a component
class ChatMeComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <View
                    style={{
                        backgroundColor: this.props.color,
                        padding: 10,
                        borderRadius: 30,
                    }}
                >
                    <Text
                        style={{
                            color: '#FFFFFF',
                            fontWeight: '300',
                            fontFamily: 'HelveticaNeue',
                        }}
                    >
                        {this.props.message}
                    </Text>
                </View>
            </View>
        )
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingLeft: 80,
    },
})

//make this component available to the app
export default ChatMeComponent
