//import liraries
import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import NewProject from '../NewProject'
import Carousel from 'react-native-snap-carousel'
import { Button } from 'react-native-elements'
import {
    initProcessGetProjectsMe,
    initProcessSetProjectSelected,
    initProcessGetProjectsMeMilestones,
} from '../../store/modules/projects/actions'
import {
    initProcessGetUsersChatProjects,
    initProcessClearUsersChat,
    initChangeProjectGetChat,
} from '../../store/modules/chat/actions'

// create a component
class Projects extends Component {
    constructor(props) {
        super(props)
        this.state = {
            colors: [
                '#16a085',
                '#1abc9c',
                '#c0392b',
                '#e74c3c',
                '#f39c12',
                '#f1c40f',
                '#3498db',
                '#2980b9',
            ],
            color: '#16a085',
        }
    }

    componentWillMount() {
        this.props.onProcessProjects()
    }

    render() {
        let tempProjects = [{ element: NewProject }]
        this.props.projects.map(currentValue => {
            tempProjects.push(currentValue.name)
        })

        return (
            <View style={styles.container}>
                {this.props.loading && (
                    <ActivityIndicator size="large" color="#16a085" />
                )}

                {!this.props.loading && (
                    <Carousel
                        layout={'default'}
                        onBeforeSnapToItem={index => {
                            if (this.state.colors[index]) {
                                this.setState({
                                    color: this.state.colors[index],
                                })
                            } else {
                                this.setState({
                                    color: '#adadad9e',
                                })
                            }
                            this.props.onSelectedProjects(
                                this.props.projects[index],
                                index,
                                index
                            )
                            this.props.onProcessChangeProjects()
                            this.props.onProcessProjectsMilestones()
                        }}
                        renderItem={({ item, index }) => {
                            if (this.props.project) {
                                if (this.props.project.index == index) {
                                    if (this.state.colors[index]) {
                                        return (
                                            <Button
                                                raised
                                                color="#FFFFFF"
                                                fontFamily="HelveticaNeue"
                                                backgroundColor={
                                                    this.state.colors[index]
                                                }
                                                buttonStyle={{
                                                    paddingTop: 9,
                                                    paddingBottom: 9,
                                                }}
                                                borderRadius={50}
                                                title={item.name.substring(
                                                    0,
                                                    15
                                                )}
                                            />
                                        )
                                    } else {
                                        return (
                                            <Button
                                                raised
                                                color="#FFFFFF"
                                                fontFamily="HelveticaNeue"
                                                backgroundColor="#adadad9e"
                                                buttonStyle={{
                                                    paddingTop: 9,
                                                    paddingBottom: 9,
                                                }}
                                                borderRadius={50}
                                                title={item.name.substring(
                                                    0,
                                                    15
                                                )}
                                            />
                                        )
                                    }
                                } else {
                                    return (
                                        <Button
                                            raised
                                            color="#FFFFFF"
                                            fontFamily="HelveticaNeue"
                                            backgroundColor="#adadad9e"
                                            buttonStyle={{
                                                paddingTop: 9,
                                                paddingBottom: 9,
                                            }}
                                            borderRadius={50}
                                            title={item.name.substring(0, 15)}
                                        />
                                    )
                                }
                            } else {
                                return (
                                    <Button
                                        raised
                                        color="#FFFFFF"
                                        fontFamily="HelveticaNeue"
                                        backgroundColor="#adadad9e"
                                        buttonStyle={{
                                            paddingTop: 9,
                                            paddingBottom: 9,
                                        }}
                                        borderRadius={50}
                                        title={item.name.substring(0, 15)}
                                    />
                                )
                            }
                        }}
                        firstItem={this.props.project.index}
                        ref={c => {
                            this._carousel = c
                        }}
                        inactiveSlideScale={0.8}
                        inactiveSlideOpacity={0.8}
                        containerCustomStyle={{ flex: 1 }}
                        slideStyle={{ flex: 1, paddingVertical: 10 }}
                        enableMomentum={false}
                        itemWidth={Dimensions.get('window').width * 0.45}
                        sliderWidth={Dimensions.get('window').width}
                        data={this.props.projects}
                    />
                )}

                {this.props.loadingMilestone && (
                    <ActivityIndicator size="large" color={this.state.color} />
                )}
            </View>
        )
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        height: 80,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

const mapStateToProps = state => {
    return {
        user: state.login.user,
        loading: state.projects.loading,
        loadingMilestone: state.projects.loadingMilestone,
        projects: state.projects.projects,
        project: state.projects.project,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onProcessProjects: () => dispatch(initProcessGetProjectsMe()),
        onProcessProjectsMilestones: () =>
            dispatch(initProcessGetProjectsMeMilestones()),
        onSelectedProjects: (project, index, key) =>
            dispatch(initProcessSetProjectSelected(project, index, key)),
        onProcessGetUsersChatProjects: () =>
            dispatch(initProcessGetUsersChatProjects()),
        onProcessClearChat: () => dispatch(initProcessClearUsersChat()),
        onProcessChangeProjects: () => dispatch(initChangeProjectGetChat()),
    }
}

//make this component available to the app
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Projects)
