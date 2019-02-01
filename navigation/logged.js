import React from 'react'
import {
    createBottomTabNavigator,
    createAppContainer,
    createStackNavigator,
} from 'react-navigation'
import { connect } from 'react-redux'
import { Text, Image } from 'react-native'
// TIMELINE
import Timeline from '../views/timeline/Timeline'
// CHATS
import Chat from '../views/chat/Chat'
import ChatProject from '../views/chat/Project/ChatProject'
import ChatUser from '../views/chat/User/ChatUser'

// NOTIFICATIONS
import Notification from '../views/notification/Notification'

// COMPONENTS
import {
    TimelineIconColor,
    TimelineIconBlack,
} from '../components/icons/timeline/Timeline'
import { ChatIconColor, ChatIconBlack } from '../components/icons/chat/Chat'
import {
    NotificationIconColor,
    NotificationIconBlack,
} from '../components/icons/notification/Notification'

const TimelineStack = createStackNavigator({
    Timeline: {
        screen: Timeline,
        navigationOptions: ({ navigation }) => ({
            header: null,
            title: 'Timeline',
            headerTintColor: '#009BD9',
        }),
    },
})

const NotificationStack = createStackNavigator({
    Notification: {
        screen: Notification,
        navigationOptions: ({ navigation }) => ({
            header: null,
            title: 'Notification',
            headerTintColor: '#009BD9',
        }),
    },
})

const ChatStack = createStackNavigator({
    Chat: {
        screen: Chat,
        navigationOptions: ({ navigation }) => ({
            header: null,
            title: 'Chat',
            headerTintColor: '#009BD9',
        }),
    },
    ChatProject: {
        screen: ChatProject,
        navigationOptions: ({ navigation }) => ({
            headerTintColor: 'white',
            headerTitle: (
                <Image
                    source={{ uri: navigation.getParam('img', 'Project EW') }}
                    style={{ width: 45, height: 45, borderRadius: 30 }}
                />
            ),
            headerRight: (
                <Text style={{ color: '#FFFFFF', paddingHorizontal: 10 }}>
                    {navigation.getParam('projectName', 'Project EW')}
                </Text>
            ),
            headerStyle: {
                backgroundColor: '#f1c40f',
            },
        }),
    },
    ChatUser: {
        screen: ChatUser,
        navigationOptions: ({ navigation }) => ({
            headerTintColor: 'white',
            headerTitle: (
                <Image
                    source={{ uri: navigation.getParam('img', 'User EW') }}
                    style={{ width: 45, height: 45, borderRadius: 30 }}
                />
            ),
            headerRight: (
                <Text style={{ color: '#FFFFFF', paddingHorizontal: 10 }}>
                    {navigation.getParam('userName', 'User EW')}
                </Text>
            ),
            headerStyle: {
                backgroundColor: '#2980b9',
            },
        }),
    },
})

const TabNavigator = createBottomTabNavigator(
    {
        Timeline: TimelineStack,
        Chat: ChatStack,
        Notification: NotificationStack,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state
                if (routeName === 'Timeline') {
                    if (focused) {
                        return <TimelineIconColor width={35} height={35} />
                    } else {
                        return <TimelineIconBlack width={20} height={20} />
                    }
                } else if (routeName === 'Chat') {
                    if (focused) {
                        return <ChatIconColor width={35} height={35} />
                    } else {
                        return <ChatIconBlack width={20} height={20} />
                    }
                } else if (routeName === 'Notification') {
                    if (focused) {
                        return (
                            <NotificationIconColor
                                width={35}
                                height={35}
                                user={globalStateUser}
                            />
                        )
                    } else {
                        return (
                            <NotificationIconBlack
                                width={20}
                                height={20}
                                user={globalStateUser}
                            />
                        )
                    }
                }
            },
        }),
        swipeEnabled: true,
        animationEnabled: true,
        tabBarOptions: {
            showLabel: false,
            activeTintColor: '#2980b9',
            inactiveTintColor: 'black',
        },
    }
)

let globalStateUser

const mapStateToProps = state => {
    globalStateUser = state.login.user
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
)(createAppContainer(TabNavigator))
