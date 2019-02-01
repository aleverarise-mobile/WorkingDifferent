import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    StatusBar,
    ActivityIndicator,
    ScrollView,
} from 'react-native'
import Projects from '../../components/header/Projects'
import { List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { initProcessGetUsersChatProjects } from '../../store/modules/chat/actions'

// create a component
class Chat extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        if (this.props.project.project) {
            this.props.onProcessGetUsersChatProjects()
        }
    }

    render() {
        let users = []
        this.props.users.map(currentValue => {
            if (currentValue._id !== this.props.user._id) {
                users.push(currentValue)
            }
        })

        return (
            <ScrollView>
                <View style={styles.container}>
                    <Projects />
                    {this.props.loading && (
                        <ActivityIndicator size="large" color="#16a085" />
                    )}

                    {!this.props.loading && (
                        <List
                            containerStyle={{
                                marginBottom: 20,
                                borderBottomWidth: 0,
                                borderTopWidth: 0,
                            }}
                        >
                            {this.props.chatProject.header && (
                                <ListItem
                                    containerStyle={{
                                        marginBottom: 20,
                                        borderBottomWidth: 0,
                                        borderTopWidth: 0,
                                    }}
                                    roundAvatar
                                    onPress={() =>
                                        this.props.navigation.navigate(
                                            'ChatProject',
                                            {
                                                projectName: this.props
                                                    .chatProject.header.name,
                                                projectID: this.props
                                                    .chatProject.project,
                                                img: this.props.chatProject
                                                    .header.img,
                                            }
                                        )
                                    }
                                    avatar={this.props.chatProject.header.img}
                                    key={this.props.chatProject._id}
                                    title={this.props.chatProject.header.name}
                                    titleStyle={{
                                        fontFamily: 'HelveticaNeue',
                                        fontWeight: '300',
                                    }}
                                />
                            )}
                            {users.map((currentValue, index) => (
                                <ListItem
                                    containerStyle={{
                                        marginBottom: 20,
                                        borderBottomWidth: 0,
                                        borderTopWidth: 0,
                                    }}
                                    roundAvatar
                                    onPress={() =>
                                        this.props.navigation.navigate(
                                            'ChatUser',
                                            {
                                                userName:
                                                    currentValue.firstname +
                                                    ' ' +
                                                    currentValue.lastname,
                                                userID: currentValue._id,
                                                img: currentValue.profileImg,
                                            }
                                        )
                                    }
                                    avatar={currentValue.profileImg}
                                    key={index}
                                    title={currentValue.firstname}
                                    titleStyle={{
                                        fontFamily: 'HelveticaNeue',
                                        fontWeight: '300',
                                    }}
                                    subtitle={currentValue.lastname}
                                    subtitleStyle={{
                                        fontFamily: 'HelveticaNeue',
                                        fontWeight: '300',
                                    }}
                                />
                            ))}
                        </List>
                    )}
                </View>
            </ScrollView>
        )
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#FFFFFF',
    },
})

const mapStateToProps = state => {
    return {
        user: state.login.user,
        users: state.chat.chatUsers,
        chatProject: state.chat.chatProject,
        project: state.projects.project,
        loading: state.chat.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onProcessGetUsersChatProjects: () =>
            dispatch(initProcessGetUsersChatProjects()),
    }
}

//make this component available to the app
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat)
