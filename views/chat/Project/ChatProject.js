//import liraries
import React, { Component } from 'react'
import {
    View,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    KeyboardAvoidingView,
} from 'react-native'
import ChatUserComponent from '../../../components/chat/ChatUserComponent'
import ChatMeComponent from '../../../components/chat/ChatMeComponent'
import { connect } from 'react-redux'
import { initGetMessagesForProject } from '../../../store/modules/chat/detail/project/actions'
import { FormInput } from 'react-native-elements'
import io from 'socket.io-client'

// create a component
class ChatProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            messages: [],
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

    componentDidMount() {
        const { navigation } = this.props
        if (navigation.getParam('projectID')) {
            this.props.initProcessGetMessage(
                navigation.getParam('projectID', 'NO-ID')
            )
        }
    }

    onSubmitMessage() {
        let { message } = this.state
        this.setState({ message: '' })
        this.socket.connect()
        this.socket.on('connect', () => {
            /* console.log('connected to socket server')
            console.log('websocket1', socket.connected) */
        })
        const info = {
            body: message,
            author: this.props.user._id,
            type: 'text',
            chat: this.props.chat.id,
        }
        this.socket.emit('message', info)
    }

    componentWillMount() {
        this.socket.on('messages.new', message => {
            let { messages } = this.state
            messages.push(message)
            this.setState({ messages: messages })
        })
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.containerKeyboard}
                enabled
                keyboardVerticalOffset={120}
                behavior="position"
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.container}>
                        {this.props.loading && (
                            <ActivityIndicator size="large" color="#f1c40f" />
                        )}

                        {!this.props.loading && (
                            <View
                                style={{
                                    height:
                                        Dimensions.get('window').height - 180,
                                }}
                            >
                                <ScrollView
                                    ref={ref => (this.scrollView = ref)}
                                    onContentSizeChange={() => {
                                        this.scrollView.scrollToEnd({
                                            animated: false,
                                        })
                                    }}
                                >
                                    {this.props.messages &&
                                        this.props.messages.map(
                                            (currentValue, index) => {
                                                if (
                                                    currentValue.author._id ===
                                                    this.props.user._id
                                                ) {
                                                    return (
                                                        <ChatMeComponent
                                                            key={index}
                                                            message={
                                                                currentValue.body
                                                            }
                                                            color="#f1c40f"
                                                        />
                                                    )
                                                }

                                                if (
                                                    currentValue.author._id !==
                                                    this.props.user._id
                                                ) {
                                                    return (
                                                        <ChatUserComponent
                                                            key={index}
                                                            message={
                                                                currentValue.body
                                                            }
                                                            color="#D5D5D5"
                                                            avatar={
                                                                currentValue
                                                                    .author
                                                                    .profileImg
                                                            }
                                                        />
                                                    )
                                                }
                                            }
                                        )}

                                    {this.state.messages.map(
                                        (currentValue, index) => {
                                            if (
                                                currentValue.author._id ===
                                                this.props.user._id
                                            ) {
                                                return (
                                                    <ChatMeComponent
                                                        key={index}
                                                        message={
                                                            currentValue.body
                                                        }
                                                        color="#f1c40f"
                                                    />
                                                )
                                            }

                                            if (
                                                currentValue.author._id !==
                                                this.props.user._id
                                            ) {
                                                return (
                                                    <ChatUserComponent
                                                        key={index}
                                                        message={
                                                            currentValue.body
                                                        }
                                                        color="#D5D5D5"
                                                        avatar={
                                                            currentValue.author
                                                                .profileImg
                                                        }
                                                    />
                                                )
                                            }
                                        }
                                    )}
                                </ScrollView>
                            </View>
                        )}
                        {!this.props.loading && (
                            <View>
                                <FormInput
                                    placeholder="Enter your message..."
                                    placeholderTextColor="black"
                                    inlineImageLeft="search_icon"
                                    scrollEnabled={true}
                                    returnKeyType="done"
                                    value={this.state.message}
                                    onChangeText={message =>
                                        this.setState({ message })
                                    }
                                    multiline={true}
                                    enablesReturnKeyAutomatically={true}
                                    onEndEditing={() => this.onSubmitMessage()}
                                    blurOnSubmit={true}
                                    inputStyle={{
                                        fontWeight: '600',
                                        fontFamily: 'HelveticaNeue',
                                        color: '#000000',
                                    }}
                                />
                            </View>
                        )}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

// define your styles
const styles = StyleSheet.create({
    containerKeyboard: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    container: {
        backgroundColor: '#FFFFFF',
    },
})

const mapStateToProps = state => {
    return {
        loading: state.chatProject.loading,
        chat: state.chatProject.chat,
        messages: state.chatProject.messages,
        user: state.login.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initProcessGetMessage: projectID =>
            dispatch(initGetMessagesForProject(projectID)),
    }
}

//make this component available to the app
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatProject)
