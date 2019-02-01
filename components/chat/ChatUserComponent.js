//import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Avatar } from 'react-native-elements'

// create a component
class ChatUserComponent extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Avatar
                        small
                        source={{ uri: this.props.avatar }}
                        rounded
                        onPress={() => console.log('Works!')}
                        activeOpacity={0.7}
                    />
                </View>
                <View
                    style={{
                        backgroundColor: this.props.color,
                        padding: 10,
                        width: Dimensions.get('window').width - 100,
                        borderRadius: 30,
                    }}
                >
                    <Text style={{ fontWeight: '300', fontFamily: 'HelveticaNeue' }}>
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
        flexDirection: 'row',
    },
})

//make this component available to the app
export default ChatUserComponent
