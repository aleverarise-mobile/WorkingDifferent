//import liraries
import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, StatusBar } from 'react-native'
import { List, ListItem, Text } from 'react-native-elements'
import { connect } from 'react-redux'
import io from 'socket.io-client'
// create a component
class Notification extends Component {
    constructor(props) {
        super(props)

        this.state = {
            notifications: [],
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
            console.log(notification)
            let temp = this.state.notifications
            if (this.state.notifications.length > 0) {
                this.state.notifications.map(element => {
                    if (
                        element.type == 'Chat' &&
                        element.creator._id !== notification.creator._id
                    ) {
                        temp.push(notification)
                        this.setState({
                            notifications: temp,
                        })
                    } else {
                        temp.push(notification)
                        this.setState({
                            notifications: temp,
                        })
                    }
                })
            } else {
                temp.push(notification)
                this.setState({
                    notifications: temp,
                })
            }
        })
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text
                        h3
                        style={{
                            fontWeight: '300',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        fontFamily="HelveticaNeue"
                    >
                        NOTIFICATIONS
                    </Text>
                </View>
                <List
                    containerStyle={{
                        marginBottom: 20,
                        borderBottomWidth: 0,
                        borderTopWidth: 0,
                    }}
                    titleStyle={{
                        fontFamily: 'HelveticaNeue',
                        fontWeight: '300',
                    }}
                >
                    {this.state.notifications.map((element, key) => {
                        if (element.type == 'Chat') {
                            return (
                                <ListItem
                                    key={key}
                                    roundAvatar
                                    onPress={() =>
                                        this.props.navigation.navigate(
                                            'ChatUser',
                                            {
                                                userName:
                                                element.creator.firstname +
                                                    ' ' +
                                                    element.creator.lastname,
                                                userID: element.creator._id,
                                                img: element.creator.profileImg,
                                            }
                                        )
                                    }
                                    rightIcon={{
                                        name: 'cancel',
                                        color: '#c0392b',
                                    }}
                                    containerStyle={{
                                        marginBottom: 20,
                                        borderTopWidth: 0,
                                        borderBottomWidth: 0,
                                    }}
                                    titleStyle={{
                                        fontWeight: '300',
                                        fontFamily: 'HelveticaNeue',
                                    }}
                                    subtitleStyle={{
                                        fontWeight: '300',
                                        fontFamily: 'HelveticaNeue',
                                    }}
                                    title={element.description}
                                    avatar={{ uri: element.creator.profileImg }}
                                />
                            )
                        } else if (element.type == 'ChatProject') {
                            return (
                                <ListItem
                                    key={key}
                                    roundAvatar
                                    rightIcon={{
                                        name: 'cancel',
                                        color: '#c0392b',
                                    }}
                                    // onPress={() =>
                                    //     this.props.navigation.navigate(
                                    //         'ChatProject',
                                    //         {
                                    //             projectName: this.props
                                    //                 .chatProject.header.name,
                                    //             projectID: this.props
                                    //                 .chatProject.project,
                                    //             img: this.props.chatProject
                                    //                 .header.img,
                                    //         }
                                    //     )
                                    // }
                                    containerStyle={{
                                        marginBottom: 20,
                                        borderTopWidth: 0,
                                        borderBottomWidth: 0,
                                    }}
                                    titleStyle={{
                                        fontWeight: '300',
                                        fontFamily: 'HelveticaNeue',
                                    }}
                                    subtitleStyle={{
                                        fontWeight: '300',
                                        fontFamily: 'HelveticaNeue',
                                    }}
                                    title={element.description}
                                    avatar={{ uri: element.user.profileImg }}
                                />
                            )
                        } else {
                            return (
                                <ListItem
                                    key={key}
                                    roundAvatar
                                    rightIcon={{
                                        name: 'cancel',
                                        color: '#c0392b',
                                    }}
                                    containerStyle={{
                                        marginBottom: 20,
                                        borderTopWidth: 0,
                                        borderBottomWidth: 0,
                                    }}
                                    titleStyle={{
                                        fontWeight: '300',
                                        fontFamily: 'HelveticaNeue',
                                    }}
                                    subtitleStyle={{
                                        fontWeight: '300',
                                        fontFamily: 'HelveticaNeue',
                                    }}
                                    title={element.description}
                                    avatar={{ uri: element.user.profileImg }}
                                />
                            )
                        }
                    })}
                </List>
            </ScrollView>
        )
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight + 30,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

//make this component available to the app
const mapStateToProps = state => {
    return {
        user: state.login.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

//make this component available to the app
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notification)
